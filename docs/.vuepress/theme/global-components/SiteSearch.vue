<template>
  <div class="search-result">
    <div class="ui fluid icon input">
      <input
        type="text"
        v-model="query"
        placeholder="搜索……"
        autofocus
        ref="input"
      />
      <i class="search icon"></i>
    </div>
    <div v-if="message" class="message">{{ message }}</div>
    <div v-if="total > 0">
      <div class="message">
        共找到 {{ total }} 条结果，显示第 {{ pageSize * (pn - 1) + 1 }} ~
        {{ Math.min(pageSize * pn, total) }} 条
      </div>
      <section v-for="result in results" :key="result.url" class="result">
        <router-link
          :to="result.url"
          class="title"
          v-html="getFieldHtml(result, 'title')"
        ></router-link>
        <router-link
          :to="result.url"
          class="desc"
          v-html="getFieldHtml(result, 'body')"
        ></router-link>
      </section>
      <div class="message pager">
        <a
          href="javascript:;"
          class="ui button"
          :class="{ disabled: pn <= 1 }"
          @click="pn--"
        >
          上一页
        </a>
        <span>第 {{ pn }} 页，共 {{ pages }} 页</span>
        <a
          href="javascript:;"
          class="ui button"
          :class="{ disabled: pn >= pages }"
          @click="pn++"
        >
          下一页
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.search-result
  .message
    padding-top 1em
  .pager
    padding-top 2em
    display flex
    justify-content space-evenly
    align-items center
  .result
    padding-top 1em
    &:hover
      .title
        color #1e70bf
      .desc
        color #444
  .title, .desc
    display block
    line-height 1.5
  em
    color #aa0000
    font-style normal
  .title
    font-size 1.15em
  .desc
    color unset
    font-size 0.95em
    display -webkit-box
    -webkit-line-clamp 3
    -webkit-box-orient vertical
    overflow hidden
</style>

<script>
import 'isomorphic-fetch'
import * as striptags from 'striptags'

export default {
  data() {
    return {
      results: [],
      query: '',
      pn: 1,
      pages: 0,
      pageSize: 0,
      total: 0,
      message: '',
      timerId: null
    }
  },
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    async search(query, pn) {
      try {
        this.message = '正在加载...'
        this.results = []
        this.total = 0
        const res = await fetch(
          `https://novice-network-search.wakingsands.com/s?word=${encodeURIComponent(
            query
          )}&pn=${pn}&ps=10`
        )
        const json = await res.json()
        if (query !== this.query) return
        if (pn !== this.pn) return
        this.results = json.results
        this.pageSize = json.pageSize
        this.total = json.total
        this.pages = Math.ceil(json.total / json.pageSize)
        this.message = ''
        if (this.results.length < 1) this.message = '没有找到结果。'
      } catch (e) {
        console.error(e)
        this.message = `在搜索时发生了错误：\n\n${e}\n\n这可能是由于我们正在更新索引，请稍后再试。\n如果问题持续发生，请从页面下方反馈问题处联系我们。`
      }
    },
    getFieldHtml(result, field) {
      let html =
        (result.highlights && result.highlights[field]) || result[field]
      if (!html) {
        return ''
      }
      if (Array.isArray(html)) {
        html = html.slice(0, 3).join('…')
      }
      return striptags(html, ['em'])
    }
  },
  watch: {
    query() {
      clearTimeout(this.timerId)
      if (this.query) {
        this.timerId = setTimeout(() => {
          this.search(this.query, this.pn)
        }, 300)
      }
    },
    pn() {
      this.search(this.query, this.pn)
    }
  }
}
</script>
