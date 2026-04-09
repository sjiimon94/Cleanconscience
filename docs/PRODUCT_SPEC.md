# Cleanconscience — Product Specification (Authoritative)

## Policy (Authoritative vs Log)

This document is the project’s **authoritative specification**.

- Only update the **authoritative spec** when a decision is explicitly confirmed/approved.
- All other notes, explorations, partial ideas, and session summaries must go into `docs/SESSION_LOG.md` with a date stamp.
- If `docs/SESSION_LOG.md` conflicts with this spec, this spec wins **unless** the log explicitly says it is an **“Approved spec change”**.

---

## 1) North Star / Goal

Build an MVP public website for the Swedish company **Cleanconscience** (exact casing) that acts as a hub for:
- Physical products (books, water filtration, merch) — purchased via Shopify (embed where possible)
- Video courses (currently Teachable) — link out in MVP
- Podcast (Spotify-hosted; use RSS for listing/episode pages)
- Blog (simple, chronological)
- Social media links

Primary market: **Sweden**.

---

## 2) Hard Requirements (MUST)

- Low operating cost.
- Single GitHub repo.
- No custom login/auth in MVP.
- No comments.
- No custom payment flow in MVP.
- UI language: **Swedish only** (`sv-SE`) for user-facing text.
- Shipping: **Sweden only**.
- Prefer keeping visitors on the main website even when shopping (use Shopify embeds; keep fallback links).

---

## 3) Non-goals (MVP)

- No full headless Shopify storefront.
- No tagging/search system for blog.
- No complex community features.

---

## 4) Tech / Architecture Constraints

- Next.js (App Router) + TypeScript
- Tailwind CSS
- MDX for blog posts + static pages stored in repo
- Deploy-ready for Vercel
- Minimal dependencies
- Performance-focused (avoid heavy client JS)

---

## 5) Configuration Contract

Create/maintain `config/site.ts` with at least:
- `siteName: "Cleanconscience"`
- `siteUrl: "https://TODO_DOMAIN"` (replace for production)
- `locale: "sv-SE"`
- `currency: "SEK"`
- `contactEmail: "sjiimon94@gmail.com"`
- Optional social links: instagram, tiktok, youtube, x, facebook
- shopify:
  - domain
  - buy button fallback URL
  - optional product/collection IDs
- teachable:
  - school URL + per-course URLs
- podcast:
  - RSS URL should come from env var (`PODCAST_RSS_URL`)

---

## 6) Routes / Pages (MVP)

1. `/` Start
   - Hero (Swedish)
   - 4 clear CTA cards: Butik, Kurser, Podcast, Blogg
   - Featured products (Shopify embeds; placeholder IDs OK)
   - Latest podcast episode (from RSS)
   - Latest blog posts (3)

2. `/butik`
   - Categories: Böcker, Vattenfiltrering, Merch
   - Each category: embedded Shopify collection/product grid if configured; otherwise placeholder + button to Shopify fallback
   - Clear text: “Frakt inom Sverige”.

3. `/kurser`
   - Course cards (Swedish)
   - At least one course: “Barnvaccinationer” (ordered video series)
   - Buttons link to Teachable (MVP)
   - Explain courses hosted externally

4. `/podcast`
   - Fetch and parse RSS from `PODCAST_RSS_URL`
   - List episodes (newest first)
   - Episode pages: `/podcast/[slug]` with embedded Spotify if possible else HTML5 audio enclosure
   - Robust error handling

5. `/blogg`
   - List MDX posts (newest first)
   - Post pages: `/blogg/[slug]`

6. `/socialt`
   - Social buttons/links from config

7. `/om` (MDX)

8. `/kontakt`
   - Swedish contact text
   - `mailto:` link to contact email
   - Optional mailto form UI

9. Policy pages (MDX drafts with disclaimer they are templates):
   - `/integritetspolicy`, `/villkor`, `/retur`, `/frakt`

Global:
- Responsive navbar: Start, Butik, Kurser, Podcast, Blogg, Socialt, Om, Kontakt
- Footer: social links + policy links + copyright
- Accessibility: semantic HTML, good contrast, keyboard navigation
- Design: clean, modern, neutral
- SEO: metadata per page (Swedish), OpenGraph/Twitter, sitemap.xml, robots.txt

---

## 7) Content Requirements

- Blog MDX frontmatter: `title`, `date`, `excerpt`
- Provide 3 example blog posts in Swedish (placeholder OK)

---

## 8) Shopify Buy Button Requirements

- Provide a `<ShopifyBuyButton />` component that can render product or collection via ID.
- Load Shopify Buy Button script only once (client-side).
- If config missing: show fallback button linking to fallback URL.
- Document how to obtain Shopify values and where to set them.

---

## 9) Definition of Done

- Code ready in repo
- `npm run build` passes
- Short summary + setup checklist documented (in README and/or docs)
