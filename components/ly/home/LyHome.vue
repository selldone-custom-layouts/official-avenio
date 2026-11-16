<!--
  The home: the skin's sections, in the skin's order (skins/<name>/skin.json "home", each { section, variant, band };
  the library is components/ly/home/sections.json, one component per section in sections/). Every section is
  drawn from the shop's live data only (home-data.ts) and hides itself when the shop has nothing for it; a photo
  slot without its photo shows its designed fallback, never a caption or a file name. Bands alternate white and
  the family tint (scripts/skin-apply.mjs refuses two tints side by side).
-->
<template>
  <div class="ly ly-home">
    <component :is="s.component" v-for="(s, i) in sections" :key="s.section + '-' + i" :band="s.band" :variant="s.variant" v-bind="s.props" />
  </div>
</template>

<script>
import { markRaw } from "vue";
import { SKIN } from "../skin.gen";
import { loadDm } from "../ly";
import HeroSection from "./sections/HeroSection.vue";
import AboutSection from "./sections/AboutSection.vue";
import CountersBand from "./sections/CountersBand.vue";
import CollectionsSection from "./sections/CollectionsSection.vue";
import HowSection from "./sections/HowSection.vue";
import OfferSection from "./sections/OfferSection.vue";
import GallerySection from "./sections/GallerySection.vue";
import SelectionSection from "./sections/SelectionSection.vue";
import PhotoBand from "./sections/PhotoBand.vue";
import MarqueeSection from "./sections/MarqueeSection.vue";
import JournalSection from "./sections/JournalSection.vue";
/* Avenio: the department-store set (sections/dept/, components/ly/dept/) */
import EventBand from "./sections/dept/EventBand.vue";
import SlidesWide from "./sections/dept/SlidesWide.vue";
import DeptTiles from "./sections/dept/DeptTiles.vue";
import FlagCards from "./sections/dept/FlagCards.vue";
import TabsRow from "./sections/dept/TabsRow.vue";
import PricePoints from "./sections/dept/PricePoints.vue";
import DealRows from "./sections/dept/DealRows.vue";
import PhotoBanners from "./sections/dept/PhotoBanners.vue";
import BrandTiles from "./sections/dept/BrandTiles.vue";
import ServiceCards from "./sections/dept/ServiceCards.vue";
import JournalCards from "./sections/dept/JournalCards.vue";

/* section id (sections.json) -> its component; the variant is a prop the component draws */
const REGISTRY = {
  hero: HeroSection,
  about: AboutSection,
  counters: CountersBand,
  collections: CollectionsSection,
  how: HowSection,
  offer: OfferSection,
  gallery: GallerySection,
  selection: SelectionSection,
  photoband: PhotoBand,
  marquee: MarqueeSection,
  journal: JournalSection,
  event: EventBand,
  slides: SlidesWide,
  departments: DeptTiles,
  flags: FlagCards,
  prices: TabsRow,
  pricepoints: PricePoints,
  dealrows: DealRows,
  feature: PhotoBanners,
  brands: BrandTiles,
  finds: TabsRow,
  edits: PhotoBanners,
  services: ServiceCards,
  clearance: TabsRow,
};
/* a variant with its own component */
const BY_VARIANT = { "journal:cards": JournalCards };
const KIND = new Set(["prices", "finds", "clearance"]);

export default {
  name: "LyHome",

  computed: {
    sections() {
      return SKIN.home
        .filter((s) => REGISTRY[s.section])
        .map((s) => ({ ...s, props: KIND.has(s.section) ? { kind: s.section } : {}, component: markRaw(BY_VARIANT[s.section + ":" + s.variant] || REGISTRY[s.section]) }));
    },
  },

  created() {
    loadDm();
  },
};
</script>
