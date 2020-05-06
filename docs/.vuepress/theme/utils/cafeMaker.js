import 'isomorphic-fetch'
import { createDebounce } from './combine'

// need: { Icon }, args: name
export const searchItem = createDebounce(combineSearchItem, 300, 20)
// need: { ID, Icon }, args: name, id, jobId
export const searchAction = createDebounce(combineSearchAction, 300, 20)
// need: { IconID,Name,MaxStacks,CanDispel,Description } , args: id
export const searchStatus = createDebounce(combineSearchStatus, 300, 30)

async function combineSearchItem(argList) {
  // argList: [[name1], [name2]]

  // FIXME: use elasticsearch api to query items
  const url = buildItemSearchUrl(argList.map(x => x[0]))
  const json = await (await fetch(url)).json()

  if (!json.Results) {
    console.warn('failed to search items', json)
    return []
  }

  const resultByName = {}
  for (const result of json.Results) {
    resultByName[result.Name] = result
  }

  return argList.map(args => resultByName[args[0]])
}

function buildItemSearchUrl(names) {
  const namesStr = encodeURIComponent(names.join('|'))
  return `https://cafemaker.wakingsands.com/search?indexes=Item&string_algo=query_string&string_column=Name_chs&columns=Name,ID,Icon&string=${namesStr}`
}

// args: [[name, id, jobId], ...]
async function combineSearchAction(argList) {
  const body = buildActionSearchBody(argList)

  const resp = await fetch('https://cafemaker.wakingsands.com/search', {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await resp.json()

  if (!json.Results) {
    return []
  }

  const resultById = {}

  const result = []

  for (const result of json.Results) {
    resultById[result.ID] = result
  }

  for (const args of argList) {
    const [name, id, jobId] = args
    if (id) {
      result.push(resultById[id])
    } else {
      result.push(
        json.Results.find(
          x => x.Name === name && (jobId ? x.ClassJobTargetID === jobId : true)
        )
      )
    }
  }

  return result
}

function buildActionSearchTerm([name, id, jobId]) {
  if (id) {
    return {
      term: {
        ID: id
      }
    }
  }
  if (name) {
    return {
      bool: {
        must: [
          { match_phrase: { Name_chs: name } },
          { term: { IsPlayerAction: 1 } },
          { term: { IsPvP: 0 } },
          ...(jobId ? [{ term: { ClassJobTargetID: jobId } }] : [])
        ]
      }
    }
  }
  return {}
}

function buildActionSearchBody(argList) {
  return {
    indexes: 'action',
    columns: 'ID,Name,Icon',
    body: {
      query: {
        bool: {
          should: [argList.map(buildActionSearchTerm)]
        }
      },
      from: 0,
      size: 100
    }
  }
}

// args: [[id], ...]
async function combineSearchStatus(argList) {
  const ids = argList.map(x => x[0]).join(',')
  const url = `https://cafemaker.wakingsands.com/Status?ids=${ids}&columns=ID,IconID,Name,MaxStacks,CanDispel,Description`
  const json = await (await fetch(url)).json()

  if (!json.Results) {
    return []
  }

  const resultsById = {}
  for (const result of json.Results) {
    resultsById[result.ID] = result
  }

  return argList.map(([id]) => resultsById[id])
}
