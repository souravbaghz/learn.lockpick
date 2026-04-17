'use client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TOPIC_TAGS, TopicTag } from '@/lib/data';
import { useResources } from '@/lib/hooks';
import { ResourceCard } from '@/components/ResourceCard';
import { LoadingGrid } from '@/components/LoadingStates';
import { ChevronLeft } from 'lucide-react';

const topicDescriptions: Partial<Record<TopicTag, string>> = {
  'pin-tumblers': 'The most common lock mechanism in the world. Understanding pin tumblers is the foundation of locksport.',
  'raking': 'A fast technique that uses rapid motion to open pin tumbler locks. Great for beginners.',
  'theory': 'The mechanical principles behind why locks can be picked, from shear lines to false sets.',
  'tools': 'A guide to picks, tension tools, and what each one is actually for.',
  'padlocks': 'Portable, versatile, and often surprisingly vulnerable. The classic target for locksport practice.',
  'bypass': 'Defeating a lock without picking it — understanding weaknesses in lock design.',
  'legal-basics': 'Jurisdictional laws, community ethics, and responsible handling of locksport knowledge.',
  'practice-locks': 'The best locks for learning at every skill level.',
  'disc-detainer': 'A fundamentally different mechanism from pin tumblers, requiring specialized tools.',
  'tubular': 'Found on bike locks and vending machines. A unique circular keyway.',
  'wafer-locks': 'Simple, common in filing cabinets. Often the first lock people pick accidentally.',
  'impressioning': 'The art of creating a working key by reading stress marks on a blank.',
};

export default function TopicPage({ params }: { params: { tag: string } }) {
  const tag = params.tag as TopicTag;
  if (!TOPIC_TAGS[tag]) notFound();

  const { label, color } = TOPIC_TAGS[tag];
  const { resources: videos, loading: vLoading } = useResources({ contentType: 'video', tags: [tag] });
  const { resources: articles, loading: aLoading } = useResources({ contentType: 'article', tags: [tag] });

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 0' }}>
        <Link href="/topics" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <ChevronLeft size={15} /> All Topics
        </Link>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', padding: '60px 24px', borderBottom: '1px solid var(--border)', marginBottom: '56px', background: 'var(--bg-2)' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 80% at 30% 50%, ${color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <div style={{ width: '4px', height: '48px', background: color, borderRadius: '2px', marginBottom: '20px' }} />
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>{label}</h1>
          {topicDescriptions[tag] && <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '560px', fontWeight: 300, lineHeight: 1.7, marginBottom: '20px' }}>{topicDescriptions[tag]}</p>}
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{vLoading ? '...' : videos.length} videos</span>
            <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{aLoading ? '...' : articles.length} articles</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        {(vLoading || videos.length > 0) && (
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>▶</span> Videos
            </h2>
            {vLoading ? <LoadingGrid count={3} /> : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {videos.map((r, i) => <div key={r.id} style={{ animation: `fadeUp 0.4s ease ${i*0.06}s both` }}><ResourceCard resource={r} /></div>)}
              </div>
            )}
          </section>
        )}
        {(aLoading || articles.length > 0) && (
          <section>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>📄</span> Articles & Guides
            </h2>
            {aLoading ? <LoadingGrid count={3} /> : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {articles.map((r, i) => <div key={r.id} style={{ animation: `fadeUp 0.4s ease ${i*0.06}s both` }}><ResourceCard resource={r} /></div>)}
              </div>
            )}
          </section>
        )}
        {!vLoading && !aLoading && videos.length === 0 && articles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>No resources fetched yet for this topic.</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Content is auto-tagged from titles. Check back as more content is indexed.</p>
            <Link href="/explore" style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>Browse all resources →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
