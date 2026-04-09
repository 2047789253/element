import type { ExtractPropTypes, PropType } from 'vue'

/**
 * BubbleList 组件的消息项接口定义
 */
export interface MessageItem {
  /** 消息的唯一标识 */
  id: string | number
  /** 消息内容 (支持 Markdown 格式) */
  content: string
  /** 消息角色：用户发出 (end) 或 AI 回复 (start) */
  role?: 'user' | 'assistant'
  /** 是否正在执行打字机输出动画 */
  typing?: boolean
  /** 允许业务扩展其他自定义字段 */
  [key: string]: unknown
}

export const bubbleListProps = {
  /** 消息列表数据源 */
  data: {
    type: Array as PropType<MessageItem[]>,
    default: () => [],
  },
  /** 是否显示底部加载状态 (通常用于等待 AI 响应) */
  loading: {
    type: Boolean,
    default: false,
  },
}

export type BubbleListPropsType = Partial<ExtractPropTypes<typeof bubbleListProps>>
