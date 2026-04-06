import type { App } from 'vue'

export const withInstall = <T extends { name?: string | undefined }>(component: T) => {
  const comp = component as T & { install?: (app: App) => void; displayName?: string }
  comp.install = (app: App) => {
    const name = comp.name || comp.displayName
    if (name) {
      app.component(name, component)
    }
  }
  return comp as T & { install: (app: App) => void }
}
