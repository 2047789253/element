<script setup lang="ts">
import Bubble from '@/components/Bubble/index.vue'
</script>

<template>
  <Bubble footer="通过具名插槽扩展头像、操作区与内容区">
    <template #avatar>
      <div class="avatar">AI</div>
    </template>

    <template #header>Copilot 助手</template>

    <template #default>
      <div>
        <p>默认插槽可放任意 Vue 内容：</p>
        <ul>
          <li>文本</li>
          <li>列表</li>
          <li>按钮</li>
        </ul>
      </div>
    </template>

    <template #actions>
      <button type="button">复制</button>
      <button type="button">重试</button>
    </template>
  </Bubble>

  <Bubble header="流式输出" :loading="true" />
</template>

<style scoped>
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--el-ai-color-primary);
  color: var(--el-ai-color-white);
  font-size: 12px;
  font-weight: 700;
}
</style>
