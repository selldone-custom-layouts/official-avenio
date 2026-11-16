# Avenio Department Store — release notes

**Avenio Department Store** (package `avenio-department-store`) is a Layout of the Selldone shop **fashioni** (xapi `fashioni`), built for **avenio.selldone.shop**. It is a skin of the Layout base (see [`BASE.md`](BASE.md)): everything that makes it this Layout is `skins/avenio/skin.json` and `skins/avenio/photos/`; the code, the flows and the checks are the base's.

## Setup

| Area | What is set |
| --- | --- |
| Repo | `avenio-layout`, branch `main`; remote `upstream` (selldone/storefront, fetch only, push disabled); `origin` = `selldone-custom-layouts/official-avenio` once published (`scripts/publish-github.sh`) |
| Names | `manifest.json` and `selldone-layout.json` from the skin (`package` is permanent after the first upload; the `description` must be right on the FIRST upload, Selldone keeps it) |
| Dev server | port **9172**, shop `fashioni` (`.env`); `npm run serve` (launch entry `avenio-layout`) |
| Skin | Garnet, Emerald, Sapphire, Ochre, Onyx (brand `garnet`), DM Serif Display over Figtree, radius 8 / 4 px, basket word "bag" |
| Layout id | (after the first upload) |

## Home

1. **hero** (split): The shop's name and line on the left; the counter photo bleeding to the right edge of the frame, a framed inset across the seam with the best seller, the three most-ordered collections set large on the photo's dark corner (from Pralino).
2. **collections** (cards): The same four as a 2 × 2 grid of cards, the photo on top inside the card (Domino).
3. **journal** (photo, tint band): The four newest posts beside a tall photo with the big word 'Journal' (from Pralino; best last).

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
(none yet)
<!-- CHECKS:END -->

## Releases

| Version | Date | Layout | Deploy | What |
| --- | --- | --- | --- | --- |
