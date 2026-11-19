# Avenio Department Store — release notes

**Avenio Department Store** (package `avenio-department-store`) is a Layout of the Selldone shop **fashioni** (xapi `fashioni`), built for **avenio.selldone.shop**. It is a skin of the Layout base (see [`BASE.md`](BASE.md)): everything that makes it this Layout is `skins/avenio/skin.json` and `skins/avenio/photos/`; the code, the flows and the checks are the base's.

## Setup

| Area | What is set |
| --- | --- |
| Repo | `avenio-layout`, branch `main`; remote `upstream` (selldone/storefront, fetch only, push disabled); `origin` = `selldone-custom-layouts/official-avenio` once published (`scripts/publish-github.sh`) |
| Names | `manifest.json` and `selldone-layout.json` from the skin (`package` is permanent after the first upload; the `description` must be right on the FIRST upload, Selldone keeps it) |
| Dev server | port **9172**, shop `fashioni` (`.env`); `npm run serve` (launch entry `avenio-layout`) |
| Skin | Garnet, Emerald, Sapphire, Ochre, Onyx (brand `garnet`), DM Serif Display over Figtree, radius 8 / 4 px, basket word "bag" |
| Layout id | **45** (pinned on avenio.selldone.shop only, domain 1257; the shop default and every other domain keep theirs) |

## Home

1. **event** (band): the store headline on the family-dark band, the live best saving and a button per department.
2. **slides** (wide): wide photo slides bound to departments (skin design.slides), live saving and lowest price, pause button.
3. **departments** (tiles): Shop by department, one photo tile per category with products.
4. **flags** (cards, tint band): four tall cards picked by live rules (newest, deepest deal, best value, top brand).
5. **prices** (tabs-row): Great prices, tabs (On sale, Under $x, a department on sale) and a product row beside the sale card.
6. **pricepoints** (tiles, tint band): Shop by price, Under $x tiles from the live prices.
7. **dealrows** (rows): Deals by department, up to three rows.
8. **feature** (split): one photo banner bound to a department (skin design.feature).
9. **brands** (tiles, tint band): Brands we love, typeset brand names from the live catalogue.
10. **finds** (tabs-row): Don't miss these finds, tabs Newest, Best value and two departments.
11. **edits** (banners): two wide photo banners bound to departments (skin design.edits).
12. **services** (cards, tint band): service promises from the shop's real ways, payment and hours.
13. **clearance** (row): Biggest savings, a product row by percent off.
14. **journal** (cards): The newest three posts as cards with photo, date and title (Avenio).

## The department-store set (Avenio's own, on top of the base)

- **Header:** a deals ticker in the top bar (the departments with the deepest live saving, then the shop's ways to receive an order), the wordmark left, a wide search field, account and bag; under it the **department bar** (every category with products, then Deals) whose buttons open a **five-column mega menu** (Featured, Shop by size from the variants, Brands, Shop by price, the department's photo card). `components/ly/dept/AvTicker.vue`, `AvDeptBar.vue`.
- **Home sections:** `components/ly/home/sections/dept/`, shared reads in `components/ly/dept/dept.ts` and `dept-section.ts`, the product row in `DeptRail.vue`; the skin's `design` block binds the slides, the feature and the edits to category slugs (a missing slug falls back to the ranked departments).
- **Listing:** the filter panel is an "All filters" drawer at every width; `?max=`, `?sale=1` and `?size=` open it pre-filtered (the mega menu's links); five cards across from 1360 px.
- **Card:** the brand in bold, the name in two lines, "Sale", the price with "(N% off)", colour dots.
- **Product page:** a thumbnail rail beside a 3:4 photo; the brand, colour circles and size boxes (one group per variant dimension; pattern keys never print raw), Add to bag + Buy now, the receive lines as tiles; the buy bar at every width.
- **Empty categories** (audience folders without products) stay out of every menu and row until they get products (`components/ly/ly.ts` loadDm).
- **Words:** the base's bakery copy is replaced in `skins/avenio/skin.json` words.en (store wording, clothing FAQ).
- **Loading:** the bag line art (`avenio-design/loading/`), continued by the in-app splash (`LySplash.vue` ART.bag).

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

## Checks

<!-- CHECKS:START -->
Fast checks (new-shop-kits/fast-checks) on https://avenio.selldone.shop, 16 Nov 2026:

| Check | 1.0.0 (full run) | 1.0.2 (types its changes touch) |
| --- | --- | --- |
| ring, card-edge, corner, circle, cart, currency, text-col | 0 | (not touched) |
| shape | 248 (off-scale corners on the flag cards and the play icon) | 0 |
| contrast | 4 (the slides cross-fade caught half way) | 0 |
| i18n (Arabic) | 104 (the new words had no Arabic yet) | 0 |
| box, underline | 0 | 0 |
<!-- CHECKS:END -->

## Releases

| Version | Date | Layout | Deploy | What |
| --- | --- | --- | --- | --- |
| 1.0.0 | 16 Nov 2026 | 45 | 689 | First release: the department-store set on the Layout base. PROD-CHECK OK, server js/css match. Fast checks on live: ring, card-edge, corner, circle, cart, currency, box, text-col, underline 0; shape 248, i18n 104, contrast 4. |
| 1.0.1 | 16 Nov 2026 | 45 | 690 | Slides move in instead of cross-fading (contrast), the flag cards and the play icon on the shape scale, Arabic for every new word and the slide titles, the shop data in Arabic (shop-data.ts + data/ar.json), the colour prompt in the listing. |
| 1.0.2 | 16 Nov 2026 | 45 | 691 | "All departments" first in the bar, there from the first paint (the departments arrive with the catalogue, about 4 s on live; the shape check opened the bar before that), the bar's height reserved, the shopping bag in every drawing slot (no pastry drawings). Guest checkout walk: Add to bag opens the sign-in sheet (guest checkout is off in the shop, the owner's setting), in the Layout's look at 1440 and 390; no order. |
| 1.0.3 | 16 Nov 2026 | 45 | 694 | Checkout: when no delivery way reaches the address yet (Fashioni: a courier within 30 km of the store and a pickup without pickup points, so a guest sees no way before an address near the store), the Delivery card says why ("Add your address to see the delivery options" / "No delivery to this address yet") with the address button, "Compare the options" hides, and the receipt says "No delivery to this address yet" instead of "This shop is not taking payment right now"; Arabic for the new words. Walk (guest checkout on in the shop since 16 Nov): `scripts/checkout-walk.mjs` takes the piece from the product page (size first), sets the address first at `checks.walkPlace` when the card has no way, and stops before Place order unless `PLACE=1`. |
| 1.0.4 | 19 Nov 2026 | 45 | 757 | Checkout: the buyer's delivery address comes back after a detour through pickup (before, pickup and then the courier again left an empty address, and Place order opened the address sheet instead of the payment window). Packed with `scripts/package-layout.mjs` (a Node port of Selldone's packager) on a computer without Python; PROD-CHECK OK, server js/css match. Walk on live (`PLACE=1`, the owner's OK of 19 Nov), 1440 and 390: pickup and then the courier (after the address at Tehran) both open Selldone's payment window with Cash on delivery; nothing inside it pressed, no order, the bag emptied. Known: before an address, the courier's row leaves the delivery sheet when tapped (the new bill has no address, so it does not offer the courier); after Done → the address, it is back. |
