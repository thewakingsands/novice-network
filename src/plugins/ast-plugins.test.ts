import remarkFlexibleMarkers from 'remark-flexible-markers'
import remarkIns from 'remark-ins'
import { describe, expect, it } from 'vitest'
import { rehypeCleanInline } from './rehype-clean-inline'
import { rehypeExternalLinks } from './rehype-external-links'
import { rehypeLazyImages } from './rehype-lazy-images'
import { rehypeLegacyTable } from './rehype-legacy-table'
import { rehypePangu, spacingText } from './rehype-pangu'
import { rehypeVuepressSlug } from './rehype-vuepress-slug'
import { remarkCjkBreaks } from './remark-cjk-breaks'
import { remarkHeadingAttrs } from './remark-heading-attrs'
import { remarkMdLinks } from './remark-md-links'
import { mdToHtml } from './test-utils'

describe('remarkCjkBreaks', () => {
  it('两侧均为 CJK 的软换行不产生 <br>（直接相连）', async () => {
    const html = await mdToHtml('中文一行\n中文两行', {
      remark: [remarkCjkBreaks],
    })
    expect(html).toContain('中文一行中文两行')
    expect(html).not.toContain('中文一行<br')
  })

  it('非 CJK 软换行产生 <br>', async () => {
    const html = await mdToHtml('English\nLines', { remark: [remarkCjkBreaks] })
    expect(html).toContain('<br')
  })

  it('CJK 与英文之间的软换行产生 <br>', async () => {
    const html = await mdToHtml('中文\nEnglish', { remark: [remarkCjkBreaks] })
    expect(html).toContain('<br')
  })
})

describe('remarkMdLinks', () => {
  it('.md → .htm，保留锚点', async () => {
    const html = await mdToHtml('[x](./battle.md#副本)', {
      remark: [remarkMdLinks],
    })
    // 注：rehype-stringify 会对锚点做 URL 编码（与真实构建一致），此处只校验 .md→.htm 与锚点保留
    expect(html).toMatch(/href="\.\/battle\.htm#/)
  })

  it('README.md → 目录索引', async () => {
    const html = await mdToHtml('[x](/job/README.md)', {
      remark: [remarkMdLinks],
    })
    expect(html).toContain('href="/job/"')
  })

  it('外链不动', async () => {
    const html = await mdToHtml('[x](https://ff14.org/a.md)', {
      remark: [remarkMdLinks],
    })
    expect(html).toContain('href="https://ff14.org/a.md"')
  })
})

describe('remarkHeadingAttrs', () => {
  it('提取标题尾部 {.header} 为 class 并移除文本', async () => {
    const html = await mdToHtml('## 武僧(格斗家) {.header}', {
      remark: [remarkHeadingAttrs],
    })
    expect(html).toContain('class="header"')
    expect(html).toContain('武僧(格斗家)')
    expect(html).not.toContain('{.header}')
  })
})

describe('remark-flexible-markers + remark-ins + rehypeCleanInline', () => {
  it('==x== / ++y++ 输出纯 <mark> / <ins>', async () => {
    const html = await mdToHtml('这是 ==高亮== 与 ++插入++', {
      remark: [
        [remarkFlexibleMarkers, { markerClassName: () => [] }],
        remarkIns,
      ],
      rehype: [rehypeCleanInline],
    })
    expect(html).toContain('<mark>高亮</mark>')
  })

  it('++插入++ → 纯 <ins>', async () => {
    const html = await mdToHtml('++插入++', {
      remark: [remarkIns],
      rehype: [rehypeCleanInline],
    })
    expect(html).toContain('<ins>插入</ins>')
    expect(html).not.toContain('remark-ins')
  })
})

describe('rehypeLegacyTable', () => {
  it('表格包裹 .md-table 并附加 Semantic UI 类', async () => {
    const html = await mdToHtml('| A | B |\n|---|---|\n| 1 | 2 |', {
      rehype: [rehypeLegacyTable],
    })
    expect(html).toContain('<div class="md-table">')
    expect(html).toContain('class="ui compact grey striped unstackable table"')
  })
})

describe('rehypeLazyImages', () => {
  it('markdown 图片加 loading=lazy', async () => {
    const html = await mdToHtml('![alt](/a.png)', {
      rehype: [rehypeLazyImages],
    })
    expect(html).toContain('loading="lazy"')
  })
})

describe('rehypeExternalLinks', () => {
  it('站外 HTTP 链接在新窗口打开并隔离 opener', async () => {
    const html = await mdToHtml('[外链](https://example.com/path)', {
      rehype: [rehypeExternalLinks],
    })
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('站内、锚点与非 HTTP 链接保持当前窗口', async () => {
    const html = await mdToHtml(
      '[站内](https://ff14.org/basic/) [相对](/before/) [锚点](#top) [邮件](mailto:test@example.com)',
      { rehype: [rehypeExternalLinks] }
    )
    expect(html).not.toContain('target="_blank"')
  })
})

describe('rehypeVuepressSlug', () => {
  it('用 VuePress slugify 覆写 heading id', async () => {
    const html = await mdToHtml('## 副本迷宫', {
      rehype: [rehypeVuepressSlug],
    })
    expect(html).toContain('id="副本迷宫"')
  })

  it('重复标题追加 -1、-2', async () => {
    const html = await mdToHtml('## 概览\n\n## 概览', {
      rehype: [rehypeVuepressSlug],
    })
    expect(html).toContain('id="概览"')
    expect(html).toContain('id="概览-1"')
  })
})

describe('rehypePangu / spacingText', () => {
  it('CJK 与英文之间插入空格', () => {
    expect(spacingText('这是FF14游戏')).toBe('这是 FF14 游戏')
  })

  it('纯中文不变', () => {
    expect(spacingText('新大陆见闻录')).toBe('新大陆见闻录')
  })

  it('管线中作用于文本、跳过代码', async () => {
    const html = await mdToHtml('这是FF14 `code不加空格`', {
      rehype: [rehypePangu],
    })
    expect(html).toContain('这是 FF14')
    expect(html).toContain('<code>code不加空格</code>')
  })

  it('间距跨越加粗、链接等行内标记', async () => {
    const html = await mdToHtml('中文**FF14**中文 [FF14](/a)中文', {
      rehype: [rehypePangu],
    })
    expect(html).toContain('中文<strong> FF14</strong> 中文')
    expect(html).toContain('<a href="/a">FF14</a> 中文')
  })

  it('行内代码两侧补空格，段首段尾除外', async () => {
    const html = await mdToHtml('`Ctrl+C`复制，按`Esc`退出 `End`', {
      rehype: [rehypePangu],
    })
    expect(html).toBe(
      '<p><code>Ctrl+C</code> 复制，按 <code>Esc</code> 退出 <code>End</code></p>'
    )
  })

  it('行内 HTML 处重新开始，不跨越', async () => {
    const html = await mdToHtml('中文<b>x</b>FF14', { rehype: [rehypePangu] })
    expect(html).toContain('<b>x</b>FF14')
  })
})
