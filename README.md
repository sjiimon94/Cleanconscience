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
PODCAST_RSS_URL=https://feed.podbean.com/Ofiltreratmjohannaocecilia/feed.xml

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

All central konfiguration finns i **`src/config/site.ts`**. Filen exporterar ett typat `SiteConfig`-objekt.

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

#### Steg-för-steg: hitta dina Shopify-värden

1. **Shopify-domän** (`NEXT_PUBLIC_SHOPIFY_DOMAIN`)
   - Logga in på [Shopify Admin](https://admin.shopify.com/).
   - Din domän syns i adressfältet: `https://<dinbutik>.myshopify.com/admin` → värdet är `<dinbutik>.myshopify.com`.
   - Sätt variabeln i `.env.local` eller direkt i `config/site.ts` under `shopify.domain`.

2. **Fallback-URL** (`NEXT_PUBLIC_SHOPIFY_FALLBACK_URL`)
   - Samma bas-URL som ovan, t.ex. `https://dinbutik.myshopify.com`.
   - Används som länk i fallback-knappen om Buy Button inte kan visas.

3. **Storefront Access Token** (`NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`)
   - I Shopify Admin, gå till **Inställningar → Appar och försäljningskanaler → Utveckla appar** (eller **Headless**-kanalen).
   - Skapa en app (eller öppna en befintlig) → **API-uppgifter** → kopiera **Storefront API access token**.
   - Klistra in som `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` i `.env.local`.

4. **Produkt-ID:n** (`shopify.productIds` i `config/site.ts`)
   - Öppna en produkt i Shopify Admin. I URL:en ser du `/products/<id>` – detta `<id>` är ett nummer (t.ex. `7982345678901`).
   - Alternativt: använd Shopify GraphQL-utforskaren (Admin → **Appar → Headless → Storefront API playground**) med frågan:
     ```graphql
     { products(first: 10) { edges { node { id title } } } }
     ```
   - Lägg till ID:n som strängar i `shopify.productIds`-arrayen.

5. **Kollektion-ID:n** (`shopify.collectionIds` i `config/site.ts`)
   - Öppna en kollektion i Shopify Admin → `/collections/<id>`.
   - Fyll i under `shopify.collectionIds.bocker`, `.vattenfiltrering`, `.merch`.

6. **Saknas konfiguration?** Komponenten `<ShopifyBuyButton />` visar automatiskt en fallback-knapp ("Handla i butiken") som länkar till fallback-URL:en. Ingen konfiguration krävs för att appen ska fungera.

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
PODCAST_RSS_URL=https://feed.podbean.com/Ofiltreratmjohannaocecilia/feed.xml
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

src/
  app/             # Next.js App Router
  components/      # React-komponenter (Navbar, Footer, m.m.)
  lib/             # Hjälpfunktioner (podcast, MDX, markdown)
  config/
    site.ts          # Central konfiguration (typad)
    navigation.ts    # Navbar-länkar
content/
  blogg/           # MDX-blogginlägg
public/            # Statiska filer
```
