<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
// import type { Options } from '@popperjs/core'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
// import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './Dropdown/Dropdown.vue'
// import Message from './components/Message/Message.vue'
import { createMessage } from './components/Message/method'
import type { ButtonInstance } from './components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './Dropdown/types'
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const opendValue = ref(['a'])
const trigger = ref<any>('hover')
const Options: MenuOption[] = [
  { key: '1', label: h('b', 'this is bold') },
  { key: '2', label: 'Option 2', disabled: true },
  { key: '3', label: 'Option 3', divided: true },
  { key: '4', label: 'Option 4' },
]
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
onMounted(() => {
  createMessage({ message: 'hello world', duration: 0 })
  createMessage({ message: '1111', duration: 0 })
  createMessage({ message: '22222', duration: 0 })
  if (buttonRef.value) console.log(buttonRef.value.sonref)
  setTimeout(() => {
    opendValue.value = ['b']
    trigger.value = 'hover'
  }, 3000)
})
</script>

<template>
  <!-- <Message message="hello" :duration="0" show-close></Message> -->
  <header>
    <Dropdown
      :menuOptions="Options"
      placement="bottom"
      :trigger="trigger"
      :open-delay="1000"
      :close-delay="1000"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="100" height="100" />
    </Dropdown>
  </header>
  <Icon icon="arrow-up" size="2xl" spin type="primary" color="#0e7a0d" />
  <main>
    <Button ref="buttonRef" @click="open">Open Tooltip</Button>
    <Button @click="close">Close Tooltip</Button>
    <br />
    <br />
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br /><br />
    <Button size="large" loading>Loading</Button>
    <Button size="large" icon="arrow-up">Icon</Button><br /><br />

    <Collapse v-model="opendValue" accordion>
      <Item name="a">
        <template #title><h1>nice title a</h1></template>
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </Item>
      <Item name="b" title="Title for item b">
        <div>this is bbbbbbbb test</div>
      </Item>
      <Item name="c" title="nice c" disabled>
        <div>this is cccccc test</div>
      </Item>
    </Collapse>
    {{ opendValue }}
  </main>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  border: 1px solid green;
}
.vk-tooltip__popper {
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
