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
        <tr v-for="b in list" :key="b.Id">
          <td>
            <code>&lt;Status :id="{{ b.ID }}" name="{{ b.Name }}" /&gt;</code>
          </td>
          <td>
            <img
              class="no-zoom"
              :src="'https://cafemaker.wakingsands.com' + b.Icon"
            />
          </td>
          <td>{{ b.Name }}</td>
          <td>{{ b.Description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import 'isomorphic-fetch'

export default {
  data() {
    return {
      query: '',
      list: [],
      timer: 0
    }
  },
  methods: {
    async updateList(q) {
      const json = await (await fetch(
        `https://cafemaker.wakingsands.com/search?string=${encodeURIComponent(
          q
        )}&indexes=status&columns=ID,Icon,Name,Description`
      )).json()
      if (this.query === q) {
        this.list = json.Results
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
