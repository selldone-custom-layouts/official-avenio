<!--
  A product row with tabs (sections.json "prices"/"tabs-row", "finds"/"tabs-row") and a plain row ("clearance"/
  "row"). Every tab is a live rule; a tab with fewer than four products is left out, and the section hides when no
  tab is left. "prices": On sale, Under $x (two live price points), the department with the most deals on sale,
  beside a tall family card with the store's best saving. "finds": Newest, Best value, then the two most stocked
  departments. "clearance": the biggest savings first.
-->
<template>
  <section v-if="tabs.length" :aria-labelledby="id + '-h'" :class="['av-sec', 'av-tabsrow', 'k-' + kind, { band }]">
    <div class="wrap">
      <div class="av-hd row">
        <h2 :id="id + '-h'" class="av-h">{{ title }}</h2>
        <router-link :to="tab.to" class="av-more">{{ t("av.seeAll", "See all") }}<ly-icon name="right" /></router-link>
      </div>
      <div v-if="tabs.length > 1" :aria-label="title" class="av-tabs" role="tablist">
        <button
          v-for="(x, i) in tabs"
          :id="id + '-t' + i"
          :key="x.k"
          :aria-controls="id + '-p'"
          :aria-selected="i === at ? 'true' : 'false'"
          :tabindex="i === at ? 0 : -1"
          class="av-tab"
          role="tab"
          type="button"
          @click="at = i"
          @keydown.right.prevent="move(1)"
          @keydown.left.prevent="move(-1)"
        >
          {{ x.label }}
        </button>
      </div>
      <div :id="id + '-p'" :aria-labelledby="tabs.length > 1 ? id + '-t' + at : id + '-h'" :class="['tr-body', { 'has-card': kind === 'prices' && offMax }]" role="tabpanel">
        <router-link v-if="kind === 'prices' && offMax" :to="saleTo()" class="tr-card">
          <span class="trc-k">{{ t("av.tr.event", "The sale") }}</span>
          <b class="trc-n">{{ t("av.tr.upTo", "Up to") }}<span>{{ offMax }}%</span>{{ t("av.tr.off", "off") }}</b>
          <span class="trc-l">{{ t("av.tr.line", "Deals in every department, already in the price.") }}</span>
          <span class="btn sm alt">{{ t("av.tr.shop", "Shop deals") }}</span>
        </router-link>
        <dept-rail :items="tab.items" />
      </div>
    </div>
  </section>
</template>

<script>
import LyIcon from "../../../LyIcon.vue";
import DeptRail from "../../../dept/DeptRail.vue";
import deptSection from "../../../dept/dept-section";
import { catalogueRoute } from "../../../../kalio/kalio-catalog";

const MIN = 4;
const MAX = 12;

export default {
  name: "TabsRow",
  components: { LyIcon, DeptRail },
  mixins: [deptSection],
  props: { kind: { type: String, default: "prices" } },
  data: () => ({ at: 0 }),
  computed: {
    id() {
      return "tr-" + this.kind;
    },
    title() {
      if (this.kind === "finds") return this.t("av.tr.findsH", "Don't miss these finds");
      if (this.kind === "clearance") return this.t("av.tr.clearH", "Biggest savings");
      return this.t("av.tr.pricesH", "Great prices, every department");
    },
    tabs() {
      if (!this.ready) return [];
      void this.currency;
      const pool = this.inStock(this.products);
      const out = [];
      const add = (k, label, items, to) => items.length >= MIN && out.push({ k, label, items: items.slice(0, MAX), to });
      if (this.kind === "clearance") {
        add("save", this.title, this.deals.filter((p) => this.pv(p).off >= 10), catalogueRoute({ filter: JSON.stringify({ only_has_discount: true }), sort: "saving" }));
      } else if (this.kind === "finds") {
        add("new", this.t("av.tr.newest", "Newest"), this.byNew(pool), catalogueRoute({ sort: "newest" }));
        add("value", this.t("av.tr.value", "Best value"), this.byPrice(pool), catalogueRoute({ sort: "cheapest" }));
        for (const c of this.depts.slice(0, 2)) add("d" + c.id, this.catTitle(c), this.byNew(this.inStock(this.inCat(c.id))), this.catTo(c));
      } else {
        add("sale", this.t("av.tr.onSale", "On sale"), this.deals, this.saleTo());
        for (const pt of this.pricePoints(pool).slice(0, 2)) add("u" + pt, this.t("av.under", "Under {price}", { price: this.money(pt, true) }), this.byNew(pool.filter((p) => this.pv(p).now <= pt)), this.underTo(pt));
        const d = [...this.depts].sort((a, b) => this.deals.filter((p) => p.category_id === b.id).length - this.deals.filter((p) => p.category_id === a.id).length)[0];
        if (d) add("d" + d.id, this.t("av.tr.deptSale", "{name} on sale", { name: this.catTitle(d) }), this.deals.filter((p) => p.category_id === d.id), this.catTo(d));
      }
      return out;
    },
    tab() {
      return this.tabs[Math.min(this.at, this.tabs.length - 1)] || { items: [], to: "/" };
    },
  },
  methods: {
    move(d) {
      this.at = (this.at + d + this.tabs.length) % this.tabs.length;
      this.$nextTick(() => document.getElementById(this.id + "-t" + this.at)?.focus());
    },
  },
};
</script>
