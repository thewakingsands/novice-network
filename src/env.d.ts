/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** GA4 测量 ID（由用户提供）；未设置时不输出 GA 脚本 */
  readonly PUBLIC_GA4_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
