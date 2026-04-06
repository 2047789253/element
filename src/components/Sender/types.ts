import type { ExtractPropTypes } from 'vue'
import { senderProps, type SenderEmitsType, type SenderSlotsType } from './props'

export type SenderProps = ExtractPropTypes<typeof senderProps>

export type SenderEmits = SenderEmitsType

export type SenderInstance = object

export type SenderSlots = SenderSlotsType
