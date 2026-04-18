# element plus

## 安装与依赖说明

本库将 `vue`、`@popperjs/core`、`lodash-es` 作为外部依赖（peerDependencies）。
这表示它们不会被打进库产物中，使用方需要在自己的项目里安装。

## 构建产物

当前构建会输出以下文件：

- ESM 产物：`dist/element-ai.js`、`dist/element-ai.css`、`dist/types/index.d.ts`
- UMD 产物：`dist/element-ai.umd.cjs`、`dist/element-ai.css`、`dist/types/index.d.ts`

其中 CSS 和类型声明是共享的，不会按 ESM / UMD 各生成一份。

## SKILL 发布说明

仓库里的 `.github/skills/elementskill/SKILL.md` 会随着 npm 包一起发布，因为 `package.json` 的 `files` 已经包含了 `.github`。
它不是 `dist` 构建产物的一部分，而是安装包内的辅助指令文件，供下游开发者通过 `npx skills add element-ai` 注册到本地环境。

### npm / pnpm 项目使用

```sh
pnpm add element-ai vue @popperjs/core lodash-es
```

或

```sh
npm i element-ai vue @popperjs/core lodash-es
```

### UMD 方式使用（script 标签）

请按顺序先引入依赖，再引入组件库 UMD 文件：

1. Vue（全局变量：`Vue`）
2. Popper（全局变量：`Popper`）
3. lodash-es 对应全局变量（`lodashEs`）
4. element-ai UMD 文件

如果上述全局变量缺失，UMD 运行时会报依赖未定义。

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
