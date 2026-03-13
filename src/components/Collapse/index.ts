import type { App } from "vue"
import Collapse from "./Collapse.vue"
import CollapseItem from "./CollapseItem.vue"
Collapse.install = (app: App) => {
  app.component(Collapse.name || "Collapse", Collapse)
}
CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name || "CollapseItem", CollapseItem)
}
export default Collapse
export { CollapseItem }
export * from "./types"
