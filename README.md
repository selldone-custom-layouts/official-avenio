<p align="center">
  <img src="docs/screenshots/cover.jpg" alt="Avenio Department Store, a custom Layout for Selldone, on desktop and phone" width="100%">
</p>

<h1 align="center">Avenio Department Store</h1>

<p align="center">
  <b>Every department, one bag.</b><br>
  A custom Selldone Layout built on the official <a href="https://github.com/selldone/storefront">selldone/storefront</a>.
</p>

<p align="center">
  <a href="https://avenio.selldone.shop"><img src="https://img.shields.io/badge/live%20shop-avenio.selldone.shop-9B1B30?style=flat-square" alt="Live shop"></a>
  <a href="https://github.com/selldone-custom-layouts/official-avenio/wiki"><img src="https://img.shields.io/badge/docs-wiki-2E1819?style=flat-square" alt="Wiki"></a>
  <a href="https://github.com/selldone-custom-layouts/official-avenio/wiki/Install-with-AI"><img src="https://img.shields.io/badge/set%20up-with%20AI-FFEBEA?style=flat-square" alt="Set up with AI"></a>
  <img src="https://img.shields.io/badge/Selldone-Layout-2B2F7A?style=flat-square" alt="Selldone Layout">
  <img src="https://img.shields.io/badge/Vue-3-1fc8a9?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/languages-en%20·%20ar-26333A?style=flat-square" alt="Languages">
</p>

<p align="center">
  <a href="https://avenio.selldone.shop"><b>Open the live shop</b></a> ·
  <a href="https://github.com/selldone-custom-layouts/official-avenio/wiki/Install-with-AI">Set it up with AI</a> ·
  <a href="https://github.com/selldone-custom-layouts/official-avenio/wiki/Manual-Setup">Manual setup</a> ·
  <a href="https://github.com/selldone-custom-layouts/official-avenio/wiki/Shop-Requirements">What your shop needs</a> ·
  <a href="https://github.com/selldone-custom-layouts">All Selldone custom layouts</a>
</p>

---

## What it is

**Avenio Department Store** — Department-store Layout: deals ticker, mega menus, event band, deal rows, price tiles, brand tiles, five-across listing, two-column product page.

- **one colour family**: the palette's hue gives every ground (the white page, its soft tint bands, the plates, the lines, the words, the dark top bar and footer) and the one action colour (Garnet `#9b1b30` by default), so a palette or a custom colour re-tints the whole page;
- DM Serif Display for headings, the wordmark and numbers set large, over Figtree for reading, buttons and the nav;
- **one shape language**: circles for round things, 8 px panels and photos, 4 px inner parts; square only where a band meets the window's edge; focus rings inside the box, one per control;
- photography in every slot (the shop's own photos, with designed fallbacks drawn from the shop's own products);
- flat buttons, hover changes the colour only, no line under any word or icon;
- light by default, with the other mode in the same family; a **Theme** row in the footer on the showcase shop: Garnet, Emerald, Sapphire, Ochre, Onyx, a **Custom colour** and Light / Dark;
- it says **bag**; every word it writes is in English and Arabic (right to left).

It runs on **[avenio.selldone.shop](https://avenio.selldone.shop)**, one domain of the Selldone shop fashioni (Selldone lets each domain of a shop carry its own Layout; the shop's default and its other domains keep theirs).

Everything is read live from the shop: its title (drawn as the wordmark), collections, products, prices and savings, delivery ways with their days, fees and time windows, the pickup counter and its hours, the way to pay, the articles. Nothing about fashioni is written in the code, so another shop that imports the Layout gets its own data. Selldone's own bag, checkout, payments and orders keep working underneath.

## The home

| # | Section | Variant | What it shows |
| --- | --- | --- | --- |
| 1 | `event` | `band` | Avenio: the store headline on the family-dark band, the live best saving and a button per department. |
| 2 | `slides` | `wide` | Avenio: wide photo slides bound to departments (skin design.slides), live saving and lowest price, pause button. |
| 3 | `departments` | `tiles` | Avenio: Shop by department, one photo tile per category with products. |
| 4 | `flags` | `cards` | Avenio: four tall cards picked by live rules (newest, deepest deal, best value, top brand). |
| 5 | `prices` | `tabs-row` | Avenio: Great prices, tabs (On sale, Under $x, a department on sale) and a product row beside the sale card. |
| 6 | `pricepoints` | `tiles` | Avenio: Shop by price, Under $x tiles from the live prices. |
| 7 | `dealrows` | `rows` | Avenio: Deals by department, up to three rows. |
| 8 | `feature` | `split` | Avenio: one photo banner bound to a department (skin design.feature). |
| 9 | `brands` | `tiles` | Avenio: Brands we love, typeset brand names from the live catalogue. |
| 10 | `finds` | `tabs-row` | Avenio: Don't miss these finds, tabs Newest, Best value and two departments. |
| 11 | `edits` | `banners` | Avenio: two wide photo banners bound to departments (skin design.edits). |
| 12 | `services` | `cards` | Avenio: service promises from the shop's real ways, payment and hours. |
| 13 | `clearance` | `row` | Avenio: Biggest savings, a product row by percent off. |
| 14 | `journal` | `cards` | The newest three posts as cards with photo, date and title (Avenio). |

A section the shop has no data for hides itself; tint bands alternate with white.

## Screenshots

| Desktop | Phone |
| --- | --- |
| ![Home on desktop](docs/screenshots/desktop-home.jpg) | ![Home on a phone](docs/screenshots/phone-home.jpg) |
| ![A collection on desktop](docs/screenshots/desktop-category.jpg) | ![A collection on a phone](docs/screenshots/phone-category.jpg) |
| ![A product on desktop](docs/screenshots/desktop-product.jpg) | ![A product on a phone](docs/screenshots/phone-product.jpg) |
| ![The bag on desktop](docs/screenshots/desktop-cart.jpg) | ![The bag on a phone](docs/screenshots/phone-cart.jpg) |

Take them from the live shop once it is pinned: `node --use-system-ca scripts/doc-shots.cjs` (through `new-shop-kits/pw-lock.sh`).

## Tests

Every check runs one browser at a time against the shop, at 1440px, 1024px and 390px, dark and light, every palette and the custom colours #ffff00, #00ffff and #111111, and Arabic (right to left). Each is delivered at **TOTAL 0**.

<!-- TESTS:START -->
Not released yet. Before the first upload: `scripts/release.sh` step 5b (the production bundle through the live shop's own HTML). After the pin: the full suite on the live domain (`scripts/run-checks.sh https://avenio.selldone.shop <logs>`, or the fast runner with `scripts/fast-checks.config.mjs`) and the guest checkout walk (`scripts/checkout-walk.mjs`).
<!-- TESTS:END -->

## Photos

| Slot | File | Size | In the build |
| --- | --- | --- | --- |
| hero-1 | `skins/avenio/photos/hero-1.webp` | 2400 × 900 | yes |
| hero-2 | `skins/avenio/photos/hero-2.webp` | 2400 × 900 | yes |
| hero-3 | `skins/avenio/photos/hero-3.webp` | 2400 × 900 | yes |
| feature | `skins/avenio/photos/feature.webp` | 1400 × 1050 | yes |
| edit-1 | `skins/avenio/photos/edit-1.webp` | 1600 × 900 | yes |
| edit-2 | `skins/avenio/photos/edit-2.webp` | 1600 × 900 | yes |
| each collection | `skins/avenio/photos/col-<slug of its title>.webp` | 1400 × 1050 | 8 file(s); a collection without one shows its best sellers on a plate |

## Use it on your shop

| You want to… | Read |
| --- | --- |
| Let an AI agent (Claude Code, Codex…) set it up for your shop | [Install with AI](https://github.com/selldone-custom-layouts/official-avenio/wiki/Install-with-AI) |
| Do it yourself, step by step | [Manual Setup](https://github.com/selldone-custom-layouts/official-avenio/wiki/Manual-Setup) |
| Know what data your shop needs for the design to look right | [Shop Requirements](https://github.com/selldone-custom-layouts/official-avenio/wiki/Shop-Requirements) |
| Build, upload and verify a release | [Build and Upload](https://github.com/selldone-custom-layouts/official-avenio/wiki/Build-and-Upload) |
| Put the Layout live on your shop, or on one domain of it | [Go Live](https://github.com/selldone-custom-layouts/official-avenio/wiki/Go-Live) |
| Change the name, sections, pages, photos or languages | [Customize](https://github.com/selldone-custom-layouts/official-avenio/wiki/Customize) |
| Change the colours, dark or light, the visitor switcher | [Theme and colours](https://github.com/selldone-custom-layouts/official-avenio/wiki/Theme-and-colours) |
| Fix a blank page, a rejected upload or an old version showing | [Troubleshooting](https://github.com/selldone-custom-layouts/official-avenio/wiki/Troubleshooting) |

## Quick start (developers)

```bash
git clone https://github.com/selldone-custom-layouts/official-avenio.git
cd official-avenio
npm run setup            # the six Selldone modules (modules/)
for p in components translate; do git -C modules/$p apply ../../patches/modules-$p.kalio.patch; done
npm install --force
npm run serve            # dev server on http://localhost:9172, reading the shop named in .env
```

The skin is `skins/avenio/skin.json` (names, palettes, fonts, radius, wordmark, basket word, home sections, photo slots, loading screen) with its photos in `skins/avenio/photos/`; after a change run `node scripts/skin-apply.mjs`. Releases:

```bash
LAYOUT_ID=<your Layout id> SELLDONE_CLI_SRC=<cli clone> bash scripts/release.sh <new version> desk
```

Leave `LAYOUT_ID` out on the first upload; use the id printed after it from then on. Never reuse a version number. Keep the build at 300 files or fewer (the release script prints the count).

## Where things are

| Area | Files |
| --- | --- |
| The skin (the only file that makes this Layout this Layout) | [`skins/avenio/skin.json`](skins/avenio/skin.json), photos in `skins/avenio/photos/` |
| Generated from the skin (never edit) | `components/ly/skin.gen.ts`, `style/ly-skin.gen.scss`, `manifest.json`, `selldone-layout.json`, `.env`, `scripts/loading/config.json`, `checks/` |
| Your theme (palette, brand colour, mode, switcher) | [`components/ly/ly-theme.settings.ts`](components/ly/ly-theme.settings.ts) |
| The colour family | [`components/ly/ly-family-core.ts`](components/ly/ly-family-core.ts) (maths), [`ly-family.ts`](components/ly/ly-family.ts) (painting) |
| The look | [`style/ly/`](style/ly/) (`base.css`, `pages.css`, `look.css`, `variants.css`), [`style/ly-layout.scss`](style/ly-layout.scss), [`style/ly-sd.scss`](style/ly-sd.scss) |
| Header, bag drawer, footer, splash | [`components/ly/shell/`](components/ly/shell/) |
| Home and its sections | [`components/ly/home/`](components/ly/home/) (`LyHome.vue`, `sections.json`, `sections/`) |
| Words (English and Arabic) | [`components/kalio/i18n/ly.en.ts`](components/kalio/i18n/ly.en.ts), [`ly.ar.ts`](components/kalio/i18n/ly.ar.ts); the skin's own words in `skin.json` "words" |
| Release notes, Layout id, checks of each version | [`LAYOUT.md`](LAYOUT.md) |
| The base this Layout is a skin of | [`BASE.md`](BASE.md) |
| Checks and release tooling | [`scripts/`](scripts/) (`run-checks.sh`, `fast-checks.config.mjs`, `release.sh`, `prod-check.mjs`, `checkout-walk.mjs`, `publish-github.sh`) |
| Selldone storefront's original README | [`README.selldone.md`](README.selldone.md) |

## Credits and license

Built on the official [Selldone Storefront](https://github.com/selldone/storefront) (MIT License, © Selldone); see [`LICENSE.md`](LICENSE.md). Photos: see `skins/avenio/photos/` and their licence notes in `LAYOUT.md`. Part of **[Selldone Custom Layouts](https://github.com/selldone-custom-layouts)**.
