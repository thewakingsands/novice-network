<script setup>
import { useData } from 'vitepress'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/404.vue'

const { page } = useData()
</script>

<template>
  <NotFound v-if="page.isNotFound" />
  <Layout v-else />
</template>
