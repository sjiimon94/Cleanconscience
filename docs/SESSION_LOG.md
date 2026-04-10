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
## 2026-04-10 — P1 SEO + MDX infrastructure

Summary:
- Wired up @next/mdx properly in next.config.ts using createMDX/withMDX pattern so .md/.mdx files can be used as pages in src/app/ going forward. Added required src/mdx-components.tsx file. Existing blog rendering via content/blogg/ + gray-matter remains unchanged.
- Created src/app/sitemap.ts — generates /sitemap.xml with 12 static routes + dynamic blog slugs from getAllPosts() + dynamic podcast slugs from fetchEpisodes(). Uses safe base URL helper to avoid broken URLs during dev/early stages.
- Created src/app/robots.ts — generates /robots.txt allowing all crawling. Includes Sitemap line only when a real production domain is configured (omits it for localhost/example.com/TODO_DOMAIN).
- Added Twitter card metadata (summary_large_image) to src/app/layout.tsx matching existing OpenGraph values, in Swedish.
- Created src/lib/safe-base-url.ts helper shared by sitemap and robots: tries siteConfig.siteUrl, falls back to localhost:3000 in dev, https://example.com otherwise, and never outputs TODO_DOMAIN.

Implementation notes:
- Key files: next.config.ts, src/mdx-components.tsx, src/lib/safe-base-url.ts, src/app/sitemap.ts, src/app/robots.ts, src/app/layout.tsx
- Build output: 20/20 routes (18 existing + /sitemap.xml + /robots.txt)
- npm run lint ✅, npm run build ✅

Approved spec changes: None

## 2026-04-10 — Podcast header: cover image, title & description from config

Summary:
- Extended `PodcastConfig` in `config/site.ts` with optional `title`, `description`, and `image` fields.
- Set podcast title to "Ofiltrerat med Johanna och Cecilia", Swedish description, and cover image path `/images/podcast/ofiltrerat-cover.png`.
- Updated `/podcast` page (`src/app/podcast/page.tsx`) to import `siteConfig` and render a header section with cover image (via `next/image`) on the left and title + description on the right (desktop), stacked on mobile.
- Existing episode list UI preserved below the new header section.
- Fallback behaviour: if title/description/image are missing from config, defaults to "Podcast" title and generic Swedish description; image section hidden if not set.
- Added placeholder PNG at `public/images/podcast/ofiltrerat-cover.png` (to be replaced with real artwork).

Implementation notes:
- Files changed: `config/site.ts`, `src/app/podcast/page.tsx`, `public/images/podcast/ofiltrerat-cover.png`, `docs/SESSION_LOG.md`
- No new dependencies added
- `npm run build` ✅, `npm run lint` ✅

Approved spec changes: None
