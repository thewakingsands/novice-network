<template>
  <div>
    <div>
      <input type="text" v-model="query" />
    </div>
    <table>
      <thead>
        <tr>
          <th>代码</th>
          <th>图标</th>
          <th>名字</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in list" :key="b.ID">
          <td>
            <code>&lt;Status :id="{{ b.ID }}" name="{{ b.Name }}" /&gt;</code>
          </td>
          <td>
            <img class="no-zoom" :src="formatIconUrl(b.Icon)" />
          </td>
          <td>{{ b.Name }}</td>
          <td>{{ b.Description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { formatIconUrl } from '@thewakingsands/xivapi-v2'
import { searchBuffs } from '../utils/xivapi'

export default {
  data() {
    return {
      query: '',
      list: [],
      timer: 0
    }
  },
  methods: {
    formatIconUrl,
    async updateList(q) {
      const results = await searchBuffs(q)
      if (this.query === q) {
        this.list = results
      }
    }
  },
  watch: {
    query(q) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.updateList(q), 300)
    }
  }
}
</script>
