import type { Ref } from 'vue'
export type NameType = string | number

export interface CollapseProps {
  name?: string | number
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  isItemDisabled: (name: NameType) => boolean
}
