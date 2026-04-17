'use client';
import { useState, useMemo } from 'react';
import { resources, filterResources, SkillLevel } from '@/lib/data';
import { ResourceCard } from '@/components/ResourceCard';
import { Play } from 'lucide-react';

const videos = resources.filter(r => r.contentType === 'video');

export default function VideosPage() {
  const [skillLevel, setSkillLevel] = useState<SkillLevel | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'newest' | 'most-viewed'>('newest');

  const filtered = useMemo(() => filterResources(videos, { skillLevel, sortBy }), [skillLevel, sortBy]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 80px' }}>
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'var(--accent-dim)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Play size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Video Library</h1>
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
          {videos.length} educational videos from the locksport community
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(level => (
            <button key={level} onClick={() => setSkillLevel(skillLevel === level ? undefined : level)} style={{
              padding: '7px 14px', borderRadius: 'var(--radius)', border: `1px solid ${skillLevel === level ? 'var(--accent)' : 'var(--border)'}`,
              background: skillLevel === level ? 'var(--accent-dim)' : 'var(--surface)',
              color: skillLevel === level ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.15s ease', textTransform: 'capitalize' as const,
            }}>
              {level}
            </button>
          ))}
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} style={{
          padding: '7px 12px', borderRadius: 'var(--radius)', border: '1px solid var(--border-2)',
          background: 'var(--surface)', color: 'var(--text-primary)', fontSize: '0.82rem', fontFamily: 'var(--font-body)', cursor: 'pointer', outline: 'none',
        }}>
          <option value="newest">Newest first</option>
          <option value="most-viewed">Most viewed</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {filtered.map((r, i) => (
          <div key={r.id} style={{ animation: `fadeUp 0.4s ease ${Math.min(i, 8) * 0.05}s both` }}>
            <ResourceCard resource={r} variant={r.featured ? 'featured' : 'default'} />
          </div>
        ))}
      </div>
    </div>
  );
}
