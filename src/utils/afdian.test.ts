import { createHash } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { fetchSponsors } from './afdian'

describe('fetchSponsors', () => {
  it('按爱发电签名协议读取全部页并映射公开字段', async () => {
    const fetchMock = vi.fn(
      async (_url: string | URL | Request, init?: RequestInit) => {
        const body = JSON.parse(String(init?.body)) as { params: string }
        const { page } = JSON.parse(body.params) as { page: number }
        return Response.json({
          ec: 200,
          em: '',
          data: {
            total_page: 2,
            list: [
              {
                user: {
                  name: `赞助者${page}`,
                  avatar: `https://example.com/${page}.png`,
                },
              },
            ],
          },
        })
      }
    )
    const fetcher = fetchMock as unknown as typeof fetch

    const sponsors = await fetchSponsors('creator-id', 'api-token', fetcher)

    expect(sponsors).toEqual([
      { sponsor: '赞助者1', avatar: 'https://example.com/1.png' },
      { sponsor: '赞助者2', avatar: 'https://example.com/2.png' },
    ])
    expect(fetchMock).toHaveBeenCalledTimes(2)

    const [, init] = fetchMock.mock.calls[0]
    const payload = JSON.parse(String(init?.body)) as {
      user_id: string
      params: string
      ts: number
      sign: string
    }
    expect(payload.user_id).toBe('creator-id')
    expect(payload.params).toBe('{"page":1}')
    expect(payload.sign).toBe(
      createHash('md5')
        .update(
          `api-tokenparams${payload.params}ts${payload.ts}user_idcreator-id`
        )
        .digest('hex')
    )
  })
})
