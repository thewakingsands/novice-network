<template>
  <Root :class="bgClass">
    <div class="dialog">
      <div class="message">
        <h2 style="text-align: center;">404 噗！</h2>
        <p>这个页面找不到了噗！可能是还没有肝完噗！请回卷首看看噗！</p>
        <p style="text-align: right; font-size: 0.9em;">
          HTTP 404 - Page Not Found
        </p>
      </div>
      <div class="buttons">
        <a href="javascript:;" @click.prevent="back">返回噗</a>
        <router-link to="/">去卷首噗</router-link>
      </div>
    </div>
  </Root>
</template>

<style scoped>
.dialog {
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.27);
  width: 80%;
  max-width: 320px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  color: #fff;
  border-radius: 8px;
}
.message {
  padding: 10px;
}
.buttons {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  font-size: 1.1em;
}
.buttons a:hover {
  background: rgba(255, 255, 255, 0.4);
}
.buttons a {
  display: block;
  padding: 12px;
  font-weight: bold;
  flex: 1;
}
.buttons a:first-child {
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}

.background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
}

.bg1 {
  background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.2) 2px,
        rgba(255, 255, 255, 0.1) 3px
      )
      3px 3px,
    url('/images/404_1.jpg') 50% 100%;
  background-size: 6px 6px, cover;
}
.bg2 {
  background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.2) 2px,
        rgba(255, 255, 255, 0.1) 3px
      )
      3px 3px,
    url('/images/404_2.jpg') 50% 100%;
  background-size: 6px 6px, cover;
}
.bg3 {
  background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.2) 2px,
        rgba(255, 255, 255, 0.1) 3px
      )
      3px 3px,
    url('/images/404_3.jpg') 50% 100%;
  background-size: 6px 6px, cover;
}
.bg4 {
  background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.2) 2px,
        rgba(255, 255, 255, 0.1) 3px
      )
      3px 3px,
    url('/images/404_4.jpg') 50% 100%;
  background-size: 6px 6px, cover;
}
</style>

<script>
import Root from './Root.vue'

export default {
  components: {
    Root
  },
  data() {
    return {
      bgClass: 'background'
    }
  },
  mounted() {
    this.bgClass = `background bg${Math.floor(Math.random() * 4) + 1}`
  },
  methods: {
    back() {
      history.go(-1)
    }
  }
}
</script>
