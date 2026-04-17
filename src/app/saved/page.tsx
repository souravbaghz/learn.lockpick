'use client';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

export default function SavedPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 80px' }}>
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'var(--accent-dim)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bookmark size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Saved Resources</h1>
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
          Your bookmarked articles and videos
        </p>
      </div>

      <div style={{
        textAlign: 'center',
        padding: '80px 24px',
        borderRadius: 'var(--radius-xl)',
        border: '1px dashed var(--border-2)',
        background: 'var(--bg-card)',
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🔖</div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>Nothing saved yet</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '380px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          Hit the bookmark icon on any video or article to save it here for later.
        </p>
        <Link href="/explore" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: 'var(--radius)',
          background: 'var(--accent)', color: '#0E0D0B',
          fontSize: '0.9rem', fontWeight: 600,
        }}>
          Browse Resources
        </Link>
      </div>
    </div>
  );
}
