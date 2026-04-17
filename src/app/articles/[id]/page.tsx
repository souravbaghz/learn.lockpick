'use client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { resources, TOPIC_TAGS } from '@/lib/data';
import { Bookmark, Share2, Eye, Calendar, ExternalLink, Clock, ChevronLeft } from 'lucide-react';
import { ResourceCard } from '@/components/ResourceCard';
import { useState } from 'react';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const resource = resources.find(r => r.id === params.id && r.contentType === 'article');
  if (!resource) notFound();

  const [saved, setSaved] = useState(false);
  const [read, setRead] = useState(false);

  const related = resources.filter(r =>
    r.id !== resource.id &&
    (r.tags.some(t => resource.tags.includes(t)) || r.skillLevel === resource.skillLevel)
  ).slice(0, 4);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 0' }}>
        <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'color 0.15s ease' }}>
          <ChevronLeft size={15} /> Back to Articles
        </Link>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px', alignItems: 'flex-start' }}>
        {/* Article main */}
        <article>
          {/* Hero image */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '2/1', marginBottom: '32px' }}>
            <img src={resource.thumbnail} alt={resource.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              background: resource.skillLevel === 'beginner' ? 'rgba(90,175,122,0.12)' : resource.skillLevel === 'intermediate' ? 'var(--accent-dim)' : 'rgba(201,107,107,0.12)',
              color: resource.skillLevel === 'beginner' ? 'var(--green)' : resource.skillLevel === 'intermediate' ? 'var(--accent)' : 'var(--red)',
            }}>
              {resource.skillLevel}
            </span>
            <span style={{ padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              {resource.sourceName}
            </span>
            {resource.readTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                <Clock size={10} /> {resource.readTime} read
              </span>
            )}
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            {resource.title}
          </h1>

          {/* Author + date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', flexShrink: 0 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)' }}>{resource.author.charAt(0)}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{resource.author}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{resource.sourceName}</p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Calendar size={13} />{new Date(resource.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Eye size={13} />{(resource.views || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <button onClick={() => setSaved(!saved)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px',
              borderRadius: 'var(--radius)', border: `1px solid ${saved ? 'var(--accent)' : 'var(--border-2)'}`,
              background: saved ? 'var(--accent-dim)' : 'var(--surface)',
              color: saved ? 'var(--accent)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease',
            }}>
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}
            </button>
            <button onClick={() => setRead(!read)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px',
              borderRadius: 'var(--radius)', border: `1px solid ${read ? 'var(--green)' : 'var(--border-2)'}`,
              background: read ? 'var(--green-dim)' : 'var(--surface)',
              color: read ? 'var(--green)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease',
            }}>
              {read ? '✓ Read' : 'Mark as Read'}
            </button>
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--border-2)', background: 'var(--surface)', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
            }}>
              <Share2 size={14} /> Share
            </button>
          </div>

          {/* Summary */}
          <div style={{ padding: '20px 24px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-card)', marginBottom: '36px', borderLeft: '3px solid var(--blue)' }}>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Summary</p>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>{resource.description}</p>
          </div>

          {/* Article content */}
          {resource.excerpt ? (
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                {resource.excerpt.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return <h2 key={i} style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '28px 0 12px', letterSpacing: '-0.01em' }}>{para.replace(/\*\*/g, '')}</h2>;
                  }
                  if (para.startsWith('- ') || para.startsWith('* ')) {
                    const items = para.split('\n').filter(l => l.startsWith('- ') || l.startsWith('* '));
                    return (
                      <ul key={i} style={{ paddingLeft: '24px', margin: '0 0 20px' }}>
                        {items.map((item, j) => {
                          const text = item.replace(/^[-*] /, '');
                          const parts = text.split(/(\*\*.*?\*\*)/);
                          return (
                            <li key={j} style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>
                              {parts.map((p, k) => p.startsWith('**') ? <strong key={k} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p.replace(/\*\*/g, '')}</strong> : p)}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                  const parts = para.split(/(\*\*.*?\*\*)/);
                  return (
                    <p key={i} style={{ marginBottom: '20px', color: 'var(--text-secondary)', lineHeight: 1.9 }}>
                      {parts.map((p, k) => p.startsWith('**') ? <strong key={k} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p.replace(/\*\*/g, '')}</strong> : p)}
                    </p>
                  );
                })}
              </div>
              <div style={{ padding: '20px 24px', borderRadius: 'var(--radius)', border: '1px dashed var(--border-2)', background: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 600 }}>Read the full article on {resource.sourceName}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>This is a curated excerpt. The complete article is on the original source.</p>
                </div>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: 'var(--radius)',
                  background: 'var(--accent)', color: '#0E0D0B', fontWeight: 600, fontSize: '0.87rem',
                }}>
                  Read Full Article <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', border: '1px dashed var(--border-2)', borderRadius: 'var(--radius-lg)', marginBottom: '36px' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Full content available on {resource.sourceName}</p>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 'var(--radius)',
                background: 'var(--accent)', color: '#0E0D0B', fontWeight: 600, fontSize: '0.9rem',
              }}>
                Read on {resource.sourceName} <ExternalLink size={15} />
              </a>
            </div>
          )}

          {/* Tags */}
          <div>
            <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>Tags</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {resource.tags.map(tag => (
                <Link key={tag} href={`/topics/${tag}`} style={{
                  padding: '5px 12px', borderRadius: '3px', border: '1px solid var(--border)',
                  background: 'var(--surface)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', transition: 'all 0.15s ease',
                }}>
                  {TOPIC_TAGS[tag]?.label || tag}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside>
          <h3 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>Related Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {related.map(r => <ResourceCard key={r.id} resource={r} variant="compact" />)}
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: minmax(0, 1fr) 300px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
