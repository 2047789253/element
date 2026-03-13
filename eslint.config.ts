import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// 这里的 defineConfigWithVueTs 是官方专门为 TS + Vue 设计的辅助函数
export default defineConfigWithVueTs(
  // 1. 指定检查的文件范围
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  // 2. 指定忽略的文件夹 (对应以前的 .eslintignore)
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // 3. Vue 的基础规则 (Essential)
  ...pluginVue.configs['flat/essential'],

  // 4. Vue + TS 的推荐规则 (这个非常重要，它帮你配置了 parser)
  vueTsConfigs.recommended,

  // 👇 5. 【新增】你的自定义规则写在这个对象里
  {
    rules: {
      // 允许组件名叫 "Login.vue" 而不是 "LoginPage.vue"
      'vue/multi-word-component-names': 'off',

      // 允许使用 console.log (生产环境可以改 warn)
      'no-console': 'off',

      // 生产环境禁止 debugger
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

      // (可选) 如果你觉得 TS 的 `any` 报错太烦，可以把这行解开
      // '@typescript-eslint/no-explicit-any': 'warn'
    }
  },

  // 6. 最后加载：关闭格式化规则，交给 Prettier
  skipFormatting,
)
