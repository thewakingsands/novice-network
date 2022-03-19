<template>
  <div class="sponsors-container">
    <div class="sponsors-header">感谢以下赞助者：</div>
    <div class="sponsor-loading" v-if="loading">正在加载赞助者……</div>
    <div class="sponsor-error" v-if="error" @click="updateSponsors()">
      赞助者加载失败：{{ error }}
    </div>
    <ul v-else class="sponsors">
      <li class="sponsor" v-for="(sponsor, index) in sponsors" :key="index">
        <div class="sponsor-avatar">
          <img :src="sponsor.avatar" :alt="sponsor.sponsor" />
        </div>
        <div class="sponsor-name">{{ sponsor.sponsor }}</div>
      </li>
    </ul>
    <div class="sponsors-footer">
      <a
        href="https://afdian.net/@hikarievo"
        target="_blank"
        rel="noopener noreferrer"
      >
        点我发电
      </a>
    </div>
  </div>
</template>

<style lang="stylus">
.sponsors-container
  .sponsors
    list-style none
    white-space nowrap
    overflow-x auto
  .sponsor
    display inline-block
    width 128px
    padding 8px
    text-align center
  .sponsor-name
    width 100%
    text-overflow ellipsis
    overflow hidden
    font-size 0.9em
  .sponsor-avatar img
    width 48px
    height 48px
    border-radius 100%
    overflow hidden
</style>

<script>
export default {
  data() {
    return {
      loading: true,
      error: '',
      sponsors: []
    }
  },
  async mounted() {
    await this.updateSponsors()
  },
  methods: {
    async updateSponsors() {
      this.loading = true
      const apiUrl = 'https://novice-network-asl.wakingsands.com/sponsors'
      try {
        const resp = await fetch(apiUrl)
        const json = await resp.json()
        if (resp.ok) {
          this.sponsors = json.data
        } else {
          this.error = resp?.message || '未知错误'
        }
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
