# novice-network

一个《最终幻想14》国服新人指导手册。

## 用户

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
yarn dev
```
