<!--
  "Shop by price" (sections.json "pricepoints"/"tiles"): four "Under $x" tiles from the live prices (each has
  products under it), each opening every product under that price; "On sale" as the last tile when there are deals.
-->
<template>
  <section v-if="points.length >= 2" aria-labelledby="pp-h" :class="['av-sec', 'av-points', { band }]">
    <div class="wrap">
      <div class="av-hd">
        <h2 id="pp-h" class="av-h">{{ t("av.pp.h", "Shop by price") }}</h2>
      </div>
      <ul class="pp-grid" :data-n="points.length + (offMax ? 1 : 0)">
        <li v-for="pt in points" :key="pt">
          <router-link :to="underTo(pt)" class="pp-t">
            <span class="pp-k">{{ t("av.pp.under", "Under") }}</span>
            <b class="pp-v money">{{ money(pt, true) }}</b>
          </router-link>
        </li>
        <li v-if="offMax">
          <router-link :to="saleTo()" class="pp-t sale">
            <span class="pp-k">{{ t("av.pp.sale", "On sale") }}</span>
            <b class="pp-v">{{ t("av.pp.upTo", "−{off}%", { off: offMax }) }}</b>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import deptSection from "../../../dept/dept-section";

export default {
  name: "PricePoints",
  mixins: [deptSection],
  computed: {
    points() {
      void this.currency;
      return this.ready ? this.pricePoints(this.products) : [];
    },
  },
};
</script>
