import { NextRequest, NextResponse } from 'next/server';
import { aggregateAllContent } from '@/lib/aggregator';
import { filterResources, ContentType, SkillLevel, SourceType, TopicTag } from '@/lib/data';

// In-memory cache for serverless (resets on cold start)
// On Vercel, this persists for the lifetime of the function instance
let cache: { data: any[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // Parse filters from query params
  const query = searchParams.get('q') || '';
  const contentType = searchParams.get('type') as ContentType | undefined || undefined;
  const skillLevel = searchParams.get('level') as SkillLevel | undefined || undefined;
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) as TopicTag[] | undefined;
  const sourceType = searchParams.get('source') as SourceType | undefined || undefined;
  const sortBy = (searchParams.get('sort') as 'newest' | 'oldest' | 'most-viewed' | 'most-saved') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '24');

  try {
    // Check cache
    const now = Date.now();
    if (!cache || now - cache.fetchedAt > CACHE_TTL_MS) {
      console.log('[API] Cache miss — fetching live content...');
      const apiKey = process.env.YOUTUBE_API_KEY;
      const fresh = await aggregateAllContent(apiKey || undefined);
      cache = { data: fresh, fetchedAt: now };
      console.log(`[API] Fetched ${fresh.length} resources`);
    }

    // Apply filters
    const filtered = filterResources(cache.data, {
      search: query,
      contentType,
      skillLevel,
      tags,
      sourceType,
      sortBy,
    });

    // Paginate
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return NextResponse.json({
      resources: paginated,
      meta: {
        total,
        page,
        totalPages,
        limit,
        cachedAt: new Date(cache.fetchedAt).toISOString(),
        sources: {
          youtube: cache.data.filter(r => r.sourceType === 'youtube').length,
          blog: cache.data.filter(r => r.sourceType === 'blog').length,
          medium: cache.data.filter(r => r.sourceType === 'medium').length,
          rss: cache.data.filter(r => r.sourceType === 'rss').length,
        },
      },
    });
  } catch (err) {
    console.error('[API] Aggregation error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch content', resources: [], meta: { total: 0, page: 1, totalPages: 0 } },
      { status: 500 }
    );
  }
}
