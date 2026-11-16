<!--
  The event band (sections.json "event"/"band"): the store's headline on the family-dark band, the live "Up to N%
  off" and a button per department (every category with products). Hidden until the catalogue is in.
-->
<template>
  <section v-if="ready && depts.length" aria-labelledby="ev-h" class="av-event">
    <div class="wrap ev-in">
      <p class="ev-k">{{ offMax ? t("av.ev.k", "Today's deals") : t("av.ev.k0", "Shop every department") }}</p>
      <h2 id="ev-h" class="ev-h">
        {{ t("av.ev.h1", "Every department,") }} <em>{{ t("av.ev.h2", "one bag.") }}</em>
      </h2>
      <p v-if="offMax" class="ev-l">{{ t("av.ev.l", "Up to {off}% off across the store, already in the price.", { off: offMax }) }}</p>
      <nav :aria-label="t('av.depts', 'Departments')" class="ev-d">
        <router-link v-for="c in depts" :key="c.id" :to="catTo(c)" class="ev-b"><bdi>{{ catTitle(c) }}</bdi></router-link>
        <router-link v-if="offMax" :to="saleTo()" class="ev-b sale">{{ t("av.ev.sale", "All deals") }}</router-link>
      </nav>
    </div>
  </section>
</template>

<script>
import deptSection from "../../../dept/dept-section";

export default {
  name: "EventBand",
  mixins: [deptSection],
};
</script>
