<template>
  <div v-if="editor" class="editor-container">
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// 1. 初始化编辑器
const editor = useEditor({
  // extensions 数组里放入插件实例
  extensions: [
    StarterKit.configure({
      // 如果需要对 StarterKit 进行具体配置，可以在这里写
    }),
  ],
  content: '<p>Hello World!</p>',
  // 可以在这里设置编辑器的 CSS 类名
  editorProps: {
    attributes: {
      class: 'prose focus:outline-none',
    },
  },
})

// 2. 如果你需要监听内容变化（可选）
watch(editor, (newEditor) => {
  if (newEditor) {
    // 可以在这里处理逻辑
  }
})
</script>

<style scoped>
/* 记得给编辑器加点高度，否则可能看不见 */
.editor-container :deep(.tiptap) {
  min-height: 100px;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
