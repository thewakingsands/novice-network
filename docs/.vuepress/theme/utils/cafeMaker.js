import 'isomorphic-fetch'
import { createDebounce } from './combine'

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
// need: { IconID,Name,MaxStacks,CanDispel,Description } , args: id
export const searchStatus = createDebounce(
  combineSearchStatus,
  filterSearchById,
  300,
  30
)

// argList: [[name1], [name2]]
function combineSearchItem(argList) {
  const body = buildItemSearchBody(argList.map(x => x[0]))

  return fireSearch(body)
}

function filterSearchByName(results, name) {
  return results.find(r => r.Name === name)
}

function buildItemSearchBody(names) {
  return {
    indexes: 'item',
    columns: 'ID,Name,Icon',
    body: {
      query: {
        bool: {
          should: [names.map(name => ({ match_phrase: { Name_chs: name } }))]
        }
      },
      from: 0,
      size: 100
    }
  }
}

// args: [[name, id, jobId], ...]
function combineSearchAction(argList) {
  const body = buildActionSearchBody(argList)
  return fireSearch(body)
}

async function fireSearch(body) {
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

  return json.Results
}

function filterSearchAction(results, name, id, jobId) {
  if (id) {
    return results.find(r => r.ID === id)
  } else {
    return results.find(
      x => x.Name === name && (jobId ? x.ClassJobTargetID === jobId : true)
    )
  }
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
          {
            bool: {
              should: [
                {
                  range: {
                    ClassJobLevel: {
                      gt: 0
                    }
                  }
                },
                { term: { IsPlayerAction: 1 } }
              ]
            }
          },
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
    columns: 'ID,Name,Icon,ClassJobTargetID',
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

function filterSearchById(results, id) {
  return results.find(x => x.ID === id)
}
