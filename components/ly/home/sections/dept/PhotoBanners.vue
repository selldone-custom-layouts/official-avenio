<!--
  Photo banners bound to departments by the skin: "feature"/"split" (one photo beside a family panel; design.feature
  { photo, cat, cat2, title }) and "edits"/"banners" (two wide banners side by side; design.edits [{ photo, cat,
  title, tone }]). Words from the live data (the department, its saving, its lowest price); a missing photo shows the
  department's own products on the family plate, a missing department falls back to the ranked ones.
-->
<template>
  <section v-if="items.length" :aria-label="aria" :class="['av-sec', 'av-banners', 'v-' + variant, { band }]">
    <div class="wrap">
      <div :class="['bn-grid', 'n' + items.length]">
        <router-link v-for="b in items" :key="b.key" :class="['bn', 'tone-' + b.tone]" :to="catTo(b.cat)">
          <span class="bn-ph">
            <img v-if="b.photo" :src="b.photo" alt="" decoding="async" loading="lazy" />
            <span v-else aria-hidden="true" class="bn-fb"><img v-for="p in b.plates" :key="p.id" :src="img(p)" alt="" loading="lazy" /></span>
          </span>
          <span class="bn-tx">
            <span class="bn-k"><bdi>{{ b.names }}</bdi></span>
            <span class="bn-h">{{ b.title }}</span>
            <span v-if="b.line" class="bn-l">{{ b.line }}</span>
            <span class="btn sm">{{ t("av.bn.shop", "Shop now") }}</span>
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import deptSection from "../../../dept/dept-section";
import { slugOf } from "../../../dept/dept";

export default {
  name: "PhotoBanners",
  mixins: [deptSection],
  computed: {
    aria() {
      return this.variant === "split" ? this.t("av.bn.feature", "Featured") : this.t("av.bn.edits", "Edits");
    },
    items() {
      if (!this.ready) return [];
      void this.currency;
      const want = this.variant === "split" ? [this.design.feature || { photo: "feature" }] : this.design.edits || [{ photo: "edit-1" }, { photo: "edit-2" }];
      const start = this.variant === "split" ? 4 : 2;
      const used = new Set();
      return want
        .map((w, n) => {
          let c = this.bound(w.cat, start + n);
          if (!c || used.has(c.id)) c = this.depts.find((d) => !used.has(d.id));
          if (!c) return null;
          used.add(c.id);
          const c2 = w.cat2 ? this.bound(w.cat2) : null;
          const ps = this.inCat(c.id).concat(c2 && c2.id !== c.id ? this.inCat(c2.id) : []);
          const off = Math.max(this.deptDeal(c), c2 ? this.deptDeal(c2) : 0);
          const from = this.fromPrice(ps);
          return {
            key: c.id,
            cat: c,
            tone: w.tone || "dark",
            photo: this.slot(w.photo),
            plates: this.inStock(ps).slice(0, 3),
            names: [this.catTitle(c), c2 && c2.id !== c.id ? this.catTitle(c2) : ""].filter(Boolean).join(" · "),
            title: w.title ? this.t("av.title." + slugOf(c), w.title) : this.catTitle(c),
            line: [off ? this.upTo(off) : "", from ? this.t("av.from", "From {price}", { price: from }) : ""].filter(Boolean).join(" · "),
          };
        })
        .filter(Boolean);
    },
  },
};
</script>
