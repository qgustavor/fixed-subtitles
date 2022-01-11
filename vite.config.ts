import path from 'path'
import { UserConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import content from '@originjs/vite-plugin-content'
import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'

const config: UserConfig = {
  base: '/fixed-subtitles/',
  outDir: 'dist/fixed-subtitles',
  resolve: {
    alias: {
      '/~': path.resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  plugins: [
    vue(),
    ssr(),
    Components({
      importPathTransform: path => path.match(/^[a-z]:/i)
        ? path.replaceAll('\\', '\\\\')
        : path,
      resolvers: [IconsResolver()]
    }),
    Icons({ compiler: 'vue3' }),
    content()
  ]
}

export default config
