/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** GA4 测量 ID（由用户提供）；未设置时不输出 GA 脚本 */
  readonly PUBLIC_GA4_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// PhotoSwipe v4 无类型声明
declare module 'photoswipe/dist/photoswipe' {
  const PhotoSwipe: any
  export default PhotoSwipe
}
declare module 'photoswipe/dist/photoswipe-ui-default' {
  const PhotoSwipeUIDefault: any
  export default PhotoSwipeUIDefault
}
declare module 'photoswipe/dist/photoswipe.css'
declare module 'photoswipe/dist/default-skin/default-skin.css'
