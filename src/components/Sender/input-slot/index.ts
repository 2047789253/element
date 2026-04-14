import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './index.vue'

const InputSlot = Node.create({
  name: 'inputSlot',
  group: 'inline',
  inline: true,
  content: 'inline*',
  atom: false,
  selectable: true,
  draggable: false,

  parseHTML() {
    return [
      {
        tag: 'input-slot',
        getAttrs: (element) => ({
          placeholder: element.getAttribute('placeholder'),
        }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['input-slot', mergeAttributes(HTMLAttributes), 0]
  },

  addAttributes() {
    return {
      placeholder: {
        default: '',
        parseHTML: (element) => element.getAttribute('placeholder') || '',
        renderHTML: (attributes) => ({
          placeholder: attributes.placeholder,
        }),
      },
      isCustomSlot: {
        default: false,
      },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})

export default InputSlot
