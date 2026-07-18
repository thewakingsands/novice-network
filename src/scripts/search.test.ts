import { describe, expect, it } from 'vitest'
import { tokenize } from './search'

describe('CJK bigram 分词器', () => {
  it('中文拆成 unigram + bigram', () => {
    const t = tokenize('副本迷宫')
    expect(t).toContain('副') // unigram
    expect(t).toContain('副本') // bigram
    expect(t).toContain('迷宫')
    expect(t).toContain('本迷')
  })

  it('单字可被索引（支持长度 1 子串）', () => {
    expect(tokenize('钓鱼')).toContain('钓')
  })

  it('英文按词切分并小写', () => {
    const t = tokenize('PVP Frontline')
    expect(t).toContain('pvp')
    expect(t).toContain('frontline')
  })

  it('中英混排', () => {
    const t = tokenize('FF14副本')
    expect(t).toContain('ff14')
    expect(t).toContain('副本')
  })

  it('查询与索引同构：子串 bigram 一致', () => {
    const doc = tokenize('禁地优雷卡')
    const q = tokenize('优雷')
    expect(q.every((tok) => doc.includes(tok))).toBe(true)
  })
})
