import type { App } from 'vue'
import Tag from './Tag.vue'

Tag.install = (app: App) => {
  app.component(Tag.name || 'Tag', Tag)
}

export default Tag
export * from './types'
