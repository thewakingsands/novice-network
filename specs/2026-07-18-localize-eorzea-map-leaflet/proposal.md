# 原始需求

艾欧泽亚交互地图和 leaflet 都本地化，不要再引入外部资源了，可以从 npm 里引入

## 已确认范围

- 通过 pnpm 安装并由项目构建流程输出 Leaflet 与艾欧泽亚交互地图的 JavaScript/CSS，删除 `code.bdstatic.com` 上对应的 CDN 资源引用。
- 地图在使用时继续从现有 `map-cdn.wakingsands.com` 与 `cafemaker.wakingsands.com` 加载瓦片、区域数据和图标；本需求不包含地图数据自托管。
