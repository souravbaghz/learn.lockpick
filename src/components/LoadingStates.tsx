'use client';

export function CardSkeleton() {
  return (
    <div style={{
      borderRadius: '12px',
      border: '1px solid var(--border)',
      background: 'var(--bg-card)',
      overflow: 'hidden',
    }}>
      <div className="skeleton" style={{ aspectRatio: '16/9', width: '100%' }} />
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <div className="skeleton" style={{ height: '20px', width: '70px', borderRadius: '3px' }} />
          <div className="skeleton" style={{ height: '20px', width: '50px', borderRadius: '3px' }} />
        </div>
        <div className="skeleton" style={{ height: '16px', width: '100%', borderRadius: '3px', marginBottom: '6px' }} />
        <div className="skeleton" style={{ height: '16px', width: '80%', borderRadius: '3px', marginBottom: '12px' }} />
        <div className="skeleton" style={{ height: '12px', width: '60%', borderRadius: '3px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton" style={{ height: '12px', width: '80px', borderRadius: '3px' }} />
          <div className="skeleton" style={{ height: '24px', width: '24px', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
    }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{ borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', overflow: 'hidden' }}>
          <div className="skeleton" style={{ aspectRatio: '16/9', width: '100%' }} />
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <div className="skeleton" style={{ height: '20px', width: '80px', borderRadius: '3px' }} />
              <div className="skeleton" style={{ height: '20px', width: '60px', borderRadius: '3px' }} />
            </div>
            <div className="skeleton" style={{ height: '20px', width: '100%', borderRadius: '3px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '20px', width: '75%', borderRadius: '3px', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '14px', width: '90%', borderRadius: '3px', marginBottom: '6px' }} />
            <div className="skeleton" style={{ height: '14px', width: '65%', borderRadius: '3px', marginBottom: '20px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="skeleton" style={{ height: '24px', width: '24px', borderRadius: '50%' }} />
                <div className="skeleton" style={{ height: '12px', width: '80px', borderRadius: '3px' }} />
              </div>
              <div className="skeleton" style={{ height: '26px', width: '26px', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      border: '1px dashed var(--border-2)',
      borderRadius: '12px',
      background: 'var(--bg-card)',
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⚠️</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Failed to load content</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px', maxWidth: '360px', margin: '0 auto 20px' }}>
        {message || 'Could not reach content sources. Check your connection or try again.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} style={{
          padding: '9px 20px',
          borderRadius: '6px',
          background: 'var(--accent)',
          color: '#0E0D0B',
          border: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
        }}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ onClear }: { onClear?: () => void }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '80px 20px',
      border: '1px dashed var(--border-2)',
      borderRadius: '12px',
      background: 'var(--bg-card)',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔑</div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>No results found</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', maxWidth: '360px', margin: '0 auto 20px' }}>
        Try adjusting your filters or search terms.
      </p>
      {onClear && (
        <button onClick={onClear} style={{
          padding: '8px 20px',
          borderRadius: '6px',
          background: 'var(--accent)',
          color: '#0E0D0B',
          border: 'none',
          fontWeight: 600,
          fontSize: '0.87rem',
          cursor: 'pointer',
        }}>
          Clear all filters
        </button>
      )}
    </div>
  );
}

export function SourceBadge({ sources, cachedAt }: { sources?: Record<string, number>; cachedAt?: string }) {
  if (!sources) return null;
  const total = Object.values(sources).reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 14px',
      borderRadius: '6px',
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Live from</span>
      {Object.entries(sources).filter(([, n]) => n > 0).map(([src, count]) => (
        <span key={src} style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{count}</span> {src}
        </span>
      ))}
      {cachedAt && (
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          Updated {new Date(cachedAt).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
