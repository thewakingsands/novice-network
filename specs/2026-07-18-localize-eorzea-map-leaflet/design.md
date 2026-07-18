# 系统设计：Leaflet 与艾欧泽亚交互地图资源本地化

## 1. 目标与边界

本变更只替换 Leaflet 与 `@thewakingsands/eorzea-interactive-map` 的资源交付方式：浏览器不再从 `code.bdstatic.com` 加载这两个库的 JavaScript 或 CSS，改为由 pnpm 依赖和 Astro/Vite 构建产物提供。

地图瓦片、区域数据和图标仍由 `@thewakingsands/eorzea-interactive-map` 在地图使用期间请求 `map-cdn.wakingsands.com` 与 `cafemaker.wakingsands.com`。广告、统计和正文中的外部链接不属于本规格。

## 2. 依赖与版本

在 `package.json` 中增加两个直接运行时依赖，并更新 `pnpm-lock.yaml`：

- `leaflet` 固定为 `1.5.1`；
- `@thewakingsands/eorzea-interactive-map` 固定为 `1.1.1`。

版本与当前 CDN URL 完全一致，避免资源本地化同时引入库升级和渲染差异。Leaflet 必须作为直接依赖声明，不能依赖交互地图包的传递依赖来解析公共样式。

## 3. CSS 交付

在 `astro.config.mjs` 的 Starlight `customCss` 中按以下顺序增加包内样式：

1. `leaflet/dist/leaflet.css`；
2. `@thewakingsands/eorzea-interactive-map/dist/map.css`；
3. 现有 `src/styles/index.scss`。

Leaflet 提供基础控件样式，交互地图样式覆盖 Leaflet，本站 `map.scss` 最后覆盖两者。Vite 处理 Leaflet CSS 中的相对图片 URL，并将图片与 CSS 一并输出为同源、带内容哈希的构建资源。

## 4. JavaScript 交付

`@thewakingsands/eorzea-interactive-map` 1.1.1 的发布文件是 UMD 脚本，不是原生 ESM。`src/components/starlight/PageFrame.astro` 使用 Vite 的 `?url` 导入 `dist/map.js`，再以经典脚本加载该构建资源。这样保留脚本现有的 `window.YZWF.eorzeaMap` 全局接口，同时由 Vite 生成同源、带内容哈希的 URL，不复制发布文件到 `public/`，也不增加手工同步步骤。

脚本继续在所有内容页加载，与当前全局 head 注入的覆盖范围一致。本规格不修改 `Pos.astro` 的 `data-map-*` 契约，也不新增或重写地图触发器逻辑。

## 5. 配置清理

从 `buildHead()` 删除以下三个 CDN 节点：

- Leaflet CSS；
- 艾欧泽亚交互地图 CSS；
- 艾欧泽亚交互地图 JavaScript。

同步收窄 `buildHead()` 注释，使其不再声称负责地图资源。Cloudflare、百度、GA4 和 AdSense 的现有外部脚本保持不变。

## 6. 验证标准

- `pnpm build` 成功，Leaflet CSS 关联的图片资源能够被 Vite 解析并输出；
- 生产 HTML/CSS/JS 中不存在 `code.bdstatic.com/npm/leaflet` 或 `code.bdstatic.com/npm/@thewakingsands/eorzea-interactive-map`；
- 预览页中包含 Leaflet 与交互地图样式的 CSS 构建资源及 `map.js` 均使用本站同源 URL；
- 浏览器中 `window.YZWF.eorzeaMap` 存在，并保留 `create`、`getRegion`、`simpleMarker` 等现有入口；
- `Pos.astro` 的渲染内容和 `data-map-*` 属性不变。
