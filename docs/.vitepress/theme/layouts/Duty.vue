<template>
  <div>
    <ContentContainer>
      <div>
        <div class="ui breadcrumb">
          <a class="section">副本</a>
          <i class="right angle icon divider"></i>
          <a class="section">4人</a>
          <i class="right angle icon divider"></i>
          <a class="section">1-49级</a>
          <i class="right angle icon divider"></i>
          <div class="active section">[15]天然要害沙斯塔夏溶洞</div>
        </div>
        <p></p>
      </div>
    </ContentContainer>
  </div>
</template>

<script>
import { usePage } from "../utils/page"
import ContentContainer from '../components/ContentContainer.vue'
import { getIconUrl } from '../utils/iconUrl'

export default {
  setup() { return { page: usePage() } },
  components: {
    ContentContainer
  },
  computed: {
    bannerSrc() {
      return getIconUrl(this.instance.banner)
    },
    instance() {
      return this.page.frontmatter.instance
    }
  }
}
</script>
