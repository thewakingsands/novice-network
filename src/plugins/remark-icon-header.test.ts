import remarkMdx from 'remark-mdx'
import { describe, expect, it } from 'vitest'
import { rehypeVuepressSlug } from './rehype-vuepress-slug'
import { remarkIconHeader } from './remark-icon-header'
import { mdToHtml } from './test-utils'

const render = (md: string) =>
  mdToHtml(md, {
    remark: [remarkMdx, remarkIconHeader],
    rehype: [rehypeVuepressSlug],
  })

describe('remarkIconHeader', () => {
  it('默认渲染为带图标与锚点 id 的 h2', async () => {
    const html = await render(
      '<IconHeader img="/images/jobs/dps.png">进攻职业 (DPS)</IconHeader>'
    )
    expect(html).toBe(
      '<h2 class="icon-header" id="进攻职业-dps"><img class="no-zoom" src="/images/jobs/dps.png" alt=""><span>进攻职业 (DPS)</span></h2>'
    )
  })

  it('level={3} 与 level="4" 指定标题层级', async () => {
    expect(
      await render('<IconHeader img="/a.png" level={3}>近战</IconHeader>')
    ).toMatch(/^<h3 class="icon-header" id="近战">/)
    expect(
      await render('<IconHeader img="/a.png" level="4">近战</IconHeader>')
    ).toMatch(/^<h4 class="icon-header" id="近战">/)
  })

  it('多行写法同样转换，保留行内格式', async () => {
    const html = await render(
      '<IconHeader img="/a.png">\n  **龙骑士**\n</IconHeader>'
    )
    expect(html).toContain('<span><strong>龙骑士</strong></span></h2>')
  })

  it('非法 level 报错', async () => {
    await expect(
      render('<IconHeader img="/a.png" level={7}>x</IconHeader>')
    ).rejects.toThrow('level')
  })
})
