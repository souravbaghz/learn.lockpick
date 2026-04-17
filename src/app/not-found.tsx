import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔐</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '360px' }}>
          This lock doesn&apos;t exist — or the combination has changed. Head back home to keep exploring.
        </p>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: 'var(--radius)',
          background: 'var(--accent)', color: '#0E0D0B',
          fontSize: '0.9rem', fontWeight: 600,
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
