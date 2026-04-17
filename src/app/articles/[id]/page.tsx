'use client';
import Link from 'next/link';
import { useResource } from '@/lib/hooks';
import { TOPIC_TAGS } from '@/lib/data';
import { Bookmark, Share2, Eye, Calendar, ExternalLink, Clock, ChevronLeft } from 'lucide-react';
import { ResourceCard } from '@/components/ResourceCard';
import { CardSkeleton } from '@/components/LoadingStates';
import { useState } from 'react';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { resource, related, loading, error } = useResource(params.id);
  const [saved, setSaved] = useState(false);
  const [read, setRead] = useState(false);

  if (loading) return (
    <div style={{ paddingTop: '80px', maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>
        <div>
          <div className="skeleton" style={{ aspectRatio: '2/1', borderRadius: '12px', marginBottom: '28px' }} />
          <div className="skeleton" style={{ height: '36px', width: '80%', borderRadius: '6px', marginBottom: '12px' }} />
          <div className="skeleton" style={{ height: '16px', width: '50%', borderRadius: '4px', marginBottom: '24px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[1,2,3,4,5].map(i => <div key={i} className="skeleton" style={{ height: '14px', width: `${90-i*5}%`, borderRadius: '4px' }} />)}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1,2,3].map(i => <CardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );

  if (error || !resource) return (
    <div style={{ paddingTop: '100px', maxWidth: '1280px', margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Article not found</h2>
      <Link href="/articles" style={{ color: 'var(--accent)' }}>← Back to Articles</Link>
    </div>
  );

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 0' }}>
        <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <ChevronLeft size={15} /> Back to Articles
        </Link>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: '48px', alignItems: 'flex-start' }} className="article-grid">
        <article>
          {resource.thumbnail && (
            <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '2/1', marginBottom: '32px', background: 'var(--surface)' }}>
              <img src={resource.thumbnail} alt={resource.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: resource.skillLevel === 'beginner' ? 'rgba(90,175,122,0.12)' : resource.skillLevel === 'intermediate' ? 'var(--accent-dim)' : 'rgba(201,107,107,0.12)', color: resource.skillLevel === 'beginner' ? 'var(--green)' : resource.skillLevel === 'intermediate' ? 'var(--accent)' : 'var(--red)' }}>{resource.skillLevel}</span>
            <span style={{ padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{resource.sourceName}</span>
            {resource.readTime && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}><Clock size={10} /> {resource.readTime} read</span>}
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{resource.title}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', flexShrink: 0 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)' }}>{resource.author.charAt(0)}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{resource.author}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{resource.sourceName}</p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}><Calendar size={13} />{new Date(resource.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              {(resource.views ?? 0) > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}><Eye size={13} />{(resource.views ?? 0).toLocaleString()}</span>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <button onClick={() => setSaved(!saved)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '6px', border: `1px solid ${saved ? 'var(--accent)' : 'var(--border-2)'}`, background: saved ? 'var(--accent-dim)' : 'var(--surface)', color: saved ? 'var(--accent)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease' }}>
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}
            </button>
            <button onClick={() => setRead(!read)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '6px', border: `1px solid ${read ? 'var(--green)' : 'var(--border-2)'}`, background: read ? 'var(--green-dim)' : 'var(--surface)', color: read ? 'var(--green)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease' }}>
              {read ? '✓ Read' : 'Mark as Read'}
            </button>
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '6px', border: '1px solid var(--border-2)', background: 'var(--surface)', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>
              <Share2 size={14} /> Share
            </button>
          </div>

          {/* Summary */}
          <div style={{ padding: '20px 24px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', marginBottom: '36px', borderLeft: '3px solid var(--blue)' }}>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Summary</p>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>{resource.description}</p>
          </div>

          {/* Excerpt / content */}
          {resource.excerpt && (
            <div style={{ marginBottom: '36px', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.9 }}>
              {resource.excerpt.split('\n\n').filter(Boolean).map((para: string, i: number) => (
                <p key={i} style={{ marginBottom: '16px' }}>{para}</p>
              ))}
            </div>
          )}

          {/* Read original CTA */}
          <div style={{ padding: '20px 24px', borderRadius: '8px', border: '1px dashed var(--border-2)', background: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 600 }}>Read the full article on {resource.sourceName}</p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>This is a curated excerpt. Full content lives at the original source.</p>
            </div>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '6px', background: 'var(--accent)', color: '#0E0D0B', fontWeight: 600, fontSize: '0.87rem' }}>
              Read Full Article <ExternalLink size={13} />
            </a>
          </div>

          {/* Tags */}
          <div>
            <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>Tags</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {resource.tags.map((tag: any) => (
                <Link key={tag} href={`/topics/${tag}`} style={{ padding: '5px 12px', borderRadius: '3px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  {TOPIC_TAGS[tag as keyof typeof TOPIC_TAGS]?.label || tag}
                </Link>
              ))}
            </div>
          </div>
        </article>

        <aside>
          <h3 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>Related Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {related.map((r: any) => <ResourceCard key={r.id} resource={r} variant="compact" />)}
            {related.length === 0 && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No related resources yet.</p>}
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) { .article-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
