# 🤖 UI 组件库 - AI 编程规范

你是一个精通 Vue 3 和前端工程化架构的 AI 专家。我们正在将一个老旧的 Vue 组件库重构为基于 Monorepo 的现代化、AI 原生的组件库。

在为本项目生成或重构代码时，你**必须**严格遵守以下规范：

## 1. 架构设计 (Monorepo 规范)

- 默认本项目使用 `pnpm workspaces` 进行多包管理。
- 严格遵循关注点分离：
  - Vue 组件核心逻辑必须存放在 `packages/components/[name]/` 目录下。
  - **绝对禁止**在 `.vue` 文件内部编写 `<style>` 标签。所有样式必须提取到 `packages/theme-chalk/src/[name].scss` 中。
  - 公共的组合式函数（Hooks）和工具类存放在 `packages/hooks/` 或 `packages/utils/` 中。

## 2. CSS 与样式体系 (动态 BEM 架构)

- **绝对禁止**在模板中使用硬编码的 CSS 类名（例如，永远不要写 `class="vk-button"`）。
- 必须引入并使用 `useNamespace` 钩子函数：
  ```ts
  import { useNamespace } from '@element/hooks'
  const ns = useNamespace('button')
  ```
- 在 Vue 模板中，动态生成类名：使用 `:class="ns.b()"` 生成块级类名，使用 `:class="ns.e('icon')"` 生成元素级类名。
- 在 SCSS 文件中，严格使用 BEM mixins（如 `@include b(button)`, `@include e(icon)`）。

## 3. Vue 3 与 TypeScript 最佳实践

- 强制且只允许使用 Vue 3 的 `<script setup lang="ts">` 语法。
- 严格使用 TypeScript。必须为组件的 `Props` 和 `Emits` 定义精确的 Interface（将它们抽离到独立的 `types.ts` 或 `props.ts` 文件中再导出）。
- 避免在 UI 组件内部编写复杂的业务逻辑；请将其提取为独立的 Composables (Hooks)。

## 4. 现代生态特性注入

- 在编写组件时，必须考虑 `ConfigProvider` 的兼容性（例如：通过 provide/inject 机制来获取全局的 size、z-index 或多语言主题配置）。
