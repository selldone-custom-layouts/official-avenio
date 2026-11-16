# Avenio Department Store

**Avenio Department Store** is a custom storefront **Layout** for Selldone shops: a department store for one seller, with a deals ticker, a department bar with five-column mega menus, deal rows, price tiles, brand tiles, a five-across listing with an "All filters" drawer and a two-column product page with colour circles, size boxes, Add to bag and Buy now. It runs live on **[avenio.selldone.shop](https://avenio.selldone.shop)** (the Selldone shop *fashioni*, a clothing shop).

It is built on the official [selldone/storefront](https://github.com/selldone/storefront) and the shared Layout base: everything that makes it Avenio is `skins/avenio/skin.json`, `skins/avenio/photos/` and the department-store set in `components/ly/dept/` and `components/ly/home/sections/dept/`.

## How it works

1. You upload the Layout to your Selldone account (the CLI, see [Build and Upload](Build-and-Upload)).
2. You pick it for a domain of your shop (each domain of a shop can carry its own Layout).
3. Selldone injects **your** shop into the Layout: its title, categories, products, prices and savings, brands, sizes and colours, delivery ways, payment methods, articles, languages and currencies. Nothing about one shop is written in the code.

## The look

| Part | How it looks |
| --- | --- |
| Colour | one colour family from the palette's seed: Garnet (default), Emerald, Sapphire, Ochre, Onyx or any custom colour, light or dark, from the footer's **Theme** row |
| Type | DM Serif Display for headings and the wordmark; Figtree for everything else, prices included |
| Shape | crisp: 4 px buttons, fields, tabs, size boxes, tiles and photos; 8 px panels, drawers, cards and the mega menu; circles only for swatches, icon buttons and the saving roundel |
| Buttons | flat; hover changes the colour only; no line under any word or icon |

## The pages

- **Header:** the deals ticker (the departments with the deepest live saving, then the ways to receive an order), the wordmark, a wide search field, account and bag; the **department bar** (every category with products, then Deals) opens a mega menu per department: Featured (all, new arrivals, on sale, best value), Shop by size (the department's own variant sizes), Brands, Shop by price, and the department's photo card.
- **Home:** the event band with a button per department; wide photo slides bound to departments; Shop by department; four flag cards (newest, deepest deal, best value, the top brand); Great prices (tabs and a product row beside the sale card); Shop by price; Deals by department; a feature banner; Brands we love; Don't miss these finds; two edit banners; service promises from the shop's real ways and payment; Biggest savings; stories from the journal. A section with no data hides itself.
- **Listing:** a compact title band with the department's photo, the departments as one line of chips, "All filters" (a drawer at every width: price, on offer, every spec group), the active filters as chips, Sort, five cards across.
- **Card:** the brand, the name, "Sale", the price with "(N% off)" and the struck price, colour dots, Choose options / Add to bag.
- **Product page:** a thumbnail rail beside the photo; brand, name, price and saving, **Colour** circles and **Size** boxes (sold-out ones struck through), Add to bag + Buy now, Compare, the shop's delivery and pickup lines as tiles; the details and related rows below; a buy bar once the buy box scrolls away.
- **Bag, checkout, orders and account:** Selldone's own flows in the Layout's look.

## Pages of this wiki

- [Shop Requirements](Shop-Requirements) · [Install with AI](Install-with-AI) · [Manual Setup](Manual-Setup)
- [Customize](Customize) · [Theme and colours](Theme-and-colours)
- [Build and Upload](Build-and-Upload) · [Go Live](Go-Live) · [Troubleshooting](Troubleshooting)
