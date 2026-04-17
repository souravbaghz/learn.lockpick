'use client';
import Link from 'next/link';
import { Bookmark, Clock, Eye, Play, FileText, ExternalLink } from 'lucide-react';
import { Resource, TOPIC_TAGS } from '@/lib/data';
import { useState } from 'react';

function formatNumber(n?: number) {
  if (!n) return '0';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

function SkillBadge({ level }: { level: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    beginner: { bg: 'rgba(90,175,122,0.12)', text: '#5AAF7A' },
    intermediate: { bg: 'rgba(201,168,76,0.12)', text: '#C9A84C' },
    advanced: { bg: 'rgba(201,107,107,0.12)', text: '#C96B6B' },
  };
  const c = colors[level] || colors.beginner;
  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: '3px',
      fontSize: '0.68rem',
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase' as const,
      background: c.bg,
      color: c.text,
      border: `1px solid ${c.text}33`,
    }}>
      {level}
    </span>
  );
}

interface ResourceCardProps {
  resource: Resource;
  variant?: 'default' | 'featured' | 'compact';
}

export function ResourceCard({ resource, variant = 'default' }: ResourceCardProps) {
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  const href = resource.contentType === 'video'
    ? `/videos/${resource.id}`
    : `/articles/${resource.id}`;

  if (variant === 'compact') {
    return (
      <Link href={href} style={{
        display: 'flex',
        gap: '12px',
        padding: '12px',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        transition: 'all 0.2s ease',
        alignItems: 'flex-start',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-2)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src={imgError ? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=60' : resource.thumbnail}
            alt={resource.title}
            onError={() => setImgError(true)}
            style={{ width: '80px', height: '54px', objectFit: 'cover', borderRadius: '4px', background: 'var(--surface)' }}
          />
          {resource.contentType === 'video' && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.4)', borderRadius: '4px',
            }}>
              <Play size={12} fill="white" color="white" />
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)', margin: '0 0 4px', lineHeight: 1.3 }} className="line-clamp-2">
            {resource.title}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{resource.author}</p>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <div style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      >
        <Link href={href}>
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
            <img
              src={imgError ? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80' : resource.thumbnail}
              alt={resource.title}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            {resource.contentType === 'video' && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(201,168,76,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}>
                  <Play size={20} fill="#0E0D0B" color="#0E0D0B" style={{ marginLeft: '3px' }} />
                </div>
              </div>
            )}
            {resource.duration && (
              <div style={{
                position: 'absolute', bottom: '10px', right: '10px',
                background: 'rgba(0,0,0,0.75)', padding: '2px 7px', borderRadius: '3px',
                fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'white',
              }}>
                {resource.duration}
              </div>
            )}
            <div style={{
              position: 'absolute', top: '10px', left: '10px',
              background: 'rgba(201,168,76,0.9)', padding: '2px 8px', borderRadius: '3px',
              fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0E0D0B',
            }}>
              Featured
            </div>
          </div>
        </Link>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center' }}>
            <SkillBadge level={resource.skillLevel} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {resource.sourceType.toUpperCase()}
            </span>
          </div>
          <Link href={href}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }} className="line-clamp-2">
              {resource.title}
            </h3>
          </Link>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }} className="line-clamp-2">
            {resource.description}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--accent)' }}>
                  {resource.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{resource.author}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Eye size={12} />{formatNumber(resource.views)}
              </span>
              <button
                onClick={e => { e.preventDefault(); setSaved(!saved); }}
                style={{
                  width: '28px', height: '28px', borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)', background: saved ? 'var(--accent-dim)' : 'transparent',
                  color: saved ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card
  return (
    <div style={{
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)',
      background: 'var(--bg-card)',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--border-2)';
      e.currentTarget.style.transform = 'translateY(-1px)';
      e.currentTarget.style.boxShadow = 'var(--shadow)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <Link href={href}>
        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--surface)' }}>
          <img
            src={imgError ? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70' : resource.thumbnail}
            alt={resource.title}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {resource.contentType === 'video' && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transition: 'opacity 0.2s ease',
            }}
            className="play-overlay"
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(201,168,76,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={16} fill="#0E0D0B" color="#0E0D0B" style={{ marginLeft: '2px' }} />
              </div>
            </div>
          )}
          <div style={{
            position: 'absolute', top: '8px', left: '8px',
            padding: '2px 6px', borderRadius: '3px',
            background: resource.contentType === 'video' ? 'rgba(201,168,76,0.85)' : 'rgba(107,142,212,0.85)',
            display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0E0D0B',
          }}>
            {resource.contentType === 'video' ? <Play size={9} fill="#0E0D0B" /> : <FileText size={9} />}
            {resource.contentType}
          </div>
          {resource.duration && (
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px',
              background: 'rgba(0,0,0,0.75)', padding: '2px 6px', borderRadius: '3px',
              fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'white',
            }}>
              {resource.duration}
            </div>
          )}
          {resource.readTime && (
            <div style={{
              position: 'absolute', bottom: '8px', right: '8px',
              background: 'rgba(0,0,0,0.75)', padding: '2px 6px', borderRadius: '3px',
              fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'white',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <Clock size={10} />{resource.readTime}
            </div>
          )}
        </div>
      </Link>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', alignItems: 'center', flexWrap: 'wrap' as const }}>
          <SkillBadge level={resource.skillLevel} />
          {resource.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              padding: '2px 7px', borderRadius: '3px',
              fontSize: '0.67rem', fontFamily: 'var(--font-mono)',
              background: 'var(--surface)', color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              letterSpacing: '0.04em',
            }}>
              {TOPIC_TAGS[tag]?.label || tag}
            </span>
          ))}
        </div>
        <Link href={href}>
          <h3 style={{
            fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px',
            lineHeight: 1.35, color: 'var(--text-primary)',
            transition: 'color 0.15s ease',
          }}
          className="line-clamp-2 hover-accent"
          >
            {resource.title}
          </h3>
        </Link>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }} className="line-clamp-2">
          {resource.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{resource.author}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Eye size={11} />{formatNumber(resource.views)}
            </span>
            <button
              onClick={() => setSaved(!saved)}
              style={{
                width: '26px', height: '26px', borderRadius: '4px',
                border: '1px solid var(--border)',
                background: saved ? 'var(--accent-dim)' : 'transparent',
                color: saved ? 'var(--accent)' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        div:hover .play-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
