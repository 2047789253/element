import './styles/index.scss'
import type { App } from 'vue'
import Button from './components/Button/Button.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Message, { createMessage } from './components/Message'
import Switch from './components/Switch/Switch.vue'
import Tag from './components/Tag/Tag.vue'

const components = {
  Button,
  Tooltip,
  Dropdown,
  Message,
  Switch,
  Tag,
}

const install = (app: App) => {
  Object.values(components).forEach((comp) => {
    const component = comp as { name?: string; install?: (app: App) => void }
    app.component(component.name || 'Component', comp)
  })
}

export { install, Button, Tooltip, Dropdown, Message, createMessage, Switch, Tag }

export default {
  install,
}
