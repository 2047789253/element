import './styles/index.scss'
import type { App } from 'vue'
import Button from './components/Button/Button.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Message, { createMessage } from './components/Message'
import { ElAConversations } from './components/Conversations'
import { ElABubble } from './components/Bubble'
import { ElASender } from './components/Sender'

const components = {
  Button,
  Tooltip,
  Dropdown,
  Message,
  ElAConversations,
  ElABubble,
  ElASender,
}

const install = (app: App) => {
  Object.values(components).forEach((comp) => {
    const component = comp as { name?: string; install?: (app: App) => void }
    app.component(component.name || 'Component', comp)
  })
}

export {
  install,
  Button,
  Tooltip,
  Dropdown,
  Message,
  createMessage,
  ElAConversations,
  ElABubble,
  ElASender,
}

export default {
  install,
}
