<!--
  Avenio's deals ticker (the top bar's left side): one live line at a time, "Up to N% off <department>" for the four
  departments with the deepest saving, then the shop's real ways to receive an order. Changes every 5 s; still for
  visitors who ask for less motion (then only the first line shows). A shop with no deal and no way shows nothing.
-->
<template>
  <p v-if="lines.length" aria-live="off" class="av-tick">
    <component :is="lines[at].to ? 'router-link' : 'span'" :key="at" :to="lines[at].to || undefined" class="tk-l">{{ lines[at].text }}</component>
  </p>
</template>

<script>
import { catTitle, catTo, ly, shopFacts } from "../ly";
import { currentCurrency } from "../../region-switcher/region";
import { t } from "../../kalio/i18n/kalio-i18n";
import { departments, deptDeal } from "./dept";

export default {
  name: "AvTicker",
  data: () => ({ ly, at: 0 }),
  computed: {
    lines() {
      if (!this.ly.ready) return [];
      void currentCurrency();
      const out = departments()
        .map((c) => ({ c, off: deptDeal(c) }))
        .filter((x) => x.off > 0)
        .sort((a, b) => b.off - a.off)
        .slice(0, 4)
        .map((x) => ({ text: t("av.tk.dept", "Up to {off}% off {name}", { off: x.off, name: catTitle(x.c) }), to: catTo(x.c) }));
      const f = shopFacts(this.$store.getters.getShop);
      for (const w of f.ways.slice(0, 2)) out.push({ text: w.pickup ? t("av.tk.pickup", "{way}: order online, collect in store", { way: w.title }) : w.free ? t("av.tk.free", "{way}: free on every order", { way: w.title }) : w.title, to: null });
      return out;
    },
  },
  watch: {
    lines(v) {
      if (this.at >= v.length) this.at = 0;
    },
  },
  mounted() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    this.timer = setInterval(() => {
      if (this.lines.length > 1 && !document.hidden) this.at = (this.at + 1) % this.lines.length;
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
