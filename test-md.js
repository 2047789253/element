import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'

const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype)
const hast = processor.runSync(processor.parse('```js\nconst x = 1\n```'))
console.log(JSON.stringify(hast, null, 2))
