import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import faviconUrl from '../../public/favicon.svg'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import { createApp } from './app'
import type { PageContext } from './types'

export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'routeParams']

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const app = createApp(pageContext)
  const appHtml = await renderToString(app)

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || 'Fixed Subtitles'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="${faviconUrl}" type="image/svg+xml">
      <title>${title}</title>
      <script>(a=>{if(a==='dark'||(a==='auto'&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.className='dark'})(localStorage['vitesse-schema']||'auto')</script>
    </head>
    <body>
      <div id="app">${dangerouslySkipEscape(appHtml)}</div>
    </body>
    </html>
  `

  return {
    documentHtml,
    pageContext: {}
  }
}
