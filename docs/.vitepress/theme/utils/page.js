import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

function flattenHeaders(headers = []) {
  return headers.flatMap(({ children, ...header }) => [
    { ...header, slug: header.slug || header.link.slice(1) },
    ...flattenHeaders(children)
  ])
}

export function usePage() {
  const { page } = useData()
  const route = useRoute()
  return computed(() => ({
    ...page.value,
    path: route.path,
    relativePath: page.value.filePath || page.value.relativePath.replace(/\.htm\.md$/, '.md'),
    headers: flattenHeaders(page.value.headers)
  }))
}
