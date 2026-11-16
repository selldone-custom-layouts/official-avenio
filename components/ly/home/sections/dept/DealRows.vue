<!--
  "Deals by department" (sections.json "dealrows"/"rows"): up to three rows, the departments with the most
  products on sale, each headed by its own live "Up to N% off" and a link to the department.
-->
<template>
  <section v-if="rows.length" aria-labelledby="dr-h" :class="['av-sec', 'av-dealrows', { band }]">
    <div class="wrap">
      <div class="av-hd">
        <h2 id="dr-h" class="av-h">{{ t("av.dr.h", "Deals by department") }}</h2>
      </div>
      <div v-for="r in rows" :key="r.c.id" class="dr-row">
        <div class="dr-hd">
          <h3 class="dr-t">
            <span class="dr-off">{{ upTo(r.off) }}</span> <bdi>{{ catTitle(r.c) }}</bdi>
          </h3>
          <router-link :to="catTo(r.c)" class="av-more">{{ t("av.dr.shop", "Shop {name}", { name: catTitle(r.c) }) }}<ly-icon name="right" /></router-link>
        </div>
        <dept-rail :items="r.items" />
      </div>
    </div>
  </section>
</template>

<script>
import LyIcon from "../../../LyIcon.vue";
import DeptRail from "../../../dept/DeptRail.vue";
import deptSection from "../../../dept/dept-section";

export default {
  name: "DealRows",
  components: { LyIcon, DeptRail },
  mixins: [deptSection],
  computed: {
    rows() {
      if (!this.ready) return [];
      void this.currency;
      return this.depts
        .map((c) => ({ c, items: this.deals.filter((p) => p.category_id === c.id) }))
        .filter((r) => r.items.length >= 4)
        .sort((a, b) => b.items.length - a.items.length)
        .slice(0, 3)
        .map((r) => ({ ...r, off: this.deptDeal(r.c), items: r.items.slice(0, 10) }));
    },
  },
};
</script>
