'use client';
import Link from 'next/link';
import { useResource } from '@/lib/hooks';
import { TOPIC_TAGS } from '@/lib/data';
import { Bookmark, Share2, Eye, Calendar, ExternalLink, Play, ChevronLeft } from 'lucide-react';
import { ResourceCard } from '@/components/ResourceCard';
import { CardSkeleton } from '@/components/LoadingStates';
import { useState } from 'react';

export default function VideoPage({ params }: { params: { id: string } }) {
  const { resource, related, loading, error } = useResource(params.id);
  const [saved, setSaved] = useState(false);
  const [watched, setWatched] = useState(false);

  if (loading) return (
    <div style={{ paddingTop: '100px', maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
        <div>
          <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: '12px', marginBottom: '24px' }} />
          <div className="skeleton" style={{ height: '32px', width: '70%', borderRadius: '6px', marginBottom: '12px' }} />
          <div className="skeleton" style={{ height: '16px', width: '40%', borderRadius: '4px', marginBottom: '24px' }} />
          <div className="skeleton" style={{ height: '100px', borderRadius: '8px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1,2,3,4].map(i => <CardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );

  if (error || !resource) return (
    <div style={{ paddingTop: '100px', maxWidth: '1280px', margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Video not found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>This resource may have been removed or the URL is incorrect.</p>
      <Link href="/videos" style={{ color: 'var(--accent)' }}>← Back to Videos</Link>
    </div>
  );

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px 0' }}>
        <Link href="/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <ChevronLeft size={15} /> Back to Videos
        </Link>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: '40px', alignItems: 'flex-start' }} className="detail-grid">
        <div>
          {/* Player */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#000', aspectRatio: '16/9', marginBottom: '28px', boxShadow: 'var(--shadow-lg)' }}>
            {resource.canEmbed && resource.embedUrl ? (
              <iframe src={resource.embedUrl} title={resource.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: '100%', height: '100%', border: 'none' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', position: 'relative', backgroundImage: `url(${resource.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <Play size={48} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
                  <p style={{ color: 'white', fontWeight: 500, marginBottom: '16px' }}>Video on {resource.sourceName}</p>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '6px', background: 'var(--accent)', color: '#0E0D0B', fontWeight: 600, fontSize: '0.9rem' }}>
                    Watch on {resource.sourceName} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', background: resource.skillLevel === 'beginner' ? 'rgba(90,175,122,0.12)' : resource.skillLevel === 'intermediate' ? 'var(--accent-dim)' : 'rgba(201,107,107,0.12)', color: resource.skillLevel === 'beginner' ? 'var(--green)' : resource.skillLevel === 'intermediate' ? 'var(--accent)' : 'var(--red)' }}>{resource.skillLevel}</span>
            <span style={{ padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{resource.sourceType.toUpperCase()}</span>
            {resource.duration && <span style={{ padding: '3px 10px', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{resource.duration}</span>}
          </div>

          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{resource.title}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
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
              {(resource.views ?? 0) > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--text-muted)' }}><Eye size={14} />{(resource.views ?? 0).toLocaleString()} views</span>}
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--text-muted)' }}><Calendar size={14} />{new Date(resource.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <button onClick={() => setSaved(!saved)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '6px', border: `1px solid ${saved ? 'var(--accent)' : 'var(--border-2)'}`, background: saved ? 'var(--accent-dim)' : 'var(--surface)', color: saved ? 'var(--accent)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease' }}>
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}
            </button>
            <button onClick={() => setWatched(!watched)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '6px', border: `1px solid ${watched ? 'var(--green)' : 'var(--border-2)'}`, background: watched ? 'var(--green-dim)' : 'var(--surface)', color: watched ? 'var(--green)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease' }}>
              {watched ? '✓ Watched' : 'Mark Watched'}
            </button>
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '6px', border: '1px solid var(--border-2)', background: 'var(--surface)', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>
              <Share2 size={14} /> Share
            </button>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', borderRadius: '6px', border: '1px solid var(--border-2)', background: 'var(--surface)', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
              <ExternalLink size={14} /> Open Original
            </a>
          </div>

          {/* Description */}
          <div style={{ padding: '24px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-card)', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>About this video</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{resource.description}</p>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {resource.tags.map((tag: any) => (
              <Link key={tag} href={`/topics/${tag}`} style={{ padding: '5px 12px', borderRadius: '3px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', transition: 'all 0.15s ease' }}>
                {TOPIC_TAGS[tag as keyof typeof TOPIC_TAGS]?.label || tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <h3 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>Related Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {related.map((r: any) => <ResourceCard key={r.id} resource={r} variant="compact" />)}
            {related.length === 0 && !loading && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No related resources yet.</p>}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
