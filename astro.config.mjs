// @ts-check
import { fileURLToPath } from 'node:url'
import mdx from '@astrojs/mdx'
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import { rehypePlugins, remarkPlugins } from './src/plugins/index.ts'
import { legacySyntaxPlugin } from './src/plugins/vite-legacy-syntax.ts'

const SITE = 'https://ff14.org'

const KEYWORDS =
  '最终幻想14,FF14,FFXIV,新人指南,豆芽站,萌新手册,入门攻略,新手教程,职业选择,攻略,副本,任务,练级,装备,PVP,生产,采集,钓鱼,海钓,优雷卡,ULK,博兹雅,BZY,古武,魂武,优武,义武'

const PROD = process.env.NODE_ENV === 'production'
const GA4_ID = process.env.PUBLIC_GA4_ID

/** 构建 <head> 注入（AdSense、地图 CSS/JS、Cloudflare、百度、GA4、SW 注册、域名重定向） */
function buildHead() {
  /** @type {any[]} */
  const head = [
    { tag: 'meta', attrs: { name: 'keywords', content: KEYWORDS } },
    // Google AdSense loader
    {
      tag: 'script',
      attrs: {
        'data-ad-client': 'ca-pub-8304225030161579',
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      },
    },
    // Leaflet + 艾欧泽亚交互地图 CSS/JS（CDN，jQuery 不再注入）
    {
      tag: 'link',
      attrs: {
        rel: 'stylesheet',
        href: 'https://code.bdstatic.com/npm/leaflet@1.5.1/dist/leaflet.css',
      },
    },
    {
      tag: 'link',
      attrs: {
        rel: 'stylesheet',
        href: 'https://code.bdstatic.com/npm/@thewakingsands/eorzea-interactive-map@1.1.1/dist/map.css',
      },
    },
    {
      tag: 'script',
      attrs: {
        src: 'https://code.bdstatic.com/npm/@thewakingsands/eorzea-interactive-map@1.1.1/dist/map.js',
      },
    },
    // Cloudflare Web Analytics
    {
      tag: 'script',
      attrs: {
        defer: true,
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        'data-cf-beacon': '{"token": "be74bc1eb92c4cf9adffca9366a9f20f"}',
      },
    },
    // SW 注册（production 或 localStorage.debugSw==='1'）
    {
      tag: 'script',
      content: `(function(){if((${PROD}||localStorage.debugSw==='1')&&'serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(function(){})}})();`,
    },
    // 域名重定向（非 ff14.org/localhost 强制跳转，仅 production）
    {
      tag: 'script',
      content: `(function(){if(${PROD}){try{if(location.hostname!=='ff14.org'&&!/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)){location.hostname='ff14.org'}}catch(e){}}})();`,
    },
  ]

  // 百度统计（production）
  if (PROD) {
    head.push({
      tag: 'script',
      content:
        "var _hmt=_hmt||[];(function(){var hm=document.createElement('script');hm.src='https://hm.baidu.com/hm.js?215a46d31e2c4aaa8e1cdd94fcfe8aa4';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(hm,s);})();",
    })
  }

  // GA4（由 PUBLIC_GA4_ID 提供时）
  if (GA4_ID) {
    head.push(
      {
        tag: 'script',
        attrs: {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`,
        },
      },
      {
        tag: 'script',
        content: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
      }
    )
  }

  return head
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  outDir: 'dist',
  trailingSlash: 'never',
  // 自定义 remark/rehype 插件（.md 与 .mdx 均生效；mdx 集成默认继承此配置）
  // 关闭内置 gfm，改用 remarkPlugins 里的 remark-gfm（singleTilde:false），以对齐 markdown-it
  markdown: {
    gfm: false,
    remarkPlugins,
    rehypePlugins,
  },
  integrations: [
    starlight({
      title: '新大陆见闻录 - 最终幻想14新手入坑指南手册',
      description:
        '「新大陆见闻录」网站为最终幻想14超实用萌新手册入坑指南，为FF14中文玩家提供涵盖广泛全面、清晰易懂的新人入坑攻略指引。推荐玩法大全，练级指南，从入门到精通。',
      // 使用纯前端自建搜索（见 §5），关闭 Starlight 内置 Pagefind
      pagefind: false,
      // 使用自定义 src/pages/404.astro（全屏随机背景），关闭 Starlight 默认 404
      disable404Route: true,
      // 站点外观由自定义全局样式与组件 override 完全接管
      customCss: [
        'normalize.css',
        'semantic-ui-css/semantic.min.css',
        '@thewakingsands/axis-font-icons',
        './src/styles/index.scss',
      ],
      locales: {
        root: { label: '简体中文', lang: 'zh-Hans' },
      },
      head: buildHead(),
      // 全量组件 override（复刻原设计）
      components: {
        Header: './src/components/starlight/Header.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
        PageFrame: './src/components/starlight/PageFrame.astro',
        TwoColumnContent: './src/components/starlight/TwoColumnContent.astro',
        ContentPanel: './src/components/starlight/ContentPanel.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        PageSidebar: './src/components/starlight/PageSidebar.astro',
        MarkdownContent: './src/components/starlight/MarkdownContent.astro',
        Footer: './src/components/starlight/Footer.astro',
        TableOfContents: './src/components/starlight/TableOfContents.astro',
        MobileTableOfContents:
          './src/components/starlight/MobileTableOfContents.astro',
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [legacySyntaxPlugin()],
    // 用 esbuild 压缩 CSS（lightningcss 对 semantic-ui 等旧版选择器过于严格）
    build: { cssMinify: 'esbuild' },
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
