import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getIconUrl } from '../../docs/.vitepress/theme/utils/iconUrl.js'

let serial = 0
const loadApi = () => import(`../../docs/.vitepress/theme/utils/xivapi.js?test=${serial++}`)
const row = (row_id, fields) => ({ row_id, fields })
const json = body => new Response(JSON.stringify(body), {
  headers: { 'content-type': 'application/json' }
})

test('item names are escaped, batched, paginated and cached', async t => {
  const requests = []
  const quoted = '测试"名称\\后缀'
  t.mock.method(globalThis, 'fetch', async input => {
    const url = new URL(input)
    requests.push(url)
    assert.equal(url.origin, 'https://xivapi-v2.xivcdn.com')
    assert.equal(url.searchParams.get('language'), 'chs')
    return json(url.searchParams.has('cursor')
      ? { results: [row(2, { Name: quoted })] }
      : { results: [row(1, { Name: '恢复药' })], next: 'next-page' })
  })
  const api = await loadApi()
  const [first, second] = await Promise.all([api.searchItem('恢复药'), api.searchItem(quoted)])
  assert.equal(first.ID, 1)
  assert.equal(second.ID, 2)
  assert.equal(requests.length, 2)
  assert.equal(requests[0].searchParams.get('query'), 'Name="恢复药" Name="测试\\"名称\\\\后缀"')
  assert.equal(requests[1].searchParams.get('cursor'), 'next-page')
  await api.searchItem('恢复药')
  assert.equal(requests.length, 2)
})

test('mixed action batches preserve ID lookup and player/job filters', async t => {
  const requests = []
  const fields = { Name: '同名技能', ClassJob: { value: 3 }, ClassJobLevel: 1, IsPlayerAction: true, IsPvP: false }
  t.mock.method(globalThis, 'fetch', async input => {
    const url = new URL(input)
    requests.push(url)
    return json(url.pathname.endsWith('/Action')
      ? { rows: [row(10, { ...fields, IsPvP: true })] }
      : { results: [row(11, { ...fields, ClassJob: { value: 4 } }), row(12, fields)] })
  })
  const api = await loadApi()
  const [byId, byName] = await Promise.all([
    api.searchAction('同名技能', 10, 3), api.searchAction('同名技能', null, 3)
  ])
  assert.equal(byId.ID, 10)
  assert.equal(byName.ID, 12)
  assert.equal(requests.length, 2)
  const query = requests.find(url => url.pathname.endsWith('/search')).searchParams.get('query')
  assert.match(query, /\+IsPvP=false/)
  assert.match(query, /\+ClassJob=3/)
  assert.match(query, /\+\(ClassJobLevel>0 IsPlayerAction=true\)/)
})

test('status batching tolerates missing rows and preserves icon IDs', async t => {
  t.mock.method(globalThis, 'fetch', async input => {
    const url = new URL(input)
    assert.equal(url.pathname, '/api/sheet/Status')
    assert.equal(url.searchParams.get('rows'), '43,99999')
    assert.equal(url.searchParams.get('language'), 'chs')
    return json({ rows: [row(43, { Name: '衰弱', Icon: { id: 215010 }, Description: '描述' })] })
  })
  const api = await loadApi()
  const [status, missing] = await Promise.all([api.searchStatus(43), api.searchStatus(99999)])
  assert.equal(status.Icon.id, 215010)
  assert.equal(status.Description, '描述')
  assert.equal(missing, undefined)
})

test('failed requests can be retried instead of remaining cached', async t => {
  let count = 0
  t.mock.method(globalThis, 'fetch', async () => {
    if (++count === 1) throw new Error('network unavailable')
    return json({ results: [row(1, { Name: '恢复药' })] })
  })
  const api = await loadApi()
  await assert.rejects(api.searchItem('恢复药'), /network unavailable/)
  assert.equal((await api.searchItem('恢复药')).ID, 1)
})

test('buff search skips empty input and uses Chinese partial matching', async t => {
  const fetch = t.mock.method(globalThis, 'fetch', async input => {
    const url = new URL(input)
    assert.equal(url.searchParams.get('query'), 'Name~"受伤"')
    assert.equal(url.searchParams.get('language'), 'chs')
    return json({ results: [row(64, { Name: '受伤加重' })] })
  })
  const api = await loadApi()
  assert.deepEqual(await api.searchBuffs('  '), [])
  assert.equal(fetch.mock.callCount(), 0)
  assert.equal((await api.searchBuffs('受伤'))[0].ID, 64)
})

test('numeric and stacked icons use the shared v2 URL formatter', () => {
  assert.equal(getIconUrl(104), 'https://xivapi-v2.xivcdn.com/i/000000/000104.png')
  assert.equal(getIconUrl(215010 + 2), 'https://xivapi-v2.xivcdn.com/i/215000/215012.png')
})
