'use client';
import Link from 'next/link';
import { Shield, BookOpen, Users, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-2)',
        padding: '72px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(107,142,212,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(107,142,212,0.3)', background: 'var(--blue-dim)', marginBottom: '24px' }}>
            <Shield size={13} style={{ color: 'var(--blue)' }} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Ethics & Safety</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            About LockSchool
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300, maxWidth: '600px' }}>
            LockSchool is an educational platform for the locksport community — hobbyists, security professionals, and curious learners who want to understand physical security from the inside out.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>

        {/* The golden rules */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <AlertTriangle size={20} style={{ color: 'var(--accent)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>The Golden Rules of Locksport</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px', marginBottom: '32px' }}>
            {[
              {
                num: '01',
                rule: 'Never pick a lock that is in use',
                detail: 'A lock securing an actual property, vehicle, or personal item must never be picked — even if you own the item. Picking can damage pins and mechanisms, potentially leaving someone locked out.',
              },
              {
                num: '02',
                rule: 'Only pick locks you own',
                detail: 'Unless you have explicit written permission from the owner, you should only practice on locks you personally own. This is both the legal and ethical standard.',
              },
              {
                num: '03',
                rule: 'Share knowledge responsibly',
                detail: 'Teach the principles, not the exploits. Locksport knowledge should empower people to understand security — not to bypass it without authorization.',
              },
            ].map(({ num, rule, detail }) => (
              <div key={num} style={{
                display: 'flex', gap: '20px', padding: '24px',
                borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}>
                <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 900, color: 'var(--accent)', flexShrink: 0, lineHeight: 1 }}>{num}</div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{rule}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Legal note */}
        <section style={{ marginBottom: '64px', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(201,107,107,0.2)', background: 'rgba(201,107,107,0.04)' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <Scale size={18} style={{ color: 'var(--red)', flexShrink: 0, marginTop: '2px' }} />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Legal Considerations</h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Lock pick ownership laws vary significantly by jurisdiction. In most of the United States, United Kingdom, Canada, and Australia, owning lock picks is legal. However, carrying them in public without a legitimate professional reason may constitute &quot;possession of burglary tools&quot; in some regions.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Always research your local laws.</strong> LockSchool is not a legal resource and this information is for general educational awareness only. Consult a local attorney if you have specific legal questions.
          </p>
          <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Recommended: The ALOA (Associated Locksmiths of America) publishes jurisdiction-specific guides for members.
          </p>
        </section>

        {/* What this platform is */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <BookOpen size={18} style={{ color: 'var(--green)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>What LockSchool Is</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              'A curated aggregator of public educational content',
              'A learning hub for locksport hobbyists',
              'A resource for security professionals doing authorized work',
              'An archive of community knowledge from r/lockpicking, TOOOL, and beyond',
              'A beginner-friendly entry point into the locksport hobby',
              'An ethically-framed exploration of physical security',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', padding: '14px 16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-card)', alignItems: 'flex-start' }}>
                <CheckCircle size={14} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Users size={18} style={{ color: 'var(--blue)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>The Locksport Community</h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '20px' }}>
            Locksport is a legitimate hobby with an active global community. Organizations like TOOOL (The Open Organisation Of Lockpickers) and Locksport International promote ethical practice, run competitions, and maintain resources for practitioners at every level.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '24px' }}>
            The r/lockpicking subreddit has over 400,000 members and maintains one of the best beginner resources on the internet — the Lockpicking Subreddit Wiki. The community is welcoming, knowledgeable, and takes ethics seriously.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
            {[
              { name: 'TOOOL', url: 'https://toool.us', desc: 'International locksport org' },
              { name: 'r/lockpicking', url: 'https://reddit.com/r/lockpicking', desc: 'Community & wiki' },
              { name: 'Locksport Int\'l', url: 'https://locksport.com', desc: 'Standards & competition' },
            ].map(({ name, url, desc }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{
                padding: '12px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
                background: 'var(--surface)', transition: 'all 0.15s ease',
              }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>{name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{desc}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Content & Sources</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 12px' }}>
            All content on LockSchool is curated from legitimate public sources. Videos link to and embed from their original creators on YouTube and other platforms. Articles link directly to their source publications.
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
            LockSchool does not host or reproduce full content without permission. If you are a creator and have concerns about how your content is represented, please contact us.
          </p>
        </section>

      </div>
    </div>
  );
}
