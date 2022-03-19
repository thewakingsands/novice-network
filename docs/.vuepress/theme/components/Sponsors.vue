<template>
  <div class="sponsors-container">
    <div class="sponsors-header">感谢以下赞助者：</div>
    <div class="sponsor-loading" v-if="loading">正在加载赞助者……</div>
    <div class="sponsor-error" v-if="error" @click="updateSponsors()">
      赞助者加载失败：{{ error }}
    </div>
    <ul
      v-else
      class="sponsors"
      v-for="(index, sponsor) in sponsors"
      :key="index"
    >
      <li class="sponsor">
        <div class="sponsor-avatar">
          <img :src="sponsor.avatar" :alt="sponsor.sponsor" />
        </div>
        <div class="sponsor-name">{{ sponsor.sponsor }}</div>
        <div class="sponsor-amount">￥{{ sponsor.amount }}</div>
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

<style lang="stylus"></style>

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
      const apiUrl = 'http://127.0.0.1:8809/sponsors'
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
