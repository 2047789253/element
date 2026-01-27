import type { Ref, InjectionKey } from 'vue'
export type NameType = string | number

export interface CollapseItemProps {
  name: string | number
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

// Collapse 组件使用 defineModel，不再需要单独的 CollapseProps
// update:modelValue 由 defineModel 自动处理
// 其他 props 在组件内直接定义
// CollapseEmits 只需要 change 事件
export interface CollapseEmits {
  (e: 'change', value: NameType[]): void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
