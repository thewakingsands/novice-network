# 提案：使用 Starlight (Astro) 重制网站

## 原始需求

我希望将当前目录的网站使用 Starlight (Astro) 重制。我希望完整保留原有的网站外观设计、目录功能、图片查看功能等，并使得 URL 也完全不变（使用 .htm 后缀）、自定义 service worker 也要正常工作。搜索功能替换为纯前端实现，但需要支持中文。

工具链方面：

- 使用最新的 Starlight；
- lint 替换为 Biome；
- 内容改为使用 MDX；
- 各类组件也全部使用 Astro 重写。

## 澄清与补充决策（2026-07-18）

规划阶段与用户确认的取舍：

1. **搜索实现**：使用 FlexSearch/MiniSearch 自建纯前端搜索（不使用 Pagefind）。构建期生成全量 JSON 索引，按字/bigram 分词，支持任意中文子串匹配；前端加载索引后在内存中检索。
2. **自定义 Markdown 语法**：保留原语法。通过 remark 插件在 MDX 工具链中继续支持 `==mark==`、`++ins++`、`;;;` div、`:::` 容器等；内容文件仅处理 Vue 绑定语法（`:id=` → `id={}`）等少量不兼容点。
3. **游戏数据组件**（Action/Status/Item）：改为构建期烘焙。构建时请求 cafemaker API（配本地缓存）把图标 URL/名称直接渲染进 HTML，页面零 API 请求。
4. **统计/广告**：Google Analytics 迁移到 GA4（GA4 测量 ID 由用户在实施时提供）；百度统计、Cloudflare Insights、Google AdSense 原样保留。
5. **WhatsNew 公告横幅**：保留并迁移（含 localStorage 关闭记忆与统计事件）。
6. **Duty.vue 布局**（`instance` frontmatter 专用、当前无页面引用的残缺代码）：不迁移。
7. **样式预处理器**：Stylus 迁移为 SCSS（而非纯 CSS），保留变量与嵌套的一对一移植。
