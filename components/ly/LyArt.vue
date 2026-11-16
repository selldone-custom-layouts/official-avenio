<!--
  One of the mockup's hand-drawn pastry drawings (ly-icons.ts ART,
  120 × 120, strokes only). cls "draw" (default), "feat-ic" (a feature's
  roundel) or "dw-art" (the empty bag). With `wrap`, the drawing sits in the
  mockup's faint absolutely placed span (.art <wrap>) behind a section.
-->
<template>
  <span v-if="wrap" :class="['art', wrap]" aria-hidden="true"
    ><svg aria-hidden="true" class="draw" focusable="false" viewBox="0 0 120 120" v-html="paths"></svg
  ></span>
  <svg v-else :class="cls" aria-hidden="true" focusable="false" viewBox="0 0 120 120" v-html="paths"></svg>
</template>

<script>
import { ART } from "./ly-icons";

/* Avenio: no pastry drawings in a department store; every drawing slot (title bands, the empty bag, a photo
   slot's fallback) shows the shopping bag of the loading screen and the splash. */
const BAG = '<path d="M28 46h64l-5 58H33z"/><path d="M45 46v-8c0-9 6-16 15-16s15 7 15 16v8"/><path d="M40 60h40"/>';

export default {
  name: "LyArt",
  props: {
    name: { type: String, required: true },
    cls: { type: String, default: "draw" },
    wrap: { type: String, default: "" },
  },
  computed: {
    paths() {
      return this.name === "none" ? "" : BAG || ART[this.name] || "";
    },
  },
};
</script>
