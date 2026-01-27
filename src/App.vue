<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import { ref, onMounted } from 'vue'
import type { ButtonInstance } from './components/Button/types'
const buttonRef = ref<ButtonInstance | null>(null)
const opendValue = ref(['a'])
onMounted(() => {
  if (buttonRef.value) console.log(buttonRef.value.sonref)
})
</script>

<template>
  <Button type="primary" disabled plain ref="buttonRef">Click Me</Button>
  <Collapse v-model="opendValue" accordion>
    <Item name="a">
      <template #title><h1>nice title</h1></template>
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
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
