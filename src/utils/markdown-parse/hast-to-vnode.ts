import { Fragment, h, type VNode, type VNodeArrayChildren } from 'vue'
import type { Root, RootContent } from 'hast'
import { toHtml } from 'hast-util-to-html'
import createDOMPurify from 'dompurify'

export type Context = {
  listDepth: number
  listOrdered: boolean
  listItemIndex: number
  svg: boolean
  currentContext?: string
}

const DEFAULT_CONTEXT: Context = {
  listDepth: -1,
  listOrdered: false,
  listItemIndex: -1,
  svg: false,
}

let purifier: ReturnType<typeof createDOMPurify> | null | undefined

const getPurifier = () => {
  if (purifier !== undefined) return purifier
  if (typeof window === 'undefined') {
    purifier = null
    return purifier
  }
  purifier = createDOMPurify(window)
  return purifier
}

const sanitizeToHtml = (value: string): string => {
  const currentPurifier = getPurifier()
  if (!currentPurifier) return value
  return currentPurifier.sanitize(value, { ADD_ATTR: ['target'] }) as string
}

const sanitizeToFragment = (value: string): DocumentFragment | null => {
  const currentPurifier = getPurifier()
  if (!currentPurifier || typeof document === 'undefined') return null
  return currentPurifier.sanitize(value, {
    RETURN_DOM_FRAGMENT: true,
    ADD_ATTR: ['target'],
  }) as DocumentFragment
}

export function transformToVNode(
  node: Root | RootContent,
  ctx: Context = { ...DEFAULT_CONTEXT },
): VNode | string | null {
  if (node.type === 'root') {
    return h(Fragment, renderChildren(node.children, ctx))
  }
  if (node.type === 'text') {
    return node.value
  }
  if (node.type === 'comment' || node.type === 'doctype') {
    return null
  }
  if (node.type === 'element') {
    const tagName = node.tagName
    const properties = node.properties || {}

    switch (tagName) {
      case 'ul':
      case 'ol': {
        const newCtx = {
          ...ctx,
          listDepth: ctx.listDepth + 1,
          listOrdered: tagName === 'ol',
          listItemIndex: -1,
        }
        return h(tagName, properties, renderChildren(node.children, newCtx))
      }
      case 'li': {
        const liCtx = { ...ctx, listItemIndex: ctx.listItemIndex + 1 }
        return h(tagName, properties, renderChildren(node.children, liCtx))
      }
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'table':
      case 'thead':
      case 'tbody':
      case 'tfoot':
      case 'tr':
      case 'th':
      case 'td':
      case 'code':
      case 'b':
      case 'strong':
      case 'i':
      case 'em':
      case 'u':
      case 's':
      case 'strike':
      case 'del':
      case 'br':
      case 'hr':
      case 'p':
      case 'blockquote':
      case 'a':
      case 'img':
        return h(tagName, properties, renderChildren(node.children, ctx))
      default: {
        const html = toHtml(node as any)
        const sanitized = sanitizeToHtml(html)
        return h(tagName, { ...properties, innerHTML: sanitized })
      }
    }
  }

  if (node.type === 'raw') {
    const fragment = sanitizeToFragment(node.value)
    if (!fragment) {
      return h('span', { innerHTML: sanitizeToHtml(node.value) })
    }
    return h(Fragment, domToVNodes(fragment.childNodes))
  }
  return null
}

function renderChildren(nodes: RootContent[], ctx: Context): VNodeArrayChildren {
  return nodes
    .map((node) => transformToVNode(node, ctx))
    .filter((n) => n !== null) as VNodeArrayChildren
}

function domToVNodes(nodes: NodeListOf<ChildNode>): VNodeArrayChildren {
  const result: VNodeArrayChildren = []
  nodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element
      const props: Record<string, any> = {}
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i]
        // 增加空值判断，解决 "attr" 可能为 "未定义" 的报错
        if (attr) {
          props[attr.name] = attr.value
        }
      }
      result.push(h(el.tagName.toLowerCase(), props, domToVNodes(el.childNodes)))
    } else if (node.nodeType === Node.TEXT_NODE) {
      result.push(node.textContent || '')
    }
  })
  return result
}
