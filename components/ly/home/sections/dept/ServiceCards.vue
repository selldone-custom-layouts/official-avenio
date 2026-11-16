<!--
  Service promises (sections.json "services"/"cards"): up to four cards from the shop's real facts only: pickup (its
  point), each delivery way with its free threshold or fee, the way to pay, the opening days. A card with no fact
  is dropped; with fewer than two the section hides.
-->
<template>
  <section v-if="cards.length >= 2" aria-labelledby="sv-h" :class="['av-sec', 'av-services', { band }]">
    <div class="wrap">
      <h2 id="sv-h" class="sr">{{ t("av.sv.h", "Shopping with {shop}", { shop: shopName }) }}</h2>
      <ul class="sv-grid" :data-n="cards.length">
        <li v-for="c in cards" :key="c.k" class="sv-c">
          <span aria-hidden="true" class="sv-i"><ly-icon :name="c.icon" /></span>
          <b class="sv-t">{{ c.title }}</b>
          <span class="sv-l">{{ c.line }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import LyIcon from "../../../LyIcon.vue";
import deptSection from "../../../dept/dept-section";
import { wayIcon } from "../../../buy/ly-cart";
import { openLine } from "../../../ly";

export default {
  name: "ServiceCards",
  components: { LyIcon },
  mixins: [deptSection],
  methods: {
    wayLine(w) {
      if (w.pickup) {
        const p = w.pickups[0];
        const at = p ? [p.name, p.city].filter(Boolean).join(", ") : "";
        return at ? this.t("av.sv.pickupAt", "Order online, collect at {place}.", { place: at }) : this.t("av.sv.pickup", "Order online, collect in store.");
      }
      if (w.free) return this.t("av.sv.free", "Free on every order.");
      if (w.freeOver) return this.t("av.sv.freeOver", "Free on orders over {price}.", { price: this.money(w.freeOver, true) });
      if (w.fee) return this.t("av.sv.fee", "{price} per order.", { price: this.money(w.fee) });
      return this.t("av.sv.way", "Choose it at checkout.");
    },
  },
  computed: {
    shopName() {
      const n = this.shop?.title || "";
      return n.charAt(0).toUpperCase() + n.slice(1);
    },
    cards() {
      const f = this.facts;
      if (!f.ready) return [];
      const out = [];
      for (const w of f.ways) {
        if (out.length >= 3) break;
        out.push({ k: "w" + w.type, icon: wayIcon(w.type), title: w.title, line: this.wayLine(w) });
      }
      if (f.gateway?.name) out.push({ k: "pay", icon: "cash", title: f.gateway.name, line: f.gateway.description || this.t("av.sv.pay", "Pay the way that suits you at checkout.") });
      const open = openLine(f);
      if (open && out.length < 4) out.push({ k: "open", icon: "clock", title: this.t("av.sv.open", "Opening hours"), line: open });
      return out.slice(0, 4);
    },
  },
};
</script>
