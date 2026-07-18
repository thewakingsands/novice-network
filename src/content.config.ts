import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      // 复刻原站页面 frontmatter 的自定义字段
      extend: z.object({
        /** 施工中提示（原 underConstruction，51 处） */
        underConstruction: z.boolean().optional(),
        /** 隐藏正文上方翻页器（原 noTopPager） */
        noTopPager: z.boolean().optional(),
        /** 根容器附加 class（原 className） */
        className: z.string().optional(),
        /** WebFrame 页面：内嵌 iframe 的 src（原 webframe） */
        webframe: z.string().optional(),
        /** 职业页名称（原 jobName） */
        jobName: z.string().optional(),
        /** 详情攻略链接（原 detailguide） */
        detailguide: z.string().optional(),
      }),
    }),
  }),
}
