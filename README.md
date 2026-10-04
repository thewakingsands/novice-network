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

### 编译

```bash
yarn
yarn build
```

### 开发

```bash
yarn dev
```
