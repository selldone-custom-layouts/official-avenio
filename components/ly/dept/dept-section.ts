/*
 * The shared reads of Avenio's department-store home sections (components/ly/home/sections/dept/). Every section
 * draws only what the live catalogue has and hides itself when it has nothing (a shop without deals has no deal
 * rows, without brands no brand tiles). Words come through t() with English defaults (Arabic in ly.ar.ts / the
 * skin's words.ar).
 */
import { catTitle, catTo, inCat, ly, money, priceView, productImage, productTo, shopFacts } from "../ly";
import { collectionPhoto, slotPhoto } from "../ly-photos";
import { currentCurrency } from "../../region-switcher/region";
import { t } from "../../kalio/i18n/kalio-i18n";
import { useShop, DESIGN, bound, byNew, byOff, byPrice, brands, departments, deptDeal, deptPlate, inStock, maxOff, onSale, pricePoints, saleTo, underTo, brandTo, brandOf } from "./dept";

export default {
  props: {
    variant: { type: String, default: "" },
    band: { type: Boolean, default: false },
  },

  data: () => ({ ly }),
  watch: {
    "$store.getters.getShop": {
      handler(s) {
        useShop(s);
      },
      immediate: true,
    },
  },

  computed: {
    shop(): any {
      return (this as any).$store.getters.getShop;
    },
    currency(): string {
      return currentCurrency();
    },
    facts(): any {
      return shopFacts((this as any).shop);
    },
    ready(): boolean {
      return ly.ready && ly.catsReady;
    },
    depts(): any[] {
      return ly.ready ? departments() : [];
    },
    products(): any[] {
      return ly.products;
    },
    deals(): any[] {
      void (this as any).currency;
      return byOff(onSale(ly.products));
    },
    offMax(): number {
      void (this as any).currency;
      return maxOff(ly.products);
    },
    design(): any {
      return DESIGN;
    },
  },

  methods: {
    t,
    money,
    catTitle,
    catTo,
    productTo,
    inCat,
    bound,
    byNew,
    byOff,
    byPrice,
    brands,
    brandOf,
    deptDeal,
    inStock,
    pricePoints,
    saleTo,
    underTo,
    brandTo,
    pv(p: any) {
      void (this as any).currency;
      return priceView((this as any).shop, p);
    },
    img(p: any, size: number | null = null) {
      return productImage(p, size);
    },
    /** A department's photo: its col-<slug> slot, else its own best product. */
    deptPhoto(c: any): { src: string | null; own: boolean } {
      const own = collectionPhoto(c);
      return own ? { src: own, own: true } : { src: deptPlate(c), own: false };
    },
    slot(name: string) {
      return slotPhoto(name);
    },
    upTo(off: number) {
      return off > 0 ? t("av.upTo", "Up to {off}% off", { off }) : "";
    },
    fromPrice(list: any[]) {
      const now = inStock(list).map((p: any) => (this as any).pv(p).now);
      return now.length ? money(Math.min(...now)) : "";
    },
  },
};
