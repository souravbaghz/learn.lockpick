'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { TOPIC_TAGS, ContentType, SkillLevel, SourceType, TopicTag } from '@/lib/data';
import { useResources } from '@/lib/hooks';
import { ResourceCard } from '@/components/ResourceCard';
import { LoadingGrid, ErrorState, EmptyState, SourceBadge } from '@/components/LoadingStates';

function ExploreContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [contentType, setContentType] = useState<ContentType | undefined>(undefined);
  const [skillLevel, setSkillLevel] = useState<SkillLevel | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<TopicTag[]>([]);
  const [sourceType, setSourceType] = useState<SourceType | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'newest'|'oldest'|'most-viewed'|'most-saved'>('newest');

  const { resources, meta, loading, error, refetch } = useResources({
    search, contentType, skillLevel,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    sourceType, sortBy,
  });

  const activeFilterCount = [contentType, skillLevel, sourceType, ...selectedTags].filter(Boolean).length;

  const clearAll = () => {
    setSearch(''); setContentType(undefined); setSkillLevel(undefined);
    setSelectedTags([]); setSourceType(undefined); setSortBy('newest');
  };

  const toggleTag = (tag: TopicTag) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.02em' }}>Explore Resources</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
          {loading ? 'Loading live content...' : `${meta.total} resource${meta.total !== 1 ? 's' : ''} — search, filter, and dive in`}
        </p>
      </div>

      <SourceBadge sources={meta.sources} cachedAt={meta.cachedAt} />

      {/* Search */}
      <div style={{ position: 'relative', margin: '20px 0 24px' }}>
        <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, author, topic..." style={{ width: '100%', padding: '14px 48px 14px 44px', background: 'var(--surface)', border: '1px solid var(--border-2)', borderRadius: 'var(--radius-lg)', color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', outline: 'none' }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-2)')} />
        {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', cursor: 'pointer' }}><X size={15} /></button>}
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        {/* Filters sidebar */}
        <div style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '80px' }} className="filters-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
              <SlidersHorizontal size={14} style={{ color: 'var(--accent)' }} />
              Filters
              {activeFilterCount > 0 && <span style={{ padding: '1px 7px', borderRadius: '10px', background: 'var(--accent)', color: '#0E0D0B', fontSize: '0.72rem', fontWeight: 700 }}>{activeFilterCount}</span>}
            </div>
            {activeFilterCount > 0 && <button onClick={clearAll} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Clear all</button>}
          </div>

          <FilterSection title="Content Type">
            {(['video', 'article'] as ContentType[]).map(type => (
              <FilterChip key={type} active={contentType === type} onClick={() => setContentType(contentType === type ? undefined : type)}>
                {type === 'video' ? '▶ Video' : '📄 Article'}
              </FilterChip>
            ))}
          </FilterSection>

          <FilterSection title="Skill Level">
            {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(level => (
              <FilterChip key={level} active={skillLevel === level} onClick={() => setSkillLevel(skillLevel === level ? undefined : level)}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </FilterChip>
            ))}
          </FilterSection>

          <FilterSection title="Source">
            {(['youtube', 'blog', 'medium', 'rss', 'other'] as SourceType[]).map(src => (
              <FilterChip key={src} active={sourceType === src} onClick={() => setSourceType(sourceType === src ? undefined : src)}>
                {src.charAt(0).toUpperCase() + src.slice(1)}
              </FilterChip>
            ))}
          </FilterSection>

          <FilterSection title="Topics">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {(Object.keys(TOPIC_TAGS) as TopicTag[]).map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)} style={{
                  textAlign: 'left', padding: '6px 10px', borderRadius: '4px', border: 'none',
                  background: selectedTags.includes(tag) ? 'var(--accent-dim)' : 'transparent',
                  color: selectedTags.includes(tag) ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s ease',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>{TOPIC_TAGS[tag].label}</span>
                  {selectedTags.includes(tag) && <X size={11} />}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Results */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              {loading ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 1.2s infinite', display: 'inline-block' }} /> Fetching live…</span>
              : <><strong style={{ color: 'var(--text-primary)' }}>{meta.total}</strong> results</>}
            </p>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} style={{ padding: '6px 10px', borderRadius: 'var(--radius)', border: '1px solid var(--border-2)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: '0.82rem', fontFamily: 'var(--font-body)', cursor: 'pointer', outline: 'none' }}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="most-viewed">Most Viewed</option>
              <option value="most-saved">Most Saved</option>
            </select>
          </div>

          {/* Active filters */}
          {activeFilterCount > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {contentType && <ActiveFilter label={`Type: ${contentType}`} onRemove={() => setContentType(undefined)} />}
              {skillLevel && <ActiveFilter label={`Level: ${skillLevel}`} onRemove={() => setSkillLevel(undefined)} />}
              {sourceType && <ActiveFilter label={`Source: ${sourceType}`} onRemove={() => setSourceType(undefined)} />}
              {selectedTags.map(tag => <ActiveFilter key={tag} label={TOPIC_TAGS[tag].label} onRemove={() => toggleTag(tag)} />)}
            </div>
          )}

          {error ? <ErrorState message={error} onRetry={refetch} />
          : loading ? <LoadingGrid count={9} />
          : resources.length === 0 ? <EmptyState onClear={clearAll} />
          : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {resources.map((r, i) => (
                <div key={r.id} style={{ animation: `fadeUp 0.4s ease ${Math.min(i, 8) * 0.04}s both` }}>
                  <ResourceCard resource={r} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .filters-sidebar { display: none; } }
        @keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
      <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{children}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ padding: '5px 10px', borderRadius: '4px', border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`, background: active ? 'var(--accent-dim)' : 'var(--surface)', color: active ? 'var(--accent)' : 'var(--text-secondary)', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s ease' }}>
      {children}
    </button>
  );
}

function ActiveFilter({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '4px', background: 'var(--accent-dim)', border: '1px solid rgba(201,168,76,0.3)', fontSize: '0.78rem', color: 'var(--accent)' }}>
      {label}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', padding: 0 }}><X size={11} /></button>
    </span>
  );
}

export default function ExplorePage() {
  return <Suspense><ExploreContent /></Suspense>;
}
