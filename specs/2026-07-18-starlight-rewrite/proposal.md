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

## 实施补充（2026-07-18）

现有 Astro 重构已基本完成，当前需补齐并验证以下可见问题：

1. 顶栏章节目录当前默认展开且无法收起，应恢复可开合行为。
2. 深色模式下文章主体文本颜色错误，应与原站暗色配色一致。
3. 首页背景图未显示，应恢复原站首页背景。
4. `ServerList`、`Sponsors`、`BuffSearch`、`DutyNav` 尚未实现，应按原站行为与本设计完成 Astro/vanilla TS 迁移。

## 维护修复补充（2026-07-18）

重构完成后的缺陷修复与数据源调整：

1. 深色模式不再覆盖导航链接颜色，仅文章正文链接使用亮蓝色。
2. 下载/安装常见问题移除重复换行造成的过大行距。
3. 标题锚点按钮恢复右侧绝对定位，仅悬停或键盘聚焦时显示。
4. 正文 flex 子项允许在窄屏收缩，避免被右侧文章目录遮挡。
5. 硬件配置问答框恢复完整下内边距。
6. `topic/daily` 的“友好部族 / 蛮族日常”标题在 include 内容后恢复上间距。
7. 站外 HTTP(S) 链接在构建期统一添加 `target="_blank"` 与 `rel="noopener noreferrer"`。
8. `@thewakingsands/kit-tooltip` 升级为 `0.4.0-beta.0`。
9. `Action`、`Status`、`Item` 与 `BuffSearch` 从 cafemaker 迁移至 XIVAPI v2；构建期缓存改为 `.cache/xivapi-v2/`。
10. `Sponsors` 改为构建期使用爱发电开放 API 获取并静态渲染；构建环境通过 `AFDIAN_USER_ID`、`AFDIAN_API_TOKEN` 提供凭据。
