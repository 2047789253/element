import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
import './styles/index.scss'

const app = createApp(App)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
