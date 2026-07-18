// @ts-check
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

const SITE = 'https://ff14.org'

const KEYWORDS =
  '最终幻想14,FF14,FFXIV,新人指南,豆芽站,萌新手册,入门攻略,新手教程,职业选择,攻略,副本,任务,练级,装备,PVP,生产,采集,钓鱼,海钓,优雷卡,ULK,博兹雅,BZY,古武,魂武,优武,义武'

// https://astro.build/config
export default defineConfig({
  site: SITE,
  outDir: 'dist',
  trailingSlash: 'never',
  integrations: [
    starlight({
      title: '新大陆见闻录 - 最终幻想14新手入坑指南手册',
      description:
        '「新大陆见闻录」网站为最终幻想14超实用萌新手册入坑指南，为FF14中文玩家提供涵盖广泛全面、清晰易懂的新人入坑攻略指引。推荐玩法大全，练级指南，从入门到精通。',
      // 使用纯前端自建搜索（见 §5），关闭 Starlight 内置 Pagefind
      pagefind: false,
      // 站点外观由自定义全局样式与组件 override 完全接管
      customCss: ['./src/styles/index.scss'],
      locales: {
        root: { label: '简体中文', lang: 'zh-Hans' },
      },
      head: [
        {
          tag: 'meta',
          attrs: { name: 'keywords', content: KEYWORDS },
        },
      ],
      // 组件 override 在阶段 4 逐一接入
      components: {},
    }),
    mdx(),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 以项目根为 loadPath，令 `@use "src/styles/vars"` 可解析
          loadPaths: [fileURLToPath(new URL('.', import.meta.url))],
          // 全局注入颜色变量，供各组件 <style lang="scss"> 使用。
          // 用函数形式跳过 _vars.scss 自身，避免循环 @use。
          additionalData: (
            /** @type {string} */ source,
            /** @type {string} */ filename
          ) => {
            if (
              filename.replace(/\\/g, '/').endsWith('src/styles/_vars.scss')
            ) {
              return source
            }
            return `@use "src/styles/vars" as *;\n${source}`
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
