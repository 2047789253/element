<template>
  <div :class="[ns.b(), ns.b(placement), ns.m(footerTrigger + '-footer')]">
    <div v-if="hasAvatar" :class="ns.e('avatar')">
      <slot name="avatar"></slot>
    </div>
    <div :class="ns.e('content-wrapper')">
      <div v-if="loading" :class="ns.e('loading')">
        <span :class="ns.em('loading', 'dot')"></span>
        <span :class="ns.em('loading', 'dot')"></span>
        <span :class="ns.em('loading', 'dot')"></span>
      </div>
      <template v-else>
        <div v-if="hasHeader" :class="ns.e('header')">
          <slot name="header"></slot>
        </div>
        <div :class="ns.e('content')">
          <div
            :class="[ns.em('content', 'text'), ns.em('content', variant), ns.em('content', shape)]"
          >
            <div
              v-if="isMarkdown"
              class="markdown-body"
              v-html="parsedMarkdown"
              @click="handleCodeCopy"
            ></div>
            <slot v-else :content="contentData">
              {{ contentData }}
            </slot>
          </div>
        </div>
        <div v-if="hasFooter" :class="ns.e('footer')">
          <slot name="footer"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNamespace, useTheme, useTyperwriter } from '../../hooks'
import { bubbleProps } from './props'
import { computed, watch, useSlots } from 'vue'
import MarkdownIt from 'markdown-it'
// 引入代码高亮库及其深色主题
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

defineOptions({ name: 'Bubble' })

const props = defineProps({ ...bubbleProps })
const ns = useNamespace('bubble')
const themeRef = computed(() => props.theme)
useTheme(themeRef)
const slots = useSlots()
const hasHeader = computed(() => !!slots.header)
const hasAvatar = computed(() => !!slots.avatar)
const hasFooter = computed(() => !!slots.footer)

const {
  content: typerwriterContent,
  setText,
  start,
  setConfig,
  done: overTyperwriter,
} = useTyperwriter()

// ==================== Markdown 与高亮核心逻辑 ====================

const md: MarkdownIt = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  // 配置 highlight.js
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
      } catch {
        // 捕获异常但不处理
      }
    }
    // 返回空字符串，markdown-it 会默认进行转义并渲染
    return ''
  },
})

// 拦截默认的 fence (代码块) 渲染规则，注入 Mac 风格头部和复制按钮
md.renderer.rules.fence = function (tokens: any[], idx: number, options: any): string {
  const token = tokens[idx]
  const code = token.content // 原始代码文本
  const lang = token.info ? token.info.trim() : 'text'

  const highlightedCode = options.highlight
    ? options.highlight(code, lang, '')
    : md.utils.escapeHtml(code)

  // 必须对 code 编码，防止 HTML 属性解析错误
  const encodedCode = encodeURIComponent(code)

  return `
    <div class="ela-code-block">
      <div class="ela-code-header">
        <span class="ela-code-lang">${lang}</span>
        <button class="ela-code-copy-btn" data-code="${encodedCode}">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span class="btn-text">复制</span>
        </button>
      </div>
      <pre><code class="hljs language-${lang}">${highlightedCode}</code></pre>
    </div>
  `
}

const contentData = computed(() => (props.typing ? typerwriterContent.value : props.content))

const parsedMarkdown = computed(() => {
  if (!props.isMarkdown || !contentData.value) return ''
  return md.render(contentData.value)
})

// ==================== 事件委托：处理复制点击 ====================
const handleCodeCopy = async (e: MouseEvent) => {
  // 寻找到点击的具体按钮元素
  const target = (e.target as HTMLElement).closest('.ela-code-copy-btn') as HTMLElement
  if (!target) return

  const encodedCode = target.getAttribute('data-code')
  if (encodedCode) {
    try {
      const codeToCopy = decodeURIComponent(encodedCode)
      await navigator.clipboard.writeText(codeToCopy)

      // 交互反馈：修改按钮文字
      const textSpan = target.querySelector('.btn-text')
      if (textSpan) {
        textSpan.innerHTML = '已复制!'
        target.style.color = '#67c23a' // 变绿
        setTimeout(() => {
          textSpan.innerHTML = '复制'
          target.style.color = '' // 还原
        }, 2000)
      }
    } catch (err) {
      console.error('复制失败', err)
    }
  }
}

watch(
  () => props.content,
  (newVal) => {
    if (props.typing) setText(newVal)
  },
  { immediate: true },
)
watch(
  () => props.typingOver,
  (newVal, oldVal) => {
    setConfig({ staticText: newVal ? '' : '' })
    if (oldVal === false && newVal === true) overTyperwriter()
  },
  { immediate: true },
)
watch(
  () => props.loading,
  () => {
    if (props.loading === false && props.typing) start()
  },
  { immediate: true },
)

defineExpose({ overTyperwriter })
</script>
