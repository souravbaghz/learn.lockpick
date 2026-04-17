export type ContentType = 'video' | 'article';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type SourceType = 'youtube' | 'blog' | 'medium' | 'rss' | 'other';

export type TopicTag =
  | 'padlocks'
  | 'pin-tumblers'
  | 'raking'
  | 'bypass'
  | 'legal-basics'
  | 'tools'
  | 'practice-locks'
  | 'theory'
  | 'disc-detainer'
  | 'tubular'
  | 'wafer-locks'
  | 'impressioning';

export interface Resource {
  id: string;
  title: string;
  author: string;
  channel?: string;
  sourceName: string;
  sourceType: SourceType;
  url: string;
  publishDate: string;
  tags: TopicTag[];
  contentType: ContentType;
  skillLevel: SkillLevel;
  thumbnail: string;
  embedUrl?: string;
  canEmbed: boolean;
  duration?: string; // for videos
  readTime?: string; // for articles
  description: string;
  excerpt?: string;
  views?: number;
  saves?: number;
  featured?: boolean;
}

export const TOPIC_TAGS: Record<TopicTag, { label: string; color: string }> = {
  'padlocks': { label: 'Padlocks', color: '#C17D3C' },
  'pin-tumblers': { label: 'Pin Tumblers', color: '#6B7FD4' },
  'raking': { label: 'Raking', color: '#4BAF7E' },
  'bypass': { label: 'Bypass Concepts', color: '#D46B6B' },
  'legal-basics': { label: 'Legal Basics', color: '#8B6BD4' },
  'tools': { label: 'Tools', color: '#D4A84B' },
  'practice-locks': { label: 'Practice Locks', color: '#4BA8D4' },
  'theory': { label: 'Theory', color: '#D47B4B' },
  'disc-detainer': { label: 'Disc Detainer', color: '#7BD4A4' },
  'tubular': { label: 'Tubular Locks', color: '#D4C44B' },
  'wafer-locks': { label: 'Wafer Locks', color: '#A44BD4' },
  'impressioning': { label: 'Impressioning', color: '#4BD4C4' },
};

export const resources: Resource[] = [
  {
    id: '1',
    title: 'The Complete Beginner\'s Guide to Single Pin Picking',
    author: 'BosnianBill',
    channel: 'BosnianBill',
    sourceName: 'YouTube',
    sourceType: 'youtube',
    url: 'https://www.youtube.com/watch?v=mzMBCFBpBfk',
    publishDate: '2023-03-15',
    tags: ['pin-tumblers', 'theory', 'tools'],
    contentType: 'video',
    skillLevel: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80',
    embedUrl: 'https://www.youtube.com/embed/mzMBCFBpBfk',
    canEmbed: true,
    duration: '24:18',
    description: 'A thorough walkthrough of single pin picking (SPP) for complete beginners. Covers how pin tumbler locks work mechanically, understanding the shear line, choosing tension tools, and developing feel for feedback.',
    views: 284000,
    saves: 12400,
    featured: true,
  },
  {
    id: '2',
    title: 'Lock Picking 101: Understanding How Locks Work',
    author: 'The Lock Picking Lawyer',
    channel: 'LockPickingLawyer',
    sourceName: 'YouTube',
    sourceType: 'youtube',
    url: 'https://www.youtube.com/watch?v=1LsVQXP_gEE',
    publishDate: '2023-06-22',
    tags: ['theory', 'pin-tumblers', 'legal-basics'],
    contentType: 'video',
    skillLevel: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1614715838981-bb17d2d8b7c7?w=640&q=80',
    embedUrl: 'https://www.youtube.com/embed/1LsVQXP_gEE',
    canEmbed: true,
    duration: '18:42',
    description: 'The Lock Picking Lawyer breaks down exactly why locks can be picked, covering mechanical tolerances, manufacturing imperfections, and why these physical properties make sport lock picking possible and legitimate.',
    views: 1200000,
    saves: 45600,
    featured: true,
  },
  {
    id: '3',
    title: 'Raking Techniques: From Snake Rake to City Rake',
    author: 'Deviant Ollam',
    channel: 'Deviant Ollam',
    sourceName: 'YouTube',
    sourceType: 'youtube',
    url: 'https://youtube.com/watch?v=example3',
    publishDate: '2023-09-08',
    tags: ['raking', 'tools', 'practice-locks'],
    contentType: 'video',
    skillLevel: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=640&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    canEmbed: true,
    duration: '31:05',
    description: 'A practical session on raking — the fast-and-loose sibling to SPP. Covers city rake, snake rake, bogota, and the half-diamond, with demonstrations on common practice padlocks.',
    views: 98000,
    saves: 6700,
    featured: false,
  },
  {
    id: '4',
    title: 'The Locksport Ethics Guide: Owning Only What You Pick',
    author: 'TOOOL Community',
    sourceName: 'TOOOL Blog',
    sourceType: 'blog',
    url: 'https://toool.us/education',
    publishDate: '2023-01-10',
    tags: ['legal-basics', 'theory'],
    contentType: 'article',
    skillLevel: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80',
    canEmbed: false,
    readTime: '8 min',
    description: 'The definitive community ethics guide from The Open Organisation Of Lockpickers. Covers the three rules of locksport, legal considerations by jurisdiction, and responsible handling of knowledge.',
    excerpt: `Locksport is built on a foundation of trust, curiosity, and responsibility. The core rule is simple: never pick a lock you don't own, or don't have explicit written permission to pick. This isn't just legal protection — it's what keeps the community healthy and welcoming.\n\nThe sport exists because manufacturers, security researchers, and hobbyists all benefit from understanding lock vulnerabilities. But that understanding must be paired with ethical practice.\n\n**The Three Rules of Locksport**\n\n1. Never pick a lock in use.\n2. Always have written permission before picking someone else's lock.\n3. Share knowledge responsibly — teach principles, not exploits.\n\nIn most jurisdictions, owning lock picks is legal. However, carrying them in public without a legitimate reason can be considered "possession of burglary tools" in some regions. Research your local laws and always err on the side of caution and transparency.`,
    views: 34000,
    saves: 8900,
    featured: true,
  },
  {
    id: '5',
    title: 'Best Practice Locks for 2024: A Buyer\'s Guide',
    author: 'r/lockpicking community',
    sourceName: 'Reddit / Wiki',
    sourceType: 'rss',
    url: 'https://reddit.com/r/lockpicking/wiki/index',
    publishDate: '2024-01-03',
    tags: ['practice-locks', 'tools', 'padlocks'],
    contentType: 'article',
    skillLevel: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=640&q=80',
    canEmbed: false,
    readTime: '12 min',
    description: 'Community-curated guide to the best practice locks at every level and price point. From the iconic Master Lock No.3 to Abloy Protec2, with notes on what each lock teaches.',
    excerpt: `Choosing the right practice lock can make or break your early experience with locksport. Too easy and you won't learn anything; too hard and you'll get frustrated before developing the tactile feel that's essential to progress.\n\n**Beginner Tier (Under $15)**\n\n- **Master Lock No. 3** — The community's most recommended starting point. Four pins, minimal security, forgiving feedback. Perfect for learning single pin picking basics.\n- **Brinks 40mm** — Similar to the Master No. 3. Good value for picking up a few to practice on simultaneously.\n\n**Intermediate Tier ($15–$50)**\n\n- **ABUS 55/40** — Five pins, tighter tolerances, security pins. This is where you start learning to feel for spool and serrated pins.\n- **Masterlock 140** — Brass body, five pins, excellent value for the challenge it provides.\n\n**Advanced Tier ($50+)**\n\n- **Mul-T-Lock MT5+** — A serious high-security lock with interactive elements. Years of challenge for experienced pickers.\n- **Abloy Protec2** — Disc detainer mechanism, genuinely difficult. A white whale for many advanced practitioners.`,
    views: 156000,
    saves: 28000,
    featured: false,
  },
  {
    id: '6',
    title: 'Understanding Security Pins: Spools, Serrated & Mushroom',
    author: 'BosnianBill',
    channel: 'BosnianBill',
    sourceName: 'YouTube',
    sourceType: 'youtube',
    url: 'https://youtube.com/watch?v=example6',
    publishDate: '2023-04-20',
    tags: ['pin-tumblers', 'theory', 'padlocks'],
    contentType: 'video',
    skillLevel: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?w=640&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    canEmbed: true,
    duration: '27:44',
    description: 'Deep dive into how security pins work — the shapes, the feedback they give, and techniques for defeating each type. Covers spool pins, serrated pins, mushroom pins, and T-pins with visual cutaway demonstrations.',
    views: 187000,
    saves: 15300,
    featured: false,
  },
  {
    id: '7',
    title: 'Disc Detainer Lock Picking: A Complete Technical Overview',
    author: 'Deviant Ollam',
    sourceName: 'Blog / DEF CON Talk',
    sourceType: 'blog',
    url: 'https://deviants.com/disc-detainer',
    publishDate: '2023-11-30',
    tags: ['disc-detainer', 'theory', 'tools'],
    contentType: 'article',
    skillLevel: 'advanced',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&q=80',
    canEmbed: false,
    readTime: '20 min',
    description: 'Technical deep-dive into disc detainer locks, how they differ fundamentally from pin tumbler systems, the specialized tools required, and the picking methodology used by competitive locksport practitioners.',
    excerpt: `Disc detainer locks represent a fundamentally different challenge from pin tumbler systems. Rather than lifting driver pins to a shear line, you're rotating individual discs to align notches. The approach requires patience, specialized tools, and a different mental model entirely.\n\n**How Disc Detainer Mechanisms Work**\n\nEach disc in the lock has a notch cut into it. When the key is inserted, its ridges rotate each disc to the precise angle where the notch aligns, creating a continuous channel for the sidebar to travel through and allowing the plug to rotate.\n\nWithout the key, the discs are at random positions, and the sidebar is blocked by the disc faces.\n\n**Picking Approach**\n\nThe standard approach uses a specialized disc detainer pick — a long, curved tool that reaches the discs through the keyway while applying rotational tension. You feel for false gates versus true gates through the tension tool.`,
    views: 67000,
    saves: 11200,
    featured: false,
  },
  {
    id: '8',
    title: 'The Absolute Beginner\'s First Pick: A Step-by-Step Walkthrough',
    author: 'LockNoob',
    channel: 'LockNoob',
    sourceName: 'YouTube',
    sourceType: 'youtube',
    url: 'https://youtube.com/watch?v=example8',
    publishDate: '2024-02-14',
    tags: ['practice-locks', 'pin-tumblers', 'tools'],
    contentType: 'video',
    skillLevel: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1587573088743-31a2d2671ced?w=640&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    canEmbed: true,
    duration: '41:22',
    description: 'Designed specifically for someone who has never touched a lock pick before. Real-time picking session with narration of every sensation, mistake, and adjustment. The most patient beginner tutorial available.',
    views: 312000,
    saves: 41000,
    featured: true,
  },
  {
    id: '9',
    title: 'Impressioning: The Art of Making Keys Without the Original',
    author: 'Han Fey',
    sourceName: 'Locksport International',
    sourceType: 'blog',
    url: 'https://locksport.com/impressioning',
    publishDate: '2023-07-19',
    tags: ['impressioning', 'theory', 'tools'],
    contentType: 'article',
    skillLevel: 'advanced',
    thumbnail: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=640&q=80',
    canEmbed: false,
    readTime: '16 min',
    description: 'Impressioning is one of the most elegant skills in locksport: creating a working key by reading the marks left on a blank. This guide covers the technique, tools, materials, and patience required.',
    excerpt: `Impressioning sits at the intersection of artisanship and analytical thinking. You're not picking the lock — you're making the key. The process involves inserting a soft key blank, applying rotation and vertical pressure, removing the blank, and reading the bright stress marks left by the pin stacks. File at the marks, repeat. Eventually, you have a working key.\n\nThe appeal is both forensic and meditative: you're decoding the lock's internal geometry through physical evidence rather than tactile feedback in real time.`,
    views: 45000,
    saves: 9800,
    featured: false,
  },
  {
    id: '10',
    title: 'Covert Entry Methods: What Security Professionals Know',
    author: 'Deviant Ollam',
    channel: 'Deviant Ollam',
    sourceName: 'YouTube / DEF CON',
    sourceType: 'youtube',
    url: 'https://youtube.com/watch?v=example10',
    publishDate: '2023-08-05',
    tags: ['bypass', 'theory', 'legal-basics'],
    contentType: 'video',
    skillLevel: 'advanced',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=640&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    canEmbed: true,
    duration: '58:11',
    description: 'Deviant Ollam\'s DEF CON talk on physical security from a red team perspective. Covers bypass methodologies used in authorized security assessments, with strong emphasis on legal and ethical frameworks.',
    views: 890000,
    saves: 67000,
    featured: false,
  },
  {
    id: '11',
    title: 'Building Your First Lock Pick Set: Tools & What They Do',
    author: 'Schuyler Towne',
    sourceName: 'Medium',
    sourceType: 'medium',
    url: 'https://medium.com/locksport/first-pick-set',
    publishDate: '2023-05-12',
    tags: ['tools', 'practice-locks'],
    contentType: 'article',
    skillLevel: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=640&q=80',
    canEmbed: false,
    readTime: '10 min',
    description: 'A practical guide to assembling or buying your first lock pick set. Covers hook picks, diamonds, rakes, tension tools, and what to actually use for each type of lock. Written by a certified master locksmith and locksport historian.',
    excerpt: `The lock pick market is flooded with kits ranging from $5 to $500. Most beginners either buy too cheap (flimsy steel that bends on the first lock) or too expensive (professional sets with tools they won't need for years).\n\n**The Essential Starter Kit**\n\nYou actually need very few tools to start:\n\n- **One short hook** (or "half diamond") — your primary SPP tool\n- **One snake or city rake** — for raking\n- **Two tension tools** — a top-of-keyway (TOK) and bottom-of-keyway (BOK) tension bar\n\nThat's it. Four tools. Everything else can wait until you understand what you're missing.\n\n**Material Matters**\n\nLook for 0.025" or 0.03" steel thickness. Cheaper sets use thin steel that snaps inside locks — a frustrating and sometimes destructive experience for both you and the lock.`,
    views: 78000,
    saves: 14500,
    featured: false,
  },
  {
    id: '12',
    title: 'Tubular Lock Picking: Techniques & Tools Explained',
    author: 'The Lock Picking Lawyer',
    channel: 'LockPickingLawyer',
    sourceName: 'YouTube',
    sourceType: 'youtube',
    url: 'https://youtube.com/watch?v=example12',
    publishDate: '2024-03-01',
    tags: ['tubular', 'tools', 'theory'],
    contentType: 'video',
    skillLevel: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=640&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    canEmbed: true,
    duration: '19:33',
    description: 'Tubular locks appear on bike locks, vending machines, and notebook locks. The LPL explains the mechanism, the tubular pick tool, and the manual picking approach for when you don\'t have the specialized tool.',
    views: 445000,
    saves: 23000,
    featured: false,
  },
];

export const collections = [
  {
    id: 'start-here',
    title: 'Start Here',
    description: 'The essential beginner path. Zero assumptions, full clarity.',
    resourceIds: ['1', '8', '4', '11', '5'],
    color: '#4BAF7E',
    icon: '🔰',
  },
  {
    id: 'theory-deep-dive',
    title: 'Theory Deep Dive',
    description: 'Understand the mechanics before your hands do.',
    resourceIds: ['2', '6', '7', '9'],
    color: '#6B7FD4',
    icon: '🔬',
  },
  {
    id: 'security-perspective',
    title: 'Security Perspective',
    description: 'What professionals know about physical security.',
    resourceIds: ['10', '4', '2'],
    color: '#D46B6B',
    icon: '🛡️',
  },
];

export function filterResources(
  items: Resource[],
  filters: {
    contentType?: ContentType;
    skillLevel?: SkillLevel;
    tags?: TopicTag[];
    sourceType?: SourceType;
    search?: string;
    sortBy?: 'newest' | 'oldest' | 'most-viewed' | 'most-saved';
  }
): Resource[] {
  let result = [...items];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q))
    );
  }

  if (filters.contentType) {
    result = result.filter((r) => r.contentType === filters.contentType);
  }

  if (filters.skillLevel) {
    result = result.filter((r) => r.skillLevel === filters.skillLevel);
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((r) => filters.tags!.some((t) => r.tags.includes(t)));
  }

  if (filters.sourceType) {
    result = result.filter((r) => r.sourceType === filters.sourceType);
  }

  switch (filters.sortBy) {
    case 'newest':
      result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      break;
    case 'oldest':
      result.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
      break;
    case 'most-viewed':
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;
    case 'most-saved':
      result.sort((a, b) => (b.saves || 0) - (a.saves || 0));
      break;
    default:
      result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  return result;
}
