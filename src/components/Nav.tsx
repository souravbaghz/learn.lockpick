'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, BookOpen, Shield } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/videos', label: 'Videos' },
  { href: '/articles', label: 'Articles' },
  { href: '/topics', label: 'Topics' },
  { href: '/saved', label: 'Saved' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(14, 13, 11, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--accent)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0E0D0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}>
              Lock<span style={{ color: 'var(--accent)' }}>School</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }} className="desktop-nav">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: pathname === href ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: pathname === href ? 'var(--surface)' : 'transparent',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { if (pathname !== href) (e.target as HTMLElement).style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { if (pathname !== href) (e.target as HTMLElement).style.color = 'var(--text-secondary)'; }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
              aria-label="Search"
            >
              <Search size={15} />
            </button>
            <Link href="/about" style={{
              padding: '7px 14px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
            className="desktop-nav"
            >
              <Shield size={13} />
              About
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: '12px 24px',
            background: 'rgba(14, 13, 11, 0.95)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeUp 0.2s ease',
          }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <form action="/explore" method="GET">
                <input
                  name="q"
                  type="text"
                  placeholder="Search videos, articles, topics..."
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-2)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                  }}
                />
              </form>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: '16px 24px',
            background: 'rgba(14, 13, 11, 0.98)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeUp 0.2s ease',
          }}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                display: 'block',
                padding: '12px 0',
                fontSize: '1rem',
                fontWeight: pathname === href ? 600 : 400,
                color: pathname === href ? 'var(--accent)' : 'var(--text-primary)',
                borderBottom: '1px solid var(--border)',
              }}>
                {label}
              </Link>
            ))}
            <Link href="/about" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 0',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
            }}>
              <Shield size={15} />
              About & Safety
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
