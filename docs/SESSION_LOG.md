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

## 2026-05-20 — Option 2: exakta kommandon för att populera sjiimon94/stinab-ckerna.se nu

Summary:
- Dokumenterade en körbar, komplett kommandosekvens för användarens valda alternativ 2 (populera målrepo direkt från `book-site/` i `sjiimon94/Cleanconscience`).
- Kommandona följer den tidigare manuella extraktionsworkflowen, inklusive de tre fixarna och skapande av `.env.local.example`.

Manual command sequence (run on your local machine):
```bash
set -euo pipefail

git clone https://github.com/sjiimon94/Cleanconscience.git /tmp/cc
rm -rf /tmp/book-standalone
mkdir -p /tmp/book-standalone
cp -R /tmp/cc/book-site/. /tmp/book-standalone/
cd /tmp/book-standalone

# Fix 1: localhost fallback in layout.tsx
perl -pi -e 's|http://localhost:3001|http://localhost:3000|g' src/app/layout.tsx

# Fix 2: localhost fallback in checkout route
perl -pi -e 's|http://localhost:3001|http://localhost:3000|g' src/app/api/checkout/route.ts

# Fix 3: copyright name in footer
perl -pi -e 's|© \\{year\\} Cleanconscience|© {year} Cecilia Strandevall|g' src/components/Footer.tsx

# Add missing env example
cat > .env.local.example <<'EOF'
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SITE_URL=https://stinab-ckerna.se
EOF

git init
git add .
git branch -M main
git commit -m "feat: initial standalone extraction from Cleanconscience/book-site"
git remote add origin https://github.com/sjiimon94/stinab-ckerna.se.git
git push -u origin main
```

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

## 2026-04-13 — P2: Shopify docs, OG/brand assets, metadata review, placeholder-domain guard

Summary:
- Expanded Shopify "how to obtain values" documentation in `README.md` with step-by-step instructions for domain, Storefront Access Token, product IDs, and collection IDs (per PRODUCT_SPEC §8).
- Created default OG sharing image `public/images/og-default.png` (1200×630, emerald branding with site name + tagline).
- Wired `openGraph.images` and `twitter.images` in `src/app/layout.tsx` pointing to the new OG image — all pages now inherit a default share image.
- Created placeholder course image `public/images/courses/barnvaccinationer.jpg` to fix the missing asset referenced by `teachable.courses[0].image` in `src/config/site.ts` → rendered on `/kurser`.
- Added explicit `metadata` export to `src/app/page.tsx` (homepage) — the only route that was missing its own metadata. Title set to "Start" (Swedish).
- Metadata audit across all 14 route pages + layout: confirmed all title/description strings are Swedish (`sv-SE`). Dynamic routes (blog/podcast slugs) pull Swedish content; fallbacks ("Inlägg saknas", "Avsnitt saknas") are also Swedish.
- Added placeholder-domain guard to `ShopifyBuyButton`: when `shopifyDomain` is still the placeholder `dinbutik.myshopify.com`, the component skips SDK loading and shows the fallback link instead of making broken API calls.

Implementation notes:
- Files changed: `README.md`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/ShopifyBuyButton.tsx`, `docs/SESSION_LOG.md`
- Files created: `public/images/og-default.png`, `public/images/courses/barnvaccinationer.jpg`
- No new dependencies added
- `npm run lint` ✅, `npm run build` ✅ (20/20 routes)

Approved spec changes: None

## 2026-04-13 — Redefined config
Summary: “Dokumentation uppdaterad: korrekt config-sökväg är src/config/site.ts.”
Approved spec changes: None.

## 2026-04-16 — Theme update, Om/Kontakt copy + profile image, Twitter/X removal

Summary:
- **Theme**: Implemented "Nordisk natur minimalism + soft-tech pastels" theme with custom Tailwind v4 `@theme` tokens (warm-white, sand, misty-blue, sage, ink, clay). Updated Navbar, Footer, MobileMenu, homepage hero/CTA cards/sections, Om page, and Kontakt page to use the new palette. Rounded corners (xl/2xl), soft borders, subtle shadows, and warm tones throughout. CTA highlights use warm clay/orange accent.
- **Om page**: Rewrote with personal, warm Swedish copy about Cecilia Strandevall. Added profile image (`public/images/profilbild.jpeg`) using `next/image` with two-column desktop layout (image + text) and stacked mobile layout. Sections: intro, family/motivation, tone statement, daily life, what you'll find, Studio Cecilia, compass values, closing CTA.
- **Kontakt page**: Rewrote with provided Swedish copy including clear email display (`cecilia@strandevall.se`), seminar/workshop booking section with formats and details to include, and response time note.
- **Twitter/X removal**: Removed `x` from `SocialLinks` interface and `siteConfig.social` in `src/config/site.ts`. Removed X entry from Footer (`allSocialLinks`) and Socialt page (`allSocialPlatforms`). Deleted entire `twitter: { ... }` metadata block from `src/app/layout.tsx`.

Implementation notes:
- Files changed: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/om/page.tsx`, `src/app/kontakt/page.tsx`, `src/app/socialt/page.tsx`, `src/config/site.ts`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/MobileMenu.tsx`, `docs/SESSION_LOG.md`
- Files created: `public/images/profilbild.jpeg` (copy of existing Profilbild.jpg)
- No new dependencies added
- `npm run lint` ✅, `npm run build` ✅ (20/20 routes)

Approved spec changes: None

## 2026-04-16 — Homepage visual upgrade, latest episode fix, courses URL, Om bullet, animations

Summary:
- **Latest episode fix**: Updated `src/lib/podcast.ts` to sort episodes by `date` descending after parsing the RSS feed, so "Senaste avsnittet" on the homepage now truly shows the newest episode.
- **Courses URL + rename**: Changed all course URLs from `cleanconscience.teachable.com/p/barnvaccinationer` to `https://cecilia-strandevall-s-school.teachable.com/l/products?sortKey=name&sortDirection=asc&page=1`. Renamed "Våra kurser" / "Kurser" to "Mina kurser" on the homepage CTA, kurser page heading, and page metadata.
- **Om page bullet**: Replaced "Böcker och material – berättelser och innehåll som väcker tankar…" with "Barnböcker och merch – barnböcker som väcker samtal, och produkter med min logga som skapar samhörighet och gör det möjligt att stötta mitt arbete."
- **Theme & visual upgrade**: Redesigned homepage hero with deep forest gradient, organic radial blob shapes, and warm clay accents. Added `WaveDivider` component (SVG curves) between all homepage sections for flowing transitions. Updated globals.css with new theme tokens (`deep-forest`, `ocean-dark`), `.card-hover` transitions, and `prefers-reduced-motion` guards. Footer now uses deep-forest dark background with warm-white text. Navbar adds shadow, glass-blur, and focus ring for accessibility.
- **Animations**: Created `RevealOnScroll` client component using IntersectionObserver with fade-in + slide-up animation. Applied to homepage hero, CTA cards (staggered), product cards, podcast section, and blog cards. All animations respect `prefers-reduced-motion`.
- **Twitter/X removal**: Verified still fully removed (previous session). No X references in config, footer, socialt, or layout.

Implementation notes:
- Files changed: `src/app/page.tsx`, `src/app/globals.css`, `src/app/om/page.tsx`, `src/app/kurser/page.tsx`, `src/config/site.ts`, `src/lib/podcast.ts`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `docs/SESSION_LOG.md`
- Files created: `src/components/RevealOnScroll.tsx`, `src/components/WaveDivider.tsx`
- No new dependencies added
- `npm run lint` ✅, `npm run build` ✅ (20/20 routes)

Approved spec changes: None

## 2025-07-09 — Intern butik med Stripe + Resend

Summary:
- Ersatte Shopify-embed i `/butik` med intern produktkatalog driven av `src/data/products.ts`.
- Lade till produkt "Stina och mamma städar" (bilderbok, 179 kr) som första artikel.
- Implementerade kundvagn (localStorage, CartProvider/useCart), CartIcon i navbar (desktop + mobil).
- Skapade produktdetaljsida `/butik/[slug]` med bild, beskrivning, lagerstatus och "Lägg i varukorg"-knapp.
- Skapade varukorgssida `/varukorg` med antal-kontroller, ta-bort-knapp, totalsumma och kassaflöde.
- Integrerade Stripe Checkout (`/api/checkout`) för betalning i SEK, frakt begränsad till Sverige.
- Stripe webhook (`/api/webhook`) skickar orderbekräftelse via Resend.
- Skapade success- (`/checkout/success`) och avbryt-sidor (`/checkout/cancel`).
- SVG-platshållarbild för boken på `public/images/books/stina-och-mamma-stadar.svg`.
- Uppdaterade `next.config.ts` med `dangerouslyAllowSVG` för next/image-kompatibilitet.
- Sitemap utökad med `/varukorg` och `/butik/[slug]`-rutter.

Implementation notes:
- Stripe och Resend initialiseras lazy (inuti handlers) för att undvika build-time-fel utan env-vars.
- Använd Stripe API-version `2026-04-22.dahlia` (senaste i installerad version 22.x).
- Env vars som krävs: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`.
- `npm run build` ✅ (24/24 routes)

Approved spec changes:
- Butiken använder nu intern produktkatalog + Stripe istället för Shopify-embed. ShopifyBuyButton.tsx behålls men används inte på butik-sidan längre.

## 2026-05-05 — Ecofilter-länk, utvalda produkter, kursbild, footer, stödsida, frakt 29 kr, Swish

Summary:
- **Ecofilter of Sweden**: Lade till en synlig partner-sektion på startsidan med extern CTA-knapp till ecofilterofsweden.se. Lade även till länk i footerns "Stötta"-kolumn. Inga Ecofilter-produkter kan köpas direkt på Cleanconscience-sidan.
- **Utvalda produkter (startsidan)**: Ersatte ShopifyBuyButton-platshållare (3 dummy-produkter) med riktiga produktkort från intern katalog (`src/data/products.ts`). Sektionen visar nu bara köpbara produkter (inStock=true); om det bara finns 1 produkt visas 1 kort.
- **Kursbild borttagen**: Tog bort bildegenskapen från "Kurser"-CTA-kortet på startsidan (barnvaccinationer.jpg visades inte längre).
- **Footer omgjord**: Tog bort den mörka deep-forest-sektionen (som upplevdes som ett duplikat av headern). Logo, sociala länkar och copyright integrerades i den befintliga sand-bakgrundssektionen. Bröderna Strandevall-attributionen sammanfogades i copyright-raden.
- **Stödsida `/stod`**: Skapade ny sida med Patreon-knapp/länk, Swish-betalningsnummer och info om Swish i kassan. Lade till "Stöd" i navigationsfältet och "Stöd projektet" i footer.
- **Fraktkostnad 29 kr**: Uppdaterade varukorgssidan att visa 29 kr frakt separat i summeringen. Uppdaterade Stripe checkout-API att inkludera 29 kr som en separat rad ("Frakt (Sverige)"). Uppdaterade `/frakt`-sidan med korrekt information.
- **Stripe + Swish Handel**: Lade till `"swish"` i `payment_method_types` i checkout-API:et. Swish visas som betalningsalternativ i Stripe Checkout om det är aktiverat i Stripe Dashboard.

Implementation notes:
- Filer ändrade: `src/app/page.tsx`, `src/components/Footer.tsx`, `src/app/api/checkout/route.ts`, `src/app/varukorg/page.tsx`, `src/app/frakt/page.tsx`, `src/app/sitemap.ts`, `config/navigation.ts`
- Filer skapade: `src/app/stod/page.tsx`
- **Manuellt steg – Swish i Stripe**: Logga in på Stripe Dashboard → Settings → Payment methods → aktivera "Swish". Swish kräver att kunden har ett svenskt mobilnummer. Kräver inget ytterligare kodarbete.
- **Manuellt steg – Swish-nummer på `/stod`**: Ersätt platshållaren `"123 456 78 90"` i `src/app/stod/page.tsx` med korrekt Swish-nummer.
- `npm run build` ✅ (25/25 routes)

Approved spec changes:
- Frakten är inte längre gratis – 29 kr tillkommer per beställning (frakt begränsad till Sverige).
- Ny route `/stod` tillagd (stöd/donations-sida).
- Startsidan "Utvalda produkter" använder nu intern produktkatalog istället för Shopify-embed.

## 2026-05-07 — Hydration-fix, textändringar, "Stötta"-validering

Summary:
- **Hydration-fix (CartContext)**: Ändrade `useState<CartItem[]>(readCart)` till `useState<CartItem[]>([])` + separat `useEffect` som läser localStorage efter mount. Servern och klienten renderar nu alltid en tom kundvagn på första render, vilket eliminerar hydration-mismatch.
- **Ta bort "Öppna kursplattformen"**: Tog bort `<p>Öppna kursplattformen ↗</p>` från Kurser-CTA-kortet på startsidan.
- **Ta bort "eller besök vår butik"**: Kortade ner texten under "Utvalda produkter" från "Handla direkt eller besök vår butik." till "Handla direkt."
- **Stötta-knapp 404-fix**: Lade till URL-validering i `Navbar.tsx` – knappen visas nu bara om `patreonUrl` börjar med `https://` eller `http://`. Tom sträng, placeholder eller relativ sökväg döljer knappen.

Implementation notes:
- Filer ändrade: `src/context/CartContext.tsx`, `src/app/page.tsx`, `src/components/Navbar.tsx`, `docs/SESSION_LOG.md`
- Inga nya dependencies
- Svenska UI-texter bibehållna
- PRODUCT_SPEC.md ej ändrad

Approved spec changes: None

## 2026-05-18 — Deployment configuration and domain setup

Summary:
- Set `siteUrl` to `https://cleanconscience.se` in `src/config/site.ts` (was `https://TODO_DOMAIN`). This activates the sitemap.xml and robots.txt Sitemap directive for production.
- Fixed `contactEmail` to `cecilia@strandevall.se` (was the placeholder `sjiimon94@gmail.com`; the kontakt page already used the correct email).
- Added a "Publicering (Vercel)" section to `README.md` with:
  - Step-by-step Vercel project import and deploy guide
  - Required and optional environment variables table
  - DNS configuration for `cleanconscience.se` apex (A → 76.76.21.21) and www (CNAME → cname.vercel-dns.com)
- Marked the "Domän" item as done in the README pre-launch checklist.
- Updated "Drift" line in README header to reference `cleanconscience.se` and the new section.

Implementation notes:
- Files changed: `src/config/site.ts`, `README.md`, `docs/SESSION_LOG.md`
- No new dependencies added

Approved spec changes: None

## 2026-05-18 — Standalone book sales website (book-site/)

Summary:
- Created a fully standalone, single-page book sales website in `book-site/` — its own Next.js app, separate from cleanconscience.se.
- Purpose: sell the children's picture book "Stina och mamma städar" directly online.
- Single-page sales design: Hero → Value props → Book description → How to buy → Pricing & shipping → Policies → FAQ → Final CTA.
- Direct Stripe Checkout integration (no cart, single-product flow): POST /api/checkout → Stripe hosted checkout → /checkout/success or /checkout/cancel.
- All UI text in Swedish (`sv-SE`).

Implementation notes:
- Key files: `book-site/src/app/page.tsx`, `book-site/src/app/layout.tsx`, `book-site/src/app/api/checkout/route.ts`, `book-site/src/components/` (Navbar, Hero, ValueProps, BookDescription, HowToBuy, PricingShipping, Policies, FAQ, FinalCTA, Footer, BuyButton).
- Tailwind CSS v4 with custom design tokens (warm editorial palette: cream, forest green, clay, sage).
- Placeholder book cover at `book-site/public/book-cover.svg` — replace with real cover.
- All content placeholders clearly marked with `[REPLACE]` comments in code.
- Pricing matches main site: 179 kr + 29 kr frakt.
- Excluded `book-site/` from main site's `tsconfig.json` to prevent cross-contamination.
- Both `npm run build` (main site) and `book-site/npm run build` ✅ (5/5 routes).
- Setup documented in `book-site/README.md`.

Approved spec changes: None

## 2026-05-19 — Prepare book-site for standalone extraction

Summary:
- Applied all file edits to `book-site/` required before extracting it into its own repo.

Implementation notes:
- `book-site/next.config.ts`: removed `turbopack.root` workaround and `import path` (only needed when nested inside monorepo).
- `book-site/.gitignore`: expanded with standard Next.js ignores (`*.tsbuildinfo`, `next-env.d.ts`, `.vercel`, `*.pem`, debug logs).
- `book-site/.env.local.example`: created — README referenced this file but it was missing from the repo.
- `book-site/README.md`: removed `cd book-site` step, removed monorepo disclaimer, updated `PORT=3001` → default port, updated Vercel instructions (Root Directory is now `/` not `book-site/`), updated project structure listing to reflect repo-root layout.

Remaining manual steps (cannot be automated here):
1. Create new GitHub repo (e.g. `stina-och-mamma-stadar-site`), do not initialize it.
2. `cp -r book-site/ /path/to/new-local-dir && cd /path/to/new-local-dir`
3. `git init && git add . && git commit -m "init: extract from Cleanconscience monorepo"`
4. `git remote add origin https://github.com/sjiimon94/<new-repo>.git && git branch -M main && git push -u origin main`
5. Create new Vercel project pointing at the new repo; Root Directory = `/`.
6. Add env vars: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`.
7. After verifying the new repo builds and deploys: `git rm -r book-site/` in this repo, PR and merge.

Approved spec changes: None


## 2026-05-19 — Extract book-site into sjiimon94/stinab-ckerna.se

Summary:
- Prepared a clean, standalone copy of `book-site/` for `sjiimon94/stinab-ckerna.se`.
- The agent environment token is scoped to `Cleanconscience` only; the actual push to `stinab-ckerna.se` requires one manual command (see below).

Implementation notes:
- All 26 files from `book-site/` staged at `/tmp/stinab-ckerna/` with three minimal extraction fixes applied:
  1. `src/app/layout.tsx` — fallback `localhost:3001` → `localhost:3000`
  2. `src/app/api/checkout/route.ts` — fallback `localhost:3001` → `localhost:3000`
  3. `src/components/Footer.tsx` — copyright `Cleanconscience` → `Cecilia Strandevall`
- `.env.local.example` created (was described in PR #17 description but omitted from the actual commit).
- All `[REPLACE]` placeholders intentionally preserved (book cover, SEO domain, policies, FAQ, etc.).
- A local git repo was initialized and committed in `/tmp/stinab-ckerna` (see manual step below).

Manual step required:
Since the agent token only has write access to this repo, run this on your local machine:

```bash
# Option A — push from tmp (if running on same machine the agent used):
cd /tmp/stinab-ckerna
git remote set-url origin https://github.com/sjiimon94/stinab-ckerna.se.git
git push -u origin main

# Option B — fresh copy anywhere:
git clone https://github.com/sjiimon94/Cleanconscience.git /tmp/clone-src
cp -r /tmp/clone-src/book-site/. /tmp/stinab-standalone/
cd /tmp/stinab-standalone
# apply the three fixes in the notes above, then:
git init && git add . && git branch -M main
git commit -m "feat: initial standalone extraction from Cleanconscience/book-site"
git remote add origin https://github.com/sjiimon94/stinab-ckerna.se.git
git push -u origin main
```

After verifying `stinab-ckerna.se` is live:
- Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL` in Vercel env vars
- Then open a PR in this repo to `git rm -r book-site/`

Approved spec changes: None

## 2026-05-20 — Investigation: why PR #18 does not appear in sjiimon94/stinab-ckerna.se

Summary:
- Investigated PR #18 (`sjiimon94/Cleanconscience#18`) at the user's request after they noticed no changes in `sjiimon94/stinab-ckerna.se`.

Findings:

1. **PR #18 is entirely within `sjiimon94/Cleanconscience`.**
   - Head: `sjiimon94/Cleanconscience` branch `copilot/extract-standalone-nextjs-app`
   - Base: `sjiimon94/Cleanconscience` branch `main`
   - Neither repository pointer refers to `sjiimon94/stinab-ckerna.se`.

2. **PR #18 only touches one file: `docs/SESSION_LOG.md` (+41 lines).**
   - It records the extraction plan and manual steps needed to populate `stinab-ckerna.se`.
   - No source code was pushed to `stinab-ckerna.se` by that PR or its merge.

3. **A manual push step is still required.**
   - The agent token used in that session was scoped to `Cleanconscience` only, so the actual push to `stinab-ckerna.se` was left as a documented manual command.
   - The commands are recorded in the "2026-05-19 — Extract book-site into sjiimon94/stinab-ckerna.se" entry above.

Conclusion:
**Nothing from PR #18 should appear in `sjiimon94/stinab-ckerna.se` automatically — that is by design.**
To populate `stinab-ckerna.se`, the user must execute the manual push commands from the 2026-05-19 entry (Option A or Option B) on their local machine.

Approved spec changes: None

## 2026-05-20 — Domain migration to ceciliastrandevall.se + admin panel + legal pages

Summary:
- Deleted `book-site/` subdirectory (separate standalone app, no longer needed in this repo).
- Updated domain and brand: `siteUrl` → `https://ceciliastrandevall.se`, `siteName` → `"Cecilia Strandevall"`, updated description.
- Updated Resend `from` address to `noreply@ceciliastrandevall.se` and email signature to "Cecilia Strandevall".
- Updated OG image alt text in `layout.tsx`.
- Updated Footer with seller identification: org.nr 559163-8712, address, clickable email.
- Replaced all four legal page drafts with complete, final texts (villkor, integritetspolicy, retur, frakt). Removed OBS-banner, set date to 2026-05-20.
- Built admin panel: `/admin` (client component with sessionStorage login), `/api/admin/orders` (GET), `/api/admin/orders/[id]` (PATCH), `src/proxy.ts` (protects `/api/admin/*`).
- Extended webhook to save orders to `data/orders.json` (created automatically if missing).
- Added `data/orders.json` to `.gitignore`.
- Refactored `/checkout/success` to async Server Component with Stripe payment verification; extracted `CartClearer` client component for `clearCart()`.
- Added Umami Analytics script via `next/script` with `NEXT_PUBLIC_UMAMI_WEBSITE_ID` env guard.
- Updated `robots.ts` to disallow `/admin` and `/api`.
- Updated README: domain references, env vars table (ADMIN_PASSWORD, NEXT_PUBLIC_UMAMI_WEBSITE_ID), new Admin-panel and Analytics sections, Stripe webhook URL.
- Created `.env.local.example` with all environment variables documented.

Implementation notes:
- Key files touched: `src/config/site.ts`, `src/app/api/webhook/route.ts`, `src/app/layout.tsx`, `src/components/Footer.tsx`, `src/app/villkor/page.tsx`, `src/app/integritetspolicy/page.tsx`, `src/app/retur/page.tsx`, `src/app/frakt/page.tsx`, `src/app/api/admin/orders/route.ts`, `src/app/api/admin/orders/[id]/route.ts`, `src/app/admin/page.tsx`, `src/app/admin/layout.tsx`, `src/proxy.ts`, `src/app/checkout/success/page.tsx`, `src/components/CartClearer.tsx`, `src/app/robots.ts`, `README.md`, `.env.local.example`
- No new npm dependencies added.
- `data/orders.json` is gitignored and created at runtime by the webhook handler.

Approved spec changes:
- None

## 2026-08-06 — Major restructure: remove e-commerce, add Utforska hub

Summary:
- Removed all internal e-commerce: butik, varukorg, checkout, Stripe checkout API, webhook, admin panel, order handling, CartContext, CartIcon, CartClearer, AddToCartButton, ShopifyBuyButton, products.ts, proxy.ts, external-writings.ts, frakt/retur pages.
- Introduced new top-level navigation item "Utforska" with desktop dropdown and mobile submenu.
- Created /utforska overview page with category grid.
- Created /utforska/produkter (book info page with external CTA).
- Created /utforska/vattenfilter (info page with external CTA to Ecofilters of Sweden).
- Created /utforska/publiceringar (publications grid from src/data/publications.ts).
- Created src/data/publications.ts as simple data source for adding new publications via URL.
- Updated navigation (config/navigation.ts) with NavItem type supporting children for dropdown.
- Updated Navbar with CSS hover dropdown for desktop.
- Updated MobileMenu with expandable submenu.
- Updated Footer (removed Butik/Frakt/Retur, added Utforska links, renamed Skrifter → Publiceringar).
- Updated homepage: removed product section, butik CTA, "Handla direkt" copy; added "Utforska mer" CTA; renamed Skrifter → Publiceringar.
- Updated layout.tsx to remove CartProvider.
- Updated site config to remove ShopifyConfig.
- Added redirects in next.config.ts for old routes (butik, varukorg, checkout, frakt, retur).
- Updated sitemap.ts to reflect new routes.
- Updated blogg/page.tsx to remove external-writings dependency; renamed title to Publiceringar.
- Updated README.md with new structure, removed all Stripe/Resend/Shopify/admin docs.
- Updated PRODUCT_SPEC.md to reflect content hub model.

Implementation notes:
- Key files created: src/app/utforska/page.tsx, src/app/utforska/produkter/page.tsx, src/app/utforska/vattenfilter/page.tsx, src/app/utforska/publiceringar/page.tsx, src/data/publications.ts
- Key files removed: src/app/butik/**, src/app/varukorg/**, src/app/checkout/**, src/app/admin/**, src/app/api/**, src/app/frakt/**, src/app/retur/**, src/components/CartIcon.tsx, src/components/CartClearer.tsx, src/components/AddToCartButton.tsx, src/components/ShopifyBuyButton.tsx, src/context/CartContext.tsx, src/data/products.ts, src/data/external-writings.ts, src/proxy.ts
- Build passes: `npm run build` succeeds with all new routes.

Approved spec changes:
- Updated PRODUCT_SPEC §1 (North Star): content hub model, no internal e-commerce
- Updated PRODUCT_SPEC §2 (Hard Requirements): removed Stripe/payment, added "no internal payment"
- Updated PRODUCT_SPEC §3 (Non-goals): added "no internal e-commerce"
- Updated PRODUCT_SPEC §5 (Config): removed Shopify config
- Updated PRODUCT_SPEC §6 (Routes): new Utforska routes, removed butik/varukorg/checkout/frakt/retur
- Updated PRODUCT_SPEC §8: replaced Shopify Buy Button with Publications Data Source
