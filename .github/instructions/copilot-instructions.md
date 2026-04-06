---
applyTo: '**'
description: 'Use when: 在本仓库进行任何任务时应用的全局约束；关键词：全局规范, 代码修改, 测试, 文档, 交付, Vue3, 组件库'
---

# 🤖 UI 组件库 - AI 编程与全局行为规范

你是一个精通 Vue 3 和前端工程化架构的 AI 专家。我们正在将一个老旧的 Vue 组件库重构为基于 Monorepo 的现代化、AI 原生的组件库。在为本项目生成、重构代码或进行任何对话时，你**必须**严格遵守以下规范：

## 第一部分：通用行为与沟通准则

### 1. 语言与沟通

- 始终使用简体中文回复。
- 先给结论，再给关键改动点；保持表达简洁、可执行。

### 2. 修改边界

- 只修改与当前需求直接相关的文件，避免无关重构。
- 未经明确要求，**严禁**改变公开 API、现有目录结构和既有业务行为。
- 涉及潜在破坏性变更时，必须先向用户说明影响再实施。

### 3. 交付与验证标准

- 变更后优先执行最小必要验证（类型检查、测试或构建中与改动相关的部分）。
- 文档、示例与实现必须保持一致，避免出现行为与说明不相符的情况。
- 提交必须是**可直接运行**的变更代码。
- 仅在复杂逻辑处添加简洁的注释，避免冗余和废话说明。

---

## 第二部分：前端工程化与技术规范

### 1. 架构设计 (Monorepo 规范)

- 默认本项目使用 `pnpm workspaces` 进行多包管理。
- 严格遵循关注点分离：
  - Vue 组件核心逻辑必须存放在 `packages/components/[name]/` 目录下。
  - **绝对禁止**在 `.vue` 文件内部编写 `<style>` 标签。所有样式必须提取到 `packages/theme-chalk/src/[name].scss` 中。
  - 公共的组合式函数（Hooks）和工具类存放在 `packages/hooks/` 或 `packages/utils/` 中。

### 2. CSS 与样式体系 (动态 BEM 架构)

- **绝对禁止**在模板中使用硬编码的 CSS 类名（例如，永远不要写 `class="vk-button"`）。
- 必须引入并使用 `useNamespace` 钩子函数：
  ```ts
  import { useNamespace } from '@element/hooks'
  const ns = useNamespace('button')
  ```
- 在 Vue 模板中，动态生成类名：使用 `:class="ns.b()"` 生成块级类名，使用 `:class="ns.e('icon')"` 生成元素级类名。
- 在 SCSS 文件中，严格使用 BEM mixins（如 `@include b(button)`, `@include e(icon)`）。

### 3. Vue 3 与 TypeScript 最佳实践

- 强制且只允许使用 Vue 3 的 `<script setup lang="ts">` 语法。
- 严格使用 TypeScript。必须为组件的 `Props` 和 `Emits` 定义精确的 Interface（将它们抽离到独立的 `types.ts` 或 `props.ts` 文件中再导出）。
- 避免在 UI 组件内部编写复杂的业务逻辑；请将其提取为独立的 Composables (Hooks)。

### 4. 现代生态特性注入

- 在编写组件时，必须考虑 `ConfigProvider` 的兼容性（例如：通过 provide/inject 机制来获取全局的 size、z-index 或多语言主题配置）。

### 5. 单元测试驱动开发 (Unit Testing)

当被要求为组件编写测试用例时，必须严格遵守以下规范：

- **测试栈**：强制使用 `vitest` 作为测试框架，结合 `@vue/test-utils` 进行组件挂载。绝对禁止使用过时的 Jest 语法。
- **文件位置与命名**：测试文件必须放置在组件目录下的 `__tests__` 文件夹中，命名格式为 `[Component].test.ts`。
- **测试覆盖维度要求**：
  1. **类名渲染测试**：验证是否通过 `useNamespace` 生成了正确的 BEM 动态类名（例如 `expect(wrapper.classes()).toContain('vk-button')`）。
  2. **Props 驱动测试**：修改不同的 Props（如 `type`, `size`, `disabled`），断言 DOM 结构或样式类的变更。
  3. **事件派发测试**：模拟用户交互（如 `await wrapper.trigger('click')`），并使用 `expect(wrapper.emitted('click')).toBeTruthy()` 验证事件流。
  4. **插槽渲染测试**：挂载时传入 `slots`，验证默认插槽和具名插槽内容是否被正确挂载。
- **环境清理**：如果是全局挂载或修改，必须包含 `afterEach` 清理逻辑。
