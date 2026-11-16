<!--
  A row of product cards that scrolls sideways (the department store's product rows): arrows at the row's ends
  from 980 px (hidden when there is nothing more that way), swipe on a phone. Cards are the Layout's own LyCard.
-->
<template>
  <div class="av-rail" :data-n="items.length">
    <button v-show="canBack" :aria-label="t('av.rail.back', 'Previous items')" class="av-ar back" type="button" @click="go(-1)"><ly-icon name="left" /></button>
    <ul ref="track" class="av-track" @scroll.passive="measure">
      <li v-for="(p, i) in items" :key="p.id" class="av-cell">
        <ly-card :eager="i < 2 && eager" :product="p" />
      </li>
    </ul>
    <button v-show="canFwd" :aria-label="t('av.rail.next', 'More items')" class="av-ar fwd" type="button" @click="go(1)"><ly-icon name="right" /></button>
  </div>
</template>

<script>
import LyIcon from "../LyIcon.vue";
import LyCard from "../ui/LyCard.vue";
import { t } from "../../kalio/i18n/kalio-i18n";

export default {
  name: "DeptRail",
  components: { LyIcon, LyCard },
  props: {
    items: { type: Array, default: () => [] },
    eager: Boolean,
  },
  data: () => ({ canBack: false, canFwd: false }),
  watch: {
    items() {
      this.$nextTick(() => {
        if (this.$refs.track) this.$refs.track.scrollLeft = 0;
        this.measure();
      });
    },
  },
  mounted() {
    this.onResize = () => this.measure();
    window.addEventListener("resize", this.onResize, { passive: true });
    this.$nextTick(() => this.measure());
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    t,
    rtl() {
      return getComputedStyle(this.$el).direction === "rtl";
    },
    measure() {
      const el = this.$refs.track;
      if (!el) return;
      const x = Math.abs(el.scrollLeft);
      this.canBack = x > 4;
      this.canFwd = x + el.clientWidth < el.scrollWidth - 4;
    },
    go(dir) {
      const el = this.$refs.track;
      if (!el) return;
      const step = Math.max(240, el.clientWidth * 0.8) * dir * (this.rtl() ? -1 : 1);
      el.scrollBy({ left: step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    },
  },
};
</script>
