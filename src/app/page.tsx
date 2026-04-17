'use client';
import Link from 'next/link';
import { ArrowRight, Play, BookOpen, ChevronRight, Shield, Users, Zap } from 'lucide-react';
import { TOPIC_TAGS, TopicTag, collections } from '@/lib/data';
import { useResources } from '@/lib/hooks';
import { ResourceCard } from '@/components/ResourceCard';
import { FeaturedSkeleton, LoadingGrid, ErrorState, SourceBadge } from '@/components/LoadingStates';

const navLinks = [
  { href: '/', label: 'Home' }, { href: '/explore', label: 'Explore' },
  { href: '/videos', label: 'Videos' }, { href: '/articles', label: 'Articles' },
  { href: '/topics', label: 'Topics' }, { href: '/saved', label: 'Saved' },
];

const topicHighlights: { tag: TopicTag; icon: string }[] = [
  { tag: 'pin-tumblers', icon: '🔩' },
  { tag: 'raking', icon: '⚡' },
  { tag: 'theory', icon: '📐' },
  { tag: 'tools', icon: '🛠' },
  { tag: 'bypass', icon: '🔓' },
  { tag: 'legal-basics', icon: '⚖️' },
];

function FeaturedSection() {
  const { resources, loading, error, meta, refetch } = useResources({ sortBy: 'most-viewed', page: 1 });
  const featured = resources.filter(r => r.featured).slice(0, 4);
  const displayFeatured = featured.length > 0 ? featured : resources.slice(0, 4);

  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (loading) return <FeaturedSkeleton />;

  return (
    <>
      <SourceBadge sources={meta.sources} cachedAt={meta.cachedAt} />
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {displayFeatured.map((r, i) => (
          <div key={r.id} style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
            <ResourceCard resource={r} variant="featured" />
          </div>
        ))}
      </div>
    </>
  );
}

function RecentSection() {
  const { resources, loading, error, refetch } = useResources({ sortBy: 'newest', page: 1 });
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (loading) return <LoadingGrid count={6} />;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
      {resources.slice(0, 6).map((r, i) => (
        <div key={r.id} style={{ animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}>
          <ResourceCard resource={r} />
        </div>
      ))}
    </div>
  );
}

function TopicSection() {
  const { resources } = useResources({ page: 1 });
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px' }}>
      {topicHighlights.map(({ tag, icon }) => {
        const count = resources.filter(r => r.tags.includes(tag)).length;
        return (
          <Link key={tag} href={`/topics/${tag}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--surface)', transition: 'all 0.2s ease' }}>
            <span style={{ fontSize: '1.1rem' }}>{icon}</span>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{TOPIC_TAGS[tag].label}</div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {count > 0 ? `${count} resource${count !== 1 ? 's' : ''}` : 'Browse'}
              </div>
            </div>
          </Link>
        );
      })}
      <Link href="/topics" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderRadius: 'var(--radius)', border: '1px dashed var(--border-2)', color: 'var(--text-muted)', fontSize: '0.87rem', transition: 'color 0.15s ease' }}>
        All topics <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '60px 60px', opacity: 0.3, pointerEvents: 'none', maskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, black 0%, transparent 70%)' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', width: '100%' }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-2)', background: 'var(--surface)', marginBottom: '32px', animation: 'fadeUp 0.5s ease 0.1s both' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Live content · Updated hourly</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px', animation: 'fadeUp 0.5s ease 0.2s both', letterSpacing: '-0.02em' }}>
              The craft of<br /><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>picking locks,</span><br />taught well.
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px', fontWeight: 300, animation: 'fadeUp 0.5s ease 0.3s both' }}>
              Live-aggregated videos, articles, and guides from the locksport community — LockPickingLawyer, BosnianBill, LockNoob, Deviant Ollam, and more. Updated hourly.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const, animation: 'fadeUp 0.5s ease 0.4s both' }}>
              <Link href="/explore" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 'var(--radius)', background: 'var(--accent)', color: '#0E0D0B', fontSize: '0.9rem', fontWeight: 600 }}>
                Start Exploring <ArrowRight size={16} />
              </Link>
              <Link href="/videos" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 'var(--radius)', border: '1px solid var(--border-2)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
                <Play size={15} /> Browse Videos
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '32px', marginTop: '64px', animation: 'fadeUp 0.5s ease 0.5s both', flexWrap: 'wrap' as const }}>
              {[
                { n: '4', label: 'YouTube channels' },
                { n: '3+', label: 'Blog & RSS feeds' },
                { n: `${Object.keys(TOPIC_TAGS).length}`, label: 'Topic categories' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)' }}>{n}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety note */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)', padding: '14px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' as const }}>
          <Shield size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Ethical use only.</strong> Never pick a lock you don&apos;t own or don&apos;t have permission to pick. For lawful education, locksport, and professional development only.
          </p>
          <Link href="/about" style={{ fontSize: '0.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            Learn more <ChevronRight size={12} />
          </Link>
        </div>
      </section>

      {/* Featured — live */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>— Live from the community</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>Most Watched</h2>
          </div>
          <Link href="/explore" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <FeaturedSection />
      </section>

      {/* Collections */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>— Curated paths</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>Learning Paths</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {collections.map((col, i) => (
              <Link key={col.id} href={`/topics/${col.id === 'start-here' ? 'pin-tumblers' : col.id === 'theory-deep-dive' ? 'theory' : 'bypass'}`} style={{ display: 'block', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--bg-card)', transition: 'all 0.2s ease', position: 'relative' as const, overflow: 'hidden', animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
                <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: '3px', background: col.color }} />
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{col.icon}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>{col.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>{col.description}</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: col.color }}>
                  Explore <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topics — live counts */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>— By subject</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>Browse Topics</h2>
        </div>
        <TopicSection />
      </section>

      {/* Recent — live */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>— Just published</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>Recent Uploads</h2>
            </div>
            <Link href="/explore?sort=newest" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <RecentSection />
        </div>
      </section>

      {/* Why */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, marginBottom: '16px' }}>
            Why <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>LockSchool</span>?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontWeight: 300, lineHeight: 1.7 }}>
            We pull real content from the best locksport sources hourly, so you always see what&apos;s new.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            { icon: <Zap size={22} style={{ color: 'var(--accent)' }} />, title: 'Live aggregation', desc: 'Content pulled hourly from YouTube RSS feeds, locksport blogs, and community sources. Always current.' },
            { icon: <BookOpen size={22} style={{ color: 'var(--green)' }} />, title: 'All skill levels', desc: 'Beginner to advanced — skill levels auto-detected from titles and content so you find what you need.' },
            { icon: <Shield size={22} style={{ color: 'var(--blue)' }} />, title: 'Ethics first', desc: 'Every source is curated for responsible educational content. No exploit tutorials. No unauthorized bypass guides.' },
            { icon: <Users size={22} style={{ color: 'var(--red)' }} />, title: 'Top creators', desc: 'LockPickingLawyer, BosnianBill, LockNoob, Deviant Ollam — the community\'s most trusted voices.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              <div style={{ marginBottom: '16px' }}>{icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '20px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', background: 'var(--accent)', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0E0D0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Lock<span style={{ color: 'var(--accent)' }}>School</span></span>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' as const }}>
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</Link>
              ))}
              <Link href="/about" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>About</Link>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>© 2024 LockSchool. For educational use only. All content belongs to respective creators.</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Never pick a lock you don&apos;t own.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
