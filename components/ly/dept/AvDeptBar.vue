<!--
  Avenio's department bar (from 980 px, under the header row): "All departments", then every category with
  products, then "Deals" in the family colour. A department opens its mega menu on a click (a second click, Esc,
  a click outside or a page change closes it: the base's layers, ly.ts): five columns from the live catalogue:
  Featured (new in, on sale, best value), By size (the department's own variant sizes), Brands (its most stocked),
  By price (Under $x from its own prices) and the department's photo card with its live saving.
-->
<template>
  <nav v-if="!ly.ready || depts.length" :aria-label="t('av.depts', 'Departments')" class="av-dbar">
    <div class="wrap db-in">
      <ul class="db-list">
        <!-- "All departments": there from the first paint (the departments arrive with the catalogue) -->
        <li class="db-li">
          <button :aria-expanded="layer.open === 'mm-all' ? 'true' : 'false'" aria-controls="mm-all" class="db-a all" type="button" @click="toggleLayer('mm-all', $event.currentTarget)">
            {{ t("av.db.all", "All departments") }}<ly-icon cls="chev" name="down" />
          </button>
        </li>
        <li v-for="c in depts" :key="c.id" class="db-li">
          <button
            :aria-controls="'mm-' + c.id"
            :aria-expanded="layer.open === 'mm-' + c.id ? 'true' : 'false'"
            :class="['db-a', { on: onCat(c) }]"
            type="button"
            @click="toggleLayer('mm-' + c.id, $event.currentTarget)"
          >
            <bdi>{{ catTitle(c) }}</bdi><ly-icon cls="chev" name="down" />
          </button>
        </li>
        <li v-if="offMax" class="db-li">
          <router-link :to="saleTo()" class="db-a sale">{{ t("av.db.deals", "Deals") }}</router-link>
        </li>
      </ul>
    </div>
    <div v-show="layer.open === 'mm-all'" id="mm-all" :aria-label="t('av.db.all', 'All departments')" class="av-mm" role="region">
      <div v-if="layer.open === 'mm-all'" class="wrap mm-all">
        <p class="mm-h">{{ t("av.db.all", "All departments") }}</p>
        <ul v-if="depts.length" class="mm-tiles">
          <li v-for="c in depts" :key="c.id">
            <router-link :to="catTo(c)" class="mm-tile">
              <span :class="['mm-ph', { plate: !photoOf(c).own }]"><img v-if="photoOf(c).src" :src="photoOf(c).src" alt="" loading="lazy" /></span>
              <b><bdi>{{ catTitle(c) }}</bdi></b>
              <span v-if="deptDeal(c)" class="mm-off">{{ t("av.upTo", "Up to {off}% off", { off: deptDeal(c) }) }}</span>
            </router-link>
          </li>
        </ul>
        <p v-else class="mm-wait">{{ t("av.db.loading", "Loading the departments…") }}</p>
      </div>
    </div>
    <div v-for="c in depts" v-show="layer.open === 'mm-' + c.id" :id="'mm-' + c.id" :key="'mm' + c.id" :aria-label="catTitle(c)" class="av-mm" role="region">
      <div v-if="layer.open === 'mm-' + c.id" class="wrap mm-in">
        <div class="mm-col">
          <p class="mm-h">{{ t("av.mm.featured", "Featured") }}</p>
          <ul>
            <li><router-link :to="catTo(c)">{{ t("av.mm.all", "All {name}", { name: catTitle(c) }) }}</router-link></li>
            <li><router-link :to="withQuery(c, { sort: 'newest' })">{{ t("av.mm.new", "New arrivals") }}</router-link></li>
            <li v-if="deptDeal(c)"><router-link :to="withQuery(c, { sale: '1' })">{{ t("av.mm.sale", "On sale") }}</router-link></li>
            <li><router-link :to="withQuery(c, { sort: 'cheapest' })">{{ t("av.mm.value", "Best value") }}</router-link></li>
          </ul>
        </div>
        <div v-if="sizesOf(c).length" class="mm-col">
          <p class="mm-h">{{ t("av.mm.size", "Shop by size") }}</p>
          <ul class="mm-sizes">
            <li v-for="s in sizesOf(c)" :key="s"><router-link :to="withQuery(c, { size: s })" class="mm-sz">{{ s }}</router-link></li>
          </ul>
        </div>
        <div v-if="brandsOf(c).length" class="mm-col">
          <p class="mm-h">{{ t("av.mm.brands", "Brands") }}</p>
          <ul>
            <li v-for="b in brandsOf(c)" :key="b.name"><router-link :to="brandTo(b.name)"><bdi>{{ b.name }}</bdi></router-link></li>
          </ul>
        </div>
        <div v-if="pointsOf(c).length" class="mm-col">
          <p class="mm-h">{{ t("av.mm.price", "Shop by price") }}</p>
          <ul>
            <li v-for="pt in pointsOf(c)" :key="pt"><router-link :to="withQuery(c, { max: String(pt) })">{{ t("av.under", "Under {price}", { price: money(pt, true) }) }}</router-link></li>
          </ul>
        </div>
        <router-link :to="catTo(c)" class="mm-card">
          <span :class="['mm-ph', { plate: !photoOf(c).own }]"><img v-if="photoOf(c).src" :src="photoOf(c).src" alt="" loading="lazy" /></span>
          <span class="mm-ct">
            <b><bdi>{{ catTitle(c) }}</bdi></b>
            <span v-if="deptDeal(c)">{{ t("av.upTo", "Up to {off}% off", { off: deptDeal(c) }) }}</span>
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import LyIcon from "../LyIcon.vue";
import { catTitle, catTo, inCat, layer, ly, money, toggleLayer } from "../ly";
import { collectionPhoto } from "../ly-photos";
import { currentCurrency } from "../../region-switcher/region";
import { t } from "../../kalio/i18n/kalio-i18n";
import { useShop, brandTo, brands, departments, deptDeal, deptPlate, dimensionsOf, maxOff, pricePoints, saleTo } from "./dept";

export default {
  name: "AvDeptBar",
  components: { LyIcon },
  data: () => ({ layer, ly }),
  watch: {
    "$store.getters.getShop": {
      handler(s) {
        useShop(s);
      },
      immediate: true,
    },
  },
  computed: {
    depts() {
      return this.ly.ready ? departments() : [];
    },
    offMax() {
      void currentCurrency();
      return this.ly.ready ? maxOff(this.ly.products) : 0;
    },
  },
  methods: {
    t,
    money,
    catTitle,
    catTo,
    saleTo,
    brandTo,
    toggleLayer,
    deptDeal(c) {
      void currentCurrency();
      return deptDeal(c);
    },
    onCat(c) {
      return this.$route?.params?.category_name === c.name;
    },
    withQuery(c, query) {
      return { ...catTo(c), query };
    },
    sizesOf(c) {
      const vs = inCat(c.id).flatMap((p) => (p.product_variants || []).filter((v) => v && v.enable !== false));
      const d = dimensionsOf(vs).find((x) => x.key === "type" || x.key === "volume");
      return d ? d.values.filter((v) => !/[{}]/.test(v)).slice(0, 12) : [];
    },
    brandsOf(c) {
      return brands(inCat(c.id)).slice(0, 6);
    },
    pointsOf(c) {
      void currentCurrency();
      return pricePoints(inCat(c.id), 3);
    },
    photoOf(c) {
      const own = collectionPhoto(c);
      return own ? { src: own, own: true } : { src: deptPlate(c), own: false };
    },
  },
};
</script>
