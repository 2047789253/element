import DefaultTheme from 'vitepress/theme'
import { computed, provide, watchEffect } from 'vue'
import { inBrowser, useData } from 'vitepress'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import ElementAI, { setTheme } from '../../../src'
import { themeContextKey, type ThemeMode } from '../../../src/hooks/useTheme'

import '@vitepress-demo-preview/component/dist/style.css'
import '../../../src/styles/index.scss'
import './custom.css'

library.add(fas)

export default {
  ...DefaultTheme,
  setup() {
    const { isDark } = useData()
    const theme = computed<ThemeMode>(() => (isDark.value ? 'dark' : 'light'))

    provide(themeContextKey, theme)

    if (inBrowser) {
      watchEffect(() => {
        setTheme(theme.value)
      })
    }
  },
  enhanceApp({ app }: { app: any }) {
    app.use(ElementAI)
    app.component('demo-preview', ElementPlusContainer)
  },
}
