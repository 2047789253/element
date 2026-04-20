import type { ExtractPropTypes } from 'vue'
import { senderProps, type SenderEmitsType, type SenderSlotsType } from './props'

export type SenderProps = ExtractPropTypes<typeof senderProps> & { modelValue: string }

export type SenderEmits = SenderEmitsType

export interface SenderEditorLike {
  getText: () => string
}

export interface SenderInstance {
  focus: () => void
  blur: () => void
  clear: () => void
  editor: () => SenderEditorLike
}

export type SenderSlots = SenderSlotsType
