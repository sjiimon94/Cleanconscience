# Cleanconscience

## Project docs
- Goals/constraints (authoritative): `docs/PRODUCT_SPEC.md`
- Recent decisions (append-only log): `docs/SESSION_LOG.md`

En snabb, SEO-vänlig webbplats för **Cecilia Strandevall** – barnboksförfattare, podcastvärd och grundare av Cleanconscience.

- **Teknik:** Next.js (App Router) · TypeScript · Tailwind CSS · MDX
- **Marknad:** Sverige (svenska UI-texter)
- **Drift:** Vercel · domän `ceciliastrandevall.se`
- **Ingen inloggning, inga kommentarer, ingen intern betalning**

Sajten fungerar som en **innehålls- och länkhubb** där besökare kan läsa om Cecilias olika områden och klicka sig vidare till externa sidor för bok, vattenfilter, kurser m.m.

---

## Köra lokalt

```bash
git clone https://github.com/sjiimon94/Cleanconscience.git
cd Cleanconscience
npm install
touch .env.local
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren.

### Miljövariabler (`.env.local`)

> **OBS:** `.env.local` ska **aldrig** committas till repot. Den finns redan i `.gitignore`.

```env
# Podcast – RSS-feed URL (obligatorisk för podcastsidor)
PODCAST_RSS_URL=https://feed.podbean.com/Ofiltreratmjohannaocecilia/feed.xml

# Webbplatsens offentliga URL
NEXT_PUBLIC_SITE_URL=https://ceciliastrandevall.se

# Teachable (valfritt)
NEXT_PUBLIC_TEACHABLE_URL=https://cleanconscience.teachable.com

# Patreon (valfritt)
NEXT_PUBLIC_PATREON_URL=

# Swish-nummer för stödsidan (valfritt)
NEXT_PUBLIC_SWISH_NUMBER=

# Spotify (valfritt – för inbäddad spelare)
NEXT_PUBLIC_SPOTIFY_SHOW_ID=

# Umami Analytics (valfritt – cookiefri webbstatistik)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=ditt-umami-webbplats-id
```

Om `PODCAST_RSS_URL` saknas fungerar appen ändå – podcastsidorna visar inga avsnitt.

---

## Informationsarkitektur

### Toppnavigation

| Länk | Sida |
|---|---|
| Start | `/` |
| Utforska | `/utforska` (dropdown med underkategorier) |
| Socialt | `/socialt` |
| Om | `/om` |
| Kontakt | `/kontakt` |
| Stöd | `/stod` |

### Underkategorier under Utforska

| Kategori | Sida |
|---|---|
| Produkter | `/utforska/produkter` |
| Vattenfilter | `/utforska/vattenfilter` |
| Kurser | `/kurser` |
| Podcast | `/podcast` |
| Publiceringar | `/utforska/publiceringar` |

---

## Lägga till nya publiceringar

Öppna `src/data/publications.ts` och lägg till en ny post i `publications`-arrayen (senaste överst):

```ts
{
  url: "https://example.com/min-artikel",
  title: "Artikeltitel",            // valfri – override
  description: "Kort ingress...",   // valfri
  image: "/images/...",             // valfri – override OG-bild
  type: "Artikel",                  // valfri etikett
  date: "2026-01-15",              // valfri
  outlet: "Expressens kultursida",  // valfri
},
```

Minsta krav: bara `url`. Titel, bild, beskrivning kan läggas till manuellt.

---

## Konfiguration (`src/config/site.ts`)

All central konfiguration finns i **`src/config/site.ts`**.

| Fält | Beskrivning |
|---|---|
| `siteName` | Webbplatsens namn |
| `siteUrl` | Produktions-URL |
| `locale` | `"sv-SE"` |
| `contactEmail` | Kontakt-e-post |
| `description` | SEO-beskrivning |
| **`social`** | Sociala medier-URL:er |
| **`support`** | Stödlänkar (t.ex. Patreon) |
| **`teachable`** | Teachable-skola + kurser |
| **`podcast`** | `rssUrl` hämtas från `process.env.PODCAST_RSS_URL` |

---

## Bygga och validera

```bash
npm run build   # Produktionsbygge
npm run lint     # ESLint
npm run dev      # Utvecklingsserver
```

---

## Publicering (Vercel)

Projektet är konfigurerat för **Vercel** och körs med Next.js. GitHub Pages rekommenderas inte eftersom sidan hämtar podcast-RSS live.

1. Koppla repot till Vercel
2. Sätt miljövariabler (se ovan)
3. Anslut domänen `ceciliastrandevall.se`

Vercel deplovar automatiskt vid varje `push` till `main`.

---

## Analytics

Webbplatsen stödjer [Umami Analytics](https://umami.is) — cookiefri, GDPR-kompatibel.

Sätt `NEXT_PUBLIC_UMAMI_WEBSITE_ID` i `.env.local` och i Vercel.

---

## Projektstruktur

```
src/
  app/             # Next.js App Router
    utforska/      # Utforska-sidor (översikt, produkter, vattenfilter, publiceringar)
    kurser/        # Kursöversikt
    podcast/       # Podcastavsnitt
    blogg/         # Blogginlägg (MDX)
  components/      # React-komponenter (Navbar, Footer m.m.)
  data/            # Datakällor (publications.ts)
  lib/             # Hjälpfunktioner (podcast, MDX)
  config/
    site.ts        # Central konfiguration
config/
  navigation.ts    # Navbar-länkar med undermeny
content/
  blogg/           # MDX-blogginlägg
public/
  images/          # Bilder
```
