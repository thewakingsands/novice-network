import { describe, expect, it } from 'vitest'
import { transformLegacyContainers } from './legacy-containers'
import { transformLegacySource } from './vite-legacy-syntax'

describe('transformLegacyContainers', () => {
  it('把 ;;;.class 转成 <div class>，裸 ;;; 收尾', () => {
    const { code } = transformLegacyContainers(';;;.guide .cols2\n内容\n;;;')
    expect(code).toContain('<div class="guide cols2">')
    expect(code).toContain('内容')
    expect(code).toContain('</div>')
  })

  it('支持嵌套（相邻开标记）', () => {
    const src = ';;;.guide .cols2\n;;;.guide .col\nA\n;;;\n;;;'
    const { code } = transformLegacyContainers(src)
    // 两个开 div、两个闭 div
    expect((code.match(/<div /g) ?? []).length).toBe(2)
    expect((code.match(/<\/div>/g) ?? []).length).toBe(2)
    expect(code.indexOf('<div class="guide cols2">')).toBeLessThan(
      code.indexOf('<div class="guide col">')
    )
  })

  it('collapse → CollapseText，记录用到的组件', () => {
    const { code, used } = transformLegacyContainers(
      '::: collapse 折叠标题\n内容\n:::'
    )
    expect(code).toContain('<CollapseText summary="折叠标题">')
    expect(code).toContain('</CollapseText>')
    expect(used.has('CollapseText')).toBe(true)
  })

  it('segment → SegmentText', () => {
    const { code, used } = transformLegacyContainers(
      '::: segment blue\n内容\n:::'
    )
    expect(code).toContain('<SegmentText className="blue">')
    expect(used.has('SegmentText')).toBe(true)
  })

  it('job → JobCard（名 + 类）', () => {
    const { code, used } = transformLegacyContainers(
      '::: job paladin tank\n说明\n:::'
    )
    expect(code).toContain('<JobCard name="paladin" className="tank">')
    expect(used.has('JobCard')).toBe(true)
  })

  it('转义 summary 中的引号', () => {
    const { code } = transformLegacyContainers('::: collapse a"b\nx\n:::')
    expect(code).toContain('summary="a&quot;b"')
  })

  it('非容器内容原样保留', () => {
    const src = '# 标题\n\n普通段落'
    const { code } = transformLegacyContainers(src)
    expect(code).toBe(src)
  })
})

describe('transformLegacySource', () => {
  it('转义标题尾部的 {.header}（躲过 MDX 表达式解析）', () => {
    const out = transformLegacySource('---\ntitle: x\n---\n# 武僧 {.header}')
    expect(out).toContain('# 武僧 \\{.header\\}')
  })

  it('用到容器组件时在 frontmatter 后注入 import', () => {
    const out = transformLegacySource(
      '---\ntitle: x\n---\n::: collapse 标\n内容\n:::'
    )
    expect(out).toMatch(/^---\ntitle: x\n---\n/)
    expect(out).toContain(
      "import CollapseText from '@/components/legacy/CollapseText.astro'"
    )
  })

  it('无 frontmatter 也能处理', () => {
    const out = transformLegacySource(';;;.box\nx\n;;;')
    expect(out).toContain('<div class="box">')
  })

  it('不含容器时保持稳定（仅可能转义标题）', () => {
    const src = '---\ntitle: x\n---\n普通正文'
    expect(transformLegacySource(src)).toBe(src)
  })
})
