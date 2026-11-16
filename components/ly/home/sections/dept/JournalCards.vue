<!--
  The journal as three cards (sections.json "journal"/"cards"): the newest posts with their photo, date and title;
  hidden when the shop has no posts. Always the home's last section.
-->
<template>
  <section v-if="posts.length" aria-labelledby="jc-h" :class="['av-sec', 'av-journal', { band }]">
    <div class="wrap">
      <div class="av-hd row">
        <h2 id="jc-h" class="av-h">{{ t("av.jc.h", "Stories and guides") }}</h2>
        <router-link :to="blogTo" class="av-more">{{ t("av.jc.all", "All stories") }}<ly-icon name="right" /></router-link>
      </div>
      <ul class="jc-grid">
        <li v-for="b in posts" :key="b.id">
          <router-link :to="postRoute(b)" class="jc-c">
            <span class="jc-ph"><img v-if="b.image" :src="postImg(b)" alt="" loading="lazy" /></span>
            <time v-if="b.created_at" :datetime="b.created_at" class="jc-d">{{ fmtDate(b.created_at) }}</time>
            <b class="jc-t">{{ b.title }}</b>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import LyIcon from "../../../LyIcon.vue";
import deptSection from "../../../dept/dept-section";
import { fmtDate } from "../../../ly";
import { journalPage, journalRoute, postRoute } from "../../../../kalio/pages/kalio-journal";

export default {
  name: "JournalCards",
  components: { LyIcon },
  mixins: [deptSection],
  data: () => ({ posts: [] }),
  computed: {
    blogTo() {
      return journalRoute();
    },
  },
  mounted() {
    journalPage({ page: 1, limit: 6 })
      .then(({ articles }) => {
        const list = (articles || []).slice().sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")));
        this.posts = list.slice(0, 3);
      })
      .catch(() => (this.posts = []));
  },
  methods: {
    fmtDate,
    postRoute,
    postImg(b) {
      return b.image ? window.CDN.GET_SHOP_IMAGE_PATH(b.image, 640) : null;
    },
  },
};
</script>
