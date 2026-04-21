<script setup lang="ts">
import { h, ref } from 'vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import type { MenuOption } from '@/components/Dropdown/types'

const selected = ref('未选择')
const selectedKeepOpen = ref('暂无')

const menuOptions: MenuOption[] = [
  { label: '新建会话', key: 'new' },
  { label: '重命名会话', key: 'rename' },
  { label: '删除会话（禁用）', key: 'delete', disabled: true },
  { label: '更多设置', key: 'settings', divided: true },
]

const keepOpenOptions: MenuOption[] = [
  {
    label: h('span', { style: 'color: var(--el-ai-color-danger); font-weight: 600;' }, '热点话题'),
    key: 'hot',
  },
  { label: '技术趋势', key: 'tech' },
  { label: '产品设计', key: 'product' },
]

const onSelect = (item: MenuOption) => {
  selected.value = `${String(item.key)} / ${typeof item.label === 'string' ? item.label : 'VNode 标签'}`
}

const onSelectKeepOpen = (item: MenuOption) => {
  selectedKeepOpen.value = String(item.key)
}
</script>

<template>
  <div class="dropdown-demo">
    <div class="dropdown-demo__row">
      <Dropdown
        :menu-options="menuOptions"
        trigger="click"
        placement="bottom-start"
        @select="onSelect"
      >
        <button class="dropdown-demo__btn" type="button">点击展开菜单</button>
      </Dropdown>

      <span class="dropdown-demo__text">当前选择：{{ selected }}</span>
    </div>

    <div class="dropdown-demo__row">
      <Dropdown
        :menu-options="keepOpenOptions"
        trigger="click"
        :hide-after-click="false"
        @select="onSelectKeepOpen"
      >
        <button class="dropdown-demo__btn" type="button">点击后不收起</button>
      </Dropdown>

      <span class="dropdown-demo__text">最近操作：{{ selectedKeepOpen }}</span>
    </div>
  </div>
</template>

<style scoped>
.dropdown-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dropdown-demo__row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.dropdown-demo__btn {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
}

.dropdown-demo__text {
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}
</style>
