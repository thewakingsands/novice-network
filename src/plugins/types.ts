import type { Root as HastRoot } from 'hast'
import type { Root as MdastRoot } from 'mdast'
import type { Plugin } from 'unified'

export type RemarkPlugin =
  | Plugin<any[], MdastRoot>
  | [Plugin<any[], MdastRoot>, unknown]

export type RehypePlugin =
  | Plugin<any[], HastRoot>
  | [Plugin<any[], HastRoot>, unknown]
