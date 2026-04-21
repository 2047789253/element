<script setup lang="ts">
import { h } from 'vue'
import Button from '@/components/Button/Button.vue'
import { createMessage } from '@/components/Message'

const show = (type: 'success' | 'warning' | 'info' | 'danger') => {
  createMessage({
    message: `这是 ${type} 类型消息`,
    type,
    showClose: true,
  })
}

const showVNode = () => {
  createMessage({
    type: 'info',
    showClose: true,
    message: h('span', null, ['支持 ', h('strong', null, 'VNode'), ' 作为消息内容']),
  })
}

const showManualDestroy = () => {
  const instance = createMessage({
    type: 'warning',
    duration: 0,
    showClose: true,
    message: '这条消息 2 秒后手动销毁',
  })

  window.setTimeout(() => {
    instance.destroy()
  }, 2000)
}
</script>

<template>
  <div class="message-demo">
    <div class="message-demo__row">
      <Button type="success" @click="show('success')">Success</Button>
      <Button type="warning" @click="show('warning')">Warning</Button>
      <Button type="info" @click="show('info')">Info</Button>
      <Button type="danger" @click="show('danger')">Danger</Button>
    </div>

    <div class="message-demo__row">
      <Button plain @click="showVNode">VNode 消息</Button>
      <Button plain @click="showManualDestroy">手动销毁</Button>
    </div>

    <p class="message-demo__tip">
      提示：Message 通过 createMessage() 函数调用，不需要手动在模板中挂载组件。
    </p>
  </div>
</template>

<style scoped>
.message-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.message-demo__tip {
  margin: 0;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}
</style>
