# novice-network

一个《最终幻想14》国服新人指导手册（[ff14.org](https://ff14.org)）。

基于 [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) 构建，内容为 MDX。

## 用户

### 语法

#### 各种强调

```markdown
**强调（不加粗的红色文本）**

==高亮（绿色背景）==

++黄色文本阴影++
```

### 组件

内容中可直接使用以下组件，无需 import（由构建期插件自动注入）：
`Role` `Action` `Status` `Item` `Quest` `Pos` `IconHeader` `UnderConstruction`
`FloatTOC` 等。

#### 文件引用

被引用的片段文件放在 `src/content/includes/` 目录下（不产出路由）。

```html
<IncludePage file="_includes/your_file_name.md" />
```

#### 折叠 / 卡片 / 分栏

```markdown
::: collapse 折叠标题
被折叠的内容
:::

::: segment blue
##### 卡片标题
卡片内容
:::

;;;.guide .cols2
;;;.guide .col
左栏
;;;
;;;.guide .col
右栏
;;;
;;;
```

## 开发者

需要 Node 与 pnpm（本仓库用 [mise](https://mise.jdx.dev/) 管理，见 `mise.toml`）。

### 常用命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 本地开发
pnpm build          # 构建（astro build + postbuild：.htm 平铺 + 搜索索引）
pnpm preview        # 预览构建产物
pnpm check          # astro check + biome check
pnpm lint           # biome 检查
pnpm lint:fix       # biome 自动修复
pnpm test           # vitest（Markdown 插件 / 搜索分词单测）
```

### 目录结构

```
astro.config.mjs        Astro + Starlight 配置、head 注入、组件 override 映射
src/content/docs/       全部页面内容（MDX），URL 以 .htm 结尾（frontmatter slug）
src/content/includes/   复用片段（IncludePage 引用目标）
src/components/
  content/              内容组件（Role/Action/Status/Item/…）
  theme/                布局与交互组件（NavTop/NavMenu/ArticleTOC/…）
  starlight/            Starlight 组件 override
src/plugins/            remark/rehype 插件 + Vite 源级语法插件（;;;、:::、{.header} 等）
src/scripts/            客户端脚本（灯箱、gotoId、搜索）
src/styles/             全局 SCSS（由 Stylus 移植）
src/utils/              slugify、XIVAPI v2 图标查询、爱发电构建期查询
tools/postbuild/        .htm 平铺 + 搜索索引生成
tools/migrate-content/  一次性内容迁移脚本（保留供追溯）
```

### 说明

- **URL**：所有页面以 `.htm` 结尾，与原 VuePress 站点保持一致；构建后由 postbuild 将
  `dist/**/*.htm/index.html` 平铺为 `dist/**/*.htm` 文件。
- **搜索**：纯前端（MiniSearch + CJK bigram 分词），索引 `dist/search-index.json` 由
  postbuild 生成，支持任意中文子串匹配。
- **图标**：`Action`/`Status`/`Item` 在构建期经 XIVAPI v2 烘焙图标（`.cache/xivapi-v2/`
  磁盘缓存，CI 用 actions/cache 持久化）；离线时降级为占位。
- **赞助者**：`Sponsors` 在构建期直连爱发电开放 API，需配置 `AFDIAN_USER_ID` 与
  `AFDIAN_API_TOKEN`；凭据仅注入构建进程，浏览器不再请求赞助者接口。
- **统计**：GA4 需通过 `PUBLIC_GA4_ID` 环境变量提供，未设置时不输出。
- **Service Worker**：`public/sw.js` 原样保留（CDN 代理），production 或
  `localStorage.debugSw==='1'` 时注册。
