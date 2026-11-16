/*
 * Avenio's department-store reads (header ticker, department bar, the home's deal rows, the listing and the
 * product page). Everything comes from the live catalogue the base already loads (ly.ts: ly.cats, ly.products):
 * a "department" is a category that has products; a deal is a product whose price really saves; a brand is the
 * product's own brand field (or its Brand spec). Nothing here names a shop's product, price or category; the
 * skin's "design" block may bind a photo slot to a category slug, and every binding falls back to the ranked
 * departments when the slug is missing.
 */
import { shallowRef } from "vue";
import { catImage, catTitle, catTo, inCat, ly, money, priceView, productImage } from "../ly";
import { catalogueRoute, dealsRoute, percentOff } from "../../kalio/kalio-catalog";
import { SKIN } from "../skin.gen";
import { colourName } from "../../bakini/bakini";

declare const window: any;

/* The shop record, set by the header and the sections (useShop) so plain functions can price by Selldone's rules;
   reactive, so every computed that prices a product updates when the shop arrives. */
const SHOP = shallowRef<any>(null);
export function useShop(shop: any): void {
  if (shop && SHOP.value !== shop) SHOP.value = shop;
}
const shopOf = () => SHOP.value;

/** The skin's design notes (bindings of photo slots to category slugs): skins/<name>/skin.json "design". */
const SKIN_FILES = import.meta.glob("../../../skins/*/skin.json", { eager: true, import: "default" }) as Record<string, any>;
const OWN = Object.entries(SKIN_FILES).find(([p]) => p.includes("/" + (SKIN as any).name + "/"));
export const DESIGN: any = (OWN && OWN[1].design) || {};

/** A category's slug as the photo slots name it ("Dresses & One-Pieces" → "dresses-one-pieces"). */
export function slugOf(c: any): string {
  return String(catTitle(c) || c?.name || "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** The departments: categories with products, the most stocked first (ties keep the shop's order). */
export function departments(): any[] {
  return ly.cats
    .map((c: any, i: number) => ({ c, i, n: inCat(c.id).length }))
    .filter((x: any) => x.n > 0)
    .sort((a: any, b: any) => b.n - a.n || a.i - b.i)
    .map((x: any) => x.c);
}

/** The department a skin binding names, else the n-th ranked department. */
export function bound(slug: string | undefined, n = 0): any {
  const ds = departments();
  return (slug && ds.find((c) => slugOf(c) === slug)) || ds[n] || null;
}

export function offOf(p: any): number {
  const shop = shopOf();
  try {
    return percentOff(shop, p) || 0;
  } catch {
    return 0;
  }
}

export function pvOf(p: any) {
  return priceView(shopOf(), p);
}

/** The deepest real saving among products. */
export function maxOff(list: any[]): number {
  let m = 0;
  for (const p of list) m = Math.max(m, offOf(p));
  return m;
}

/** "Up to 40% off" for a department, or "" when nothing there saves. */
export function deptDeal(c: any): number {
  return maxOff(inCat(c.id));
}

export function onSale(list: any[]): any[] {
  return list.filter((p) => offOf(p) > 0 && p.quantity > 0);
}

export function byOff(list: any[]): any[] {
  return [...list].sort((a, b) => offOf(b) - offOf(a));
}

export function byNew(list: any[]): any[] {
  return [...list].sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")) || b.id - a.id);
}

export function byPrice(list: any[]): any[] {
  return [...list].sort((a, b) => pvOf(a).now - pvOf(b).now);
}

export function inStock(list: any[]): any[] {
  return list.filter((p) => Number(p.quantity) > 0);
}

/** A product's brand: its own field, else its Brand spec. */
export function brandOf(p: any): string {
  if (p?.brand) return String(p.brand).trim();
  const s = p?.spec || {};
  for (const k of Object.keys(s)) if (/^brand\b/i.test(k.trim())) return String(Array.isArray(s[k]) ? s[k][0] : s[k]).trim();
  return "";
}

/** The brands, the most stocked first. */
export function brands(list: any[] = ly.products): { name: string; n: number; off: number }[] {
  const m = new Map<string, { name: string; n: number; off: number }>();
  for (const p of list) {
    const b = brandOf(p);
    if (!b) continue;
    const x = m.get(b) || { name: b, n: 0, off: 0 };
    x.n++;
    x.off = Math.max(x.off, offOf(p));
    m.set(b, x);
  }
  return [...m.values()].sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));
}

/** Round price points for "Under $X" tiles from the live prices (each tile has products under it). */
export function pricePoints(list: any[] = ly.products, n = 4): number[] {
  const now = inStock(list)
    .map((p) => pvOf(p).now)
    .filter((x) => x > 0)
    .sort((a, b) => a - b);
  if (now.length < 4) return [];
  const nice = [10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200, 250, 300, 400, 500, 750, 1000];
  const out: number[] = [];
  for (const q of [0.2, 0.4, 0.6, 0.8]) {
    const v = now[Math.floor(q * (now.length - 1))];
    const pt = nice.find((x) => x >= v) || Math.ceil(v / 100) * 100;
    if (!out.includes(pt)) out.push(pt);
  }
  return out.slice(0, n);
}

/** The listing of every product under a price (the listing reads ?max= and ?sale=1). */
export function underTo(max: number) {
  return catalogueRoute({ sort: "cheapest", max: String(max) });
}
export function saleTo() {
  return dealsRoute();
}
export function brandTo(name: string) {
  return catalogueRoute({ search: name });
}

/** A department's photo: the skin's col-<slug> when shipped (resolved by LyPhoto), else its best product. */
export function deptPlate(c: any): string | null {
  const ps = inStock(inCat(c.id));
  const p = ps[0] || inCat(c.id)[0];
  return (p && productImage(p, 512)) || catImage(c, 512);
}

/* ── sizes and colours ── */

const SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
/** A size value for people: pattern keys ("{leather-text}") and style suffixes ("Red{s1}") never print raw. */
export function optionLabel(key: string, value: string, index = 0): string {
  const v = String(value ?? "").trim();
  if (!v) return "";
  if (key === "color") return colourName(v) || v;
  if (/^\{.*\}$/.test(v)) return `Style ${index + 1}`;
  return v.replace(/\{[^}]*\}/g, "").trim() || `Style ${index + 1}`;
}

export function sizeRank(v: string): number {
  const u = String(v).toUpperCase();
  const i = SIZE_ORDER.indexOf(u);
  if (i >= 0) return i;
  const n = parseFloat(u);
  if (!Number.isNaN(n)) return 100 + n + (/M$/.test(u) ? 0 : /Y$/.test(u) ? 50 : 0);
  return 1000;
}

/** The variant dimensions that really vary (colour first, then size-like keys), with their values in order. */
export function dimensionsOf(variants: any[]): { key: string; values: string[] }[] {
  const keys = ["color", "type", "volume", "style", "weight", "pack"];
  const out: { key: string; values: string[] }[] = [];
  for (const k of keys) {
    const vals = [...new Set(variants.map((v) => String(v?.[k] ?? "").trim()).filter(Boolean))];
    if (vals.length > 1 || (vals.length === 1 && k === "color")) out.push({ key: k, values: k === "color" ? vals : vals.sort((a, b) => sizeRank(a) - sizeRank(b)) });
  }
  return out;
}

export function dimWord(key: string): string {
  return ({ color: "Colour", type: "Size", volume: "Size", style: "Style", weight: "Weight", pack: "Pack" } as any)[key] || "Option";
}

/** The distinct colours of a product's variants (hex), for the card's dots. */
export function coloursOf(p: any): string[] {
  return [...new Set((p?.product_variants || []).filter((v: any) => v && v.enable !== false && v.color).map((v: any) => String(v.color).split("/")[0]))] as string[];
}

/** The live colours across products, by nearest name, the most common first. */
export function colourChoices(list: any[]): { name: string; hex: string; n: number }[] {
  const m = new Map<string, { name: string; hex: string; n: number }>();
  for (const p of list) {
    const seen = new Set<string>();
    for (const hex of coloursOf(p)) {
      const name = colourName(hex);
      if (!name || seen.has(name)) continue;
      seen.add(name);
      const x = m.get(name) || { name, hex, n: 0 };
      x.n++;
      m.set(name, x);
    }
  }
  return [...m.values()].sort((a, b) => b.n - a.n);
}

export function hasColour(p: any, name: string): boolean {
  return coloursOf(p).some((h) => colourName(h) === name);
}

export { money, catTo, catTitle, inCat, productImage };
