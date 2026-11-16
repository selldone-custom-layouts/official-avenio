<!--
  "Brands we love" (sections.json "brands"/"tiles"): the brands of the live catalogue (the product's brand field,
  else its Brand spec), the most stocked first, typeset in the display face (no logos); each opens a search for
  the brand. Ten show, "Show all brands" opens the rest in place.
-->
<template>
  <section v-if="list.length >= 4" aria-labelledby="br-h" :class="['av-sec', 'av-brands', { band }]">
    <div class="wrap">
      <div class="av-hd">
        <h2 id="br-h" class="av-h">{{ t("av.br.h", "Brands we love") }}</h2>
      </div>
      <ul id="br-list" class="br-grid">
        <li v-for="b in shown" :key="b.name">
          <router-link :to="brandTo(b.name)" class="br-t">
            <b class="br-n"><bdi>{{ b.name }}</bdi></b>
            <span v-if="b.off" class="br-o">{{ upTo(b.off) }}</span>
          </router-link>
        </li>
      </ul>
      <p v-if="list.length > 10" class="br-more">
        <button :aria-expanded="all ? 'true' : 'false'" aria-controls="br-list" class="btn quiet sm" type="button" @click="all = !all">
          {{ all ? t("av.br.fewer", "Show fewer brands") : t("av.br.all", "Show all brands") }}
        </button>
      </p>
    </div>
  </section>
</template>

<script>
import deptSection from "../../../dept/dept-section";

export default {
  name: "BrandTiles",
  mixins: [deptSection],
  data: () => ({ all: false }),
  computed: {
    list() {
      void this.currency;
      return this.ready ? this.brands(this.products) : [];
    },
    shown() {
      return this.all ? this.list : this.list.slice(0, 10);
    },
  },
};
</script>
