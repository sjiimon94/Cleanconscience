# Session Log (append-only)

Append-only dated notes, decisions, and rationale.
If something is not an explicitly approved spec change, it belongs here (not in PRODUCT_SPEC).
Every work session must add a dated entry.
If no spec/requirements changed, the entry must explicitly say: “Approved spec changes: None”.
---

## 2026-04-09 — Spec + log structure introduced

- Decided to keep an authoritative spec in `docs/PRODUCT_SPEC.md`.
- Decided to keep historical/stamped notes in `docs/SESSION_LOG.md` (append-only).
- Docs will be in English even though the site UI must be Swedish.

Approved spec changes:
- Added the “Policy (Authoritative vs Log)” section to PRODUCT_SPEC.

## 2026-04-09 — P0 implementation: homepage, all routes, blog content

Summary:
- Replaced the default Next.js starter homepage with a full Swedish homepage featuring: hero section, 4 CTA cards (Butik, Kurser, Podcast, Blogg), "Utvalda produkter" section with ShopifyBuyButton embeds (uses configured product IDs or placeholders with fallback), "Senaste podcastavsnittet" with graceful empty state, and "Senaste blogginläggen" showing latest 3 posts with graceful empty state.
- Created all MVP routes per PRODUCT_SPEC §6:
  - `/butik` – Three categories (Böcker, Vattenfiltrering, Merch) with Shopify collection embeds or fallback placeholder
  - `/kurser` – Course cards from config linking to Teachable, with note about external hosting
  - `/podcast` – Episode list from RSS (newest first) with empty state
  - `/podcast/[slug]` – Episode detail with Spotify embed or HTML5 audio fallback
  - `/blogg` – Blog post list (newest first) with empty state
  - `/blogg/[slug]` – Individual post rendered from MDX via markdown-to-html
  - `/socialt` – Social media links from config with empty state
  - `/om` – About page with Swedish text
  - `/kontakt` – Contact page with mailto link
  - `/integritetspolicy`, `/villkor`, `/retur`, `/frakt` – Policy draft templates with clear disclaimer banners
- Created `content/blogg/` with 3 Swedish placeholder MDX posts (vattenfiltrering-hemma, medvetna-val-i-vardagen, barnbocker-som-utbildar) with required frontmatter (title, date, excerpt)
- All pages use server components by default; only ShopifyBuyButton remains a client component (pre-existing)
- All UI text is Swedish. No new dependencies added.
- `npm run build` passes with all 18 routes.

Implementation notes:
- Blog detail pages use `remark` + `remark-html` (existing libs) to render MDX content as HTML
- Podcast pages use existing `src/lib/podcast.ts` (fetchEpisodes / getEpisodeBySlug)
- ShopifyBuyButton fallback works when Shopify config is missing
- Dynamic routes use `generateStaticParams` for SSG

Approved spec changes: None

## 2026-04-10 — Real social links, "Fler plattformar", Spotify show ID, podcast RSS docs

Summary:
- Updated primary social links in `config/site.ts`:
  - Instagram → https://www.instagram.com/ceciliastrandevall/
  - YouTube → https://www.youtube.com/@ceciliaberg2701?app=desktop
  - Facebook → https://www.facebook.com/cecilia.berg.3/
- These links now appear automatically in the footer and on `/socialt`.
- Added a "Fler plattformar" section on `/socialt` only (not in footer):
  - Ecofilter of Sweden (Instagram) → https://www.instagram.com/ecofilterofsweden/
  - Rumble → https://rumble.com/user/ceciliastrandevall?e9s=src_v1_cbl
- Set Spotify show ID default to `063j4LSHHIJaPbjSsCElDW` in `config/site.ts` (`podcast.spotifyShowId`). The env var `NEXT_PUBLIC_SPOTIFY_SHOW_ID` still overrides if set.
- Updated `README.md` to document the correct `PODCAST_RSS_URL` value: `https://feed.podbean.com/Ofiltreratmjohannaocecilia/feed.xml`

Implementation notes:
- Files changed: `config/site.ts`, `src/app/socialt/page.tsx`, `README.md`, `docs/SESSION_LOG.md`
- No new dependencies added
- All UI text remains Swedish

Approved spec changes: None
