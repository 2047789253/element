export interface SwitchProps {
  disabled?: boolean
  activeText?: string
  inactiveText?: string
  name?: string
  id?: string
  size?: 'small' | 'large'
}

export interface SwitchEmits {
  (e: 'change', value: boolean): void
}
