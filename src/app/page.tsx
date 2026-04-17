'use client';
import Link from 'next/link';
import { ArrowRight, Play, BookOpen, ChevronRight, Shield, Users, Zap } from 'lucide-react';
import { resources, collections, TOPIC_TAGS, TopicTag } from '@/lib/data';
import { ResourceCard } from '@/components/ResourceCard';

const featured = resources.filter(r => r.featured);
const recent = [...resources].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 6);
const navLinks = [
  { href: '/', label: 'Home' }, { href: '/explore', label: 'Explore' },
  { href: '/videos', label: 'Videos' }, { href: '/articles', label: 'Articles' },
  { href: '/topics', label: 'Topics' }, { href: '/saved', label: 'Saved' },
];
const topicHighlights: { tag: TopicTag; count: number; icon: string }[] = [
  { tag: 'pin-tumblers', icon: '🔩', count: resources.filter(r => r.tags.includes('pin-tumblers')).length },
  { tag: 'raking', icon: '⚡', count: resources.filter(r => r.tags.includes('raking')).length },
  { tag: 'theory', icon: '📐', count: resources.filter(r => r.tags.includes('theory')).length },
  { tag: 'tools', icon: '🛠', count: resources.filter(r => r.tags.includes('tools')).length },
  { tag: 'bypass', icon: '🔓', count: resources.filter(r => r.tags.includes('bypass')).length },
  { tag: 'legal-basics', icon: '⚖️', count: resources.filter(r => r.tags.includes('legal-basics')).length },
];

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
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>For Locksport, Education & Hobbyists</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px', animation: 'fadeUp 0.5s ease 0.2s both', letterSpacing: '-0.02em' }}>
              The craft of<br /><span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>picking locks,</span><br />taught well.
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px', fontWeight: 300, animation: 'fadeUp 0.5s ease 0.3s both' }}>
              Curated videos, articles, and guides for locksport enthusiasts, security professionals, and the endlessly curious. Learn ethically. Practice responsibly.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const, animation: 'fadeUp 0.5s ease 0.4s both' }}>
              <Link href="/explore" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 'var(--radius)', background: 'var(--accent)', color: '#0E0D0B', fontSize: '0.9rem', fontWeight: 600, transition: 'background 0.2s ease' }}>
                Start Exploring <ArrowRight size={16} />
              </Link>
              <Link href="/videos" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 'var(--radius)', border: '1px solid var(--border-2)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500, transition: 'border-color 0.2s ease' }}>
                <Play size={15} /> Browse Videos
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '32px', marginTop: '64px', animation: 'fadeUp 0.5s ease 0.5s both', flexWrap: 'wrap' as const }}>
              {[{ n: `${resources.filter(r => r.contentType === 'video').length}+`, label: 'Video lessons' }, { n: `${resources.filter(r => r.contentType === 'article').length}+`, label: 'Articles & guides' }, { n: `${Object.keys(TOPIC_TAGS).length}`, label: 'Topic categories' }].map(({ n, label }) => (
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
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Ethical use only.</strong> Never pick a lock you don't own or don't have explicit permission to pick. This platform is for lawful education, locksport competition, and professional development only.
          </p>
          <Link href="/about" style={{ fontSize: '0.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>Learn more <ChevronRight size={12} /></Link>
        </div>
      </section>

      {/* Featured */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>— Editor&apos;s picks</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>Featured Resources</h2>
          </div>
          <Link href="/explore" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>View all <ArrowRight size={14} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {featured.map((r, i) => <div key={r.id} style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}><ResourceCard resource={r} variant="featured" /></div>)}
        </div>
      </section>

      {/* Collections */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>— Learning paths</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>Curated Collections</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {collections.map((col, i) => (
              <Link key={col.id} href={`/explore?collection=${col.id}`} style={{ display: 'block', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--bg-card)', transition: 'all 0.2s ease', animation: `fadeUp 0.5s ease ${i * 0.1}s both`, position: 'relative' as const, overflow: 'hidden' }}>
                <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: '3px', background: col.color, borderRadius: '12px 12px 0 0' }} />
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{col.icon}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>{col.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>{col.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{col.resourceIds.length} resources</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: col.color }}>Explore <ChevronRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>— By subject</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>Browse Topics</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px' }}>
          {topicHighlights.map(({ tag, icon, count }) => (
            <Link key={tag} href={`/topics/${tag}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--surface)', transition: 'all 0.2s ease' }}>
              <span style={{ fontSize: '1.1rem' }}>{icon}</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{TOPIC_TAGS[tag].label}</div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{count} resource{count !== 1 ? 's' : ''}</div>
              </div>
            </Link>
          ))}
          <Link href="/topics" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px', borderRadius: 'var(--radius)', border: '1px dashed var(--border-2)', color: 'var(--text-muted)', fontSize: '0.87rem', transition: 'color 0.15s ease' }}>
            All topics <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Recent */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '8px' }}>— Just added</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>Recent Resources</h2>
            </div>
            <Link href="/explore?sort=newest" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>View all <ArrowRight size={14} /></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {recent.map((r, i) => <div key={r.id} style={{ animation: `fadeUp 0.5s ease ${i * 0.06}s both` }}><ResourceCard resource={r} /></div>)}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, marginBottom: '16px' }}>
            Why <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>LockSchool</span>?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontWeight: 300, lineHeight: 1.7 }}>
            We aggregate the best educational content so you spend less time searching and more time learning.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            { icon: <Zap size={22} style={{ color: 'var(--accent)' }} />, title: 'Curated quality', desc: 'Only legitimate educational content from trusted creators, researchers, and locksport professionals.' },
            { icon: <BookOpen size={22} style={{ color: 'var(--green)' }} />, title: 'All skill levels', desc: 'From picking your first lock to advanced disc detainers — every learner has a clear path.' },
            { icon: <Shield size={22} style={{ color: 'var(--blue)' }} />, title: 'Ethics first', desc: 'Every piece of content is framed around legal, responsible use. Safety notes included throughout.' },
            { icon: <Users size={22} style={{ color: 'var(--red)' }} />, title: 'Community sources', desc: 'Built on the best of the locksport community: r/lockpicking, TOOOL, DEF CON talks, and more.' },
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
              {navLinks.map(({ href, label }) => <Link key={href} href={href} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</Link>)}
              <Link href="/about" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>About</Link>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>© 2024 LockSchool. For educational use only.</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Never pick a lock you don&apos;t own.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
