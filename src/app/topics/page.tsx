'use client';
import Link from 'next/link';
import { TOPIC_TAGS, TopicTag } from '@/lib/data';
import { useResources } from '@/lib/hooks';
import { ArrowRight } from 'lucide-react';

const topicIcons: Record<TopicTag, string> = {
  'padlocks': '🔒',
  'pin-tumblers': '🔩',
  'raking': '⚡',
  'bypass': '🔓',
  'legal-basics': '⚖️',
  'tools': '🛠',
  'practice-locks': '🎯',
  'theory': '📐',
  'disc-detainer': '💿',
  'tubular': '🔬',
  'wafer-locks': '🪣',
  'impressioning': '🗝️',
};

export default function TopicsPage() {
  const { resources, loading } = useResources({ sortBy: 'newest' });
  const tagEntries = Object.entries(TOPIC_TAGS) as [TopicTag, { label: string; color: string }][];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 80px' }}>
      <div style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>— Browse by subject</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>All Topics</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
          {loading ? 'Loading live counts…' : `${resources.length} resources across ${tagEntries.length} topic categories`}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {tagEntries.map(([tag, { label, color }], i) => {
          const tagResources = resources.filter(r => r.tags.includes(tag));
          const videoCount = tagResources.filter(r => r.contentType === 'video').length;
          const articleCount = tagResources.filter(r => r.contentType === 'article').length;
          const total = tagResources.length;

          return (
            <Link
              key={tag}
              href={`/topics/${tag}`}
              style={{
                display: 'block', padding: '24px',
                borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
                background: 'var(--bg-card)', transition: 'all 0.2s ease',
                animation: `fadeUp 0.4s ease ${Math.min(i, 11) * 0.05}s both`,
                position: 'relative' as const, overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = color + '55';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${color}18`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: '2px', background: color, opacity: 0.7 }} />
              <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{topicIcons[tag]}</div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>{label}</h2>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {loading ? '…' : `▶ ${videoCount}`} videos
                </span>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {loading ? '…' : `📄 ${articleCount}`} articles
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {loading ? '…' : total} total
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color }}>
                  Explore <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
