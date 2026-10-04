// 复刻原 theme/utils/mapLoader.js（去 jQuery）：艾欧泽亚交互地图浮窗。
// 点击 .eorzea-map-trigger（见 Pos 组件）打开地图并标记坐标；桌面端可拖拽、缩放，
// 位置与尺寸记忆在 localStorage；窄屏固定为下方 80% 高度的半屏窗口。
import mapScriptUrl from '@thewakingsands/eorzea-interactive-map/dist/map.js?url'
import { formatIconUrl } from '@thewakingsands/xivapi-v2'

interface MapInstance {
  mapInfo: unknown
  markers: Marker[]
  loadMapKey(key: number): Promise<unknown>
  mapToLatLng2D(x: number, y: number): unknown
  setView(latLng: unknown, zoom: number): void
  invalidateSize(): void
}

interface Marker {
  addTo(map: MapInstance): void
}

interface RegionMap {
  key: number
  name: string
  subName?: string
}

interface EorzeaMap {
  loader: {
    NULL_ICON_GROUP: string
    setUrlFunction(
      name: 'getIconUrl',
      fn: (icon: string, id: string, group: string) => string | null
    ): void
  }
  getRegion(): Promise<{ maps: RegionMap[] }[]>
  create(element: HTMLElement): Promise<MapInstance>
  simpleMarker(x: number, y: number, url: string, mapInfo: unknown): Marker
}

declare global {
  interface Window {
    YZWF?: { eorzeaMap?: EorzeaMap }
  }
}

interface MapContext {
  eorzea: EorzeaMap
  map: MapInstance
  container: HTMLElement
  /** 地图名（及「地图名,子区域名」）→ 地图 key */
  regions: Map<string, number>
}

interface MapRequest {
  key?: number
  name: string
  coords: [number, number][]
  pan: boolean
}

const MARKER_URL = formatIconUrl('/i/060000/060561.png')
const POS_STORAGE_KEY = 'YZWFEorzeaMapPos'
const SIZE_STORAGE_KEY = 'YZWFEorzeaMapSize'

let context: MapContext | null = null
let preparing: Promise<MapContext> | null = null
let loadFailed = false
let loading: HTMLElement | null = null
// 加载期间只保留最近一次点击；关闭加载提示即取消
let pendingRequest: MapRequest | null = null

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => {
      script.remove()
      reject(new Error('无法加载地图脚本'))
    }
    document.head.appendChild(script)
  })
}

function readPair(key: string): [number, number] | null {
  try {
    const pair = (localStorage.getItem(key) || '').split(',').map(Number)
    return pair.length === 2 && pair.every(Number.isFinite)
      ? [pair[0], pair[1]]
      : null
  } catch {
    return null
  }
}

function writePair(key: string, a: number, b: number): void {
  try {
    localStorage.setItem(key, `${a},${b}`)
  } catch {}
}

async function loadRegions(eorzea: EorzeaMap): Promise<Map<string, number>> {
  const regions = new Map<string, number>()
  for (const region of await eorzea.getRegion()) {
    for (const meta of region.maps) {
      if (!regions.has(meta.name)) regions.set(meta.name, meta.key)
      const key = meta.subName ? `${meta.name},${meta.subName}` : meta.name
      if (!regions.has(key)) regions.set(key, meta.key)
    }
  }
  return regions
}

function createContainer(): HTMLElement {
  const container = document.createElement('section')
  container.className = 'erozea-map-outer'
  container.innerHTML = [
    '<div class="eorzea-map-glass"></div>',
    '<div class="eorzea-map-move-handler"></div>',
    '<div class="eorzea-map-close-button">关闭</div>',
    '<div class="eorzea-map-inner"></div>',
    '<div class="eorzea-map-resize-handler"></div>',
  ].join('')
  if (window.innerWidth < 500) {
    // 判定为手机：半屏显示，并禁用拖拽与缩放
    Object.assign(container.style, {
      top: '20%',
      left: '0',
      width: '100%',
      height: '80%',
    })
    container.classList.add('eorzea-map-fixed-window')
  } else {
    const pos = readPair(POS_STORAGE_KEY)
    if (pos) {
      container.style.top = `${pos[0]}px`
      container.style.left = `${pos[1]}px`
    }
    const size = readPair(SIZE_STORAGE_KEY)
    if (size) {
      container.style.width = `${size[0]}px`
      container.style.height = `${size[1]}px`
    }
  }
  return container
}

interface DragCallbacks {
  down(): void
  move(diffX: number, diffY: number): void
  up(diffX: number, diffY: number): void
}

function drag(handler: HTMLElement, callbacks: DragCallbacks): void {
  let startX = 0
  let startY = 0
  handler.addEventListener('pointerdown', (event) => {
    event.preventDefault()
    handler.setPointerCapture(event.pointerId)
    startX = event.clientX
    startY = event.clientY
    callbacks.down()
  })
  handler.addEventListener('pointermove', (event) => {
    if (!handler.hasPointerCapture(event.pointerId)) return
    callbacks.move(event.clientX - startX, event.clientY - startY)
  })
  const finish = (event: PointerEvent) => {
    if (!handler.hasPointerCapture(event.pointerId)) return
    handler.releasePointerCapture(event.pointerId)
    callbacks.up(event.clientX - startX, event.clientY - startY)
  }
  handler.addEventListener('pointerup', finish)
  handler.addEventListener('pointercancel', finish)
}

function enableMove(container: HTMLElement): void {
  const handler = container.querySelector<HTMLElement>(
    '.eorzea-map-move-handler'
  )
  if (!handler) return
  drag(handler, {
    down() {},
    move(diffX, diffY) {
      container.style.transform = `translate3d(${diffX}px, ${diffY}px, 0)`
    },
    up() {
      const rect = container.getBoundingClientRect()
      container.style.top = `${rect.top}px`
      container.style.left = `${rect.left}px`
      container.style.transform = 'none'
      writePair(POS_STORAGE_KEY, rect.top, rect.left)
    },
  })
}

function enableResize(container: HTMLElement, map: MapInstance): void {
  const handler = container.querySelector<HTMLElement>(
    '.eorzea-map-resize-handler'
  )
  if (!handler) return
  let width = 0
  let height = 0
  drag(handler, {
    down() {
      width = container.offsetWidth
      height = container.offsetHeight
    },
    move(diffX, diffY) {
      container.style.width = `${width + diffX}px`
      container.style.height = `${height + diffY}px`
    },
    up(diffX, diffY) {
      map.invalidateSize()
      writePair(SIZE_STORAGE_KEY, width + diffX, height + diffY)
    },
  })
}

async function createMap(): Promise<MapContext> {
  if (!window.YZWF?.eorzeaMap?.create) await loadScript(mapScriptUrl)
  const eorzea = window.YZWF?.eorzeaMap
  if (!eorzea?.create) throw new Error('地图脚本未正确初始化')
  eorzea.loader.setUrlFunction('getIconUrl', (_icon, id, group) =>
    id === eorzea.loader.NULL_ICON_GROUP
      ? null
      : formatIconUrl(`/i/${group}/${id}.png`)
  )

  const container = createContainer()
  const inner = container.querySelector<HTMLElement>('.eorzea-map-inner')
  if (!inner) throw new Error('地图容器创建失败')
  container
    .querySelector('.eorzea-map-close-button')
    ?.addEventListener('click', () => {
      container.style.display = 'none'
    })
  document.body.appendChild(container)

  try {
    const [regions, map] = await Promise.all([
      loadRegions(eorzea),
      eorzea.create(inner),
    ])
    if (!container.classList.contains('eorzea-map-fixed-window')) {
      enableMove(container)
      enableResize(container, map)
    }
    container.style.display = 'none'
    container.style.visibility = 'visible'
    return { eorzea, map, container, regions }
  } catch (error) {
    container.remove()
    throw error
  }
}

function prepare(): Promise<MapContext> {
  preparing ??= createMap().then(
    (ctx) => {
      context = ctx
      loadFailed = false
      return ctx
    },
    (error) => {
      preparing = null
      loadFailed = true
      throw error
    }
  )
  return preparing
}

function addFlag(ctx: MapContext, x: number, y: number, pan: boolean): void {
  const { eorzea, map } = ctx
  const marker = eorzea.simpleMarker(x, y, MARKER_URL, map.mapInfo)
  marker.addTo(map)
  map.markers.push(marker) // 保证地图切换时清空标记
  if (pan) {
    setTimeout(() => map.setView(map.mapToLatLng2D(x, y), -1), 0)
  }
}

function showMap(ctx: MapContext, request: MapRequest): void {
  const key = request.key || ctx.regions.get(request.name)
  if (!key) {
    alert(`没有找到地图: ${request.name}，请检查拼写或地图名字`)
    return
  }
  ctx.container.style.display = 'block'
  ctx.map
    .loadMapKey(key)
    .then(() => {
      for (const [x, y] of request.coords) addFlag(ctx, x, y, request.pan)
    })
    .catch(console.error)
}

function closeLoading(): void {
  loading?.remove()
  pendingRequest = null
}

function showLoading(label: string): void {
  if (!loading) {
    loading = document.createElement('div')
    loading.className = 'eorzea-map-loading'
    loading.innerHTML =
      '<div class="ff14-loading"></div><div class="eorzea-map-loading-text"></div>'
    loading.addEventListener('click', closeLoading)
  }
  const text = loading.querySelector('.eorzea-map-loading-text')
  if (text) text.textContent = `正在加载 ${label} 的地图…`
  document.body.appendChild(loading)
}

function openMap(request: MapRequest, label: string): void {
  if (context) {
    showMap(context, request)
    return
  }
  if (loadFailed && !confirm('地图加载失败，是否重试？')) return
  showLoading(label)
  pendingRequest = request
  prepare().then(
    (ctx) => {
      if (pendingRequest !== request) return
      closeLoading()
      showMap(ctx, request)
    },
    (error: Error) => {
      if (pendingRequest !== request) return
      closeLoading()
      alert(`地图加载失败，原因：${error.message}`)
    }
  )
}

function readCoords(trigger: HTMLElement): [number, number] | null {
  const x = Number(trigger.dataset.mapX)
  const y = Number(trigger.dataset.mapY)
  return x && y ? [x, y] : null
}

function onTriggerClick(trigger: HTMLElement): void {
  const coords = readCoords(trigger)
  openMap(
    {
      key: Number(trigger.dataset.mapId) || undefined,
      name: trigger.dataset.mapName || '',
      coords: coords ? [coords] : [],
      pan: true,
    },
    trigger.textContent || ''
  )
}

function onGroupShowAllClick(button: HTMLElement): void {
  const group = button.closest('.eorzea-map-group')
  if (!group) {
    alert('没有找到坐标组；或许是模板使用不正确？')
    return
  }
  const triggers = group.querySelectorAll<HTMLElement>('.eorzea-map-trigger')
  const coords: [number, number][] = []
  let name = ''
  for (const trigger of triggers) {
    name = trigger.dataset.mapName || name
    const pair = readCoords(trigger)
    if (pair) coords.push(pair)
  }
  openMap({ name, coords, pan: false }, name)
}

document.addEventListener('click', (event) => {
  const target = event.target as Element | null
  const trigger = target?.closest<HTMLElement>('.eorzea-map-trigger')
  if (trigger) {
    onTriggerClick(trigger)
    return
  }
  const showAll = target?.closest<HTMLElement>('.eorzea-map-group-show-all')
  if (showAll) onGroupShowAllClick(showAll)
})

// 与原实现一致：页面加载后即预先创建地图，点击时无需等待
prepare().catch((error) => console.warn('[map] 地图预加载失败', error))
