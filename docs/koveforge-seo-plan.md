# KoveForge — Pre-GSC SEO Optimisation Plan
> **Agent brief for Claude Opus 4.6 Pro**  
> Version: 1.0 | Date: June 2026  
> Domain: koveforge.tech | Region: Bulgaria (Gotse Delchev, Blagoevgrad)  
> Stack: HTML/CSS/JS + ASP.NET Core, Azure hosting

---

## Why "Pre-GSC" Matters

Google Search Console only begins collecting data **from the moment of verification**. Every technical, structural, and content flaw that exists at that moment gets indexed and scored immediately. GSC gives you data — it cannot fix problems retroactively. The goal of this plan is to make the site *crawlable, fast, semantically complete, and locally authoritative* **before** Google takes its first full snapshot.

Do every item in Phases 1–4 before registering in GSC. Phase 5 is the GSC setup itself. Phases 6–7 are post-registration.

---

## 🗝️ Keynote Takeaways

| # | Takeaway |
|---|----------|
| **KT-1** | Google's first crawl sets the baseline — bad technical signals on day 1 compound for months |
| **KT-2** | KoveForge competes locally (Blagoevgrad region) AND nationally (Bulgarian SMBs) — both targets need separate keyword layers |
| **KT-3** | Bulgarian and English must coexist — `lang="bg"` on the page, English meta only where international reach is intended |
| **KT-4** | Schema markup is non-negotiable for a software agency — Organisation, LocalBusiness, Service, FAQPage, and BreadcrumbList |
| **KT-5** | Every page must have a unique `<title>` + `<meta description>` — currently several pages share boilerplate |
| **KT-6** | Core Web Vitals must pass before GSC registration — a failing LCP or CLS on day 1 suppresses rankings immediately |
| **KT-7** | `sitemap.xml` and `robots.txt` must be correct and live before submitting to GSC |
| **KT-8** | Internal linking is weak — project pages are dead ends; they must link back to relevant service pages |

---

## Phase 1 — Technical Foundation Audit & Fixes

> **Goal:** make the site fully crawlable with no blocking errors.

### 1.1 — `robots.txt` (create or verify at `/robots.txt`)

```txt
User-agent: *
Allow: /

Sitemap: https://www.koveforge.tech/sitemap.xml
```

Current status to check: confirm the file exists and is not accidentally disallowing `/` or any section of the site.

**Agent task:** `curl https://www.koveforge.tech/robots.txt` and verify output.

---

### 1.2 — `sitemap.xml` (create at `/sitemap.xml`)

Must include all indexable pages. Based on current site inventory:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://www.koveforge.tech/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/about.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/services.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/ai-agents.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/process.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/projects.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/faq.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/contact.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/for-clinics.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://www.koveforge.tech/for-hotels.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Individual project pages -->
  <url><loc>https://www.koveforge.tech/projects/gocetransportapp.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.koveforge.tech/projects/resurs11.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.koveforge.tech/projects/dentora.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.koveforge.tech/projects/hotel-oazis.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.koveforge.tech/projects/prizma-studio.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.koveforge.tech/projects/retrorides.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.koveforge.tech/projects/stagenova.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.koveforge.tech/projects/zoozen.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.koveforge.tech/projects/chat-app.html</loc><priority>0.5</priority></url>
  <url><loc>https://www.koveforge.tech/projects/shooter-game.html</loc><priority>0.4</priority></url>
  <url><loc>https://www.koveforge.tech/projects/fitness-application.html</loc><priority>0.5</priority></url>
  <url><loc>https://www.koveforge.tech/projects/bulgarian-talk-norms.html</loc><priority>0.4</priority></url>

</urlset>
```

**Exclude** from sitemap: any `/cdn-cgi/` paths, `/assets/` paths, demo-only project pages if they have `noindex`.

---

### 1.3 — Canonical Tags (verify on every page)

Every page must have:
```html
<link rel="canonical" href="https://www.koveforge.tech/[page].html" />
```

Current audit — pages already have canonical tags per the fetched markup. **Agent task:** confirm no page has a canonical pointing to a wrong URL (e.g., `index.html` vs `/`).

**Fix homepage:** the canonical should be `https://www.koveforge.tech/` (no trailing `index.html`).

---

### 1.4 — HTTPS & `www` Consistency

Verify that ALL of the following redirect to `https://www.koveforge.tech/`:
- `http://koveforge.tech/`
- `http://www.koveforge.tech/`
- `https://koveforge.tech/` (non-www)

**Agent task:** `curl -I http://koveforge.tech` — confirm 301 redirect chain, not 302.

---

### 1.5 — Core Web Vitals Pre-Check

Run before any other work. Target thresholds (Google's "Good" band):

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5 s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200 ms |
| TTFB (Time to First Byte) | < 800 ms |

**Agent task:** Run `npx lighthouse https://www.koveforge.tech/ --output=json --quiet` and parse results.

Common fixes for this stack:
- Add `loading="lazy"` to all project screenshot `<img>` tags
- Add explicit `width` and `height` attributes to all `<img>` to prevent CLS
- Ensure the hero logo image (`koveforge-logo-hq.png`) has `fetchpriority="high"` (it's the LCP candidate)
- Defer non-critical JS: `<script defer src="js/main.js">`
- Preconnect to Google Fonts: `<link rel="preconnect" href="https://fonts.googleapis.com">`

---

### 1.6 — Mobile-Friendliness Check

**Agent task:** `curl "https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run"` with the site URL, or use PageSpeed Insights API.

Manual check: viewport meta tag must be present on ALL pages:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
✅ Already confirmed present — verify it is not missing on any project subpages.

---

### 1.7 — Broken Link Audit

**Agent task:**
```bash
npx broken-link-checker https://www.koveforge.tech/ --recursive --exclude-external
```

Known risk: the `/cdn-cgi/l/email-protection` obfuscation on email links — these will appear as broken to some crawlers. This is a Cloudflare behaviour. No fix needed but worth noting in GSC notes.

---

## Phase 2 — On-Page SEO: Titles, Metas, H-Tags

> **Goal:** every page has a unique, keyword-rich title + description; heading hierarchy is correct.

### 2.1 — Title Tag Formula

Pattern: `[Primary Keyword] | KoveForge — [Qualifier]`  
Max 60 characters. Write in Bulgarian.

| Page | Current Title | Optimised Title |
|------|--------------|-----------------|
| `index.html` | KoveForge \| Софтуерни системи за бизнеси | Уебсайтове и Бизнес Системи по Поръчка \| KoveForge |
| `services.html` | Услуги \| KoveForge | Услуги: Сайтове, Резервации, Магазини \| KoveForge |
| `projects.html` | Проекти \| KoveForge портфолио | Портфолио: 12 Проекта за Бизнеси \| KoveForge |
| `ai-agents.html` | (fetch to confirm) | ИИ Агенти за Бизнес Автоматизация \| KoveForge |
| `for-clinics.html` | (fetch to confirm) | Уебсайт и Система за Стоматологични Клиники \| KoveForge |
| `for-hotels.html` | (fetch to confirm) | Хотелска Система за Резервации и Управление \| KoveForge |
| `faq.html` | Често задавани въпроси \| KoveForge | Въпроси за Цени, Срокове и Процес \| KoveForge |
| `about.html` | За KoveForge \| Уебсайтове и софтуер по поръчка | За Нас: Екип за Уеб и Бизнес Системи \| KoveForge |
| `contact.html` | (fetch to confirm) | Свържи се с KoveForge — Безплатна Консултация |
| `process.html` | (fetch to confirm) | Нашият Процес: От Идея до Работеща Система \| KoveForge |

---

### 2.2 — Meta Description Formula

Pattern: Action verb + primary service + local signal + benefit.  
Max 155 characters. Must differ from title. Must not duplicate across pages.

| Page | Optimised Meta Description |
|------|---------------------------|
| `index.html` | KoveForge изгражда уебсайтове, резервационни системи и онлайн магазини за малки бизнеси в България. Говорим за вашия процес — после го правим. |
| `services.html` | Бизнес сайт, резервации, онлайн магазин, ИИ агент или вътрешен панел. Изберете обхвата и обсъдим как да започнем. |
| `projects.html` | 12 проекта за клиники, хотели, ресторанти, магазини и локални бизнеси. Разгледайте примери от реална работа. |
| `ai-agents.html` | ИИ агенти за автоматично обработване на запитвания, резервации и повтаряеми въпроси — 24/7 без допълнителен персонал. |
| `for-clinics.html` | Онлайн записване на часове, пациентски профили и административен панел за стоматологични клиники и здравни центрове. |
| `for-hotels.html` | Хотелска система за стаи, резервации, отзиви и управление. Вижте реален пример с Hotel Oazis. |
| `faq.html` | Колко трае проект? Каква е цената? Работите ли дистанционно? Отговори на честите въпроси за работа с KoveForge. |
| `about.html` | Малък, фокусиран екип с опит в C#/.NET, уеб системи и бизнес автоматизации. Разберете как подхождаме към всеки проект. |
| `contact.html` | Заявете безплатна консултация. Опишете с няколко думи какво трябва да изградим и ще върнем конкретен отговор. |

---

### 2.3 — Heading Hierarchy Audit

Rules: one `<h1>` per page, `<h2>` for main sections, `<h3>` for sub-items.

**Agent task:** For each page, `grep -n "<h[1-6]" [file].html` and verify:
- No page has zero or multiple `<h1>` tags
- `<h2>` tags each contain a target keyword naturally
- No heading-skipping (e.g., `<h1>` → `<h3>` with no `<h2>` in between)

Known fix needed: the current homepage `<h1>` is `"Сайтове и бизнес системи, които приемат заявки автоматично."` — excellent. Keep it. But confirm section `<h2>` tags include terms like "резервации", "уебсайтове", "ИИ агенти" naturally.

---

### 2.4 — Image Alt Tags

**Agent task:** `grep -n 'img' index.html projects.html services.html | grep -v 'alt="[^"]'`

Every `<img>` needs a descriptive `alt` attribute. Patterns:

```html
<!-- Project screenshots -->
<img src="..." alt="GoceTransportApp — транспортна платформа за маршрути и билети, изработена от KoveForge">

<!-- Logo -->
<img src=".../koveforge-logo-hq.png" alt="KoveForge лого — уебсайтове и бизнес системи по поръчка">

<!-- OG cover (if rendered on page) -->
<img src=".../og-cover.svg" alt="KoveForge — Уебсайтове и софтуер по поръчка за бизнеси в България">
```

---

## Phase 3 — Schema Markup (Structured Data)

> **Goal:** tell Google exactly what KoveForge is, where it is, and what it offers.

### 3.1 — Organisation Schema (add to `<head>` of every page)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KoveForge",
  "url": "https://www.koveforge.tech",
  "logo": "https://www.koveforge.tech/assets/images/brand/koveforge-logo-hq.png",
  "description": "Изработваме уебсайтове, системи за резервации, онлайн магазини, ИИ агенти и вътрешни панели за малки и средни бизнеси в България.",
  "email": "info@koveforge.tech",
  "foundingDate": "2024",
  "areaServed": {
    "@type": "Country",
    "name": "Bulgaria"
  },
  "sameAs": [
    "https://www.facebook.com/koveforge.tech",
    "https://github.com/DimitarTashkov/KoveForge"
  ]
}
</script>
```

---

### 3.2 — LocalBusiness Schema (add to `index.html` and `contact.html`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "KoveForge",
  "url": "https://www.koveforge.tech",
  "telephone": "[ADD PHONE IF AVAILABLE]",
  "email": "info@koveforge.tech",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Гоце Делчев",
    "addressRegion": "Благоевград",
    "addressCountry": "BG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.5693,
    "longitude": 23.7296
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
}
</script>
```

---

### 3.3 — Service Schema (add to `services.html`, one block per service)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Услуги на KoveForge",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Бизнес уебсайтове",
        "description": "Представителни сайтове за клиники, салони, ресторанти и локални бизнеси.",
        "provider": { "@type": "Organization", "name": "KoveForge" },
        "areaServed": "Bulgaria"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Системи за резервации",
        "description": "Онлайн записване на часове за клиники, салони, ресторанти и хотели.",
        "provider": { "@type": "Organization", "name": "KoveForge" },
        "areaServed": "Bulgaria"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Онлайн магазини",
        "description": "Каталог, количка, поръчки, промо кодове и административен панел.",
        "provider": { "@type": "Organization", "name": "KoveForge" },
        "areaServed": "Bulgaria"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "ИИ агенти",
        "description": "Виртуални агенти за автоматично обработване на запитвания и резервации.",
        "provider": { "@type": "Organization", "name": "KoveForge" },
        "areaServed": "Bulgaria"
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service",
        "name": "Вътрешни панели",
        "description": "Административни табла за управление на заявки, клиенти и работни процеси.",
        "provider": { "@type": "Organization", "name": "KoveForge" },
        "areaServed": "Bulgaria"
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Service",
        "name": "Поддръжка и развитие",
        "description": "Технически поддръжка, нови функции и оптимизация след пускане на проекта.",
        "provider": { "@type": "Organization", "name": "KoveForge" },
        "areaServed": "Bulgaria"
      }
    }
  ]
}
</script>
```

---

### 3.4 — FAQPage Schema (add to `faq.html`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Колко трае един проект?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Зависи от обхвата. Прост сайт — 2–3 седмици. По-сложна система с резервации или магазин — 4–8 седмици. Уточняваме срока преди старта."
      }
    },
    {
      "@type": "Question",
      "name": "Трябва ли ми поддръжка след старта?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Не е задължително, но препоръчваме. Технологиите се обновяват, нуждите на бизнеса се променят — поддръжката пази продукта в добро състояние."
      }
    },
    {
      "@type": "Question",
      "name": "Работите ли с фирми извън България?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да. Работим дистанционно и комуникираме на български и английски."
      }
    },
    {
      "@type": "Question",
      "name": "Какви технологии използвате?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTML, CSS, JavaScript за фронтенда; ASP.NET Core за по-сложни системи; WordPress или Shopify когато са достатъчни. Изборът зависи от нуждата."
      }
    },
    {
      "@type": "Question",
      "name": "Имате ли готови шаблони или всичко е по поръчка?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "И двете. Ако готов шаблон върши работата — използваме го. Ако бизнесът има специфична логика — изграждаме по поръчка."
      }
    }
  ]
}
</script>
```

---

### 3.5 — BreadcrumbList Schema (add to all non-homepage pages)

Example for `services.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.koveforge.tech/" },
    { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://www.koveforge.tech/services.html" }
  ]
}
</script>
```

---

## Phase 4 — Content & Internal Linking

> **Goal:** every page has keyword-rich content and is connected to at least 2 other relevant pages.

### 4.1 — Keyword Map (Bulgarian primary, English secondary)

| Page | Primary Keyword (BG) | Secondary Keywords (BG) | Long-tail targets |
|------|---------------------|------------------------|-------------------|
| `index.html` | уебсайт по поръчка България | бизнес системи, резервации | уебсайт за малък бизнес Гоце Делчев |
| `services.html` | уеб услуги за бизнеси | системи за резервации, онлайн магазин | изработка на сайт за клиника България |
| `for-clinics.html` | сайт за стоматологична клиника | онлайн записване, пациентска система | резервационна система за клиника България |
| `for-hotels.html` | хотелска система за резервации | управление на стаи, онлайн записване | хотелски мениджмънт софтуер |
| `ai-agents.html` | ИИ агент за бизнес | автоматизация на запитвания | чатбот за уебсайт на бизнес |
| `projects.html` | портфолио уеб проекти | бизнес системи примери | примери за резервационни системи |
| `faq.html` | изработка на уебсайт цена | срок за изработка на сайт | колко струва уебсайт за малък бизнес |

---

### 4.2 — Internal Linking Fixes

**Agent task:** Add contextual links on the following pages:

**`projects/dentora.html`** → add link: `Виж услугата за клиники →` pointing to `/for-clinics.html`  
**`projects/hotel-oazis.html`** → add link: `Виж услугата за хотели →` pointing to `/for-hotels.html`  
**`projects/gocetransportapp.html`** → add link: `Виж вътрешни панели →` pointing to `/services.html#panels`  
**`projects/zoozen.html`** → add link: `Виж онлайн магазини →` pointing to `/services.html#ecommerce`  

**`services.html`** → add link to 2 related projects per service:
- Резервации → "Вижте Dentora и Hotel Oazis като примери"
- Онлайн магазини → "Вижте ZooZen като пример"
- ИИ агенти → link to `/ai-agents.html` (already exists, verify)

**`index.html`** → the three featured project cards already link to project detail pages. ✅ Add a "Виж всички проекти →" at the bottom of that section if not already present.

---

### 4.3 — `for-clinics.html` and `for-hotels.html` Content Depth

These sector-specific pages are high-value for local search. They currently lack sufficient keyword-rich body text to rank independently.

**Agent task:** Expand each page to include:
- Minimum 300 words of body copy (Bulgarian)
- At least one `<h2>` with the primary keyword
- A short bullet list of specific features relevant to the sector
- A link to the relevant portfolio project (Dentora / Hotel Oazis)
- A CTA with `<a href="/contact.html#contact-form">` anchor

Example expansion for `for-clinics.html`:
```
H1: Уебсайт и система за записване за стоматологични клиники (existing)
H2: Какво включва системата за клиниката?  ← ADD
  - Онлайн форма за записване на часове
  - Изглед на свободни слотове по дни
  - Автоматично потвърждение по имейл
  - Административен панел за преглед на записите
  - Пациентски профили (при нужда)
H2: Пример от портфолиото: Dentora  ← ADD, link to project page
```

---

### 4.4 — Open Graph & Twitter Card Tags

Every page must have complete OG tags. Current pages have them ✅, but verify:

```html
<!-- Required on every page -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.koveforge.tech/[page].html">
<meta property="og:title" content="[page title]">
<meta property="og:description" content="[meta description — same text is fine]">
<meta property="og:image" content="https://www.koveforge.tech/assets/images/brand/og-cover.svg">
<meta property="og:locale" content="bg_BG">
<meta name="twitter:card" content="summary_large_image">
```

**Fix needed:** `og:locale` is currently missing on all pages. Add `bg_BG` to all Bulgarian-primary pages.

---

### 4.5 — `lang` Attribute

Every page's `<html>` tag must declare:
```html
<html lang="bg">
```

**Agent task:** `grep -n '<html' *.html projects/*.html` — confirm all have `lang="bg"`.

---

## Phase 5 — Pre-Submission Checklist (run before opening GSC)

Run each check and mark ✓ before proceeding to GSC registration.

```
TECHNICAL
[ ] robots.txt exists and allows all
[ ] sitemap.xml exists, is valid XML, all URLs return 200
[ ] All pages redirect HTTP → HTTPS with 301
[ ] www and non-www both redirect to canonical www version
[ ] No pages return 404 or 500
[ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile
[ ] All <img> tags have alt attributes
[ ] All <img> tags have explicit width + height
[ ] defer on main.js
[ ] preconnect to fonts.googleapis.com

ON-PAGE
[ ] Every page has a unique <title> (≤ 60 chars)
[ ] Every page has a unique <meta name="description"> (≤ 155 chars)
[ ] Every page has exactly one <h1>
[ ] <html lang="bg"> on all pages
[ ] All canonical tags point to correct URLs
[ ] og:locale="bg_BG" on all pages

SCHEMA
[ ] Organisation JSON-LD in <head> of all pages
[ ] LocalBusiness JSON-LD on index.html and contact.html
[ ] Service ItemList on services.html
[ ] FAQPage on faq.html
[ ] BreadcrumbList on all non-homepage pages
[ ] Validate all at https://search.google.com/test/rich-results

CONTENT & LINKS
[ ] for-clinics.html ≥ 300 words
[ ] for-hotels.html ≥ 300 words
[ ] All project detail pages link back to relevant service page
[ ] services.html links to at least 2 portfolio examples per service
[ ] No orphan pages (every page reachable within 2 clicks from homepage)
```
