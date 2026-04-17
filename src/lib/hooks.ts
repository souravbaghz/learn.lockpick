'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Resource, ContentType, SkillLevel, SourceType, TopicTag } from './data';

export interface ResourceFilters {
  search?: string;
  contentType?: ContentType;
  skillLevel?: SkillLevel;
  tags?: TopicTag[];
  sourceType?: SourceType;
  sortBy?: 'newest' | 'oldest' | 'most-viewed' | 'most-saved';
  page?: number;
}

export interface ResourceMeta {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  cachedAt?: string;
  sources?: Record<string, number>;
}

export function useResources(filters: ResourceFilters = {}) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [meta, setMeta] = useState<ResourceMeta>({ total: 0, page: 1, totalPages: 0, limit: 24 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetch_ = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.contentType) params.set('type', filters.contentType);
    if (filters.skillLevel) params.set('level', filters.skillLevel);
    if (filters.tags?.length) params.set('tags', filters.tags.join(','));
    if (filters.sourceType) params.set('source', filters.sourceType);
    if (filters.sortBy) params.set('sort', filters.sortBy);
    if (filters.page) params.set('page', String(filters.page));

    try {
      const resp = await globalThis.fetch(`/api/resources?${params}`, {
        signal: abortRef.current.signal,
      });
      if (!resp.ok) throw new Error(`API error: ${resp.status}`);
      const data = await resp.json();
      setResources(data.resources || []);
      setMeta(data.meta || { total: 0, page: 1, totalPages: 0, limit: 24 });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to load content');
        setResources([]);
      }
    } finally {
      setLoading(false);
    }
  }, [
    filters.search,
    filters.contentType,
    filters.skillLevel,
    filters.tags?.join(','),
    filters.sourceType,
    filters.sortBy,
    filters.page,
  ]);

  useEffect(() => {
    fetch_();
    return () => abortRef.current?.abort();
  }, [fetch_]);

  return { resources, meta, loading, error, refetch: fetch_ };
}

export function useResource(id: string) {
  const [resource, setResource] = useState<Resource | null>(null);
  const [related, setRelated] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    globalThis.fetch(`/api/resources/${id}`)
      .then(r => { if (!r.ok) throw new Error('Not found'); return r.json(); })
      .then(data => {
        setResource(data.resource);
        setRelated(data.related || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { resource, related, loading, error };
}
