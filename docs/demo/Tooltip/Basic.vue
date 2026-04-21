<script setup lang="ts">
import { ref } from 'vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import type { TooltipInstance } from '@/components/Tooltip/types'

const logs = ref<string[]>([])
const manualRef = ref<TooltipInstance>()

const pushLog = (scene: string, visible: boolean) => {
  logs.value.unshift(`${scene}：${visible ? '展开' : '收起'}`)
  logs.value = logs.value.slice(0, 4)
}

const openManual = () => manualRef.value?.show()
const closeManual = () => manualRef.value?.hide()
</script>

<template>
  <div class="tooltip-demo">
    <div class="tooltip-demo__row">
      <Tooltip content="这是 hover 提示内容" @visible-change="(v) => pushLog('hover', v)">
        <button class="tooltip-demo__btn" type="button">Hover 触发</button>
      </Tooltip>

      <Tooltip
        trigger="click"
        content="这是 click 提示内容"
        @visible-change="(v) => pushLog('click', v)"
      >
        <button class="tooltip-demo__btn" type="button">Click 触发</button>
      </Tooltip>
    </div>

    <div class="tooltip-demo__row">
      <Tooltip
        ref="manualRef"
        manual
        placement="right"
        @visible-change="(v) => pushLog('manual', v)"
      >
        <button class="tooltip-demo__btn" type="button">手动模式目标</button>
        <template #content>
          <div>由外部按钮控制显隐</div>
        </template>
      </Tooltip>

      <div class="tooltip-demo__actions">
        <button class="tooltip-demo__btn" type="button" @click="openManual">打开</button>
        <button class="tooltip-demo__btn" type="button" @click="closeManual">关闭</button>
      </div>
    </div>

    <ul class="tooltip-demo__logs">
      <li v-for="(log, idx) in logs" :key="idx">{{ log }}</li>
      <li v-if="logs.length === 0" class="tooltip-demo__placeholder">交互后会显示状态变化日志</li>
    </ul>
  </div>
</template>

<style scoped>
.tooltip-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tooltip-demo__row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.tooltip-demo__actions {
  display: flex;
  gap: 8px;
}

.tooltip-demo__btn {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
}

.tooltip-demo__logs {
  margin: 0;
  padding: 8px 10px;
  list-style: none;
  border: 1px dashed var(--el-ai-border-color-light);
  border-radius: 8px;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}

.tooltip-demo__logs li + li {
  margin-top: 4px;
}

.tooltip-demo__placeholder {
  color: var(--el-ai-text-color-placeholder);
}
</style>
