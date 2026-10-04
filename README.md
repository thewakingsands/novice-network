# novice-network

一个《最终幻想14》国服新人指导手册。

## 用户

### 语法

#### 各种强调

```markdown

**强调（没有加粗红色文本）**

==高亮（绿色背景）==

++黄色文本阴影++

```

### 组件

#### 文件引用

被引用的片段文件组织在 `_includes` 目录下，避免被搜索引擎索引。

```html
<IncludePage file="_includes/your_file_name.md" />
```

#### 折叠

```markdown
::: collapse 折叠标题

被折叠的内容

:::
```

#### 卡片

```markdown
::: segment blue

##### 卡片标题

卡片内容

:::
```

## 开发者

需要 Node.js 24+ 和 pnpm 12.9.1（与 `packageManager` 字段一致）。

### 编译

```bash
pnpm install
pnpm build
```

### 开发

```bash
pnpm dev
```

### 验证与预览

```bash
pnpm test
pnpm build
pnpm preview
```

站点使用 VitePress 自定义主题，配置位于 `docs/.vitepress`，静态资源位于 `docs/public`，构建结果仍写入 `dist`。
文章保留 `.htm` 地址，目录首页保留 `/` 地址；构建会同步转换 Markdown 链接与输出文件名。
`_includes` 中的 Markdown 通过 `IncludePage` 加载，不单独发布为页面。
