<script lang="ts">
import { defineComponent, h, Fragment, type VNode, type VNodeArrayChildren } from 'vue'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math' // 🌟 新增：解析 $...$
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex' // 🌟 新增：将数学节点转为 HAST
import CodeHighlight from '../CodeHighlight/index.vue'
import 'katex/dist/katex.min.css'

export default defineComponent({
  name: 'ElAMarkdown',
  props: {
    content: { type: String, default: '' },
  },
  setup(props) {
    const transform = (node: any): VNode | string | null => {
      if (node.type === 'text') return node.value

      if (node.type === 'element') {
        const { tagName, properties, children } = node

        // 1. 拦截代码块
        if (tagName === 'pre') {
          const codeNode = children?.find((c: any) => c.tagName === 'code')
          if (codeNode) {
            const extractText = (n: any): string => {
              if (n.type === 'text') return n.value
              if (n.children) return n.children.map(extractText).join('')
              return ''
            }
            const lang = codeNode.properties?.className?.[0]?.replace('language-', '') || 'text'
            return h(CodeHighlight, { code: extractText(codeNode), lang })
          }
        }

        // 2. 普通标签转换
        const propsData = { ...properties }
        if (Array.isArray(propsData.className)) {
          propsData.class = propsData.className.join(' ')
          delete propsData.className
        }

        const vnodeChildren = (children ? children.map(transform) : []) as VNodeArrayChildren
        return h(tagName, propsData, vnodeChildren)
      }

      if (node.type === 'root') {
        return h(
          'div',
          { class: 'markdown-body' },
          (node.children ? node.children.map(transform) : []) as VNodeArrayChildren,
        )
      }
      return null
    }

    return () => {
      try {
        // 🌟 升级管道：增加数学公式的处理流
        const processor = unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkMath) // 解析 Markdown 中的 $
          .use(remarkRehype)
          .use(rehypeKatex) // 将数学 AST 转为 HTML 结构

        const hast = processor.runSync(processor.parse(props.content))
        return transform(hast)
      } catch (err) {
        console.error('Markdown 渲染失败:', err)
        return h(Fragment, [props.content])
      }
    }
  },
})
</script>
