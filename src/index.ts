import './styles/index.scss'
import type { App } from 'vue'
import Button from './components/Button/Button.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Message, { createMessage } from './components/Message'
import Switch from './components/Switch/Switch.vue'

const components = {
  Button,
  Tooltip,
  Dropdown,
  Message,
  Switch,
}

const install = (app: App) => {
  Object.values(components).forEach((component) => {
    app.component(component.name || 'Component', component)
  })
}

export { install, Button, Tooltip, Dropdown, Message, createMessage, Switch }

export default {
  install,
}
