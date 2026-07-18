# 执行计划：Leaflet 与艾欧泽亚交互地图资源本地化

前置阅读：`proposal.md`（需求与已确认范围）、`design.md`（依赖版本、加载方式和验收标准）。

## 阶段 1：接入本地依赖

1. 使用 pnpm 将 `leaflet@1.5.1` 与 `@thewakingsands/eorzea-interactive-map@1.1.1` 添加为固定版本的运行时直接依赖。
2. 提交 `package.json` 与 `pnpm-lock.yaml` 的依赖解析结果，不手工复制 `node_modules` 文件到 `public/`。
3. 在 `astro.config.mjs` 的 Starlight `customCss` 中依次加入 Leaflet CSS 和交互地图 CSS，并保持 `src/styles/index.scss` 位于两者之后。
4. 在 `src/components/starlight/PageFrame.astro` 中以 `@thewakingsands/eorzea-interactive-map/dist/map.js?url` 导入脚本 URL，在页面骨架末尾输出同源经典脚本标签。保持现有 tooltip 初始化脚本不变。

**阶段验收**：Astro/Vite 能解析两个包、Leaflet CSS 引用的图片以及交互地图 UMD 脚本，不出现缺失导出或 SSR 访问 `window` 的错误。

## 阶段 2：删除地图 CDN 注入

1. 从 `astro.config.mjs` 的 `buildHead()` 删除 Leaflet CSS、交互地图 CSS 和交互地图 JavaScript 三个 `code.bdstatic.com` 节点。
2. 更新 `buildHead()` 的函数注释和地图资源附近的说明，准确反映 head 只负责元数据、广告、统计、Service Worker 注册与域名重定向。
3. 保留 AdSense、Cloudflare、百度统计和 GA4 的现有外部脚本；不修改地图瓦片、区域数据和图标的运行时地址。

**阶段验收**：源码中不存在这两个库的 `code.bdstatic.com` URL；`Pos.astro` 及其 `data-map-*` 输出没有改动。

## 阶段 3：构建与浏览器验证

1. 运行 `pnpm build`，确认静态构建和 postbuild 全流程成功。
2. 检查生产构建产物，确认不存在 `code.bdstatic.com/npm/leaflet` 与 `code.bdstatic.com/npm/@thewakingsands/eorzea-interactive-map`。
3. 使用 `pnpm preview` 打开 `/sandbox.htm`，检查页面实际加载资源：包含 Leaflet 与交互地图样式的 CSS 构建资源及 `map.js` 必须全部来自预览站点同源 URL。
4. 在浏览器中检查 `window.YZWF.eorzeaMap`，确认 `create`、`getRegion` 和 `simpleMarker` 为函数。
5. 检查 sandbox 中两个 `.eorzea-map-trigger`，确认 `data-map-name`、`data-map-x`、`data-map-y` 和可选 `data-map-id` 仍按原值渲染。

**最终验收**：两个库的静态 JS/CSS 由本项目依赖与构建产物提供，页面不再请求对应 CDN 资源，构建成功且现有地图全局接口和坐标触发器数据契约保持不变。
