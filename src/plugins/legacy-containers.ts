/**
 * 统一处理原站两类按行的围栏容器（复刻 markdown-it-div + markdown-it-container 行为）：
 *
 * - `;;;.class1 .class2` … `;;;`（markdown-it-div，marker `;`，1970 处）
 *   → `<div class="class1 class2">`；开标记后紧跟类名（`.x` 类 / `#y` id），裸 `;;;` 收尾。
 * - `::: collapse 标题` … `:::` → `<CollapseText summary="标题">`
 * - `::: segment 类名` … `:::` → `<SegmentText className="类名">`
 * - `::: job 名 类` … `:::` → `<JobCard name="名" className="类">`
 *
 * 由于相邻的开标记之间没有空行，remark 会把它们并成一个段落，无法在 mdast 上稳定还原，
 * 因此按行做字符串级预处理——这也正是 markdown-it 块级分词器的工作方式，最为忠实。
 * 处理后在每个标记前后插入空行，使 MDX 把标记之间的内容按 markdown 解析。
 *
 * CollapseText/SegmentText/JobCard 通过在源码顶部注入 MDX import 提供，内容文件无需手工 import。
 *
 * 注：`::: slot`（仅 paladin，2 处）不在此通用处理，迁移阶段已手工重构为 MDX import，
 * 构建时不会再出现。
 */

const OPEN_DIV = /^;;;(\S.*)$/
const CLOSE_DIV = /^;;;\s*$/
// `:::` 后允许有或没有空格：`::: collapse 标题`、`:::segment grey`、`:::job monk dps`
const OPEN_CONTAINER = /^:::\s*(collapse|segment|job)\s+(.*)$/
const CLOSE_CONTAINER = /^:::\s*$/

/** 各容器组件对应的导入路径（供注入 import 使用） */
export const COMPONENT_IMPORTS: Record<string, string> = {
  CollapseText: '@/components/legacy/CollapseText.astro',
  SegmentText: '@/components/legacy/SegmentText.astro',
  JobCard: '@/components/legacy/JobCard.astro',
}

function escapeAttr(value: string): string {
  return value.trim().replace(/"/g, '&quot;')
}

/** 把 `.class` / `#id` 记法解析为 HTML class/id 属性串 */
function parseDivAttrs(spec: string): string {
  const classes: string[] = []
  let id = ''
  for (const token of spec.trim().split(/\s+/)) {
    if (!token) continue
    if (token.startsWith('.')) classes.push(token.slice(1))
    else if (token.startsWith('#')) id = token.slice(1)
    else classes.push(token)
  }
  const attrs: string[] = []
  if (id) attrs.push(`id="${id}"`)
  if (classes.length) attrs.push(`class="${classes.join(' ')}"`)
  return attrs.join(' ')
}

interface Block {
  marker: ';' | ':'
  close: string
}

function topMarker(stack: Block[]): ';' | ':' | undefined {
  return stack.length ? stack[stack.length - 1].marker : undefined
}

export interface ContainerResult {
  code: string
  /** 本文件用到的容器组件名（用于注入 import） */
  used: Set<string>
}

export function transformLegacyContainers(source: string): ContainerResult {
  const lines = source.split('\n')
  const out: string[] = []
  const stack: Block[] = []
  const used = new Set<string>()

  const emitMarker = (tag: string) => {
    out.push('', tag, '')
  }

  for (const line of lines) {
    // 收尾优先判断裸标记，避免被开标记正则误吞
    if (CLOSE_DIV.test(line) && topMarker(stack) === ';') {
      const block = stack.pop()
      if (block) {
        emitMarker(block.close)
        continue
      }
    }
    if (CLOSE_CONTAINER.test(line) && topMarker(stack) === ':') {
      const block = stack.pop()
      if (block) {
        emitMarker(block.close)
        continue
      }
    }

    // 开 `;;;` div
    let m = line.match(OPEN_DIV)
    if (m) {
      const attrs = parseDivAttrs(m[1])
      stack.push({ marker: ';', close: '</div>' })
      emitMarker(attrs ? `<div ${attrs}>` : '<div>')
      continue
    }

    // 开 `:::` 容器
    m = line.match(OPEN_CONTAINER)
    if (m) {
      const [, name, rawArg] = m
      const arg = rawArg.trim()
      if (name === 'collapse') {
        used.add('CollapseText')
        stack.push({ marker: ':', close: '</CollapseText>' })
        emitMarker(`<CollapseText summary="${escapeAttr(arg)}">`)
      } else if (name === 'segment') {
        used.add('SegmentText')
        stack.push({ marker: ':', close: '</SegmentText>' })
        emitMarker(`<SegmentText className="${escapeAttr(arg)}">`)
      } else if (name === 'job') {
        const parts = arg.split(/\s+/)
        const jobName = escapeAttr(parts[0] ?? '')
        const jobClass = escapeAttr(parts.slice(1).join(' '))
        used.add('JobCard')
        stack.push({ marker: ':', close: '</JobCard>' })
        emitMarker(`<JobCard name="${jobName}" className="${jobClass}">`)
      }
      continue
    }

    out.push(line)
  }

  // 复刻 markdown-it-container 在文档结束时自动闭合未收尾的容器
  while (stack.length) {
    const block = stack.pop()
    if (block) out.push('', block.close, '')
  }

  return { code: out.join('\n'), used }
}
