const fs = require('fs')
const clustering = require('density-clustering')

function process(islandName) {
  const uselessObject = [
    '迦楼罗之灵',
    '泰坦之灵',
    '伊弗利特之灵',
    '朝日小仙女',
    '夕月小仙女',
    '炽天使',
    '黄宝石兽',
    '绿宝石兽',
    '红宝石兽',
    '月长宝石兽',
    '车式浮空炮塔',
    '象式浮空炮塔',
    '后式自走人偶',
    '地星',
    '分身',
    '英雄的掠影',
    '亚灵神巴哈姆特',
    '亚灵神不死鸟',
    '迦楼罗',
    '泰坦',
    '伊弗利特'
  ]

  const islandOffsetYMap = {
    Anemos: 0,
    Hydatos: 475,
    Pagos: 0,
    Pyros: 0
  }
  const islandRadiusMap = {
    Anemos: 16,
    Hydatos: 24,
    Pagos: 20,
    Pyros: 24
  }
  const outputDir = `output/${islandName}`
  if (!fs.existsSync('output')) fs.mkdirSync('output')
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

  const logFile = `logs/${islandName}.log`
  const logs = fs
    .readFileSync(logFile)
    .toString()
    .split('\n')
    .map(line => line.split('|'))

  const npcs = {}

  for (const log of logs) {
    const [
      eventId,
      ,
      ,
      name,
      ,
      level,
      ,
      worldId,
      ,
      bNpcNameId,
      bNpcBaseId,
      ,
      maxHp,
      ,
      ,
      ,
      ,
      posX,
      posY,
      posZ
    ] = log
    if (eventId !== '03') continue
    if (worldId !== '0') continue
    if (bNpcNameId === '0') continue
    if (uselessObject.indexOf(name) > -1) continue
    if (!name) continue

    npcs[bNpcBaseId] = npcs[bNpcBaseId] || []
    npcs[bNpcBaseId].push({
      name,
      level: parseInt(level),
      bNpcNameId,
      bNpcBaseId,
      maxHp: parseInt(maxHp),
      posX: parseFloat(posX),
      posY: parseFloat(posY),
      posZ: parseFloat(posZ)
    })
  }

  let clusteredNpc = []

  for (const bNpcBaseId in npcs) {
    const npcList = npcs[bNpcBaseId]

    const npcPoints = npcList.map(n => [n.posX, n.posY])

    const dbscan = new clustering.DBSCAN()
    const clusters = dbscan
      .run(npcPoints, islandRadiusMap[islandName])
      .filter(x => x.length > 2)
    if (clusters.length < 1) {
      clusters[0] = [0]
    }

    const posAvg = clusters.map(points =>
      points.reduce(
        (prev, current, i) =>
          [0, 1].map(j => (prev[j] * i + npcPoints[current][j]) / (i + 1)),
        [0, 0]
      )
    )
    const radius = clusters
      .map((points, i) =>
        points
          .map(j => npcPoints[j])
          .map(j => [0, 1].map(k => posAvg[i][k] - j[k]).map(Math.abs))
      )
      .map(maxPoint)

    clusteredNpc.push(
      ...posAvg.map(([x, y], i) => ({
        id: bNpcBaseId,
        x: levelToMap(x, 100, 0),
        y: levelToMap(y, 100, islandOffsetYMap[islandName]), // 丰水=475，其他=0
        r: parseFloat(Math.max(radius[i][0], radius[i][1]).toFixed(2))
      }))
    )
  }

  clusteredNpc.sort((b, a) => a.r - b.r)
  const posCode = []
  for (const n of clusteredNpc) {
    posCode.push('  ' + stringifyObj(n))
  }
  fs.writeFileSync(outputDir + '/pos.json', '[\n' + posCode.join(',\n') + '\n]')

  let metaObj = {}
  if (fs.existsSync(outputDir + '/meta.json')) {
    try {
      metaObj = JSON.parse(fs.readFileSync(outputDir + '/meta.json').toString())
    } catch (e) {
      metaObj = {}
    }
  }
  for (const id in npcs) {
    const name = npcs[id][0].name
    metaObj[id] = metaObj[id] || {}
    if (!metaObj[id].type) {
      if (npcs[id][0].name.match(/元灵$/)) {
        metaObj[id].type = 'elm'
      } else {
        const r = clusteredNpc.filter(x => x.id === id).map(x => x.r)
        if (r.length === 1 && r[0] === 0) {
          metaObj[id].type = 'nm'
        } else {
          metaObj[id].type = 'mob'
        }
      }
    }
    metaObj[id].name = name
    if (!metaObj[id].elemental) {
      if (name.match(/风/)) {
        metaObj[id].elemental = 'wind'
      } else if (name.match(/火/)) {
        metaObj[id].elemental = 'fire'
      } else if (name.match(/水/)) {
        metaObj[id].elemental = 'water'
      } else if (name.match(/雷/)) {
        metaObj[id].elemental = 'lightning'
      } else if (name.match(/土/)) {
        metaObj[id].elemental = 'earth'
      } else if (name.match(/水/)) {
        metaObj[id].elemental = 'water'
      } else if (name.match(/冰/)) {
        metaObj[id].elemental = 'ice'
      } else {
        metaObj[id].elemental = 'none'
      }
    }
    metaObj[id].level = metaObj[id].level || 1
    metaObj[id].condition = metaObj[id].condition || 'all'
    metaObj[id].isAshkin = metaObj[id].isAshkin || !!name.match(/尸|亡/)
    metaObj[id].isElements = metaObj[id].isElements || !!name.match(/元精/)
    metaObj[id].mutation = metaObj[id].mutation || ''
    metaObj[id].adaptation = metaObj[id].adaptation || ''
    metaObj[id].triggers = metaObj[id].triggers || ''
    metaObj[id].triggerBy = metaObj[id].triggerBy || ''
  }
  const metaJson = []
  for (const id in metaObj) {
    metaJson.push(`  "${id}": ${stringifyObj(metaObj[id])}`)
  }
  fs.writeFileSync(
    outputDir + '/meta.json',
    '{\n' + metaJson.join(',\n') + '\n}'
  )

  function maxPoint(points) {
    return [0, 1].map(i => points.map(p => p[i])).map(x => Math.max(...x))
  }

  function toMapCoordinate3D(value, sizeFactor, offset) {
    const c = sizeFactor / 100
    const offsetValue = (value + offset) * c
    return (41 / c) * ((offsetValue + 1024) / 2048) + 1
  }

  function levelToMap(x, sizeFactor, offset) {
    return parseFloat(toMapCoordinate3D(x, sizeFactor, offset).toFixed(2))
  }

  function stringifyObj(obj) {
    const data = []
    for (const [key, value] of Object.entries(obj)) {
      data.push(`${JSON.stringify(key)}: ${JSON.stringify(value) || ''}`)
    }
    return '{ ' + data.join(', ') + ' }'
  }
}

process('Anemos')
process('Hydatos')
process('Pagos')
process('Pyros')
