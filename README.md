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

# Stripe (obligatoriskt för butik + betalning)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (obligatoriskt för orderbekräftelse-mail)
RESEND_API_KEY=re_...

# Webbplatsens offentliga URL (används av Stripe för redirect-URLs)
NEXT_PUBLIC_SITE_URL=https://cleanconscience.se

# Teachable (valfritt)
NEXT_PUBLIC_TEACHABLE_URL=https://cleanconscience.teachable.com

# Patreon (valfritt)
NEXT_PUBLIC_PATREON_URL=

# Swish-nummer för stödsidan (valfritt)
NEXT_PUBLIC_SWISH_NUMBER=

# Spotify (valfritt – för inbäddad spelare)
NEXT_PUBLIC_SPOTIFY_SHOW_ID=
```

Om `PODCAST_RSS_URL` saknas fungerar appen ändå – podcastsidorna visar inga avsnitt.

Om `STRIPE_SECRET_KEY` saknas returnerar `/api/checkout` ett felmeddelande – butiken fungerar men betalning är inte möjlig.

Om `RESEND_API_KEY` saknas skickas inga orderbekräftelsemail – betalning fungerar ändå.

---

## Konfiguration (`src/config/site.ts`)

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
| **`support`** | Stödlänkar (t.ex. Patreon, valfritt) |
| **`shopify`** | Shopify-domän, fallback-URL, produkt-/kollektion-ID:n |
| **`teachable`** | Teachable-skola + kurser (slug, titel, URL m.m.) |
| **`podcast`** | `rssUrl` hämtas från `process.env.PODCAST_RSS_URL` – hårdkoda **inte** |

### Sociala medier

Öppna `src/config/site.ts` och fyll i URL:er under `social`:

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
   - Sätt variabeln i `.env.local` eller direkt i `src/config/site.ts` under `shopify.domain`.

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

Redigera `teachable.courses` i `src/config/site.ts` för att lägga till eller ändra kurser:

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

## Stripe (butik + betalning)

Butiken använder **Stripe Checkout** för säker betalning. Ingen Shopify krävs.

### Steg-för-steg

1. **Skapa Stripe-konto** på [stripe.com](https://stripe.com) (gratis att komma igång).
2. **Hämta Secret Key** under *Developers → API keys* → `sk_test_...` (test) eller `sk_live_...` (produktion). Sätt som `STRIPE_SECRET_KEY` i `.env.local`.
3. **Skapa webhook** under *Developers → Webhooks → Add endpoint*:
   - URL: `https://dindomän.se/api/webhook`
   - Event att lyssna på: `checkout.session.completed`
   - Kopiera *Signing secret* (`whsec_...`) → sätt som `STRIPE_WEBHOOK_SECRET`.
4. **Testa lokalt** med [Stripe CLI](https://stripe.com/docs/stripe-cli):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

### Lägga till fler produkter

Redigera `src/data/products.ts` och lägg till fler produkter i `products`-arrayen. Varje produkt behöver ett unikt `id`/`slug`, `name`, `description`, `priceInOre` (pris i öre; 179 kr = 17900), `image`, `category` och `inStock`.

### Byta produktbild

Lägg din riktiga bokomslagsbild som `public/images/books/stina-och-mamma-stadar.jpg` och uppdatera `image`-fältet i `src/data/products.ts` till `/images/books/stina-och-mamma-stadar.jpg`.

---

## Resend (orderbekräftelsemail)

Orderbekräftelse skickas via **Resend** efter lyckad betalning.

1. Skapa konto på [resend.com](https://resend.com) (gratis tier: 100 mail/dag).
2. Verifiera din avsändande domän (t.ex. `cleanconscience.se`) under *Domains*.
3. Hämta API-nyckel under *API Keys* → sätt som `RESEND_API_KEY`.
4. Uppdatera `from`-adressen i `src/app/api/webhook/route.ts` om domänen skiljer sig.

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

- [ ] **Domän** – byt `siteUrl` i `src/config/site.ts` från `https://TODO_DOMAIN` till din riktiga domän
- [ ] **Sociala medier** – fyll i faktiska URL:er i `social` (eller ta bort de som inte används)
- [ ] **Stripe Secret Key** – sätt `STRIPE_SECRET_KEY` i `.env.local` och Vercel
- [ ] **Stripe Webhook Secret** – skapa webhook i Stripe Dashboard, sätt `STRIPE_WEBHOOK_SECRET`
- [ ] **Resend API Key** – skapa konto på resend.com, verifiera domän, sätt `RESEND_API_KEY`
- [ ] **Produktbild** – lägg riktigt bokomslag som `public/images/books/stina-och-mamma-stadar.jpg`
- [ ] **Webbplats-URL** – sätt `NEXT_PUBLIC_SITE_URL` till produktionsdomänen
- [ ] **Teachable-URL:er** – uppdatera `teachable.schoolUrl` och kurser i `src/config/site.ts`
- [ ] **Podcast RSS-URL** – sätt `PODCAST_RSS_URL` i `.env.local` (och i Vercel Environment Variables)
- [ ] **Spotify Show ID** – sätt `NEXT_PUBLIC_SPOTIFY_SHOW_ID` om du vill ha inbäddad Spotify-spelare
- [ ] **Kontakt-e-post** – verifiera `contactEmail` i `src/config/site.ts`

---

## Projektstruktur

```
src/
  app/             # Next.js App Router
    butik/         # Butikssidor (listing + [slug] produktsida)
    varukorg/      # Varukorgssida
    checkout/      # Success- och avbrytsidor
    api/           # API-routes (checkout, webhook)
  components/      # React-komponenter (Navbar, Footer, CartIcon m.m.)
  context/         # React-kontext (CartContext)
  data/            # Intern data (products.ts, external-writings.ts)
  lib/             # Hjälpfunktioner (podcast, MDX, markdown)
  config/
    site.ts          # Central konfiguration (typad)
    navigation.ts    # Navbar-länkar
content/
  blogg/           # MDX-blogginlägg
public/
  images/
    books/         # Bokomslag
```
