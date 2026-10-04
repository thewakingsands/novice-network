import XIVAPI from '@thewakingsands/xivapi-v2'
import { createDebounce } from './combine.js'

const api = new XIVAPI({ language: 'chs' })

// need: { Icon }, args: name
export const searchItem = createDebounce(
  combineSearchItem,
  filterSearchByName,
  300,
  20
)
// need: { ID, Icon }, args: name, id, jobId
export const searchAction = createDebounce(
  combineSearchAction,
  filterSearchAction,
  300,
  20
)
// need: { Icon,Name,MaxStacks,CanDispel,Description } , args: id
export const searchStatus = createDebounce(
  combineSearchStatus,
  filterSearchById,
  300,
  30
)

// argList: [[name1], [name2]]
function combineSearchItem(argList) {
  return searchRows(
    'Item',
    argList.map(([name]) => `Name=${quoteQueryValue(name)}`).join(' '),
    'Name,Icon'
  )
}

function filterSearchByName(results, name) {
  return results.find(r => r.Name === name)
}

function quoteQueryValue(value) {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

// args: [[name, id, jobId], ...]
async function combineSearchAction(argList) {
  const fields = 'Name,Icon,ClassJob.Name,ClassJobLevel,IsPlayerAction,IsPvP'
  const ids = argList.filter(([, id]) => id).map(([, id]) => id)
  const query = argList
    .filter(([name, id]) => !id && name)
    .map(buildActionSearchTerm)
    .join(' ')
  const results = await Promise.all([
    ids.length ? readRows('Action', ids, fields) : [],
    query ? searchRows('Action', query, fields) : []
  ])
  return results[0].concat(results[1])
}

function normalizeRow(row) {
  return { ID: row.row_id, ...row.fields }
}

async function searchRows(sheets, query, fields) {
  const results = []
  let cursor
  do {
    // search() in v1.0.0 requires language to be passed explicitly.
    const response = await api.search({
      sheets,
      query,
      fields,
      language: 'chs',
      limit: 100,
      ...(cursor ? { cursor } : {})
    })
    results.push(...response.results.map(normalizeRow))
    cursor = response.next
  } while (cursor)
  return results
}

async function readRows(sheet, ids, fields) {
  const rows = [...new Set(ids)]
  const response = await api.data.sheets().list(sheet, {
    rows: rows.join(','),
    fields,
    limit: rows.length
  })
  return response.rows.map(normalizeRow)
}

function filterSearchAction(results, name, id, jobId) {
  if (id) {
    return results.find(r => r.ID === id)
  } else {
    return results.find(
      x =>
        x.Name === name &&
        (x.ClassJobLevel > 0 || x.IsPlayerAction) &&
        !x.IsPvP &&
        (!jobId || x.ClassJob.value === jobId)
    )
  }
}

function buildActionSearchTerm([name, , jobId]) {
  const terms = [
    `+Name=${quoteQueryValue(name)}`,
    '+(ClassJobLevel>0 IsPlayerAction=true)',
    '+IsPvP=false'
  ]
  if (jobId) terms.push(`+ClassJob=${jobId}`)
  return `(${terms.join(' ')})`
}

// args: [[id], ...]
function combineSearchStatus(argList) {
  return readRows(
    'Status',
    argList.map(([id]) => id),
    'Icon,Name,MaxStacks,CanDispel,Description'
  )
}

function filterSearchById(results, id) {
  return results.find(x => x.ID === id)
}

export async function searchBuffs(name) {
  if (!name.trim()) return []
  const response = await api.search({
    sheets: 'Status',
    query: `Name~${quoteQueryValue(name)}`,
    fields: 'Name,Icon,Description',
    language: 'chs',
    limit: 100
  })
  return response.results.map(normalizeRow)
}
