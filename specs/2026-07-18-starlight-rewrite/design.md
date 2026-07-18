# 系统设计：Starlight (Astro) 重制

## 1. 总体架构

仓库根目录改造为标准 Astro 项目：

```
astro.config.mjs          # Astro + Starlight 配置
biome.json                # Biome lint/format 配置
src/
  content/
    docs/                 # 全部页面内容（MDX），由 docs/*.md 迁移而来
    includes/             # 复用片段（原 docs/_includes/），不产出路由
  components/             # 全部 Astro 组件（原 Vue 组件重写）
    starlight/            # Starlight 组件 overrides（Header、Sidebar 等）
  plugins/                # 自定义 remark/rehype 插件
  scripts/                # 客户端脚本（vanilla TS：灯箱、地图、菜单等）
  styles/                 # 全局 CSS（由 Stylus 移植）
  data/                   # toc.ts、duty.ts（原 theme/toc.js、duty.js）
  utils/                  # 构建期工具（cafemaker 客户端、slugify 等）
public/                   # 原 docs/.vuepress/public/ 全量（含 sw.js）
tools/                    # 保留 dist-files/、uiguide/ 等；删除 search-index/
ci/                       # deploy.sh 更新
```

- 框架版本：Astro 7 + Starlight 0.41+（当前最新），包管理 pnpm，Node 由 mise 管理（分支上已就绪）。
- Astro `outDir` 设为 `dist`，与现有部署脚本保持一致。
- 原 `docs/` 目录在迁移完成后删除；VuePress 及全部相关依赖移除。

### Starlight 的使用方式

站点外观与 Starlight 默认主题完全不同，因此采用 Starlight 官方支持的**全量组件 override** 方式：保留 Starlight 的内容 schema、路由、headings/TOC 数据与插件体系，UI 层全部替换为复刻原设计的自定义 Astro 组件。Starlight 内置 Pagefind 搜索关闭（`pagefind: false`），默认样式由自定义全局 CSS 覆盖。

Override 映射：

| Starlight 组件 | 新实现 | 复刻对象 |
|---|---|---|
| `Header` | `NavTop.astro` | 顶栏：汉堡菜单、首页/搜索链接、页面标题+章节目录下拉、回顶部、暗色切换、二维码悬浮 |
| `Sidebar` | `NavMenu.astro` | 左侧两级手风琴导航（数据源 `src/data/toc.ts`）、移动端 FAB 按钮组 |
| `PageFrame` / `TwoColumnContent` | `PageShell.astro` | 原 Layout.vue 的页面骨架（content-outer、广告位、页脚、灯箱挂载点） |
| `TableOfContents` | `ArticleTOC.astro` | 右侧 sticky 文章目录 + “回到页首” |
| `Footer` | `SiteFooter.astro` | GitHub 修订/编辑/反馈链接、版权、takedown |
| `Pagination` | `Pager.astro` | 基于 toc.ts 顺序的上一页/下一页 |
| `Search` / `ThemeSelect` 等 | 置空或并入 NavTop | 搜索入口与暗色切换在顶栏中 |

暗色模式对齐 Starlight 的 `data-theme` 机制：顶栏切换按钮与 `prefers-color-scheme` 初始值写入 `data-theme`，原 `dark.styl` 的 `.dark` 规则移植为 `[data-theme='dark']` 规则。

## 2. URL 保持策略（.htm）

原站所有页面 URL 以 `.htm` 结尾（`vuepress-plugin-clean-urls`）。新方案：

1. 每个内容文件 frontmatter 设置 `slug`，值为原路径加 `.htm`（如 `basic/battle.htm`）；首页 slug 为根。slug 由迁移脚本自动生成。
2. Astro 配置 `trailingSlash: 'never'`、`build.format: 'directory'`，站内所有生成链接即为 `/basic/battle.htm`。
3. 构建产物 `dist/basic/battle.htm/index.html` 由 postbuild 脚本平铺为 `dist/basic/battle.htm` 文件，与原站产物结构完全一致（静态托管无需 rewrite 规则）。
4. `404.html`、首页 `index.html` 不参与 rename。
5. 内容中的站内链接写法保持 `/path/file.md#锚点` 原样，由 remark 插件在构建期改写为 `/path/file.htm#锚点`（与 VuePress clean-urls 行为一致）。

**锚点保持**：VuePress 与 Astro（github-slugger）的中文标题 slug 算法不同。移植 VuePress 1.x 的 slugify 算法（`@vuepress/shared-utils`，约 20 行）到 `src/utils/slugify.ts`，通过 rehype 插件覆写全部 heading id，并将该 headings 数据交给 `ArticleTOC.astro` 使用（不使用 Astro 默认 headings 的 slug），确保页内锚点 URL 与原站完全一致。

**方案已验证**（2026-07-18，Astro 7.1.0 + Starlight 0.41.3 最小项目实测）：

- frontmatter `slug: basic/battle.htm` 被原样接受；`trailingSlash: 'never'` 下站内 href、`<link rel="canonical">`、sitemap 均输出无尾斜杠的 `/basic/battle.htm`，三级目录同样正常；
- 构建产物为 `basic/battle.htm/index.html`，平铺脚本（rename `index.html` → 上移为 `.htm` 文件，目录非空则快速失败）验证可行；
- dev server 对 `.htm` 路由直接可访问（无需额外配置）；
- 中文 heading id 原样保留（如 `id="副本迷宫"`）；
- 无需设置 `build.format`（默认 directory 即可）。

一个已知差异：目录索引页（`/duty/`、`/job/`）在 `trailingSlash: 'never'` 下由 Starlight 生成的链接为 `/duty`（无尾斜杠），canonical/sitemap 同。影响可控：站内导航（NavMenu/Pager）均为自定义组件，数据源 `toc.ts` 沿用原有的 `/duty/` 写法；内容中手写的 `/duty/` 链接不受影响；产物仍为 `duty/index.html`，两种形式均可访问。

图片 URL 说明：原站内容图片经 webpack 输出为 hash 文件名（`/assets/img/*`），本来就随构建变化；新站由 Astro assets 输出到 `/_astro/*`，不违反“页面 URL 不变”的要求。`public/images/` 等绝对路径资源保持原路径。

## 3. 内容与 Markdown 管线

内容文件由迁移脚本批量转换为 `.mdx`（见 plan），源码语法尽量保持不变，兼容性由插件层承担。

### 3.1 使用的现成插件

| 能力 | 原实现 | 新实现 |
|---|---|---|
| `==mark==`（1008 处） | markdown-it-mark | `remark-flexible-markers` |
| `++ins++`（110 处） | markdown-it-ins | `remark-ins` |
| 表格、脚注 `[^1]`、删除线 | markdown-it + footnote | Astro 默认 `remark-gfm`（含 footnote） |

### 3.2 自写插件（`src/plugins/`）

1. **`remark-legacy-containers`** — 统一处理两类围栏容器（AST 后处理，栈式匹配支持嵌套）：
   - `;;;classes … ;;;`（markdown-it-div，1970 处）→ `<div class="…">`；
   - `::: collapse 标题` → `<CollapseText summary="标题">`；`::: segment 类名` → `<SegmentText className="…">`；`::: job 名 类` → `<JobCard name class>`；输出 mdxJsxFlowElement，组件通过 MDX `components` 注入（Starlight `components` 配置 + MDX provider），内容中无需 import。
2. **`remark-cjk-breaks`** — 复刻 `breaks: true` + markdown-it-cjk-breaks 组合行为：软换行渲染为 `<br>`，但两侧均为 CJK 字符时不渲染。
3. **`remark-heading-attrs`** — 支持标题末尾 `{.class}`（markdown-it-attrs 的全部实际用例，40 处，均为 `{.header}`）：提取为 heading 的 class。
4. **`remark-md-links`** — 站内 `*.md` 链接改写为 `*.htm`（保留锚点与查询）。
5. **`rehype-vuepress-slug`** — 用移植的 VuePress slugify 覆写 heading id，并把 headings 树挂到页面数据供 TOC 组件消费。
6. **`rehype-legacy-table`** — `<table>` 包裹 `<div class="md-table">` 并附加 `ui compact grey striped unstackable table` class（复刻原 table 渲染）。
7. **`rehype-lazy-images`** — 所有 `<img>` 加 `loading="lazy"`。
8. **`rehype-pangu`** — 文本节点做中西文间距处理（移植 pangu 的正则逻辑）。

markdown-it-imsize 在内容中零使用，不迁移。`::: slot`（仅 paladin.md 2 处）不做通用支持，该页手工重构为 MDX import。

### 3.3 迁移脚本需转换的内容点

- 文件后缀 `.md` → `.mdx`；`docs/README.md` → `index.mdx`，各目录 `README.md` → 对应 `index` 文件；frontmatter 注入 `slug`（含 `.htm`）与 `title`（Starlight schema 必填，取首个 h1 或原 frontmatter）。
- Vue 绑定语法：`:id="375"` → `id={375}`、`:hq="true"` → `hq` 等（全部内联组件属性正则可覆盖，脚本处理并输出未匹配清单人工复核）。
- `<IncludePage file="_includes/…" />`（13 处）→ MDX `import` + 组件引用；`_includes/` 迁至 `src/content/includes/`。
- MDX 与 markdown-it 的 HTML 宽容度差异（未闭合标签、`<img …>` 未自闭合、`{`/`<` 裸字符等）：脚本修复 + 构建报错逐一清理。
- `underConstruction: true` frontmatter（51 处）保留，经 Starlight schema 扩展（`extend` docs schema）声明，页面模板据此渲染 `<UnderConstruction>`。

## 4. 组件重写清单（全部 Astro）

### 4.1 纯静态（构建期渲染，零客户端 JS）

`Role`、`Quest`、`IconHeader`、`UnderConstruction`、`SegmentText`、`JobCard`（“查看详情”按钮构建期判断目标页是否存在）、`HomePage`、`XIVFontList`、`FloatTOC`/`ArticleTOC`/`HeaderList`（headings 构建期可得）。

### 4.2 构建期取数（用户决策：烘焙）

- `Action`、`Status`、`Item`：Astro 组件在构建期通过 `src/utils/cafemaker.ts` 查询 cafemaker API，把图标 URL、名称、wiki 链接直接渲染进 HTML。请求带磁盘缓存（`.cache/cafemaker/`，按查询键持久化，命中则不发请求），并做并发限制与失败重试；缓存文件提交与否由 CI 缓存机制决定（进 `.gitignore`，CI 用 actions/cache）。构建期任何查询失败按原组件的“默认图标/纯文本”降级渲染并输出警告，不使构建失败。
- tooltip（kit-tooltip，悬浮技能/状态详情）属运行时交互，保留客户端：组件输出 `data-ck-action-id` 等属性，全局脚本按需初始化 `@thewakingsands/kit-tooltip`。
- `DutyNav`：365 条副本数据（`src/data/duty.ts`）构建期渲染完整列表，筛选交互用组件内 `<script>`（vanilla）实现。

### 4.3 客户端运行时（数据本质是实时的，保留 fetch）

- `ServerList`：JSONP 请求盛趣服务器状态（无 CORS，保留 JSONP，vanilla 实现），会话内存缓存。
- `Sponsors`：运行时 fetch 赞助者列表。
- `ZhaoDai`：邀请码需每次访问随机，客户端小脚本从内联列表随机渲染。
- `BuffSearch`（编辑工具页）：交互式搜索，保留客户端 fetch cafemaker。
- `SiteSearch`：见 §5。

### 4.4 全局客户端行为（`src/scripts/`，vanilla TS）

- **图片灯箱**：继续使用 PhotoSwipe v4 + photoswipe-ui-default（外观零差异），中文按钮文案原样移植。事件委托：正文内 `<img>`（无 `.no-zoom`）点击打开单图画廊，尺寸取 naturalWidth/Height×2。
- **艾欧泽亚交互地图**：`mapLoader` 由 jQuery 重写为 vanilla TS（浮窗拖拽/缩放/关闭、localStorage 记忆位置、移动端半屏模式、`.eorzea-map-trigger` 委托）。外部 `@thewakingsands/eorzea-interactive-map` bundle 与 Leaflet CSS 继续经 CDN 注入，jQuery 依赖移除。
- **锚点滚动 `gotoId`**：平滑滚动、-45px 顶栏偏移、3 秒 `.scroll-focus` 高亮；TOC/正文锚点链接统一走此逻辑。
- **顶栏/菜单交互**：移动端菜单开合、二维码生成（`qrcode` 库）、复制链接（`navigator.clipboard`，替代 clipboard 库）、暗色切换。
- **SW 注册与域名重定向**：见 §6。

- **`WhatsNew` 公告横幅**：保留迁移。`WhatsNew.astro` 渲染于正文上方（原位置），客户端脚本控制显隐：以横幅 id 比对 `localStorage.whatsNew` 决定是否显示，关闭时写入并上报统计事件（gtag + `_hmt`）。原代码中被注释掉的挂载时显示检查一并恢复为正常逻辑，横幅内容与 id 由站点配置维护。

MPA 架构下原 `page-timer`（SPA 导航看门狗）、nprogress、dehydrate、`@vuepress/last-updated` 均无对应物，直接淘汰。`Duty.vue` 布局（`instance` frontmatter 专用）为无引用的残缺代码，不迁移。

### 4.5 样式

- 继续引入 `normalize.css` 与 `semantic-ui-css`（外观依赖其 menu/segment/table/button 等）。
- 样式预处理器采用 **SCSS**（Astro/Vite 原生支持，`pnpm add -D sass` 零配置）。Stylus 按文件一对一移植为 SCSS（变量、嵌套、导入结构照搬）：`main`、`colors`、`font`（FFXIV_Lodestone_SSF 字体 + unicode-range）、`dark`（→ `[data-theme='dark']`）、`map`；组件级样式写入各 Astro 组件 `<style lang="scss">`，颜色变量经 Vite `preprocessorOptions` 全局注入。注：Biome 不覆盖 `.scss` 文件（其 CSS 支持仅限纯 CSS），样式文件不纳入 lint。
- `@thewakingsands/axis-font-icons`（`xiv` 图标字体）保留。
- 原 `ContentContainer.vue` 中的全部正文排版样式移植为作用于 `.content-container` 的全局样式层。

## 5. 站内搜索（自建纯前端）

- **索引生成**：构建后脚本（postbuild，与 rename 同一流程）遍历 `dist/**/*.htm`，用 cheerio 抽取 `{ url, title, body }`（`.content-container` 文本，逻辑沿用原 `tools/search-index/generate.js`），输出 `dist/search-index.json`。中文文本 gzip 压缩率高，走 CDN 传输可控。
- **检索引擎**：MiniSearch。自定义 tokenizer：CJK 连续段切成 bigram（首尾补 unigram），非 CJK 按词切分；索引与查询使用同一 tokenizer，因此支持长度 ≥1 的任意中文子串匹配。
- **前端 UI**：`/search.htm` 页面复刻原 `SiteSearch.vue`——输入框 300ms 防抖、每页 10 条分页、标题/正文摘要高亮（基于查询词在原文的位置生成 `<em>` 片段）、无结果时反馈表单链接、搜索与点击统计事件。索引在首次输入时惰性 fetch 并在内存中构建。
- 原搜索后端（`novice-network-search.wakingsands.com`）与 `tools/search-index/` 上传逻辑删除，CI 不再需要 `UPDATE_KEY`。

## 6. Service Worker、统计与第三方脚本

- `public/sw.js`（CDN 代理到 `ff14-org.xivcdn.com`）**原样保留**，零修改。
- SW 注册逻辑保留原语义：production 或 `localStorage.debugSw === '1'` 时注册 `/sw.js`；实现为全局内联脚本（原 `my-sw` 插件）。
- 域名重定向（非 `ff14.org`/localhost 强制跳转）保留（原 `global-scripts` 插件）。
- 统计与广告经 Starlight `head` 配置注入：
  - GA4：`gtag.js`，测量 ID 经 `PUBLIC_GA4_ID` 环境变量注入（**由用户提供**，未设置时不输出该脚本）；原 minimal-analytics/UA 代码删除。搜索页统计事件相应改用 `gtag('event', …)` + 百度 `_hmt`。
  - 百度统计 `215a46d31e2c4aaa8e1cdd94fcfe8aa4`：production 注入 hm.js（MPA 下每页自然计数，无需 SPA 路由钩子）。
  - Cloudflare Insights beacon（token 原样）。
  - Google AdSense `ca-pub-8304225030161579`：loader 进 head，页脚广告位（`.yaofan`）在 `PageShell.astro` 中复刻，`ads.txt` 保留于 public。
  - Leaflet 1.5.1 CSS、eorzea-interactive-map 1.1.1 JS/CSS 继续从 `code.bdstatic.com` 注入；jQuery 不再注入。

## 7. 构建与部署

- `pnpm dev` → `astro dev`；`pnpm build` → `astro build && node tools/postbuild/index.js`。
- postbuild 脚本职责：① `.htm` 目录平铺 rename；② 生成 `dist/search-index.json`。
- `ci/deploy.sh` 更新：yarn → pnpm；删除 meta description 的 sed 清洗（新模板不再重复注入 description）；删除 searchindex 上传步骤；`files.json` 时间戳/rsync 合并/90 天清理机制原样保留（`tools/dist-files/` 不动）。部署目标仓库与 force-push 流程不变。
- `.github/workflows/pages.yml` 相应更新 Node/pnpm 安装与缓存（含 `.cache/cafemaker/`）。

## 8. 工具链

- **Biome**：`biome.json` 管 lint + format（js/ts/json；`.astro` 文件按 Biome 当前对 Astro 的支持度启用 frontmatter 处理）。删除 eslint、prettier 全部依赖与配置。`pnpm lint` → `biome check`，`pnpm lint:fix` → `biome check --write`。
- **TypeScript**：`astro check` 纳入 CI。
- 淘汰依赖：vuepress 及全部 vuepress-plugin-*、eslint 系、prettier、jquery（间接）、clipboard、intersection-observer、got/isomorphic-fetch（构建工具改用原生 fetch）、striptags（改用 DOM 文本抽取）、semantic-ui-css 保留、photoswipe/qrcode/@thewakingsands 系保留。

## 9. 验收基准（设计层面）

1. 原站与新站的页面 URL 清单（含 `.htm`）逐一对应，无缺失、无新增路径；heading 锚点 id 与原站一致。
2. 视觉：桌面/移动端首页、内容页、副本页、搜索页、404 与原站布局与配色一致（暗色模式同）。
3. `sw.js` 在新站正常注册且 CDN 改写行为不变。
4. 搜索支持中文任意子串查询，结果高亮、分页可用。
5. `pnpm build` 产物可直接被现有 deploy.sh 流程发布。
