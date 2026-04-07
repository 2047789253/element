<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button/Button.vue'
import Icon from './components/Icon/Icon.vue'
import Switch from './components/Switch/Switch.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import Bubble from './components/Bubble/index.vue'
import Sender from './components/Sender/index.vue'
import Conversations from './components/Conversations/index.vue'
import { createMessage } from './components/Message/method'

const switchValue = ref(false)
const inputText = ref('')

const handleSend = () => {
  if (!inputText.value) return
  createMessage({ message: '发送消息: ' + inputText.value, type: 'success' })
  inputText.value = ''
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
          <Button type="primary">Primary</Button>
          <Button type="success" plain>Success</Button>
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
          <Button @click="createMessage({ message: '这是一条普通消息', type: 'info' })"
            >触发 Message</Button
          >
        </div>
      </section>

      <!-- AI 场景组件区 -->
      <section class="demo-section ai-section">
        <h2>AI 聊天场景组件</h2>
        <p class="subtitle">这些组件基于库内 AI 业务场景定制，用于快速构建大模型对话交互界面。</p>

        <div class="chat-container">
          <div class="chat-sidebar">
            <Conversations theme="light" :hasMore="false" />
          </div>

          <div class="chat-main">
            <div class="message-list">
              <Bubble placement="end" content="你好，请介绍一下你自己。" />
              <Bubble
                placement="start"
                content="你好，我是你的专属 **Element AI 助手**！我可以帮你解答各种编程问题、提供灵感，甚至陪你畅聊你想聊的各类话题。"
                :typing="true"
              />
            </div>

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
