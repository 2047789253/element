import './styles/index.scss'
import type { App } from 'vue'
import Button from './components/Button/Button.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Message, { createMessage } from './components/Message'
import Switch from './components/Switch/Switch.vue'
import Bubble from './components/Bubble/index.vue'
import Sender from './components/Sender/index.vue'
import Conversations from './components/Conversations/index.vue'

const components = {
  Button,
  Tooltip,
  Dropdown,
  Message,
  Switch,
  Bubble,
  Sender,
  Conversations,
}

const install = (app: App) => {
  Object.values(components).forEach((comp) => {
    const component = comp as { name?: string; install?: (app: App) => void }
    app.component(component.name ?? 'FallbackName', comp)
  })
}

export {
  install,
  Button,
  Tooltip,
  Dropdown,
  Message,
  createMessage,
  Switch,
  Bubble,
  Sender,
  Conversations,
}

export default {
  install,
}
