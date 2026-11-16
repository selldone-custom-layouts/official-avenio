<!--
  Flag cards (sections.json "flags"/"cards"): four tall cards, each a real product picked by a live rule: the
  newest, the deepest deal, the best value (lowest price in stock) and the most stocked brand's newest piece.
  A rule with no product drops its card (and the row keeps an even count).
-->
<template>
  <section v-if="cards.length >= 2" aria-labelledby="fl-h" :class="['av-sec', 'av-flags', { band }]">
    <div class="wrap">
      <div class="av-hd">
        <h2 id="fl-h" class="av-h">{{ t("av.fl.h", "Picked for today") }}</h2>
      </div>
      <ul class="fl-grid" :data-n="cards.length">
        <li v-for="c in cards" :key="c.k">
          <router-link :to="productTo(c.p)" class="fl-c">
            <span class="fl-f">{{ c.flag }}</span>
            <span class="fl-ph"><img :src="img(c.p)" alt="" loading="lazy" /></span>
            <span class="fl-tx">
              <span v-if="brandOf(c.p)" class="fl-b"><bdi>{{ brandOf(c.p) }}</bdi></span>
              <span class="fl-t">{{ c.p.title }}</span>
              <span class="fl-p"
                ><span class="now money">{{ money(pv(c.p).now) }}</span><s v-if="pv(c.p).was" class="was money">{{ money(pv(c.p).was) }}</s
                ><span v-if="pv(c.p).off" class="off">{{ t("av.offN", "{off}% off", { off: pv(c.p).off }) }}</span></span
              >
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import deptSection from "../../../dept/dept-section";

export default {
  name: "FlagCards",
  mixins: [deptSection],
  computed: {
    cards() {
      if (!this.ready) return [];
      const pool = this.inStock(this.products);
      const used = new Set();
      const take = (list) => list.find((p) => !used.has(p.id) && this.img(p));
      const out = [];
      const add = (k, flag, p) => p && (used.add(p.id), out.push({ k, flag, p }));
      add("new", this.t("av.fl.new", "New arrival"), take(this.byNew(pool)));
      add("deal", this.t("av.fl.deal", "Deepest deal"), take(this.deals));
      add("value", this.t("av.fl.value", "Best value"), take(this.byPrice(pool)));
      const top = this.brands(pool)[0];
      if (top) add("brand", this.t("av.fl.brand", "From {brand}", { brand: top.name }), take(this.byNew(pool.filter((p) => this.brandOf(p) === top.name))));
      return out.length === 3 ? out.slice(0, 2) : out;
    },
  },
};
</script>
