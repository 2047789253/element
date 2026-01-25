export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'medium' | 'large'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  disabled?: boolean
  circle?: boolean
  nativeType?: NativeType
  autoFocus?: boolean
}

export interface ButtonInstance {
  sonref: HTMLButtonElement
}
