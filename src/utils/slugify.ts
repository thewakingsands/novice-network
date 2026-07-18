// 移植自 @vuepress/shared-utils@1.x 的 slugify（VuePress 1.x 标题锚点算法）。
// 保证新站页内锚点 id 与原站完全一致（中文标题原样保留）。
// 原实现见 https://cdn.jsdelivr.net/npm/@vuepress/shared-utils@1.9.10/lib/slugify.js

// biome-ignore lint/suspicious/noControlCharactersInRegex: 与原算法保持一致
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’–—<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

export function slugify(str: string): string {
  return (
    str
      // 拆分带音调字符
      .normalize('NFKD')
      // 去除音调组合符
      .replace(rCombining, '')
      // 去除控制字符
      .replace(rControl, '')
      // 特殊字符替换为连字符
      .replace(rSpecial, '-')
      // 合并连续分隔符
      .replace(/-{2,}/g, '-')
      // 去除首尾分隔符
      .replace(/^-+|-+$/g, '')
      // 避免以数字开头（VuePress #121）
      .replace(/^(\d)/, '_$1')
      // 转小写
      .toLowerCase()
  )
}
