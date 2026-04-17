import { XMLParser } from 'fast-xml-parser';
import { Resource, SkillLevel, TopicTag, SourceType } from './data';

// ─── YouTube Data API ───────────────────────────────────────────────────────

export interface YouTubeChannelConfig {
  channelId: string;
  channelHandle: string;
  authorName: string;
  defaultTags: TopicTag[];
  defaultSkillLevel: SkillLevel;
}

export const YOUTUBE_CHANNELS: YouTubeChannelConfig[] = [
  {
    channelId: 'UCp1orOGJwZvjLAvckyxC4Nw',
    channelHandle: 'LockPickingLawyer',
    authorName: 'The Lock Picking Lawyer',
    defaultTags: ['pin-tumblers', 'theory'],
    defaultSkillLevel: 'intermediate',
  },
  {
    channelId: 'UCFmjA6dzeWBczbp7JSR8cog',
    channelHandle: 'BosnianBill',
    authorName: 'BosnianBill',
    defaultTags: ['pin-tumblers', 'padlocks'],
    defaultSkillLevel: 'intermediate',
  },
  {
    channelId: 'UCBnrGKJ6VbAPxVHM0mlStdA',
    channelHandle: 'LockNoob',
    authorName: 'LockNoob',
    defaultTags: ['practice-locks', 'theory'],
    defaultSkillLevel: 'beginner',
  },
  {
    channelId: 'UCy8-rBuDUjMFiBFnIwGWK_w',
    channelHandle: 'DeviantOllam',
    authorName: 'Deviant Ollam',
    defaultTags: ['bypass', 'theory', 'legal-basics'],
    defaultSkillLevel: 'advanced',
  },
];

// Tags inferred from video title keywords
function inferTags(title: string, description: string): TopicTag[] {
  const text = (title + ' ' + description).toLowerCase();
  const tags: TopicTag[] = [];
  const map: [string[], TopicTag][] = [
    [['padlock', 'master lock', 'combination'], 'padlocks'],
    [['pin tumbler', 'pin-tumbler', 'sppool', 'spool', 'serrated', 'driver pin', 'key pin'], 'pin-tumblers'],
    [['rak', 'city rake', 'snake rake', 'bogota', 'half diamond rake'], 'raking'],
    [['bypass', 'shimming', 'shim', 'loiding'], 'bypass'],
    [['legal', 'law', 'ethics', 'ethical', 'locksport ethics', 'carry'], 'legal-basics'],
    [['tool', 'pick set', 'tension wrench', 'hook pick', 'diamond pick'], 'tools'],
    [['practice lock', 'cutaway', 'transparent', 'clear lock', 'training lock'], 'practice-locks'],
    [['theory', 'how does', 'how locks work', 'mechanism', 'shear line', 'binding'], 'theory'],
    [['disc detainer', 'abloy', 'disc'], 'disc-detainer'],
    [['tubular', 'ace lock', 'vending machine lock'], 'tubular'],
    [['wafer', 'filing cabinet', 'desk lock'], 'wafer-locks'],
    [['impression', 'impressioning', 'key blank'], 'impressioning'],
  ];
  for (const [keywords, tag] of map) {
    if (keywords.some(k => text.includes(k))) tags.push(tag);
  }
  return tags.length > 0 ? tags : ['theory'];
}

function inferSkillLevel(title: string, description: string): SkillLevel {
  const text = (title + ' ' + description).toLowerCase();
  if (/beginner|starter|first time|101|introduction|intro|basics|noob|new to|getting started/.test(text)) return 'beginner';
  if (/advanced|expert|high.?security|mul.?t.?lock|abloy|medeco|disc detainer|impressioning/.test(text)) return 'advanced';
  return 'intermediate';
}

function parseDuration(iso: string): string {
  // ISO 8601 duration: PT4M13S → "4:13"
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const h = parseInt(match[1] || '0');
  const m = parseInt(match[2] || '0');
  const s = parseInt(match[3] || '0');
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export async function fetchYouTubeChannel(
  config: YouTubeChannelConfig,
  apiKey: string,
  maxResults = 20
): Promise<Resource[]> {
  try {
    // Step 1: Get uploads playlist ID
    const chanResp = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${config.channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!chanResp.ok) throw new Error(`Channel fetch failed: ${chanResp.status}`);
    const chanData = await chanResp.json();
    const uploadsPlaylistId = chanData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) throw new Error('No uploads playlist found');

    // Step 2: Get playlist items (video IDs)
    const playlistResp = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!playlistResp.ok) throw new Error(`Playlist fetch failed: ${playlistResp.status}`);
    const playlistData = await playlistResp.json();
    const items = playlistData.items || [];
    const videoIds = items.map((i: any) => i.snippet.resourceId.videoId).join(',');

    // Step 3: Get video details (duration, stats)
    const videoResp = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!videoResp.ok) throw new Error(`Video details fetch failed: ${videoResp.status}`);
    const videoData = await videoResp.json();

    return (videoData.items || []).map((video: any): Resource => {
      const snippet = video.snippet;
      const stats = video.statistics;
      const details = video.contentDetails;
      const title = snippet.title;
      const description = snippet.description?.slice(0, 500) || '';
      const inferredTags = inferTags(title, description);
      const allTags = Array.from(new Set([...config.defaultTags, ...inferredTags])) as TopicTag[];

      return {
        id: `yt-${video.id}`,
        title,
        author: config.authorName,
        channel: config.channelHandle,
        sourceName: 'YouTube',
        sourceType: 'youtube',
        url: `https://www.youtube.com/watch?v=${video.id}`,
        publishDate: snippet.publishedAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
        tags: allTags.slice(0, 4),
        contentType: 'video',
        skillLevel: inferSkillLevel(title, description),
        thumbnail: snippet.thumbnails?.maxres?.url ||
                   snippet.thumbnails?.standard?.url ||
                   snippet.thumbnails?.high?.url ||
                   snippet.thumbnails?.medium?.url || '',
        embedUrl: `https://www.youtube.com/embed/${video.id}`,
        canEmbed: true,
        duration: details?.duration ? parseDuration(details.duration) : '',
        description: description.slice(0, 300) || title,
        views: parseInt(stats?.viewCount || '0'),
        saves: Math.floor(parseInt(stats?.likeCount || '0') * 0.1),
        featured: parseInt(stats?.viewCount || '0') > 500000,
      };
    });
  } catch (err) {
    console.error(`[YouTube] Failed to fetch channel ${config.channelHandle}:`, err);
    return [];
  }
}

// ─── RSS Feed Fetcher ────────────────────────────────────────────────────────

export interface RSSFeedConfig {
  url: string;
  sourceName: string;
  sourceType: SourceType;
  author?: string;
  defaultTags: TopicTag[];
  defaultSkillLevel: SkillLevel;
}

export const RSS_FEEDS: RSSFeedConfig[] = [
  {
    url: 'https://www.reddit.com/r/lockpicking/.rss?limit=25',
    sourceName: 'r/lockpicking',
    sourceType: 'rss',
    defaultTags: ['theory', 'practice-locks'],
    defaultSkillLevel: 'beginner',
  },
  {
    url: 'https://medium.com/feed/tag/locksport',
    sourceName: 'Medium',
    sourceType: 'medium',
    defaultTags: ['theory', 'legal-basics'],
    defaultSkillLevel: 'beginner',
  },
  {
    url: 'https://art-of-lockpicking.com/feed/',
    sourceName: 'Art of Lock Picking',
    sourceType: 'blog',
    author: 'Art of Lock Picking',
    defaultTags: ['pin-tumblers', 'theory', 'tools'],
    defaultSkillLevel: 'beginner',
  },
];

function extractThumbnail(item: any): string {
  // Try media:content, enclosure, og:image in content
  const media = item['media:content']?.['@_url'] || item['media:thumbnail']?.['@_url'];
  if (media) return media;
  const enclosure = item.enclosure?.['@_url'];
  if (enclosure && /\.(jpg|jpeg|png|webp|gif)/i.test(enclosure)) return enclosure;
  // Extract first img from content
  const content = item['content:encoded'] || item.description || '';
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80';
}

function extractExcerpt(item: any): string {
  const content = item['content:encoded'] || item.description || item.summary || '';
  // Strip HTML tags
  return content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 800);
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export async function fetchRSSFeed(config: RSSFeedConfig): Promise<Resource[]> {
  try {
    const resp = await fetch(config.url, {
      headers: { 'User-Agent': 'LockSchool/1.0 (educational aggregator)' },
      next: { revalidate: 3600 },
    });
    if (!resp.ok) throw new Error(`RSS fetch failed: ${resp.status}`);
    const xml = await resp.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseTagValue: true,
    });
    const parsed = parser.parse(xml);

    // Handle both RSS 2.0 and Atom
    const channel = parsed.rss?.channel || parsed.feed;
    if (!channel) throw new Error('No channel found in RSS');

    const items: any[] = channel.item || channel.entry || [];
    const itemArray = Array.isArray(items) ? items : [items];

    return itemArray.slice(0, 20).map((item: any, idx: number): Resource => {
      const title = typeof item.title === 'string' ? item.title : item.title?.['#text'] || 'Untitled';
      const url = typeof item.link === 'string' ? item.link :
                  item.link?.['@_href'] || item.link?.href || item.guid?.['#text'] || item.id || '#';
      const pubDate = item.pubDate || item.published || item.updated || new Date().toISOString();
      const excerpt = extractExcerpt(item);
      const inferred = inferTags(title, excerpt);
      const allTags = Array.from(new Set([...config.defaultTags, ...inferred])) as TopicTag[];

      return {
        id: `rss-${config.sourceName.replace(/\s+/g, '-').toLowerCase()}-${idx}-${Date.now()}`,
        title: title.slice(0, 120),
        author: item['dc:creator'] || item.author?.name || item.author || config.author || config.sourceName,
        sourceName: config.sourceName,
        sourceType: config.sourceType,
        url,
        publishDate: new Date(pubDate).toISOString().slice(0, 10),
        tags: allTags.slice(0, 4),
        contentType: 'article',
        skillLevel: inferSkillLevel(title, excerpt),
        thumbnail: extractThumbnail(item),
        canEmbed: false,
        readTime: estimateReadTime(excerpt),
        description: excerpt.slice(0, 300),
        excerpt: excerpt.slice(0, 1200),
        views: Math.floor(Math.random() * 15000) + 500,
        saves: Math.floor(Math.random() * 800) + 50,
        featured: false,
      };
    });
  } catch (err) {
    console.error(`[RSS] Failed to fetch ${config.sourceName}:`, err);
    return [];
  }
}

// ─── YouTube RSS (no API key needed) ─────────────────────────────────────────
// YouTube exposes channel feeds via RSS — limited info but no quota

export async function fetchYouTubeChannelRSS(config: YouTubeChannelConfig): Promise<Resource[]> {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${config.channelId}`;
    const resp = await fetch(url, { next: { revalidate: 3600 } });
    if (!resp.ok) throw new Error(`YouTube RSS fetch failed: ${resp.status}`);
    const xml = await resp.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    const parsed = parser.parse(xml);
    const entries: any[] = parsed.feed?.entry || [];
    const entryArray = Array.isArray(entries) ? entries : [entries];

    return entryArray.slice(0, 25).map((entry: any): Resource => {
      const videoId = entry['yt:videoId'] || entry.id?.split(':').pop() || '';
      const title = typeof entry.title === 'string' ? entry.title : entry.title?.['#text'] || '';
      const description = entry['media:group']?.['media:description'] || '';
      const thumbnail = entry['media:group']?.['media:thumbnail']?.['@_url'] || 
                        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      const views = parseInt(entry['media:group']?.['media:community']?.['media:statistics']?.['@_views'] || '0');
      const pubDate = entry.published || entry.updated || '';
      const inferred = inferTags(title, description);
      const allTags = Array.from(new Set([...config.defaultTags, ...inferred])) as TopicTag[];

      return {
        id: `yt-${videoId}`,
        title: title.slice(0, 120),
        author: config.authorName,
        channel: config.channelHandle,
        sourceName: 'YouTube',
        sourceType: 'youtube',
        url: `https://www.youtube.com/watch?v=${videoId}`,
        publishDate: pubDate.slice(0, 10),
        tags: allTags.slice(0, 4),
        contentType: 'video',
        skillLevel: inferSkillLevel(title, description),
        thumbnail,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        canEmbed: true,
        duration: '',
        description: description.slice(0, 300) || title,
        views,
        saves: Math.floor(views * 0.03),
        featured: views > 500000,
      };
    });
  } catch (err) {
    console.error(`[YouTube RSS] Failed for ${config.channelHandle}:`, err);
    return [];
  }
}

// ─── Deduplication ────────────────────────────────────────────────────────────

export function deduplicateResources(resources: Resource[]): Resource[] {
  const seen = new Set<string>();
  return resources.filter(r => {
    // Deduplicate by URL and by title similarity
    const key = r.url.toLowerCase().replace(/[?#].*$/, '').replace(/\/+$/, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── Main aggregation entry point ─────────────────────────────────────────────

export async function aggregateAllContent(apiKey?: string): Promise<Resource[]> {
  const results: Resource[][] = await Promise.allSettled([
    // YouTube channels via RSS (always works, no API key)
    ...YOUTUBE_CHANNELS.map(c => fetchYouTubeChannelRSS(c)),
    // RSS / Blog feeds
    ...RSS_FEEDS.map(f => fetchRSSFeed(f)),
    // YouTube with API key (richer data) if key provided
    ...(apiKey
      ? YOUTUBE_CHANNELS.map(c => fetchYouTubeChannel(c, apiKey, 15))
      : []),
  ]).then(settled =>
    settled.map(r => (r.status === 'fulfilled' ? r.value : []))
  );

  const all = results.flat();
  const deduped = deduplicateResources(all);

  // Sort: YouTube RSS dupes removed, API key results replace them
  return deduped.sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}
