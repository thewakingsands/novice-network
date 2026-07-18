import { describe, expect, it } from 'vitest'
import { slugify } from './slugify'

describe('slugify（VuePress 1.x 移植）', () => {
  it('保留中文标题原样', () => {
    expect(slugify('副本迷宫')).toBe('副本迷宫')
    expect(slugify('禁地优雷卡')).toBe('禁地优雷卡')
  })

  it('英文转小写、空格转连字符', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('FATE System')).toBe('fate-system')
  })

  it('标点/特殊字符合并为单个连字符', () => {
    expect(slugify('a, b. c')).toBe('a-b-c')
    expect(slugify('foo (bar)')).toBe('foo-bar')
  })

  it('去除首尾分隔符', () => {
    expect(slugify('  trim me  ')).toBe('trim-me')
    expect(slugify('(quoted)')).toBe('quoted')
  })

  it('数字开头补下划线', () => {
    expect(slugify('1开始')).toBe('_1开始')
    expect(slugify('2024版本')).toBe('_2024版本')
  })

  it('中英混排', () => {
    expect(slugify('PVP 玩法')).toBe('pvp-玩法')
  })
})
