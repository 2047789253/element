import { createApp } from 'vue'
import App2 from './App2.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
import './styles/index.scss'

const app = createApp(App2)
app.mount('#app')
