import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts' // 用于生成 .d.ts 类型文件（你之前简历亮点里提到的）

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.app.json', // 指向你的 tsconfig
      outDir: 'dist/types', // 输出目录
      rollupTypes: true, //开启类型汇总，将分散的类型全部合并到一个 index.d.ts 中，极其清爽
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 开启库模式
    lib: {
      // 指定刚刚写好的入口文件
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      // UMD 格式下挂载在 window 上的全局变量名
      name: 'VkElement',
      // 输出的文件名（会和 formats 结合，比如 vk-element.es.js）
      fileName: (format) => `vk-element.${format}.js`,
      formats: ['es', 'umd'], // 指定打包格式
    },
    rollupOptions: {
      // 核心要求：确保外部化处理那些你不想打包进库的依赖
      external: ['vue', '@fortawesome/fontawesome-svg-core', '@fortawesome/vue-fontawesome'],
      output: {
        // 在 UMD 构建模式下，为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        // 让打包出的 css 名字统一，而不是叫 style.css
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0]

          if (fileName === 'style.css') return 'index.css'
          return fileName ?? '[name][extname]'
        },
      },
    },
  },
})
