<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Button from './components/Button/Button.vue'
import Icon from './components/Icon/Icon.vue'
import Switch from './components/Switch/Switch.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Sender from './components/Sender/index.vue'
import Conversations from './components/Conversations/index.vue'
import BubbleList from './components/BubbleList/index.vue'
import { createMessage } from './components/Message/method'
import type { MessageItem } from './components/BubbleList/props'

const switchValue = ref(false)
const inputText = ref('')
const bubbleListRef = ref<InstanceType<typeof BubbleList> | null>(null)

// BubbleList 示例消息数据
const messages: Ref<MessageItem[]> = ref([
  {
    id: 1,
    content: '你好，请全面展示一下你支持的 Markdown 各种排版格式吧！比如代码块、表格和引用。',
    role: 'user',
    typing: false,
  },
  {
    id: 2,
    content:
      '嗨！👋 \n\n没问题，让我为你全面展示我的 Markdown 渲染能力（同时展示一下流畅的打字机效果）：\n\n### 📝 基础排版\n支持**加粗**重点，*斜体*标注，~~删除线~~以及在文本中嵌入[超链接提取](https://github.com)。\n\n### 💻 代码高亮 (带复制功能)\n这是一个带有完整语法高亮的 Vue 代码块示例。注意看左侧 Mac 风格的红黄绿点和右下角的“复制”按钮：\n```vue\n<template>\n  <div class="bubble-demo">\{\{ message \}\}</div>\n</template>\n\n<script setup lang="ts">\nimport { ref } from "vue"\n\nconst message = ref("Hello, Element AI!")\n<\/script>\n```\n\n### 📊 复杂表格\n可以轻松渲染规范的数据表格：\n\n| 组件名 | 当前状态 | 核心特性描述 |\n|--------|------|------|\n| Bubble | ✅ 完成 | 聊天气泡，支持 Highlight.js + 打字机 |\n| BubbleList | ✅ 完成 | 消息列表，支持自动追踪滚动到底部 |\n| Sender | 🚧 进行中 | 高度定制的用户输入与发送组件 |\n\n### 💡 引用块与行内代码\n平时可以在文本中直接嵌入行内代码，比如 `console.log("Hello")`。\n> 这里是一段引用说明。\n> "优质的细节交互往往能决定整个 AI 对话产品的体验下限。"\n\n现在你可以随便输入一些问题再测试一下！',
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

const handleSend = () => {
  if (!inputText.value) return

  // 添加用户消息
  messages.value.push({
    id: messages.value.length + 1,
    content: inputText.value,
    role: 'user',
    typing: false,
  })

  const userMessage = inputText.value
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
    }, 100)

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

const mockMenuOptions = [
  { key: '1', label: 'Item 1', disabled: false },
  { key: '2', label: 'Item 2', disabled: true },
  { key: '3', label: 'Item 3', divided: true, disabled: false },
]
</script>

<template>
  <div class="container">
    <header>
      <h1>Element AI Vue 组件库</h1>
    </header>

    <main>
      <!-- 基础组件区 -->
      <section class="demo-section">
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
      </section>

      <!-- AI 场景组件区 -->
      <section class="demo-section ai-section">
        <h2>AI 聊天场景组件</h2>
        <p class="subtitle">这些组件基于库内 AI 业务场景定制，用于快速构建大模型对话交互界面。</p>
        <div class="feature-list">
          <span class="feature-item">✨ BubbleList：聊天消息列表</span>
          <span class="feature-item">📝 Markdown 支持</span>
          <span class="feature-item">⌨️ 打字机效果</span>
          <span class="feature-item">🎯 智能滚动</span>
        </div>

        <div class="chat-container">
          <div class="chat-sidebar">
            <Conversations theme="light" :hasMore="false" />
          </div>

          <div class="chat-main">
            <BubbleList ref="bubbleListRef" :data="messages" class="message-list" />

            <div class="chat-sender">
              <Sender
                v-model="inputText"
                placeholder="请输入你想问的问题..."
                @submit="handleSend"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

header {
  padding-bottom: 20px;
  border-bottom: 1px solid #eaecef;
  margin-bottom: 30px;
}

header h1 {
  margin: 0;
  color: #2c3e50;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
  border-bottom: 2px solid #f0f2f4;
  padding-bottom: 10px;
}

.subtitle {
  color: #909399;
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
  background: #f0f2f4;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #606266;
}

.demo-block {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background: #fafafa;
}

.demo-block h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1rem;
  color: #606266;
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
  height: 500px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.chat-sidebar {
  width: 260px;
  border-right: 1px solid #dcdfe6;
  background: #f5f7fa;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.message-list {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.chat-sender {
  padding: 15px;
  border-top: 1px solid #dcdfe6;
  background: #fff;
}
</style>
