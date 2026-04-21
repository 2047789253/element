import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
  lang: 'zh-CN',
  base: '/element-ai/',
  title: 'Element AI',
  description: 'Vue 3 AI 场景组件库文档',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    [
      'script',
      { id: 'sync-el-ai-theme' },
      `(() => {
  const appearance = localStorage.getItem('vitepress-theme-appearance') || 'auto'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = !appearance || appearance === 'auto' ? prefersDark : appearance === 'dark'
  document.documentElement.setAttribute('data-el-ai-theme', isDark ? 'dark' : 'light')
})()`,
    ],
  ],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
        'element-ai': fileURLToPath(new URL('../../src/index.ts', import.meta.url)),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/api-examples' },
      { text: '组件', link: '/components/index' },
      { text: 'Markdown 能力', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '首页', link: '/' },
          { text: '快速开始', link: '/api-examples' },
          { text: '组件总览', link: '/components/index' },
          { text: 'Markdown 能力', link: '/markdown-examples' },
        ],
      },
      {
        text: '基础组件',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Icon', link: '/components/icon' },
          { text: 'Tooltip', link: '/components/tooltip' },
          { text: 'Dropdown', link: '/components/dropdown' },
          { text: 'Message', link: '/components/message' },
          { text: 'CodeHighlight', link: '/components/code-highlight' },
        ],
      },
      {
        text: 'AI 场景组件',
        items: [
          { text: '完整聊天工作流', link: '/components/chat-workflow' },
          { text: 'Bubble', link: '/components/bubble' },
          { text: 'Markdown', link: '/components/markdown' },
          { text: 'Sender', link: '/components/sender' },
          { text: 'BubbleList', link: '/components/bubble-list' },
          { text: 'Conversations', link: '/components/conversations' },
        ],
      },
      {
        text: '迁移中',
        items: [
          { text: 'Input', link: '/components/input' },
          { text: 'Select', link: '/components/select' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'CodeHighlight', link: '/components/code-highlight' },
          { text: 'Bubble', link: '/components/bubble' },
          { text: 'Sender', link: '/components/sender' },
        ],
      },
    ],

    outline: {
      level: [2, 3],
    },

    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © Element AI',
    },
  },
})
