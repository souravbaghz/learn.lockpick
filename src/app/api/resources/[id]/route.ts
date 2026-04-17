import { NextRequest, NextResponse } from 'next/server';
import { aggregateAllContent } from '@/lib/aggregator';

let cache: { data: any[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

type Params = { id: string };

export async function GET(req: NextRequest, context: { params: Promise<Params> }) {
  const { id } = await context.params;
  const now = Date.now();
  if (!cache || now - cache.fetchedAt > CACHE_TTL_MS) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const fresh = await aggregateAllContent(apiKey || undefined);
    cache = { data: fresh, fetchedAt: now };
  }

  const resource = cache.data.find(r => r.id === id);
  if (!resource) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const related = cache.data
    .filter(r => r.id !== id && (r.tags.some((t: string) => resource.tags.includes(t)) || r.skillLevel === resource.skillLevel))
    .slice(0, 6);

  return NextResponse.json({ resource, related });
}
