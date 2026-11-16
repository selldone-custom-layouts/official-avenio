<!--
  "Shop by department" (sections.json "departments"/"tiles"): one photo tile per department (its col-<slug> photo,
  else its own product on the family plate), the name under it and "Up to N% off" only when real.
-->
<template>
  <section v-if="depts.length" aria-labelledby="dp-h" :class="['av-sec', 'av-depts', { band }]">
    <div class="wrap">
      <div class="av-hd">
        <h2 id="dp-h" class="av-h">{{ t("av.dp.h", "Shop by department") }}</h2>
      </div>
      <ul class="dp-grid" :data-n="depts.length">
        <li v-for="c in depts" :key="c.id">
          <router-link :to="catTo(c)" class="dp-t">
            <span :class="['dp-ph', { plate: !deptPhoto(c).own }]"><img v-if="deptPhoto(c).src" :src="deptPhoto(c).src" alt="" loading="lazy" /></span>
            <span class="dp-n"><bdi>{{ catTitle(c) }}</bdi></span>
            <span v-if="deptDeal(c)" class="dp-o">{{ upTo(deptDeal(c)) }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import deptSection from "../../../dept/dept-section";

export default {
  name: "DeptTiles",
  mixins: [deptSection],
};
</script>
