# LockSchool — Educational Lock Picking Platform

> The craft of picking locks, taught well.

A premium content discovery platform aggregating locksport and lock picking educational resources. Built for hobbyists, security researchers, and the endlessly curious.

---

## 🚀 Deploy to Vercel in 60 seconds

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Initial LockSchool build"
gh repo create lockschool --public --push

# 2. Deploy (or drag folder into vercel.com/new)
npx vercel --prod
```

---

## 📦 Local Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build check
```

---

## 🏗 Product Vision

LockSchool is a **modern learning magazine / media library hybrid** for the locksport community. It aggregates curated educational content from YouTube, blogs, Medium, RSS feeds, and community sources into a single, beautifully designed discovery platform. The product prioritizes ethical framing, discoverability, and reading/watching experience over raw volume.

**Core promise:** Less searching, more learning.

---

## 📋 Product Requirements Document (PRD)

### Problem Statement
Lock picking education is fragmented across YouTube channels, subreddits, personal blogs, and conference talks. Beginners don't know where to start. Intermediate learners can't find what they're missing. Advanced practitioners have no curated library.

### Target Users
1. Beginners — curious hobbyists who want to understand how locks work
2. Intermediate learners — people who've picked a few locks and want to go deeper
3. Advanced practitioners — locksport competitors, security researchers, locksmiths
4. Security professionals — physical security assessors doing authorized red team work

### Core Features (v1)

| Feature | Status |
|---|---|
| Homepage with hero, featured content, collections, topics | Done |
| Explore page with full filter/search system | Done |
| Video library with embedded player + fallback | Done |
| Article library with in-app reader | Done |
| Topic browsing (12 categories) | Done |
| Save/bookmark resources | Done |
| Mark as watched/read | Done |
| Related content suggestions | Done |
| About / ethics page | Done |
| Responsive layout | Done |

---

## 🎨 Design Direction

### Visual Identity
**Tone:** Editorial dark luxury — like a premium magazine printed on black paper.

**Palette:**
- Background: #0E0D0B (near-black warm)
- Surface: #1F1E1A (card backgrounds)
- Text: #F0EDE6 (warm off-white)
- Accent: #C9A84C (warm gold)
- Green: #5AAF7A (beginner level)
- Blue: #6B8ED4 (articles)
- Red: #C96B6B (advanced/warnings)

**Typography:**
- Display: Playfair Display (editorial serif for headings)
- Body: DM Sans (clean, modern, readable)
- Mono: DM Mono (tags, metadata, labels)

**Signature details:**
- Film grain overlay at 2.5% opacity
- Dot-grid hero background
- 3px top border stripes on collection cards
- Staggered fade-up animations on content load

---

## 🏛 Information Architecture

```
LockSchool
├── / (Home)
│   ├── Hero section
│   ├── Featured resources
│   ├── Curated collections
│   ├── Browse by topic
│   └── Recent resources
├── /explore  (search + filter grid)
├── /videos
│   └── /videos/[id]  (embedded player + related)
├── /articles
│   └── /articles/[id]  (in-app reader + related)
├── /topics
│   └── /topics/[tag]  (resources by topic)
├── /saved
└── /about  (ethics + community links)
```

---

## ⚙️ Technical Architecture

### Stack
| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | CSS Custom Properties + inline styles |
| Icons | Lucide React |
| Deployment | Vercel |

### Data Model

```typescript
interface Resource {
  id: string;
  title: string;
  author: string;
  sourceName: string;
  sourceType: 'youtube' | 'blog' | 'medium' | 'rss' | 'other';
  url: string;
  publishDate: string;
  tags: TopicTag[];
  contentType: 'video' | 'article';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  embedUrl?: string;
  canEmbed: boolean;
  duration?: string;
  readTime?: string;
  description: string;
  excerpt?: string;
  views?: number;
  saves?: number;
  featured?: boolean;
}
```

### Backend Scale Path

**Option A — Headless CMS:** Sanity.io or Contentful with the Resource schema above. Editors can add/curate content through a GUI with ISR revalidation.

**Option B — Database:**
```sql
CREATE TABLE resources (id, title, author, source_type, url, content_type, skill_level, thumbnail, embed_url, can_embed, description, excerpt, views, saves, featured, created_at);
CREATE TABLE tags (id, slug, label, color);
CREATE TABLE resource_tags (resource_id, tag_id);
CREATE TABLE users (id, email, created_at);
CREATE TABLE saved_items (user_id, resource_id, saved_at);
CREATE TABLE watch_history (user_id, resource_id, completed, watched_at);
CREATE TABLE source_connectors (id, name, type, config JSONB, last_synced);
```

### API Design

```
GET  /api/resources          Search + filter (query, type, level, tags, source, sort, page)
GET  /api/resources/:id      Single resource detail
GET  /api/tags               All topic tags
GET  /api/tags/:slug/resources
GET  /api/collections
POST /api/saved              Save resource (auth)
DELETE /api/saved/:id        Unsave (auth)
GET  /api/saved              User saved list (auth)
POST /api/history            Mark watched/read (auth)
POST /api/connectors/sync    Trigger source sync (admin)
```

---

## 🗺 Implementation Roadmap

### Phase 1 — Foundation (Complete)
- All core pages built and functional
- Design system with CSS custom properties
- 12 mock resources across all content types
- Filter and search system
- Responsive navigation
- Vercel deployment config

### Phase 2 — Content & Auth
- Sanity.io or Contentful CMS integration
- 50-100 real curated resources
- User auth with NextAuth.js
- Persistent saved items
- Watch/read history tracking

### Phase 3 — Discovery
- Full-text search (Algolia or Postgres FTS)
- YouTube Data API auto-ingestion connector
- RSS feed connector
- SEO: sitemap.xml, JSON-LD, per-page meta
- Open Graph images per resource

### Phase 4 — Community
- User ratings and upvotes
- Comments / notes on resources
- Learning path completion tracking
- Locksport news feed
- Mobile PWA

---

## ✅ Build Priority Checklist

### Pre-launch
- [x] All core pages functional
- [x] Mobile responsive layout
- [x] Video embeds with fallback
- [x] Article reader with excerpt
- [x] Ethics page in nav
- [x] Clean TypeScript build

### Before real users
- [ ] Replace mock data with 30+ real curated resources
- [ ] Open Graph meta tags per page
- [ ] Analytics (Vercel Analytics)
- [ ] next/image for optimized thumbnails
- [ ] Accessibility audit

### For scale
- [ ] CMS integration
- [ ] Auth + saved items persistence
- [ ] Search indexing
- [ ] Source ingestion pipeline

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── explore/page.tsx
│   ├── videos/page.tsx + [id]/page.tsx
│   ├── articles/page.tsx + [id]/page.tsx
│   ├── topics/page.tsx + [tag]/page.tsx
│   ├── saved/page.tsx
│   └── about/page.tsx
├── components/
│   ├── Nav.tsx
│   └── ResourceCard.tsx
└── lib/
    └── data.ts
```

---

## 🔒 Ethical Framework

**Included content criteria:**
- Locksport hobbyist content and tutorials
- Security research and conference talks (DEF CON, physical security tracks)
- Professional locksmith education
- Community resources (r/lockpicking wiki, TOOOL guides)

**Excluded:**
- Content teaching unauthorized security bypass
- Instructions for defeating electronic/alarm systems
- Any content targeting unauthorized real-world entry

Every page includes ethics framing or links to the About page. Community golden rules are prominently displayed.

---

*LockSchool — For the curious. For the careful. For the craft.*
