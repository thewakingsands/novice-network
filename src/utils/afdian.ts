import { createHash } from 'node:crypto'

const API_URL = 'https://afdian.net/api/open/query-sponsor'
const REQUEST_TIMEOUT = 8_000

export interface Sponsor {
  sponsor: string
  avatar: string
}

interface AfdianSponsor {
  user?: {
    name?: string
    avatar?: string
  }
}

interface AfdianResponse {
  ec: number
  em: string
  data?: {
    total_page: number
    list: AfdianSponsor[]
  }
}

/** 构建期读取全部爱发电赞助者，签名协议与原 afdian-sponsors-list 服务一致。 */
export async function fetchSponsors(
  userId: string,
  apiToken: string,
  fetcher: typeof fetch = fetch
): Promise<Sponsor[]> {
  const sponsors: Sponsor[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const params = JSON.stringify({ page })
    const ts = Math.floor(Date.now() / 1000)
    const sign = createHash('md5')
      .update(`${apiToken}params${params}ts${ts}user_id${userId}`)
      .digest('hex')
      .toLowerCase()
    const response = await fetcher(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, params, ts, sign }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    })
    if (!response.ok) throw new Error(`爱发电接口 HTTP ${response.status}`)

    const json = (await response.json()) as AfdianResponse
    if (json.ec !== 200 || !json.data) {
      throw new Error(json.em || `爱发电接口错误 ${json.ec}`)
    }
    totalPages = Math.max(1, json.data.total_page)
    for (const entry of json.data.list) {
      const sponsor = entry.user?.name?.trim()
      const avatar = entry.user?.avatar?.trim()
      if (sponsor && avatar) sponsors.push({ sponsor, avatar })
    }
    page += 1
  }

  return sponsors
}
