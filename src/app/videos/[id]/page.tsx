'use client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { resources, TOPIC_TAGS } from '@/lib/data';
import { Bookmark, Share2, Eye, Calendar, ExternalLink, Play, ChevronLeft } from 'lucide-react';
import { ResourceCard } from '@/components/ResourceCard';
import { useState } from 'react';

export default function VideoPage({ params }: { params: { id: string } }) {
  const resource = resources.find(r => r.id === params.id && r.contentType === 'video');
  if (!resource) notFound();

  const [saved, setSaved] = useState(false);
  const [watched, setWatched] = useState(false);

  const related = resources.filter(r =>
    r.id !== resource.id &&
    (r.tags.some(t => resource.tags.includes(t)) || r.skillLevel === resource.skillLevel)
  ).slice(0, 4);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Back */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 0' }}>
        <Link href="/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'color 0.15s ease' }}>
          <ChevronLeft size={15} /> Back to Videos
        </Link>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '40px', alignItems: 'start' }}>
        {/* Main content */}
        <div>
          {/* Video player */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#000', aspectRatio: '16/9', marginBottom: '28px', boxShadow: 'var(--shadow-lg)' }}>
            {resource.canEmbed && resource.embedUrl ? (
              <iframe
                src={resource.embedUrl}
                title={resource.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', position: 'relative', backgroundImage: `url(${resource.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <Play size={48} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
                  <p style={{ color: 'white', fontWeight: 500, marginBottom: '16px' }}>Video available on {resource.sourceName}</p>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 'var(--radius)',
                    background: 'var(--accent)', color: '#0E0D0B', fontWeight: 600, fontSize: '0.9rem',
                  }}>
                    Watch on {resource.sourceName} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Title + meta */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{
                padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
                fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                background: resource.skillLevel === 'beginner' ? 'rgba(90,175,122,0.12)' : resource.skillLevel === 'intermediate' ? 'var(--accent-dim)' : 'rgba(201,107,107,0.12)',
                color: resource.skillLevel === 'beginner' ? 'var(--green)' : resource.skillLevel === 'intermediate' ? 'var(--accent)' : 'var(--red)',
                border: `1px solid ${resource.skillLevel === 'beginner' ? 'rgba(90,175,122,0.2)' : resource.skillLevel === 'intermediate' ? 'rgba(201,168,76,0.2)' : 'rgba(201,107,107,0.2)'}`,
              }}>
                {resource.skillLevel}
              </span>
              <span style={{ padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                {resource.sourceType.toUpperCase()}
              </span>
              {resource.duration && (
                <span style={{ padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                  {resource.duration}
                </span>
              )}
            </div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
              {resource.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)' }}>{resource.author.charAt(0)}</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>{resource.author}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{resource.sourceName}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginLeft: 'auto' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <Eye size={14} />{(resource.views || 0).toLocaleString()} views
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <Calendar size={14} />{new Date(resource.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <button onClick={() => setSaved(!saved)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px',
              borderRadius: 'var(--radius)', border: `1px solid ${saved ? 'var(--accent)' : 'var(--border-2)'}`,
              background: saved ? 'var(--accent-dim)' : 'var(--surface)',
              color: saved ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease',
            }}>
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save'}
            </button>
            <button onClick={() => setWatched(!watched)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px',
              borderRadius: 'var(--radius)', border: `1px solid ${watched ? 'var(--green)' : 'var(--border-2)'}`,
              background: watched ? 'var(--green-dim)' : 'var(--surface)',
              color: watched ? 'var(--green)' : 'var(--text-secondary)',
              fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease',
            }}>
              {watched ? '✓ Watched' : 'Mark as Watched'}
            </button>
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px',
              borderRadius: 'var(--radius)', border: '1px solid var(--border-2)',
              background: 'var(--surface)', color: 'var(--text-secondary)',
              fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
            }}>
              <Share2 size={14} /> Share
            </button>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px',
              borderRadius: 'var(--radius)', border: '1px solid var(--border-2)',
              background: 'var(--surface)', color: 'var(--text-secondary)',
              fontSize: '0.85rem', fontWeight: 500,
            }}>
              <ExternalLink size={14} /> Open Original
            </a>
          </div>

          {/* Description */}
          <div style={{ padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--bg-card)', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>About this video</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{resource.description}</p>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {resource.tags.map(tag => (
              <Link key={tag} href={`/topics/${tag}`} style={{
                padding: '5px 12px', borderRadius: '3px', border: '1px solid var(--border)',
                background: 'var(--surface)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)', transition: 'all 0.15s ease',
              }}>
                {TOPIC_TAGS[tag]?.label || tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Related sidebar */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>Related Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {related.map(r => <ResourceCard key={r.id} resource={r} variant="compact" />)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: minmax(0, 1fr) 340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
