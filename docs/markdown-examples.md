# Markdown 能力说明

`Markdown` 组件支持常见 AI 文档场景：GFM、数学公式与代码块扩展渲染。

## 支持能力

1. GFM 语法：表格、任务列表、删除线。
2. KaTeX 数学公式：行内与块级公式。
3. 代码块插槽：可通过 `#code` 自定义代码区。

## 示例内容

```md
# Markdown Demo

行内公式：$E=mc^2$

$$
\int_0^1 x^2 dx = \frac{1}{3}
$$

| 组件          | 状态  |
| ------------- | ----- |
| Markdown      | Ready |
| CodeHighlight | Ready |
```

## 对应组件页

查看 [docs/components/markdown.md](components/markdown.md) 获取完整 props、插槽与演示。

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
