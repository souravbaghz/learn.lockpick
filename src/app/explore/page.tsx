'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { resources, filterResources, TOPIC_TAGS, ContentType, SkillLevel, SourceType, TopicTag } from '@/lib/data';
import { ResourceCard } from '@/components/ResourceCard';
import { Suspense } from 'react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [contentType, setContentType] = useState<ContentType | undefined>(searchParams.get('type') as ContentType || undefined);
  const [skillLevel, setSkillLevel] = useState<SkillLevel | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<TopicTag[]>([]);
  const [sourceType, setSourceType] = useState<SourceType | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-viewed' | 'most-saved'>('newest');
  const [filtersOpen, setFiltersOpen] = useState(true);

  const filtered = useMemo(() => filterResources(resources, {
    search, contentType, skillLevel, tags: selectedTags, sourceType, sortBy,
  }), [search, contentType, skillLevel, selectedTags, sourceType, sortBy]);

  const activeFilterCount = [contentType, skillLevel, sourceType, ...selectedTags].filter(Boolean).length;

  const clearAll = () => {
    setSearch('');
    setContentType(undefined);
    setSkillLevel(undefined);
    setSelectedTags([]);
    setSourceType(undefined);
    setSortBy('newest');
  };

  const toggleTag = (tag: TopicTag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Explore Resources
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
          {filtered.length} resource{filtered.length !== 1 ? 's' : ''} — search, filter, and dive in
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, author, topic..."
          style={{
            width: '100%',
            padding: '14px 48px 14px 44px',
            background: 'var(--surface)',
            border: '1px solid var(--border-2)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-body)',
            outline: 'none',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-2)')}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={15} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        {/* Filters sidebar */}
        <div style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
              <SlidersHorizontal size={14} style={{ color: 'var(--accent)' }} />
              Filters
              {activeFilterCount > 0 && (
                <span style={{ padding: '1px 7px', borderRadius: '10px', background: 'var(--accent)', color: '#0E0D0B', fontSize: '0.72rem', fontWeight: 700 }}>{activeFilterCount}</span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Clear all</button>
            )}
          </div>

          {/* Content type */}
          <FilterSection title="Content Type">
            {(['video', 'article'] as ContentType[]).map(type => (
              <FilterChip key={type} active={contentType === type} onClick={() => setContentType(contentType === type ? undefined : type)}>
                {type === 'video' ? '▶ Video' : '📄 Article'}
              </FilterChip>
            ))}
          </FilterSection>

          {/* Skill level */}
          <FilterSection title="Skill Level">
            {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(level => (
              <FilterChip key={level} active={skillLevel === level} onClick={() => setSkillLevel(skillLevel === level ? undefined : level)}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </FilterChip>
            ))}
          </FilterSection>

          {/* Source */}
          <FilterSection title="Source">
            {(['youtube', 'blog', 'medium', 'rss', 'other'] as SourceType[]).map(src => (
              <FilterChip key={src} active={sourceType === src} onClick={() => setSourceType(sourceType === src ? undefined : src)}>
                {src.charAt(0).toUpperCase() + src.slice(1)}
              </FilterChip>
            ))}
          </FilterSection>

          {/* Topics */}
          <FilterSection title="Topics">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {(Object.keys(TOPIC_TAGS) as TopicTag[]).map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    textAlign: 'left', padding: '6px 10px', borderRadius: '4px', border: 'none',
                    background: selectedTags.includes(tag) ? 'var(--accent-dim)' : 'transparent',
                    color: selectedTags.includes(tag) ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s ease',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  <span>{TOPIC_TAGS[tag].label}</span>
                  {selectedTags.includes(tag) && <X size={11} />}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Results */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Sort bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> results
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                style={{
                  padding: '6px 10px', borderRadius: 'var(--radius)', border: '1px solid var(--border-2)',
                  background: 'var(--surface)', color: 'var(--text-primary)', fontSize: '0.82rem',
                  fontFamily: 'var(--font-body)', cursor: 'pointer', outline: 'none',
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most-viewed">Most Viewed</option>
                <option value="most-saved">Most Saved</option>
              </select>
            </div>
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

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', border: '1px dashed var(--border-2)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔑</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>No results found</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Try adjusting your filters or search terms.</p>
              <button onClick={clearAll} style={{ padding: '8px 20px', borderRadius: 'var(--radius)', background: 'var(--accent)', color: '#0E0D0B', border: 'none', fontWeight: 600, fontSize: '0.87rem', cursor: 'pointer' }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {filtered.map((r, i) => (
                <div key={r.id} style={{ animation: `fadeUp 0.4s ease ${Math.min(i, 8) * 0.04}s both` }}>
                  <ResourceCard resource={r} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
      <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {children}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 10px', borderRadius: '4px', border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      background: active ? 'var(--accent-dim)' : 'var(--surface)',
      color: active ? 'var(--accent)' : 'var(--text-secondary)',
      fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s ease',
    }}>
      {children}
    </button>
  );
}

function ActiveFilter({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '4px 10px', borderRadius: '4px',
      background: 'var(--accent-dim)', border: '1px solid rgba(201,168,76,0.3)',
      fontSize: '0.78rem', color: 'var(--accent)',
    }}>
      {label}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', padding: 0 }}>
        <X size={11} />
      </button>
    </span>
  );
}

export default function ExplorePage() {
  return (
    <Suspense>
      <ExploreContent />
    </Suspense>
  );
}
