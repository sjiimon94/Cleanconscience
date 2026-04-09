# Cleanconscience

## Project docs
- Goals/constraints (authoritative): `docs/PRODUCT_SPEC.md`
- Recent decisions (append-only log): `docs/SESSION_LOG.md`

En snabb, SEO-vänlig webbplats för **Cleanconscience** – medvetna val för en renare framtid.

- **Teknik:** Next.js (App Router) · TypeScript · Tailwind CSS · MDX
- **Marknad:** Sverige (svenska UI-texter, SEK, frakt inom Sverige)
- **Drift:** Vercel (eller valfri Node-host)
- **Ingen inloggning, inga kommentarer, ingen egen betalning** i MVP

---

## Köra lokalt

```bash
# 1. Klona repot
git clone https://github.com/sjiimon94/Cleanconscience.git
cd Cleanconscience

# 2. Installera beroenden
npm install

# 3. Skapa en lokal env-fil (committas INTE – finns i .gitignore)
#    Se "Miljövariabler" nedan för innehåll.
touch .env.local

# 4. Starta utvecklingsservern
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren.

### Miljövariabler (`.env.local`)

> **OBS:** `.env.local` ska **aldrig** committas till repot. Den finns redan i `.gitignore`.

Skapa filen `.env.local` i projektets rot med följande innehåll (fyll i det som är relevant):

```env
# Podcast – RSS-feed URL (obligatorisk för podcastsidor)
PODCAST_RSS_URL=https://example.com/feed.xml

# Shopify (valfritt – Buy Button inbäddning)
NEXT_PUBLIC_SHOPIFY_DOMAIN=dinbutik.myshopify.com
NEXT_PUBLIC_SHOPIFY_FALLBACK_URL=https://dinbutik.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=

# Teachable (valfritt)
NEXT_PUBLIC_TEACHABLE_URL=https://cleanconscience.teachable.com

# Spotify (valfritt – för inbäddad spelare)
NEXT_PUBLIC_SPOTIFY_SHOW_ID=
```

Om `PODCAST_RSS_URL` saknas fungerar appen ändå – podcastsidorna visar inga avsnitt.

---

## Konfiguration (`config/site.ts`)

All central konfiguration finns i **`config/site.ts`**. Filen exporterar ett typat `SiteConfig`-objekt.

| Fält | Beskrivning |
|---|---|
| `siteName` | Webbplatsens namn (`"Cleanconscience"`) |
| `siteUrl` | Produktions-URL (byt från `https://TODO_DOMAIN`) |
| `locale` | `"sv-SE"` |
| `currency` | `"SEK"` |
| `contactEmail` | Kontakt-e-post |
| `description` | SEO-beskrivning (svenska) |
| **`social`** | Sociala medier-URL:er (alla valfria) |
| **`shopify`** | Shopify-domän, fallback-URL, produkt-/kollektion-ID:n |
| **`teachable`** | Teachable-skola + kurser (slug, titel, URL m.m.) |
| **`podcast`** | `rssUrl` hämtas från `process.env.PODCAST_RSS_URL` – hårdkoda **inte** |

### Sociala medier

Öppna `config/site.ts` och fyll i URL:er under `social`:

```ts
social: {
  instagram: "https://instagram.com/ditthandle",
  tiktok: "https://tiktok.com/@ditthandle",
  // ...lämna undefined för de som inte används
},
```

Länkar som är `undefined` döljs automatiskt i footern.

### Shopify

1. Skapa ett Shopify Buy Button i Shopify Admin.
2. Fyll i `NEXT_PUBLIC_SHOPIFY_DOMAIN` och `NEXT_PUBLIC_SHOPIFY_FALLBACK_URL` i `.env.local` (eller direkt i `config/site.ts`).
3. Om specifika produkt-/kollektion-ID:n ska inbäddas, lägg till dem i `shopify.productIds` / `shopify.collectionIds` i `config/site.ts`.
4. **Saknas konfiguration?** Komponenten `<ShopifyBuyButton />` visar automatiskt en fallback-knapp ("Handla i butiken") som länkar till Shopify-butiken.

### Teachable

Redigera `teachable.courses` i `config/site.ts` för att lägga till eller ändra kurser:

```ts
teachable: {
  schoolUrl: "https://cleanconscience.teachable.com",
  courses: [
    {
      slug: "barnvaccinationer",
      title: "Barnvaccinationer",
      description: "En omfattande videoserie ...",
      url: "https://cleanconscience.teachable.com/p/barnvaccinationer",
    },
  ],
},
```

### Podcast (RSS)

Sätt miljövariabeln `PODCAST_RSS_URL` i `.env.local`:

```env
PODCAST_RSS_URL=https://example.com/feed.xml
```

Appen hämtar och parsar RSS-feeden server-side. Om variabeln saknas returneras en tom lista (inga krascher).

---

## Bygga och validera

```bash
npm run build   # Produktionsbygge
npm run lint     # ESLint
npm run dev      # Utvecklingsserver
```

---

## Fyll i detta ✅

Innan lansering – gå igenom checklistan:

- [ ] **Domän** – byt `siteUrl` i `config/site.ts` från `https://TODO_DOMAIN` till din riktiga domän
- [ ] **Sociala medier** – fyll i faktiska URL:er i `social` (eller ta bort de som inte används)
- [ ] **Shopify-domän** – sätt `NEXT_PUBLIC_SHOPIFY_DOMAIN` i `.env.local` eller `config/site.ts`
- [ ] **Shopify fallback-URL** – sätt `NEXT_PUBLIC_SHOPIFY_FALLBACK_URL`
- [ ] **Shopify produkt-/kollektion-ID:n** – fyll i `shopify.productIds` / `shopify.collectionIds` vid behov
- [ ] **Shopify Storefront Access Token** – sätt `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` i `.env.local`
- [ ] **Teachable-URL:er** – uppdatera `teachable.schoolUrl` och kurser i `config/site.ts`
- [ ] **Podcast RSS-URL** – sätt `PODCAST_RSS_URL` i `.env.local` (och i Vercel Environment Variables)
- [ ] **Spotify Show ID** – sätt `NEXT_PUBLIC_SPOTIFY_SHOW_ID` om du vill ha inbäddad Spotify-spelare
- [ ] **Kontakt-e-post** – verifiera `contactEmail` i `config/site.ts`

---

## Projektstruktur

```
config/
  site.ts          # Central konfiguration (typad)
  navigation.ts    # Navbar-länkar
src/
  app/             # Next.js App Router
  components/      # React-komponenter (Navbar, Footer, m.m.)
  lib/             # Hjälpfunktioner (podcast, MDX, markdown)
content/
  blogg/           # MDX-blogginlägg
public/            # Statiska filer
```
