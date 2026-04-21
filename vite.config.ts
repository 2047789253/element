import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      outDir: 'dist/types',
      rollupTypes: true,
      afterBuild: () => {
        import('fs').then((fs) => {
          const path = 'dist/types/index.d.ts'
          if (fs.existsSync(path)) {
            let content = fs.readFileSync(path, 'utf-8')
            content = content.replace(/\$nextTick:\s*nextTick/g, '$nextTick: typeof nextTick')
            content = content.replace(
              /, GlobalComponents, GlobalDirectives,/g,
              ', Record<string, any>, Record<string, any>,',
            )
            content = content.replace(/import\s+\{\s*GlobalComponents\s*\}\s+from\s+'vue';/g, '')
            fs.writeFileSync(path, content)
          }
        })
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'ElementAI',
      fileName: 'element-ai',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', '@popperjs/core', 'lodash-es'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@popperjs/core': 'Popper',
          'lodash-es': 'lodashEs',
        },
      },
    },
  },
})
