import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

const COMPONENT_WITH_NAME =
  /<(?:Action|Item|Quest|Status)\b[^>]*\bname=["']([^"']+)["'][^>]*\/>/g

function plainText(source: string): string {
  return source
    .replace(COMPONENT_WITH_NAME, ' $1 ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, ' $1 ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^[;:]{3}.*$/gm, ' ')
    .replace(/[`#*_~+={}\\|>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const prerender = true

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs')
  const index = docs
    .filter((entry) => entry.id.endsWith('.htm'))
    .map((entry) => ({
      url: `/${entry.id}`,
      title: entry.data.title,
      body: plainText(entry.body ?? ''),
    }))

  return new Response(JSON.stringify(index), {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
