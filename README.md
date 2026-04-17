# LockSchool — Live Lock Picking Education Platform

> The craft of picking locks, taught well.

A premium content aggregator for locksport and lock picking education. Pulls **real, live content** from YouTube channels, RSS feeds, and blogs — updated hourly, zero manual curation required.

---

## 🚀 Deploy to Vercel (2 minutes)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "LockSchool v1"
gh repo create lockschool --public --push

# 2. Deploy
npx vercel --prod
```

**Or:** Drag this folder into [vercel.com/new](https://vercel.com/new) — zero config needed.

**Optional (recommended):** Add `YOUTUBE_API_KEY` in Vercel → Project Settings → Environment Variables for richer video metadata (view counts, durations). See `.env.example` for setup instructions. Without it, YouTube RSS still works and returns real videos.

---

## 📦 Local Development

```bash
cp .env.example .env.local   # add YOUTUBE_API_KEY if you have one
npm install
npm run dev                  # http://localhost:3000
```

---

## 🔴 Live Content Sources

Content is fetched automatically from these real sources:

### YouTube Channels (via RSS — no API key needed)
| Channel | Focus |
|---|---|
| The Lock Picking Lawyer | All levels, massive library |
| BosnianBill | Detailed lock analysis |
| LockNoob | Beginner-friendly walkthroughs |
| Deviant Ollam | Physical security, red team |

### Blogs & Feeds
| Source | Type |
|---|---|
| Art of Lock Picking | Blog/guides |
| r/lockpicking | Community posts |
| Medium (locksport tag) | Articles |

### How It Works
1. On first request, the API fetches all sources in parallel
2. Content is cached in memory for **1 hour**
3. Auto-tagging engine reads titles to assign topic tags and skill levels
4. Subsequent requests are served instantly from cache
5. Add `YOUTUBE_API_KEY` for full view counts, durations, and HD thumbnails

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── resources/
│   │       ├── route.ts          ← Main aggregation API (search, filter, cache)
│   │       └── [id]/route.ts     ← Single resource + related content
│   ├── page.tsx                  ← Homepage (live most-watched + recent)
│   ├── explore/page.tsx          ← Full search + filter UI
│   ├── videos/
│   │   ├── page.tsx              ← Video library
│   │   └── [id]/page.tsx         ← Video detail + embedded player
│   ├── articles/
│   │   ├── page.tsx              ← Article library
│   │   └── [id]/page.tsx         ← Article detail + in-app reader
│   ├── topics/
│   │   ├── page.tsx              ← Topic index with live counts
│   │   └── [tag]/page.tsx        ← Topic detail
│   ├── saved/page.tsx
│   ├── about/page.tsx
│   └── globals.css               ← Design system + CSS variables
├── components/
│   ├── Nav.tsx                   ← Sticky responsive navigation
│   ├── ResourceCard.tsx          ← 3-variant content card
│   └── LoadingStates.tsx         ← Skeletons, error states, empty states
└── lib/
    ├── aggregator.ts             ← YouTube RSS + Data API + RSS feed fetchers
    ├── data.ts                   ← Types, topic taxonomy, filter logic
    └── hooks.ts                  ← useResources, useResource client hooks
```

---

## ⚙️ Architecture

```
Browser → Next.js page (client component)
              ↓ fetch
         /api/resources?q=...&type=video&level=beginner
              ↓ if cache miss (>1hr)
         aggregateAllContent()
              ├── fetchYouTubeChannelRSS() × 4 channels
              ├── fetchRSSFeed() × 3 feeds
              └── fetchYouTubeChannel() × 4  (only if YOUTUBE_API_KEY set)
              ↓
         deduplicateResources()
              ↓
         filterResources() + paginate
              ↓
         JSON response → ResourceCard grid
```

### Adding More Sources

**New YouTube channel** — add one object to `YOUTUBE_CHANNELS` in `src/lib/aggregator.ts`:
```ts
{
  channelId: 'UC...',
  channelHandle: 'ChannelName',
  authorName: 'Display Name',
  defaultTags: ['pin-tumblers', 'theory'],
  defaultSkillLevel: 'intermediate',
}
```

**New RSS/blog feed** — add one object to `RSS_FEEDS`:
```ts
{
  url: 'https://yourblog.com/feed/',
  sourceName: 'Your Blog',
  sourceType: 'blog',
  author: 'Author Name',
  defaultTags: ['theory'],
  defaultSkillLevel: 'beginner',
}
```

That's it. No schema migrations, no code changes beyond these configs.

---

## 🎨 Design System

**Palette:** Warm dark background (#0E0D0B) with gold accent (#C9A84C)
**Typography:** Playfair Display (headings) + DM Sans (body) + DM Mono (labels)
**Details:** Film grain overlay, dot-grid hero, staggered fade-up animations

All design tokens live in CSS custom properties in `globals.css`. Change the accent color in one place to retheme the entire site.

---

## 🔒 Ethics

This platform aggregates educational content for:
- Locksport hobbyists
- Security professionals doing authorized work
- Locksmiths and students

**Never pick a lock you don't own or don't have permission to pick.**

Content is sourced exclusively from established educational creators. The About page prominently features community ethics guidelines.
