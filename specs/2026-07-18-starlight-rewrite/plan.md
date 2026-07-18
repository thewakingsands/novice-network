# 执行计划：Starlight (Astro) 重制

前置阅读：`proposal.md`（需求与已确认决策）、`design.md`（架构与技术选型）。

分支：`refactor/astro`（已有 mise + pnpm 工具链提交）。每阶段结束提交一次，保证 `pnpm build` 在阶段边界可用（阶段 0-2 期间允许仅示例内容可构建）。

---

## 阶段 0：URL 方案 spike ✅ 已完成（2026-07-18）

已在临时目录以 Astro 7.1.0 + Starlight 0.41.3 最小项目实测，`.htm` slug 方案成立，无需备选路径。结论与已知差异见 design.md §2「方案已验证」。实施要点带回主项目：

- `trailingSlash: 'never'`，`build.format` 保持默认；
- 平铺脚本模式：遍历 dist，将 `*.htm/index.html` rename 为 `*.htm` 文件，目录含其他文件时直接报错快速失败（阶段 7 正式化）；
- Starlight 0.41 sidebar 的 `autogenerate` 需包在 `items` 数组内（新 API 语法，配置 spike 时踩到；本项目侧边栏为自定义组件，仅 spike 期间相关）；
- 目录索引页链接尾斜杠差异由自定义导航组件消化（design.md §2）。

## 阶段 1：项目脚手架（1 天）

1. 仓库根建立 Astro 项目结构（见 design.md §1）；`astro.config.mjs` 配置 outDir `dist`、trailingSlash、site `https://ff14.org`、Starlight 基础配置（title、description、keywords head、`pagefind: false`、locale zh-Hans）。
2. `docs/.vuepress/public/` 全量移至 `public/`（sw.js、images、CNAME、ads.txt、robots、.gitpagesfile 等）。
3. 建立 `src/data/toc.ts`、`src/data/duty.ts`（由原 `theme/toc.js`、`theme/duty.js` 转 TS 导出，内容不变）。
4. Biome 接入：`biome.json`、`pnpm lint`/`lint:fix` 脚本；移除 package.json 中 eslint/prettier 配置与依赖；清空 VuePress 依赖，锁定新依赖集。
5. package scripts：`dev`、`build`（含 postbuild 占位）、`check`（astro check + biome check）。
6. Starlight docs schema `extend`：`underConstruction`、`noTopPager`、`className`、`webframe`、`jobName`、`detailguide` 字段。

**验收**：`pnpm dev` 可跑通示例页；`pnpm lint`、`astro check` 通过；public 资源可访问。

## 阶段 2：Markdown 管线（2-3 天）

按 design.md §3 实现 `src/plugins/` 下全部插件，每个插件配 vitest 单测（输入 markdown 字符串 → 断言输出 HTML/AST）：

1. `remark-legacy-containers`（`;;;` div + `:::` collapse/segment/job，栈式嵌套）。
2. `remark-cjk-breaks`（软换行 → `<br>`，CJK 两侧除外）。
3. `remark-heading-attrs`（标题尾 `{.class}`）。
4. `remark-md-links`（站内 `.md` → `.htm`）。
5. `src/utils/slugify.ts`（移植 VuePress slugify）+ `rehype-vuepress-slug`（覆写 heading id、导出 headings 数据）。
6. `rehype-legacy-table`、`rehype-lazy-images`、`rehype-pangu`。
7. 接入现成插件：`remark-flexible-markers`、`remark-ins`（验证 MDX3/Astro 兼容，若不兼容则并入自写插件集）。
8. 在 astro.config 中按正确顺序注册全部插件。

**验收**：单测覆盖每种语法的正反例；用原站 3-5 个语法最重的页面（`basic/config.md`、`basic/equip-looking.md`、`topic/raid.md`、`duty/63.md`）手工转为 mdx 后渲染结果与原站 DOM 结构一致（容器嵌套、mark/ins、表格包裹、heading id）。

## 阶段 3：内容迁移脚本（2-3 天）

1. 编写 `tools/migrate-content/`（一次性脚本，迁移完成后保留在仓库供追溯）：
   - `docs/**/*.md` → `src/content/docs/**/*.mdx`（README → index）；同目录 `*.assets/` 图片一并移动，相对引用不变；
   - frontmatter：注入 `slug`（原路径 + `.htm`，index 页为目录路径）与 `title`（原 frontmatter title 或首个 h1；Starlight 必填）；保留既有字段；
   - Vue 绑定语法转换（`:id="375"` → `id={375}` 等），未匹配模式输出到报告文件人工处理；
   - `<IncludePage file="…" />` → MDX import（`_includes` → `src/content/includes/`）；
   - MDX 不兼容 HTML 修复（未自闭合 `<img>`/`<br>`、裸 `{`、`<` 等），能规则化的进脚本，其余按构建报错清单人工修；
   - `job/paladin.md` 的 `::: slot` 手工重构。
2. 全量执行迁移，跑 `astro build` 清零报错；开发用 `astro check` 辅助。
3. 写链接校验脚本：对 dist 中全部站内 `href`/锚点做存在性检查。
4. 对比脚本：用旧站构建产物（或线上站 sitemap/文件清单）与新 dist 的 `.htm` 路径清单 diff，必须完全一致；抽样对比 heading id。

**验收**：全站 420+ 页构建成功；URL 清单 diff 为空；链接校验零死链（原站本就存在的死链除外，记录清单）。

## 阶段 4：主题外观与布局（3-4 天）

1. 全局样式移植（design.md §4.5）：接入 `sass`（devDependency）+ Vite `preprocessorOptions` 全局变量注入；normalize + semantic-ui-css 引入；`main/colors/font/dark/map`.styl → `src/styles/*.scss` 一对一移植；正文排版样式（原 ContentContainer）全局化；FFXIV 字体与 axis-font-icons 接入。
2. Starlight overrides（design.md §1 表）：`PageShell`、`NavTop`、`NavMenu`、`ArticleTOC`、`SiteFooter`、`Pager`、`WhatsNew`（localStorage 关闭记忆 + 统计事件，恢复显示逻辑）、404 页（随机背景）。
3. 交互脚本：`gotoId` 平滑滚动 + `.scroll-focus`、移动端菜单 + FAB、暗色切换（data-theme）、二维码、复制链接。
4. `HomePage.astro` + 首页（`index.mdx`）、`WebFrame` 页面支持（`webframe` frontmatter）。
5. head 注入：AdSense、Leaflet/地图 CSS+JS、Cloudflare beacon、百度统计、GA4（`PUBLIC_GA4_ID`，未设置则跳过）、SW 注册与域名重定向内联脚本。

**验收**：首页、普通内容页、job 页、404 在桌面/移动/暗色下与原站视觉一致（并排截图核对）；顶栏/侧栏/TOC/翻页交互行为一致；广告位与统计脚本按环境正确输出。

## 阶段 5：内容组件（3-4 天）

1. 纯静态组件：`Role`、`Quest`、`IconHeader`、`UnderConstruction`、`SegmentText`、`JobCard`、`CollapseText`（客户端开合）、`FloatTOC`、`XIVFontList`、`ZhaoDai`（客户端随机）。
2. 构建期取数：`src/utils/cafemaker.ts`（原 query 逻辑 + `.cache/cafemaker/` 磁盘缓存 + 并发限制 + 失败降级）；`Action`、`Status`、`Item` 组件烘焙渲染；kit-tooltip 客户端初始化脚本。
3. 客户端数据组件：`ServerList`（JSONP）、`Sponsors`、`BuffSearch`、`DutyNav`（静态渲染 + 客户端筛选）。
4. 图片灯箱：PhotoSwipe v4 scaffold + 委托脚本（`.no-zoom` 豁免）。
5. 艾欧泽亚地图：`mapLoader` vanilla TS 重写（浮窗、拖拽/缩放、localStorage、移动端半屏、`Pos` 组件触发）。
6. `sandbox.md`（组件试验页）迁移，作为组件全集的人工回归页。

**验收**：sandbox 页全部组件渲染与交互正常；`duty/63.md`、`job/` 任一页、`topic/eureka` 等重组件页与原站逐一对照；构建期 cafemaker 缓存冷/热构建均成功；断网构建（有缓存）成功。

## 阶段 6：站内搜索（2 天）

1. postbuild 索引生成（cheerio 抽取 `.content-container` → `dist/search-index.json`）。
2. `src/scripts/search.ts`：MiniSearch + CJK bigram tokenizer（索引/查询同构）、惰性加载索引。
3. `search.htm` 页面：复刻原 SiteSearch UI（防抖、分页 10 条、`<em>` 高亮摘要、无结果反馈链接、统计事件改 gtag + _hmt）。
4. 中文检索用例测试：多字词、单字、跨词子串、英文混排。

**验收**：设计 §9.4——中文任意子串可搜、高亮分页正常；索引体积（gzip）记录在 PR 描述中。

## 阶段 7：构建部署与收尾（1-2 天）

1. postbuild rename 脚本正式化（`.htm` 平铺 + 索引生成合并）。
2. `ci/deploy.sh`：pnpm 化、删 sed 清洗、删 searchindex 上传；`.github/workflows/pages.yml` 更新（pnpm/mise、`.cache/cafemaker` 缓存）。
3. 删除 `docs/`（内容已迁）、`docs/.vuepress/`、`tools/search-index/`、yarn.lock、残留配置；`tools/dist-files/`、`tools/uiguide/` 等保留并确认在 pnpm 下可运行。
4. README 更新（开发/构建/部署说明）。
5. 全站终验：URL diff、链接校验、Lighthouse 抽查、SW 在预览环境验证（`localStorage.debugSw=1`）、`biome check`/`astro check` 全绿。

**验收**：design.md §9 全部验收基准通过；CI 全流程（构建→postbuild→部署脚本 dry-run）跑通。

---

## 需用户提供 / 待办输入

- GA4 测量 ID（`PUBLIC_GA4_ID`）——未提供前构建不输出 GA 脚本，不阻塞其他工作。

## 工期估计

合计约 15-19 个工作日（不含内容人工复核的长尾）。关键路径：阶段 2 → 3 → 5。阶段 4 与阶段 3 可部分并行。
