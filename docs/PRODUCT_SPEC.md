# Cleanconscience — Product Specification (Authoritative)

## Policy (Authoritative vs Log)

This document is the project’s **authoritative specification**.

- Only update the **authoritative spec** when a decision is explicitly confirmed/approved.
- All other notes, explorations, partial ideas, and session summaries must go into `docs/SESSION_LOG.md` with a date stamp.
- If `docs/SESSION_LOG.md` conflicts with this spec, this spec wins **unless** the log explicitly says it is an **“Approved spec change”**.

---

## 1) North Star / Goal

Build an MVP public website for the Swedish company **Cleanconscience** (exact casing) that acts as a content and link hub for:
- Physical products (books) — link out to external bookshop
- Video courses (currently Teachable) — link out
- Podcast (Spotify-hosted; use RSS for listing/episode pages)
- Vattenfilter (link out to Ecofilters of Sweden)
- Publications / external writings
- Social media links

No internal e-commerce, payment, cart, or checkout. Primary market: **Sweden**.

---

## 2) Hard Requirements (MUST)

- Low operating cost.
- Single GitHub repo.
- No custom login/auth in MVP.
- No comments.
- No internal payment or e-commerce.
- UI language: **Swedish only** (`sv-SE`) for user-facing text.
- Content hub: link out to external shops/services for purchases.

---

## 3) Non-goals (MVP)

- No internal e-commerce / Stripe checkout.
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
- `siteName: "Cecilia Strandevall"`
- `siteUrl: "https://ceciliastrandevall.se"`
- `locale: "sv-SE"`
- `contactEmail: "cecilia@strandevall.se"`
- Optional social links: instagram, tiktok, youtube, facebook
- teachable: school URL + per-course URLs
- podcast: RSS URL should come from env var (`PODCAST_RSS_URL`)

---

## 6) Routes / Pages (MVP)

1. `/` Start
   - Hero (Swedish)
   - 4 CTA cards: Produkter, Kurser, Podcast, Publiceringar
   - Latest podcast episode (from RSS)
   - Latest blog posts (3)

2. `/utforska` Overview hub
   - Grid cards linking to: Produkter, Vattenfilter, Kurser, Podcast, Publiceringar

3. `/utforska/produkter`
   - Book info page with external CTA to bookshop

4. `/utforska/vattenfilter`
   - Info page with external CTA to Ecofilters of Sweden

5. `/utforska/publiceringar`
   - Publications grid from `src/data/publications.ts`
   - Each entry has: title, description, type tag, date, outlet, image (all optional except url)

6. `/kurser`
   - Course cards (Swedish) linking to Teachable

7. `/podcast`
   - Fetch and parse RSS from `PODCAST_RSS_URL`
   - Episode pages: `/podcast/[slug]`

8. `/blogg`
   - List MDX posts (newest first)
   - Post pages: `/blogg/[slug]`

9. `/socialt` — Social links
10. `/om` — About (MDX)
11. `/kontakt` — Contact
12. `/stod` — Support page

Policy pages: `/integritetspolicy`, `/villkor`

Global:
- Responsive navbar: Start, Utforska (dropdown with sub-items), Socialt, Om, Kontakt, Stöd
- Footer: Utforska links + Hjälp + Om + social links + copyright
- Accessibility: semantic HTML, good contrast, keyboard navigation
- SEO: metadata per page (Swedish), OpenGraph

---

## 7) Content Requirements

- Blog MDX frontmatter: `title`, `date`, `excerpt`
- Provide 3 example blog posts in Swedish (placeholder OK)

---

## 8) Publications Data Source

Maintain `src/data/publications.ts` with a typed `Publication[]` array.
Each entry requires only `url`. Optional fields: `title`, `description`, `image`, `type`, `date`, `outlet`.
New publications are added by adding entries to this array (newest first).

---

## 9) Definition of Done

- Code ready in repo
- `npm run build` passes
- Short summary + setup checklist documented (in README and/or docs)
