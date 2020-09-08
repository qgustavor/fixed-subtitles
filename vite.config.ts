import path from 'path'
import { UserConfig } from 'vite'
import Voie from 'vite-plugin-voie'
import PurgeIcons from 'vite-plugin-purge-icons'
import ViteComponents from 'vite-plugin-components'
import ViteYaml from 'vite-plugin-yaml'

const alias = {
  '/~/': path.resolve(__dirname, 'src')
}

const config: UserConfig = {
  base: '/fixed-subtitles/',
  outDir: 'dist/fixed-subtitles',
  alias,
  plugins: [
    Voie(),
    ViteComponents({
      // currently, vite does not provide an API for plugins to get the config https://github.com/vitejs/vite/issues/738
      // as the `alias` changes the behavior of middlewares, you have to pass it to ViteComponents to do the resolving
      alias,
    }),
    PurgeIcons(),
    ViteYaml
  ]
}

export default config
