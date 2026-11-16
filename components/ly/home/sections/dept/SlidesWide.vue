<!--
  Wide photo slides (sections.json "slides"/"wide"): the skin's hero-1..3 photos, each bound to a department by the
  skin (design.slides[{ photo, cat, title, tone }]); a missing department falls back to the ranked departments,
  a missing photo to the department's own products on the family plate. The words come from the live data: the
  department, "From $x", "Up to N% off". Changes every 7 s (the new slide moves in over the old one: no cross-fade, so no half-transparent words) with a
  pause button and a progress line; no motion when the visitor asks for less.
-->
<template>
  <section v-if="slides.length" :aria-label="t('av.sl.aria', 'Featured departments')" aria-roledescription="carousel" class="av-slides">
    <div class="wrap">
      <div class="sl-frame">
        <div
          v-for="(s, i) in slides"
          :key="s.key"
          :aria-hidden="i === at ? undefined : 'true'"
          :aria-label="t('av.sl.n', 'Slide {n} of {total}', { n: i + 1, total: slides.length })"
          :class="['sl', 'tone-' + s.tone, { on: i === at, anim: moved }]"
          aria-roledescription="slide"
          role="group"
        >
          <img v-if="s.photo" :alt="''" :loading="i ? 'lazy' : 'eager'" :src="s.photo" class="sl-img" decoding="async" draggable="false" />
          <div v-else aria-hidden="true" class="sl-fb">
            <img v-for="p in s.plates" :key="p.id" :src="img(p)" alt="" loading="lazy" />
          </div>
          <div class="sl-tx">
            <p class="sl-k"><bdi>{{ catTitle(s.cat) }}</bdi></p>
            <h2 class="sl-h">{{ s.title }}</h2>
            <p class="sl-l">
              <span v-if="s.off">{{ upTo(s.off) }}</span><span v-if="s.off && s.from" aria-hidden="true"> · </span><span v-if="s.from">{{ t("av.from", "From {price}", { price: s.from }) }}</span>
            </p>
            <router-link :tabindex="i === at ? undefined : -1" :to="catTo(s.cat)" class="btn">{{ t("av.sl.shop", "Shop {name}", { name: catTitle(s.cat) }) }}</router-link>
          </div>
        </div>
        <div v-if="slides.length > 1" class="sl-ctl">
          <button
            v-for="(s, i) in slides"
            :key="'d' + s.key"
            :aria-current="i === at ? 'true' : undefined"
            :aria-label="t('av.sl.go', 'Show slide {n}: {name}', { n: i + 1, name: catTitle(s.cat) })"
            :class="['sl-dot', { on: i === at, run: i === at && playing }]"
            type="button"
            @click="show(i)"
          >
            <span></span>
          </button>
          <button :aria-label="playing ? t('av.sl.pause', 'Pause slides') : t('av.sl.play', 'Play slides')" :aria-pressed="playing ? 'false' : 'true'" class="sl-pp" type="button" @click="toggle">
            <span v-if="playing" aria-hidden="true" class="pp-pause"><i></i><i></i></span><svg v-else aria-hidden="true" class="pp-play" viewBox="0 0 12 12"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import deptSection from "../../../dept/dept-section";
import { slugOf } from "../../../dept/dept";

const MS = 7000;

export default {
  name: "SlidesWide",
  mixins: [deptSection],
  data: () => ({ at: 0, playing: true, moved: false }),
  computed: {
    slides() {
      if (!this.ready) return [];
      const want = this.design.slides || [{ photo: "hero-1" }, { photo: "hero-2" }, { photo: "hero-3" }];
      const used = new Set();
      const out = [];
      want.forEach((w, n) => {
        let c = this.bound(w.cat, n);
        if (!c || used.has(c.id)) c = this.depts.find((d) => !used.has(d.id));
        if (!c) return;
        used.add(c.id);
        const ps = this.inCat(c.id);
        out.push({
          key: c.id,
          cat: c,
          tone: w.tone || "dark",
          photo: this.slot(w.photo),
          plates: this.inStock(ps).slice(0, 3),
          title: w.title ? this.t("av.title." + slugOf(c), w.title) : this.t("av.sl.h", "New in {name}", { name: this.catTitle(c) }),
          off: this.deptDeal(c),
          from: this.fromPrice(ps),
        });
      });
      return out;
    },
  },
  watch: {
    slides(v) {
      if (this.at >= v.length) this.at = 0;
      this.arm();
    },
  },
  mounted() {
    this.still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.still) this.playing = false;
    this.arm();
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    arm() {
      clearTimeout(this.timer);
      if (!this.playing || this.slides.length < 2) return;
      this.timer = setTimeout(() => {
        this.moved = true;
        this.at = (this.at + 1) % this.slides.length;
        this.arm();
      }, MS);
    },
    show(i) {
      this.moved = true;
      this.at = i;
      this.arm();
    },
    toggle() {
      this.playing = !this.playing;
      this.arm();
    },
  },
};
</script>
