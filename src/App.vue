<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Button from './components/Button/Button.vue'
// import Icon from './components/Icon/Icon.vue'
import Switch from './components/Switch/Switch.vue'
// import Tooltip from './components/Tooltip/Tooltip.vue'
// import Dropdown from './components/Dropdown/Dropdown.vue'
// import { createMessage } from './components/Message/method'
import type { MessageItem } from './components/BubbleList/props'
import Conversations from './components/Conversations/index.vue'
import BubbleList from './components/BubbleList/index.vue'
import Sender from './components/Sender/index.vue'
import type { SenderInstance } from './components/Sender/types'
import Markdown from './components/Markdown/index.vue'
import Bubble from './components/Bubble/index.vue'
import CodeHighlight from './components/CodeHighlight/index.vue'

// const switchValue = ref(false)
const inputText = ref('')
const bubbleListRef = ref<InstanceType<typeof BubbleList> | null>(null)
const uiTheme = ref<'light' | 'dark'>('light')
const bubblePlacement = ref<'start' | 'end'>('start')
const bubbleShape = ref<'round' | 'square'>('round')
const bubbleBgColor = ref('#ffffff')
const bubbleTextColor = ref('#111925')
const bubbleUseCustomColors = ref(false)
const bubbleLoading = ref(false)
const bubbleUseAvatarSlot = ref(true)
const bubbleUseHeaderSlot = ref(false)
const bubbleUseDefaultSlot = ref(false)
const bubbleUseFooterSlot = ref(false)
const bubbleUseActionsSlot = ref(true)
const bubbleAvatarUrl = ref('https://avatars.githubusercontent.com/u/9919?s=64&v=4')
const bubbleHeaderText = ref('Copilot 助手')
const bubbleFooterText = ref('通过 props 注入样式变量')
const codeExpanded = ref(true)
const bubbleBottomThreshold = ref(30)
const bubbleUseCustomBottomAction = ref(true)
const bubbleLastAction = ref('初始状态')
const bubbleMessageSeed = ref(100)
const senderDemoRef = ref<SenderInstance | null>(null)
const senderDemoValue = ref('')
const senderDemoVariant = ref<'default' | 'updown'>('default')
const senderDemoTagVariant = ref<'default' | 'updown'>('default')
const senderDemoDisabled = ref(false)
const senderDemoLoading = ref(false)
const senderDemoEnterBreak = ref(false)
const senderDemoBlockEnter = ref(false)
const senderDemoShowTag = ref(true)
const senderDemoTagValue = ref('DeepSeek-R1')
const senderDemoUsePrefix = ref(true)
const senderDemoUseCustomTagSlot = ref(true)
const senderDemoUseCustomSendSlot = ref(false)
const senderDemoMaxHeight = ref(140)
const senderDemoSendCount = ref(0)
const senderDemoEnterCount = ref(0)
const senderDemoFocusCount = ref(0)
const senderDemoBlurCount = ref(0)
const senderDemoPasteCount = ref(0)
const senderDemoPasteFiles = ref('无')
const senderDemoLastEditorText = ref('')
const senderDemoLogs = ref<string[]>(['Sender 实验区已初始化'])

const codeBasicContent = [
  'interface MessageItem {',
  '  id: string | number',
  "  role: 'user' | 'assistant'",
  '  content: string',
  '  typing?: boolean',
  '}',
].join('\n')

const codeLineNumbersContent = [
  'function getRandomInt(min: number, max: number): number {',
  '  const start = Math.ceil(min)',
  '  const end = Math.floor(max)',
  '  return Math.floor(Math.random() * (end - start + 1)) + start',
  '}',
  '',
  'export function pickOne<T>(list: T[]): T | undefined {',
  '  if (!list.length) return undefined',
  '  return list[getRandomInt(0, list.length - 1)]',
  '}',
].join('\n')

const codeSqlContent = [
  'SELECT id, name, status',
  'FROM users',
  "WHERE status = 'active'",
  'ORDER BY created_at DESC',
].join('\n')

const codeUnknownContent = [
  'const greet = (name) => `hello ${name}`',
  'console.log(greet("element-ai"))',
].join('\n')

const bubbleMarkdownContent = [
  '### Bubble 自定义内容',
  '',
  '- 通过 `placement` 控制左右布局',
  '- 通过 `shape` 控制圆润/方正风格',
  '- 通过 `background` 与 `textColor` 注入 CSS 变量',
  '',
  '```ts',
  "type BubbleShape = 'round' | 'square'",
  '```',
].join('\n')

const bubbleContentInput = ref(bubbleMarkdownContent)

const markdownDemoContent = [
  '# Markdown 新能力总览',
  '',
  '支持 **GFM 表格**、`行内代码`、引用块、代码高亮和 KaTeX 数学公式。',
  '',
  '## 1) 数学公式',
  '',
  '行内公式：$E=mc^2$',
  '',
  '$$',
  '\\int_0^1 x^2\\,dx = \\frac{1}{3}',
  '$$',
  '',
  '## 2) 表格',
  '',
  '| 能力 | 状态 | 说明 |',
  '| --- | --- | --- |',
  '| GFM | ✅ | 支持表格、删除线、任务列表 |',
  '| KaTeX | ✅ | 支持行内和块级公式 |',
  '| 代码拆分 | ✅ | 代码块可走自定义渲染插槽 |',
  '',
  '## 3) 代码块',
  '',
  '```ts',
  'interface MarkdownPart {',
  '  type: "html" | "code"',
  '  content: string',
  '  language?: string',
  '}',
  '```',
  '',
  '内联 HTML：<span style="color:#409eff">蓝色文本</span>（危险属性会被过滤）。',
  '',
  '> 右侧示例使用了 `#code` 插槽来自定义代码块外观。',
].join('\n')

const markdownCustomSlotContent = [
  '```javascript',
  'const greet = (name) => "hello " + name',
  'console.log(greet("element-ai"))',
  '```',
  '',
  '你可以在这里继续写业务文档，让代码块沿用统一的团队样式。',
].join('\n')

const demoUserPrompts = [
  '帮我总结一下这段内容。',
  '请给出一个更简洁的回答版本。',
  '把重点整理成 3 条 bullet。',
]

const demoAssistantReplies = [
  '这是模拟助手消息：当你滚动到顶部时会触发 load-more，并插入历史记录。',
  '这是模拟流式回复：先 typing=true，再自动变成 typing=false。',
  '这是滚动 API 演示：你可以点击按钮滚动到顶部、底部或第二条消息。',
]

// BubbleList 示例消息数据
const messages: Ref<MessageItem[]> = ref([
  {
    id: 1,
    content:
      '你好，请全面展示一下你支持的 Markdown 各种排版格式吧！比如代码块、表格和引用。你好，请全面展示一下你支持的 Markdown 各种排版格式吧！比如代码块、表格和引用。',
    role: 'user',
    typing: false,
  },
  {
    id: 2,
    content:
      '嗨！👋 \n\n没问题，让我为你全面展示我的 Markdown 渲染能力（同时展示一下流畅的打字机效果）：\n\n### 📝 基础排版\n支持**加粗**重点，*斜体*标注，~~删除线~~以及在文本中嵌入[超链接提取](https://github.com)。\n\n### ∑ 数学公式\n行内公式示例：$E=mc^2$。\n\n块级公式示例：\n$$\n\\int_0^1 x^2\\,dx = \\frac{1}{3}\n$$\n\n再来一个常见公式：\n$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$\n\n### 💻 代码高亮 (带复制功能)\n这是一个带有完整语法高亮的 Vue 代码块示例。注意看左侧 Mac 风格的红黄绿点和右下角的“复制”按钮：\n```vue\n<template>\n  <div class="bubble-demo">\{\{ message \}\}</div>\n</template>\n\n<script setup lang="ts">\nimport { ref } from "vue"\n\nconst message = ref("Hello, Element AI!")\n<\/script>\n```\n\n### 📊 复杂表格\n可以轻松渲染规范的数据表格：\n\n| 组件名 | 当前状态 | 核心特性描述 |\n|--------|------|------|\n| Bubble | ✅ 完成 | 聊天气泡，支持 Highlight.js + 打字机 |\n| BubbleList | ✅ 完成 | 消息列表，支持自动追踪滚动到底部 |\n| Sender | 🚧 进行中 | 高度定制的用户输入与发送组件 |\n\n### 💡 引用块与行内代码\n平时可以在文本中直接嵌入行内代码，比如 `console.log("Hello")`。\n> 这里是一段引用说明。\n> "优质的细节交互往往能决定整个 AI 对话产品的体验下限。"\n\n现在你可以随便输入一些问题再测试一下！',
    role: 'assistant',
    typing: true,
  },
  {
    id: 3,
    content: '太棒了！那么 TypeScript 接口在这个仓库里一般怎么定义的？',
    role: 'user',
    typing: false,
  },
  {
    id: 4,
    content:
      '这有一个 Typescript 的代码高亮例子，你可以测试下“代码复制”功能交互：\n\n```typescript\nexport interface MessageItem {\n  id: string | number;\n  content: string;\n  role: "user" | "assistant";\n  typing?: boolean;\n}\n\nexport type Placement = "start" | "end";\n```',
    role: 'assistant',
    typing: false,
  },
])

const handleSend = (content?: string) => {
  const nextContent = content ?? inputText.value
  if (!nextContent) return

  // 添加用户消息
  messages.value.push({
    id: messages.value.length + 1,
    content: nextContent,
    role: 'user',
    typing: false,
  })

  const userMessage = nextContent
  inputText.value = ''

  // 滚动到底部
  setTimeout(() => {
    bubbleListRef.value?.scrollToBottom()
  }, 0)

  // 模拟 AI 回复（延迟后出现）
  setTimeout(() => {
    messages.value.push({
      id: messages.value.length + 1,
      content: `已收到：「${userMessage}」\n\n这是一个演示回复。在实际应用中，这里可以接入真实的 LLM API 调用。`,
      role: 'assistant',
      typing: true,
    })

    // 再次滚动到底部
    setTimeout(() => {
      bubbleListRef.value?.scrollToBottom()
    }, 1000)

    // 1.5 秒后移除打字机效果
    const lastMsg = messages.value[messages.value.length - 1]
    if (lastMsg) {
      setTimeout(() => {
        const updatedMessage = messages.value.find((m: MessageItem) => m.id === lastMsg.id)
        if (updatedMessage) {
          updatedMessage.typing = false
        }
      }, 1500)
    }
  }, 800)
}

const pushDemoUserMessage = () => {
  const content =
    demoUserPrompts[bubbleMessageSeed.value % demoUserPrompts.length] ?? '请继续演示。'
  messages.value.push({
    id: bubbleMessageSeed.value++,
    content,
    role: 'user',
    typing: false,
  })
  bubbleLastAction.value = '追加一条用户消息'
  setTimeout(() => {
    bubbleListRef.value?.scrollToBottom('smooth')
  }, 0)
}

const pushDemoAssistantTypingMessage = () => {
  const id = bubbleMessageSeed.value++
  const content = demoAssistantReplies[id % demoAssistantReplies.length] ?? '这是默认助手演示消息。'
  messages.value.push({
    id,
    content,
    role: 'assistant',
    typing: true,
  })
  bubbleLastAction.value = '追加一条助手流式消息'
  setTimeout(() => {
    bubbleListRef.value?.scrollToBottom('smooth')
  }, 0)

  setTimeout(() => {
    const target = messages.value.find((item) => item.id === id)
    if (target) {
      target.typing = false
    }
  }, 1200)
}

const appendConversationRound = () => {
  const userContent =
    demoUserPrompts[bubbleMessageSeed.value % demoUserPrompts.length] ?? '请继续总结这段内容。'
  const assistantContent =
    demoAssistantReplies[bubbleMessageSeed.value % demoAssistantReplies.length] ??
    '这是新增的一轮示例对话。'

  messages.value.push({
    id: bubbleMessageSeed.value++,
    content: userContent,
    role: 'user',
    typing: false,
  })

  messages.value.push({
    id: bubbleMessageSeed.value++,
    content: assistantContent,
    role: 'assistant',
    typing: false,
  })

  bubbleLastAction.value = '新增一轮完整对话'
  setTimeout(() => {
    bubbleListRef.value?.scrollToBottom('smooth')
  }, 0)
}

const scrollBubbleListToTop = () => {
  bubbleListRef.value?.scrollToTop('smooth')
  bubbleLastAction.value = '手动调用 scrollToTop()'
}

const scrollBubbleListToBottom = () => {
  bubbleListRef.value?.scrollToBottom('smooth')
  bubbleLastAction.value = '手动调用 scrollToBottom()'
}

const scrollBubbleListToSecond = () => {
  bubbleListRef.value?.scrollToIndex(1, 'smooth')
  bubbleLastAction.value = '手动调用 scrollToIndex(1)'
}

const pushSenderDemoLog = (message: string) => {
  const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
  senderDemoLogs.value.unshift(`[${time}] ${message}`)
  senderDemoLogs.value = senderDemoLogs.value.slice(0, 8)
}

const handleSenderDemoSend = (content: string) => {
  senderDemoSendCount.value += 1
  pushSenderDemoLog(`触发 send，第 ${senderDemoSendCount.value} 次，内容长度 ${content.length}`)

  senderDemoLoading.value = true
  setTimeout(() => {
    senderDemoLoading.value = false
    pushSenderDemoLog('模拟响应完成，loading 关闭')
  }, 700)
}

const handleSenderDemoSendBySlot = () => {
  const content = senderDemoValue.value
  if (!content.trim() || senderDemoDisabled.value || senderDemoLoading.value) return

  handleSenderDemoSend(content)
  senderDemoValue.value = ''
}

const handleSenderDemoEnterPressed = () => {
  senderDemoEnterCount.value += 1
  pushSenderDemoLog(`触发 enterPressed，第 ${senderDemoEnterCount.value} 次`)
}

const handleSenderDemoKeydown = (event: KeyboardEvent) => {
  if (senderDemoBlockEnter.value && event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    pushSenderDemoLog('onHandleKeyDown 拦截了 Enter 发送')
  }
}

const handleSenderDemoPaste = () => {
  senderDemoPasteCount.value += 1
  pushSenderDemoLog(`触发 paste，第 ${senderDemoPasteCount.value} 次`)
}

const handleSenderDemoPasteFile = (files: File[]) => {
  senderDemoPasteFiles.value = files.map((file) => file.name).join(', ')
  pushSenderDemoLog(`触发 pasteFile，文件：${senderDemoPasteFiles.value}`)
}

const handleSenderDemoFocus = () => {
  senderDemoFocusCount.value += 1
}

const handleSenderDemoBlur = () => {
  senderDemoBlurCount.value += 1
}

const handleSenderDemoLoadingUpdate = (value: boolean) => {
  senderDemoLoading.value = value
  pushSenderDemoLog(`触发 update:loading -> ${value}`)
}

const readSenderDemoEditorText = () => {
  senderDemoLastEditorText.value = senderDemoRef.value?.editor()?.getText() ?? ''
  pushSenderDemoLog(`调用 editor().getText()，长度 ${senderDemoLastEditorText.value.length}`)
}

const clearSenderDemoByExpose = () => {
  senderDemoRef.value?.clear()
  pushSenderDemoLog('调用 clear() 清空输入')
}

const insertSenderDemoPrompt = () => {
  const line = '请把这段内容整理成 3 条结论。'
  senderDemoValue.value = senderDemoValue.value ? `${senderDemoValue.value}\n${line}` : line
  pushSenderDemoLog('通过 action-list 插槽插入了模板内容')
}

// const mockMenuOptions = [
//   { key: '1', label: 'Item 1', disabled: false },
//   { key: '2', label: 'Item 2', disabled: true },
//   { key: '3', label: 'Item 3', divided: true, disabled: false },
// ]
</script>

<template>
  <div class="app-shell" :data-el-ai-theme="uiTheme">
    <div class="container">
      <header>
        <h1>Element AI Vue 组件库</h1>
      </header>

      <main>
        <!-- 基础组件区 -->
        <!-- <section class="demo-section">
        <h2>基础 UI 组件</h2>

        <div class="demo-block">
          <h3>Button 按钮</h3>
          <Button>默认</Button>
          <Button plain type="primary">Primary</Button>
          <Button type="success">Success</Button>
          <Button type="warning" round>Warning</Button>
          <Button type="danger" disabled>Danger</Button>
          <Button icon="arrow-up" circle></Button>
        </div>

        <div class="demo-block">
          <h3>Switch 开关 & Icon 图标</h3>
          <Switch v-model="switchValue" active-text="开启" inactive-text="关闭" />
          <span class="gap"></span>
          <Icon icon="star" type="primary" size="lg" />
        </div>

        <div class="demo-block">
          <h3>Tooltip & Dropdown & Message</h3>
          <Tooltip content="这是一个提示文案" placement="top">
            <Button>悬浮查看 Tooltip</Button>
          </Tooltip>
          <div class="gap"></div>
          <Dropdown
            :menuOptions="mockMenuOptions"
            trigger="click"
            @select="(item: any) => createMessage({ message: '点击了: ' + item.key })"
          >
            <Button type="primary">点击下拉菜单</Button>
          </Dropdown>
          <div class="gap"></div>
          <Button @click="createMessage({ message: '这是一条普通消息', type: 'warning' })"
            >触发 Message</Button
          >
        </div>
      </section> -->

        <section class="demo-section">
          <h2>全局主题切换（Button + Markdown）</h2>
          <p class="subtitle">
            useNamespace 负责动态 BEM 类名，主题切换由 CSS 变量驱动。切换
            <code>data-el-ai-theme</code> 后，按钮会同步切换。
          </p>

          <div class="theme-switch-row">
            <Switch
              v-model="uiTheme"
              size="large"
              active-value="dark"
              inactive-value="light"
              active-text="Dark"
              inactive-text="Light"
            />
            <span class="theme-switch-current">当前主题：{{ uiTheme }}</span>
          </div>

          <div class="demo-block theme-button-preview">
            <Button>Default</Button>
            <Button type="primary">Primary</Button>
            <Button type="success">Success</Button>
            <Button type="warning">Warning</Button>
            <Button type="danger">Danger</Button>
            <Button plain type="primary">Plain</Button>
          </div>
        </section>

        <section class="demo-section markdown-showcase">
          <h2>Markdown 新能力演示</h2>
          <p class="subtitle">
            展示点：GFM 排版、KaTeX 公式、代码块分段渲染，以及通过 <code>#code</code> 插槽接管代码区
            UI。当前跟随全局主题：{{ uiTheme }}。
          </p>

          <div class="markdown-grid">
            <div class="markdown-panel">
              <h3>默认渲染（内置高亮）</h3>
              <Markdown :content="markdownDemoContent" :theme="uiTheme" />
            </div>

            <div class="markdown-panel">
              <h3>自定义代码块插槽</h3>
              <Markdown :content="markdownCustomSlotContent" :theme="uiTheme">
                <template #code="{ content, language }">
                  <div class="custom-code-block">
                    <div class="custom-code-title">自定义代码渲染 · {{ language || 'text' }}</div>
                    <pre><code>{{ content }}</code></pre>
                  </div>
                </template>
              </Markdown>
            </div>
          </div>
        </section>

        <section class="demo-section code-highlight-showcase">
          <h2>CodeHighlight 组件演示</h2>
          <p class="subtitle">
            展示点：语言全称映射、行号、自动换行、折叠控制、自定义头部插槽与自动识别语言。
          </p>

          <div class="code-highlight-grid">
            <div class="code-highlight-panel">
              <h3>基础高亮</h3>
              <CodeHighlight :content="codeBasicContent" language="typescript" />
            </div>

            <div class="code-highlight-panel">
              <h3>行号 + 自动换行 + 最大高度</h3>
              <CodeHighlight
                :content="codeLineNumbersContent"
                language="typescript"
                show-line-numbers
                wrap-lines
                :max-height="220"
              />
            </div>

            <div class="code-highlight-panel">
              <h3>折叠与受控展开</h3>
              <div class="code-toolbar">
                <button class="control-btn" type="button" @click="codeExpanded = !codeExpanded">
                  {{ codeExpanded ? '收起代码' : '展开代码' }}
                </button>
              </div>
              <CodeHighlight
                :content="codeLineNumbersContent"
                lang="ts"
                collapsible
                :expanded="codeExpanded"
                copy-text="复制片段"
                copied-text="复制成功"
                @update:expanded="(value) => (codeExpanded = value)"
              />
            </div>

            <div class="code-highlight-panel">
              <h3>自定义头部与标签映射</h3>
              <CodeHighlight
                :content="codeSqlContent"
                language="sql"
                background="#0f172a"
                header-background="#111827"
                text-color="#d1d5db"
                :radius="12"
                :language-label-map="{ sql: 'PostgreSQL' }"
              >
                <template #header="{ displayLanguage, isCopied, onCopy }">
                  <div class="custom-header">
                    <strong>{{ displayLanguage }}</strong>
                    <button class="custom-header-btn" type="button" @click="onCopy">
                      {{ isCopied ? '已复制' : '复制 SQL' }}
                    </button>
                  </div>
                </template>
              </CodeHighlight>
            </div>

            <div class="code-highlight-panel">
              <h3>自动识别语言</h3>
              <CodeHighlight :content="codeUnknownContent" auto-detect-language lang="text" />
            </div>
          </div>
        </section>

        <section class="demo-section bubble-showcase">
          <h2>Bubble 自定义演示</h2>
          <p class="subtitle">
            覆盖当前 Bubble
            全部自定义能力：placement、shape、content、avatar、header、footer、loading、
            background、textColor，以及 avatar/header/default/footer/actions 插槽。
          </p>

          <div class="bubble-controls">
            <span class="control-label">方向</span>
            <button
              class="control-btn"
              :class="{ 'is-active': bubblePlacement === 'start' }"
              type="button"
              @click="bubblePlacement = 'start'"
            >
              start
            </button>
            <button
              class="control-btn"
              :class="{ 'is-active': bubblePlacement === 'end' }"
              type="button"
              @click="bubblePlacement = 'end'"
            >
              end
            </button>

            <span class="control-label">形状</span>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleShape === 'round' }"
              type="button"
              @click="bubbleShape = 'round'"
            >
              round
            </button>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleShape === 'square' }"
              type="button"
              @click="bubbleShape = 'square'"
            >
              square
            </button>

            <span class="control-label">颜色来源</span>
            <button
              class="control-btn"
              :class="{ 'is-active': !bubbleUseCustomColors }"
              type="button"
              @click="bubbleUseCustomColors = false"
            >
              主题默认
            </button>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleUseCustomColors }"
              type="button"
              @click="bubbleUseCustomColors = true"
            >
              自定义覆盖
            </button>

            <label class="color-picker">
              背景
              <input v-model="bubbleBgColor" type="color" :disabled="!bubbleUseCustomColors" />
            </label>
            <label class="color-picker">
              字色
              <input v-model="bubbleTextColor" type="color" :disabled="!bubbleUseCustomColors" />
            </label>

            <span class="control-label">加载</span>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleLoading }"
              type="button"
              @click="bubbleLoading = true"
            >
              true
            </button>
            <button
              class="control-btn"
              :class="{ 'is-active': !bubbleLoading }"
              type="button"
              @click="bubbleLoading = false"
            >
              false
            </button>

            <span class="control-label">头像来源</span>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleUseAvatarSlot }"
              type="button"
              @click="bubbleUseAvatarSlot = true"
            >
              avatar 插槽
            </button>
            <button
              class="control-btn"
              :class="{ 'is-active': !bubbleUseAvatarSlot }"
              type="button"
              @click="bubbleUseAvatarSlot = false"
            >
              avatar 属性
            </button>

            <span class="control-label">插槽开关</span>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleUseHeaderSlot }"
              type="button"
              @click="bubbleUseHeaderSlot = !bubbleUseHeaderSlot"
            >
              header
            </button>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleUseDefaultSlot }"
              type="button"
              @click="bubbleUseDefaultSlot = !bubbleUseDefaultSlot"
            >
              default
            </button>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleUseFooterSlot }"
              type="button"
              @click="bubbleUseFooterSlot = !bubbleUseFooterSlot"
            >
              footer
            </button>
            <button
              class="control-btn"
              :class="{ 'is-active': bubbleUseActionsSlot }"
              type="button"
              @click="bubbleUseActionsSlot = !bubbleUseActionsSlot"
            >
              actions
            </button>
          </div>

          <div class="bubble-input-grid">
            <label class="bubble-input-item">
              <span>header 属性</span>
              <input v-model="bubbleHeaderText" type="text" placeholder="输入 header 文本" />
            </label>

            <label class="bubble-input-item">
              <span>footer 属性</span>
              <input v-model="bubbleFooterText" type="text" placeholder="输入 footer 文本" />
            </label>

            <label class="bubble-input-item">
              <span>avatar 属性（URL）</span>
              <input
                v-model="bubbleAvatarUrl"
                type="text"
                placeholder="https://example.com/avatar.png"
              />
            </label>

            <label class="bubble-input-item bubble-input-item--full">
              <span>content 属性（支持 Markdown）</span>
              <textarea v-model="bubbleContentInput" rows="5"></textarea>
            </label>
          </div>

          <div class="bubble-demo-card">
            <Bubble
              :placement="bubblePlacement"
              :shape="bubbleShape"
              :background="bubbleUseCustomColors ? bubbleBgColor : ''"
              :text-color="bubbleUseCustomColors ? bubbleTextColor : ''"
              :header="bubbleHeaderText"
              :footer="bubbleFooterText"
              :content="bubbleContentInput"
              :loading="bubbleLoading"
              :avatar="bubbleUseAvatarSlot ? '' : bubbleAvatarUrl"
            >
              <template v-if="bubbleUseAvatarSlot" #avatar>
                <div class="bubble-avatar">AI</div>
              </template>

              <template v-if="bubbleUseHeaderSlot" #header>
                <strong>🤖 {{ bubbleHeaderText }}（header 插槽）</strong>
              </template>

              <template v-if="bubbleUseDefaultSlot" #default>
                <div class="bubble-slot-content">
                  <p><strong>default 插槽已启用：</strong>当前 content 属性已被覆盖。</p>
                  <p>placement = {{ bubblePlacement }}，shape = {{ bubbleShape }}。</p>
                </div>
              </template>

              <template v-if="bubbleUseFooterSlot" #footer>
                <span>🕒 {{ bubbleFooterText }}（footer 插槽）</span>
              </template>

              <template v-if="bubbleUseActionsSlot" #actions>
                <button class="bubble-action-btn" type="button">👍</button>
                <button class="bubble-action-btn" type="button">复制</button>
              </template>
            </Bubble>

            <Bubble
              placement="end"
              shape="square"
              background="#ecfdf3"
              text-color="#065f46"
              :avatar="bubbleAvatarUrl"
              header="你 · avatar 属性示例"
              footer="该条消息仅使用 Props（无 avatar 插槽）"
              content="这个示例展示 avatar / header / footer / content 都可以直接通过属性自定义。"
            />

            <Bubble
              header="系统状态"
              footer="loading=true"
              content="正在生成回答，请稍候..."
              :loading="true"
            />
          </div>
        </section>

        <!-- AI 场景组件区 -->
        <section class="demo-section ai-section">
          <h2>AI 聊天场景组件</h2>
          <p class="subtitle">
            交互实验区：可调滚动阈值、滚动 API、底部自定义操作槽与新增对话用法，方便下游开发者
            直接复用 BubbleList。
          </p>
          <div class="feature-list">
            <span class="feature-item">✨ BubbleList：聊天消息列表</span>
            <span class="feature-item">📝 Markdown 支持</span>
            <span class="feature-item">⌨️ 打字机效果</span>
            <span class="feature-item">🎯 智能滚动</span>
            <span class="feature-item">🔧 阈值可配置</span>
            <span class="feature-item">➕ 快速追加对话</span>
          </div>

          <div class="chat-container">
            <div class="chat-sidebar">
              <Conversations :theme="uiTheme" :hasMore="false" />
            </div>

            <div class="chat-main">
              <div class="bubblelist-lab">
                <div class="bubblelist-lab-row">
                  <label class="bubblelist-slider">
                    <span>bottomThreshold: {{ bubbleBottomThreshold }}px</span>
                    <input
                      v-model.number="bubbleBottomThreshold"
                      type="range"
                      min="0"
                      max="120"
                      step="5"
                    />
                  </label>
                </div>

                <div class="bubblelist-lab-row">
                  <button class="control-btn" type="button" @click="pushDemoUserMessage">
                    追加用户消息
                  </button>
                  <button class="control-btn" type="button" @click="pushDemoAssistantTypingMessage">
                    追加助手流式消息
                  </button>
                  <button class="control-btn" type="button" @click="appendConversationRound">
                    新增一轮对话
                  </button>
                  <button class="control-btn" type="button" @click="scrollBubbleListToTop">
                    滚动到顶部
                  </button>
                  <button class="control-btn" type="button" @click="scrollBubbleListToBottom">
                    滚动到底部
                  </button>
                  <button class="control-btn" type="button" @click="scrollBubbleListToSecond">
                    滚动到第二条
                  </button>
                  <button
                    class="control-btn"
                    :class="{ 'is-active': bubbleUseCustomBottomAction }"
                    type="button"
                    @click="bubbleUseCustomBottomAction = !bubbleUseCustomBottomAction"
                  >
                    {{ bubbleUseCustomBottomAction ? '关闭' : '开启' }}自定义底部操作
                  </button>
                </div>

                <div class="bubblelist-lab-meta">
                  <span>消息数：{{ messages.length }}</span>
                  <span>最近操作：{{ bubbleLastAction }}</span>
                  <span>下游用法：直接向 data 追加消息即可</span>
                </div>

                <div class="bubblelist-usage">
                  <code
                    >messages.value.push({ id: Date.now(), role: 'user', content: '新对话内容'
                    })</code
                  >
                </div>
              </div>

              <BubbleList
                ref="bubbleListRef"
                :data="messages"
                class="message-list"
                :bottom-threshold="bubbleBottomThreshold"
              >
                <template
                  v-if="bubbleUseCustomBottomAction"
                  #bottom-action="{ scrollToBottom, scrollToTop }"
                >
                  <div class="bubblelist-bottom-action">
                    <button class="mini-action-btn" type="button" @click="scrollToTop('smooth')">
                      顶
                    </button>
                    <button class="mini-action-btn" type="button" @click="scrollToBottom('smooth')">
                      底
                    </button>
                  </div>
                </template>
              </BubbleList>

              <div class="chat-sender">
                <Sender
                  v-model="inputText"
                  placeholder="请输入你想问的问题..."
                  @send="handleSend"
                />
              </div>
            </div>
          </div>
        </section>

        <section class="demo-section sender-showcase">
          <h2>Sender 功能实验区</h2>
          <p class="subtitle">
            展示点：v-model、send、enterPressed、enterBreak、onHandleKeyDown、paste/pasteFile、
            prefix/input-tag-prefix/action-list/send-btn-loading/send-btn 插槽、以及
            focus/blur/clear/editor 暴露方法。
          </p>

          <div class="sender-lab-panel">
            <div class="sender-lab-controls">
              <span class="control-label">variant</span>
              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoVariant === 'default' }"
                type="button"
                @click="senderDemoVariant = 'default'"
              >
                default
              </button>
              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoVariant === 'updown' }"
                type="button"
                @click="senderDemoVariant = 'updown'"
              >
                updown
              </button>

              <span class="control-label">inputTagVariant</span>
              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoTagVariant === 'default' }"
                type="button"
                @click="senderDemoTagVariant = 'default'"
              >
                default
              </button>
              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoTagVariant === 'updown' }"
                type="button"
                @click="senderDemoTagVariant = 'updown'"
              >
                updown
              </button>

              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoEnterBreak }"
                type="button"
                @click="senderDemoEnterBreak = !senderDemoEnterBreak"
              >
                {{ senderDemoEnterBreak ? '回车换行' : '回车发送' }}
              </button>

              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoBlockEnter }"
                type="button"
                @click="senderDemoBlockEnter = !senderDemoBlockEnter"
              >
                {{ senderDemoBlockEnter ? '已拦截 Enter' : '允许 Enter 发送' }}
              </button>

              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoDisabled }"
                type="button"
                @click="senderDemoDisabled = !senderDemoDisabled"
              >
                {{ senderDemoDisabled ? 'disabled=true' : 'disabled=false' }}
              </button>

              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoShowTag }"
                type="button"
                @click="senderDemoShowTag = !senderDemoShowTag"
              >
                {{ senderDemoShowTag ? '隐藏标签' : '显示标签' }}
              </button>

              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoUsePrefix }"
                type="button"
                @click="senderDemoUsePrefix = !senderDemoUsePrefix"
              >
                {{ senderDemoUsePrefix ? '隐藏 prefix' : '显示 prefix' }}
              </button>

              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoUseCustomTagSlot }"
                type="button"
                @click="senderDemoUseCustomTagSlot = !senderDemoUseCustomTagSlot"
              >
                {{ senderDemoUseCustomTagSlot ? '标签槽：自定义' : '标签槽：默认' }}
              </button>

              <button
                class="control-btn"
                :class="{ 'is-active': senderDemoUseCustomSendSlot }"
                type="button"
                @click="senderDemoUseCustomSendSlot = !senderDemoUseCustomSendSlot"
              >
                {{ senderDemoUseCustomSendSlot ? '发送槽：自定义' : '发送槽：默认' }}
              </button>
            </div>

            <div class="sender-lab-controls">
              <label class="sender-lab-input-inline">
                <span>tag 文案</span>
                <input
                  v-model="senderDemoTagValue"
                  type="text"
                  placeholder="输入 inputTagPrefixValue"
                />
              </label>

              <label class="sender-lab-input-inline">
                <span>maxHeight: {{ senderDemoMaxHeight }}px</span>
                <input
                  v-model.number="senderDemoMaxHeight"
                  type="range"
                  min="80"
                  max="260"
                  step="10"
                />
              </label>
            </div>

            <Sender
              ref="senderDemoRef"
              v-model="senderDemoValue"
              :theme="uiTheme"
              :variant="senderDemoVariant"
              :disabled="senderDemoDisabled"
              :loading="senderDemoLoading"
              :enter-break="senderDemoEnterBreak"
              :on-handle-key-down="handleSenderDemoKeydown"
              :show-input-tag-prefix="senderDemoShowTag"
              :input-tag-prefix-value="senderDemoTagValue"
              :input-tag-variant="senderDemoTagVariant"
              :max-height="senderDemoMaxHeight"
              placeholder="试试回车、Shift+回车、粘贴文件、插槽与 expose API"
              @send="handleSenderDemoSend"
              @enter-pressed="handleSenderDemoEnterPressed"
              @paste="handleSenderDemoPaste"
              @paste-file="handleSenderDemoPasteFile"
              @focus="handleSenderDemoFocus"
              @blur="handleSenderDemoBlur"
              @update:show-input-tag-prefix="(value) => (senderDemoShowTag = value)"
              @update:loading="handleSenderDemoLoadingUpdate"
            >
              <template v-if="senderDemoUsePrefix" #prefix>
                <span class="sender-prefix-chip">Assistant</span>
              </template>

              <template v-if="senderDemoUseCustomTagSlot" #input-tag-prefix>
                <div class="sender-tag-chip">
                  <span>{{ senderDemoTagValue || 'Model' }}</span>
                  <button type="button" @click="senderDemoShowTag = false">x</button>
                </div>
              </template>

              <template #action-list>
                <button class="sender-action-btn" type="button" @click="insertSenderDemoPrompt">
                  插入模板
                </button>
                <button
                  class="sender-action-btn"
                  type="button"
                  @click="senderDemoLoading = !senderDemoLoading"
                >
                  {{ senderDemoLoading ? '停止 loading' : '模拟 loading' }}
                </button>
              </template>

              <template v-if="senderDemoUseCustomSendSlot" #send-btn="{ disabled }">
                <button
                  class="sender-send-custom"
                  type="button"
                  :disabled="disabled"
                  @click="handleSenderDemoSendBySlot"
                >
                  Send
                </button>
              </template>

              <template #send-btn-loading>
                <button
                  class="sender-loading-slot"
                  type="button"
                  @click="senderDemoLoading = false"
                >
                  生成中，点击停止
                </button>
              </template>
            </Sender>

            <div class="sender-lab-controls">
              <button class="control-btn" type="button" @click="senderDemoRef?.focus()">
                focus()
              </button>
              <button class="control-btn" type="button" @click="senderDemoRef?.blur()">
                blur()
              </button>
              <button class="control-btn" type="button" @click="clearSenderDemoByExpose">
                clear()
              </button>
              <button class="control-btn" type="button" @click="readSenderDemoEditorText">
                editor().getText()
              </button>
            </div>

            <div class="sender-lab-meta">
              <span>send 次数：{{ senderDemoSendCount }}</span>
              <span>enterPressed 次数：{{ senderDemoEnterCount }}</span>
              <span>focus/blur：{{ senderDemoFocusCount }}/{{ senderDemoBlurCount }}</span>
              <span>paste 次数：{{ senderDemoPasteCount }}</span>
              <span>paste 文件：{{ senderDemoPasteFiles }}</span>
              <span>editor 内容长度：{{ senderDemoLastEditorText.length }}</span>
            </div>

            <ul class="sender-lab-log">
              <li v-for="item in senderDemoLogs" :key="item">{{ item }}</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style>
.app-shell {
  min-height: 100vh;
  --demo-code-bg: #f6f8fa;
  --demo-code-border: #d0d7de;
  --demo-code-title-bg: #eef2f7;
  --demo-code-title-text: #57606a;
  --demo-code-text: #1f2328;
  color: var(--el-ai-text-color);
  background: var(--el-ai-bg-color);
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.app-shell[data-el-ai-theme='dark'] {
  --demo-code-bg: #0f172a;
  --demo-code-border: #2f3f60;
  --demo-code-title-bg: #1e293b;
  --demo-code-title-text: #dbeafe;
  --demo-code-text: #e2e8f0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-ai-border-color-light);
  margin-bottom: 30px;
}

header h1 {
  margin: 0;
  color: var(--el-ai-text-color);
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--el-ai-text-color);
  border-bottom: 2px solid var(--el-ai-border-color-lighter);
  padding-bottom: 10px;
}

.subtitle {
  color: var(--el-ai-text-color-secondary);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.feature-list {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.feature-item {
  padding: 6px 12px;
  background: var(--el-ai-fill-color);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--el-ai-text-color-regular);
}

.theme-button-preview {
  border-color: var(--el-ai-border-color);
  background: var(--el-ai-fill-color);
}

.theme-switch-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.theme-switch-current {
  font-size: 13px;
  color: var(--el-ai-text-color-secondary);
  text-transform: capitalize;
}

.markdown-toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.theme-btn {
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #606266;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.theme-btn.is-active {
  background: #409eff;
  color: #fff;
  border-color: #409eff;
}

.markdown-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.markdown-panel {
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 10px;
  padding: 16px;
  background: var(--el-ai-bg-color);
}

.markdown-panel h3 {
  margin: 0 0 14px;
  font-size: 1rem;
  color: var(--el-ai-text-color);
}

.markdown-panel .el-ai-markdown__markdown-body {
  font-size: 14px;
  line-height: 1.7;
}

.custom-code-block {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--demo-code-border);
  background: var(--demo-code-bg);
}

.custom-code-title {
  background: var(--demo-code-title-bg);
  color: var(--demo-code-title-text);
  font-size: 12px;
  padding: 8px 12px;
}

.custom-code-block pre {
  margin: 0;
  padding: 0.75em 12px;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--el-ai-scrollbar-thumb-bg-color) transparent;
}

.custom-code-block pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-code-block pre::-webkit-scrollbar-track {
  background: transparent;
}

.custom-code-block pre::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: var(--el-ai-scrollbar-thumb-bg-color);
}

.custom-code-block code {
  color: var(--demo-code-text);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.code-highlight-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.code-highlight-panel {
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 10px;
  padding: 16px;
  background: var(--el-ai-bg-color);
}

.code-highlight-panel h3 {
  margin: 0 0 14px;
  font-size: 1rem;
  color: var(--el-ai-text-color);
}

.code-toolbar {
  margin-bottom: 12px;
}

.custom-header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.custom-header-btn {
  border: 1px solid #374151;
  background: #111827;
  color: #f9fafb;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
}

.custom-header-btn:hover {
  border-color: #60a5fa;
  color: #bfdbfe;
}

.bubble-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.control-label {
  font-size: 12px;
  color: #909399;
  margin-right: 2px;
}

.control-btn {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.control-btn.is-active {
  border-color: #409eff;
  background: #ecf5ff;
  color: #409eff;
}

.color-picker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--el-ai-text-color-regular);
}

.color-picker input {
  width: 26px;
  height: 26px;
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.bubble-demo-card {
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 10px;
  padding: 16px;
  background: var(--el-ai-fill-color);
}

.bubble-input-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.bubble-input-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bubble-input-item--full {
  grid-column: 1 / -1;
}

.bubble-input-item span {
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}

.bubble-input-item input,
.bubble-input-item textarea {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 12px;
}

.bubble-input-item textarea {
  line-height: 1.5;
  resize: vertical;
  min-height: 90px;
}

.bubble-slot-content p {
  margin: 0;
}

.bubble-slot-content p + p {
  margin-top: 6px;
}

.bubble-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #1d4ed8;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.bubble-avatar-user {
  background: #059669;
}

.bubble-action-btn {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 8px;
}

.bubble-action-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.demo-block {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 8px;
  background: var(--el-ai-fill-color);
}

.demo-block h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1rem;
  color: var(--el-ai-text-color-regular);
}

.gap {
  width: 15px;
  height: 10px;
}

.el-ai-button {
  margin-right: 10px;
}

/* AI 组件布局 */
.ai-section .chat-container {
  display: flex;
  height: 74vh;
  border: 1px solid var(--el-ai-border-color);
  border-radius: 8px;
  overflow: hidden;
  background: var(--el-ai-bg-color);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.chat-sidebar {
  width: 260px;
  border-right: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-fill-color);
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 0;
}

.bubblelist-lab {
  border-bottom: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-fill-color);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bubblelist-lab-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.bubblelist-slider {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}

.bubblelist-slider input {
  width: 180px;
}

.bubblelist-lab-meta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}

.bubblelist-usage {
  border: 1px dashed var(--el-ai-border-color);
  border-radius: 8px;
  background: var(--el-ai-bg-color);
  padding: 8px 10px;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
  overflow-x: auto;
}

.bubblelist-usage code {
  white-space: nowrap;
}

.message-list {
  flex: 1;
  min-height: 0;
  --el-ai-bubble-list-scrollbar-track: rgba(17, 25, 37, 0.14);
  --el-ai-bubble-list-scrollbar-thumb: rgba(17, 25, 37, 0.48);
  --el-ai-bubble-list-scrollbar-thumb-hover: rgba(17, 25, 37, 0.66);
}

.app-shell[data-el-ai-theme='dark'] .message-list {
  --el-ai-bubble-list-scrollbar-track: rgba(148, 163, 184, 0.28);
  --el-ai-bubble-list-scrollbar-thumb: rgba(191, 219, 254, 0.72);
  --el-ai-bubble-list-scrollbar-thumb-hover: rgba(191, 219, 254, 0.92);
}

.message-list.el-ai-bubble-list {
  overflow-y: scroll;
  scrollbar-gutter: stable;
  scrollbar-width: auto;
}

.message-list.el-ai-bubble-list::-webkit-scrollbar {
  width: 14px;
}

.message-list.el-ai-bubble-list::-webkit-scrollbar-track {
  border-radius: 10px;
}

.message-list.el-ai-bubble-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

.bubblelist-bottom-action {
  display: flex;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--el-ai-bg-color);
  border: 1px solid var(--el-ai-border-color);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.mini-action-btn {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-fill-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 999px;
  width: 28px;
  height: 28px;
  font-size: 12px;
  cursor: pointer;
}

.mini-action-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.chat-sender {
  padding: 10px 12px;
  border-top: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
}

.sender-lab-panel {
  border: 1px solid var(--el-ai-border-color-light);
  border-radius: 10px;
  padding: 14px;
  background: var(--el-ai-fill-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sender-lab-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.sender-lab-input-inline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}

.sender-lab-input-inline input[type='text'] {
  border: 1px solid var(--el-ai-border-color);
  border-radius: 6px;
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color);
  padding: 6px 8px;
  font-size: 12px;
  min-width: 190px;
}

.sender-lab-input-inline input[type='range'] {
  width: 180px;
}

.sender-prefix-chip {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #eef6ff;
  color: #2563eb;
  font-size: 12px;
  font-weight: 600;
}

.sender-tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  background: #ecf5ff;
  color: #2563eb;
  font-size: 12px;
}

.sender-tag-chip button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  padding: 0;
}

.sender-action-btn {
  border: 1px solid var(--el-ai-border-color);
  background: var(--el-ai-bg-color);
  color: var(--el-ai-text-color-regular);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
}

.sender-action-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.sender-send-custom {
  min-width: 56px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  padding: 0 12px;
  cursor: pointer;
}

.sender-send-custom:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.sender-loading-slot {
  border: 1px solid #f59e0b;
  background: #fffbeb;
  color: #92400e;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}

.sender-lab-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}

.sender-lab-log {
  margin: 0;
  padding: 10px 12px;
  border: 1px dashed var(--el-ai-border-color);
  border-radius: 8px;
  background: var(--el-ai-bg-color);
  list-style: none;
  max-height: 160px;
  overflow: auto;
  font-size: 12px;
  color: var(--el-ai-text-color-secondary);
}

.sender-lab-log li + li {
  margin-top: 6px;
}

@media (max-width: 992px) {
  .markdown-grid {
    grid-template-columns: 1fr;
  }

  .code-highlight-grid {
    grid-template-columns: 1fr;
  }

  .bubble-input-grid {
    grid-template-columns: 1fr;
  }

  .bubblelist-slider {
    width: 100%;
    justify-content: space-between;
  }

  .bubblelist-slider input {
    width: 50%;
  }

  .bubblelist-usage code {
    white-space: normal;
    word-break: break-all;
  }

  .sender-lab-input-inline {
    width: 100%;
    justify-content: space-between;
  }

  .sender-lab-input-inline input[type='text'] {
    min-width: 0;
    width: 58%;
  }

  .sender-lab-input-inline input[type='range'] {
    width: 50%;
  }
}
</style>
