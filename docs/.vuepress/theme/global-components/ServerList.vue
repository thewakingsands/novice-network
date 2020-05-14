<template>
  <div class="server-list gap">
    <div class="tip">
      <div v-if="isLoading">
        正在加载服务器信息，如果此消息一直存在，你可以直接去
        <a
          href="http://ff.sdo.com/web8/index.html#/servers"
          target="_blank"
          rel="noreferrer noopener"
          >全服务器状况一览</a
        >
        页面查看。
      </div>
      <div v-if="isError">
        你可以在
        <a
          href="http://ff.sdo.com/web8/index.html#/servers"
          target="_blank"
          rel="noreferrer noopener"
          >《最终幻想14》国服官网全服务器状况一览</a
        >
        页面查看到当前的服务器状态信息。
      </div>
    </div>
    <div v-if="dcList.length" class="inner gap">
      <div class="icon-description" area-hidden="true">
        <div class="item"><span class="icon operational"></span> 运行正常</div>
        <div class="item">
          <span class="icon under-maintenance"></span> 正在维护
        </div>
        <div class="item">
          <span class="icon new-character-enabled"></span> 可创建新角色
        </div>
        <div class="item">
          <span class="icon new-character-disabled"></span> 不可创建新角色
        </div>
        <div class="item"><span class="icon transfer-out"></span> 可转出</div>
        <div class="item"><span class="icon transfer-in"></span> 可转入</div>
      </div>
      <div class="dc-list-wrapper">
        <div class="dc-list">
          <div class="dc" v-for="dc in dcList" :key="dc.name">
            <div class="dc-name">{{ dc.name }}</div>
            <div class="server-list">
              <div
                class="server"
                v-for="server in dc.servers"
                :key="server.name"
              >
                <div
                  class="server-name"
                  :class="{ new: server.isNewServer }"
                  :title="
                    server.name +
                      '：' +
                      (server.isNewServer ? '享受新服优待' : '不享受新服优待')
                  "
                >
                  <span
                    class="icon"
                    :aria-label="server.isRunning ? '运行正常' : '正在维护'"
                    :title="server.isRunning ? '运行正常' : '正在维护'"
                    :class="{
                      operational: server.isRunning,
                      'under-maintenance': !server.isRunning
                    }"
                  ></span>
                  <span>{{ server.name }}</span>
                </div>
                <div
                  class="server-icons"
                  :aria-label="getLabel(server)"
                  :title="getLabel(server)"
                >
                  <span
                    class="icon"
                    :class="{
                      'new-character-enabled': server.canCreateCharacter,
                      'new-character-disabled': !server.canCreateCharacter
                    }"
                  ></span>
                  <span
                    class="icon"
                    :class="{
                      'transfer-in': server.canTransferIn
                    }"
                  ></span>
                  <span
                    class="icon"
                    :class="{
                      'transfer-out': server.canTransferOut
                    }"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        以上数据来源于
        <a
          href="http://ff.sdo.com/web8/index.html#/servers"
          target="_blank"
          rel="noreferrer noopener"
        >
          《最终幻想14》国服官网全服务器状况一览
        </a>
        页面。
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.gap, .gap > div
  margin-bottom 1em
.icon-description
  display flex
  justify-content space-around
  flex-wrap wrap
  line-height 1.8em
.gap .icon-description
  margin-bottom 0
.server-name.new
  color #ff5e00
.dc-list-wrapper
  width 100%
  overflow-x auto
.dc-list
  display flex
  align-items flex-start
  justify-content space-around
  min-width 720px
  .dc
    margin 1em 0.2em
    background-color #eee
    border-radius 8px
    border 1px solid #c2c2c2
    overflow hidden
  .dc-name
    background-color #737373
    color #fff
    font-size 1.3em
    line-height 1.8em
    text-align center
  .server
    border-bottom 1px solid #c2c2c2
    line-height 2em
    padding 0 0.6em
    &:last-child
      border-bottom none
  .server
    display flex
    .server-name
      flex 1
      width 8em
    .server-icons span
      margin 0 0.2em
    span
      vertical-align middle
.icon
  width 1em
  height 1em
  background-position center
  background-repeat no-repeat
  display inline-block
  &.new-character-disabled
    background-image url('../images/serverlist/new-character-disabled.png')
  &.new-character-enabled
    background-image url('../images/serverlist/new-character-enabled.png')
  &.operational
    background-image url('../images/serverlist/operational.png')
  &.transfer-out
    background-image url('../images/serverlist/transfer-out.png')
  &.transfer-in
    background-image url('../images/serverlist/transfer-in.png')
  &.under-maintenance
    background-image url('../images/serverlist/under-maintenance.png')
</style>

<script>
import 'isomorphic-fetch'
import * as dcCache from '../memcache/dc'

export default {
  data() {
    return {
      dcList: [],
      isLoading: true,
      isError: false
    }
  },
  async serverPrefetch() {
    const resp = await fetch(
      'https://act1.ff.sdo.com/FF14DataApi/Servers20200512/api/index.php?act=getServers'
    )
    const json = await resp.json()
    this.handleData(json)
  },
  methods: {
    handleData(json) {
      this.isLoading = false
      if (!json.IsSuccess || !json.Data) {
        this.isError = true
        return
      }
      dcCache.setCache(json)
      this.dcList = json.Data.map(dc => ({
        name: dc.AreaName,
        servers: dc.Group.map(srv => ({
          name: srv.name,
          canCreateCharacter: srv.iscreate,
          canTransferIn: srv.isint,
          canTransferOut: srv.isout,
          isNewServer: srv.isnew,
          isRunning: srv.runing
        }))
      }))
    },
    getLabel(server) {
      const labels = []
      if (server.isNewServer) {
        labels.push('享受新服优待')
      }
      labels.push(server.canCreateCharacter ? '可创建新角色' : '不可创建新角色')
      labels.push(server.canTransferIn ? '可转入' : '不可转入')
      labels.push(server.canTransferOut ? '可转出' : '不可转出')

      return labels.join('，')
    }
  },
  mounted() {
    this.isLoading = true
    this.isError = false
    if (dcCache.getCache()) {
      this.handleData(dcCache.getCache())
      return
    }
    const el = document.createElement('script')
    const callbackName =
      '__ffcafe_' +
      Math.random()
        .toString(36)
        .slice(2)
    el.src =
      'https://act1.ff.sdo.com/FF14DataApi/Servers20200512/api/index.php?act=getServers&callback=' +
      callbackName

    const timer = setTimeout(() => {
      this.isError = true
      this.isLoading = false
      delete window[callbackName]
    }, 6000)

    window[callbackName] = json => {
      this.handleData(json)
      clearTimeout(timer)
      delete window[callbackName]
    }
    document.body.appendChild(el)
  }
}
</script>
