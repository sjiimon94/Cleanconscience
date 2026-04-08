You are Claude Code. Build an MVP public website for a Swedish company named “Cleanconscience” (exact casing).

Mål:
En snabb, SEO-vänlig webbplats (utan krav på inloggning) som fungerar som nav för:
- Fysiska produkter (barnböcker, vattenfiltreringssystem, merch) – köp via Shopify
- Videokurser (idag på Teachable; länka ut i MVP)
- Podcast (hostas via Spotify; lista avsnitt + avsnittssidor med inbäddad spelare)
- Blogg (enkelt, kronologiskt)
- Sociala medier (länkar)

Krav / prioriteringar:
- Så billigt som möjligt i drift
- En enda GitHub-repo
- Ingen egen inloggning, inga kommentarer, ingen egen betalning i MVP
- Besökare ska i möjligaste mån “stanna” på huvudwebbplatsen vid shopping
- Sverige som marknad: frakt endast inom Sverige
- Språk: svenska (endast svenska UI-texter)

Handelsstrategi (för att “stanna på huvudwebbplatsen”):
- Använd Shopify Buy Button / inbäddning på sidor (kollektioner/produkter) för utvalda produkter.
- Ha alltid en fallback-länk till full Shopify-butik vid saknad konfiguration.
- Bygg INTE en full headless Shopify-storefront i MVP.

Teknik:
- Next.js (App Router) + TypeScript
- Tailwind CSS
- MDX för blogginlägg och statiska sidor i repot
- Deploy-klart för Vercel
- Minimalt med beroenden.

Konfiguration:
Skapa /config/site.ts med:
- siteName: "Cleanconscience"
- siteUrl: "https://TODO_DOMAIN"
- locale: "sv-SE"
- currency: "SEK"
- contactEmail: "sjiimon94@gmail.com"
- social links (valfritt): instagram, tiktok, youtube, x, facebook
- shopify:
  - SHOPIFY_DOMAIN (t.ex. dinbutik.myshopify.com)
  - BUY_BUTTON_FALLBACK_URL (länk till Shopify-butiken)
  - valfritt: PRODUCT_IDS / COLLECTION_IDS för inbäddningar
- teachable:
  - TEACHABLE_SCHOOL_URL + per-kurs URL:er
- podcast:
  - PODCAST_RSS_URL (sätts som env var)

Sidor / routes:
1) "/" (Start)
   - Hero med kort svensk beskrivning av Cleanconscience
   - 4 tydliga CTA-kort: Butik, Kurser, Podcast, Blogg
   - Sektion “Utvalda produkter” med 3–6 Shopify inbäddningar (placeholder IDs ok)
   - “Senaste podcastavsnittet” (från RSS)
   - “Senaste blogginläggen” (3 st)

2) "/butik"
   - Kategorier: Böcker, Vattenfiltrering, Merch
   - Varje kategori visar:
     - inbäddad Shopify-kollektion eller produktgrid (om konfigurerat)
     - annars en snygg placeholder + knapp “Handla i butiken” (länk till Shopify)
   - Tydlig text: “Frakt inom Sverige”.

3) "/kurser"
   - Kurskort med svensk text
   - Minst en kurs: “Barnvaccinationer” (videoserie i ordning)
   - “Gå till kurs / Köp kurs” knappar länkar till Teachable (MVP)
   - Förklara att kurserna just nu är hostade externt.

4) "/podcast"
   - Hämta och parsa RSS från PODCAST_RSS_URL
   - Lista avsnitt (nyast först): titel, datum, kort beskrivning, länk
   - Avsnittssidor: "/podcast/[slug]"
     - Titel, datum, full beskrivning
     - Inbäddad Spotify-spelare om möjligt, annars HTML5-audio via enclosure URL
   - Robust felhantering om RSS inte går att hämta.

5) "/blogg"
   - Lista MDX-inlägg (nyast först)
   - Inläggssidor: "/blogg/[slug]"
   - Inga taggar/sök i MVP.

6) "/socialt"
   - Länkar/knappar till sociala medier från config
   - Inga API-nycklar krävs.

7) "/om" (MDX)
8) "/kontakt"
   - Svensk kontakttext
   - mailto-länk till contactEmail (ingen backend)
   - Valfritt: enkel formulär-UI som skickar via mailto.

9) Policy-sidor (MDX-utkast, med tydlig disclaimer att detta är malltext som måste granskas):
   - "/integritetspolicy"
   - "/villkor"
   - "/retur"
   - "/frakt"
   Anpassa till Sverige (SEK, frakt endast inom Sverige) men håll generiskt.

Globalt:
- Responsiv navbar: Start, Butik, Kurser, Podcast, Blogg, Socialt, Om, Kontakt
- Footer: sociala länkar + policy-länkar + copyright
- Tillgänglighet: semantisk HTML, bra kontrast, tangentbordsnavigering
- Design: ren, modern, neutral.

SEO + teknik:
- Metadata per sida (svenska titlar och beskrivningar)
- OpenGraph/Twitter
- sitemap.xml och robots.txt
- prestanda-fokus (undvik tung klient-JS)

Innehåll:
- MDX frontmatter för blogginlägg: title, date, excerpt
- Skapa 3 exempel-inlägg på svenska (placeholder-innehåll).

Shopify Buy Button:
- Implementera en komponent <ShopifyBuyButton /> som kan rendera produkt eller kollektion via ID.
- Ladda Shopify Buy Button script endast en gång (client-side).
- Fallback om config saknas: visa knapp som länkar till BUY_BUTTON_FALLBACK_URL.
- Dokumentera i README hur man skaffar Shopify-värden och var de fylls i.

README:
- hur man kör lokalt
- hur man sätter PODCAST_RSS_URL
- hur man lägger till blogginlägg
- hur man kopplar Shopify inbäddning
- hur man deployar till Vercel
- checklista “Fyll i detta” (domän, sociala länkar, Shopify IDs, Teachable-länkar)

Leveranskrav:
- Kod redo i repot
- `npm run build` ska fungera
- Efteråt: skriv en kort sammanfattning + setup-checklista
