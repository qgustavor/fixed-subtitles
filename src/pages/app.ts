import { createSSRApp, defineComponent, h } from 'vue'
import { setPageContext } from './usePageContext'
import type { PageContext } from './types'
import PageShell from './PageShell.vue'

import { createI18n } from 'vue-i18n'
import { createHead } from '@egoist/vue-head'
import { messages } from '../messages'
import '@purge-icons/generated'

export { createApp }

function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  const PageWithLayout = defineComponent({
    render() {
      return h(PageShell, {}, {
        default () {
          return h(Page, pageProps || {})
        }
      })
    }
  })

  const app = createSSRApp(PageWithLayout)

  // Make `pageContext` available from any Vue component
  setPageContext(app, pageContext)

  let locale
  if (typeof localStorage !== 'undefined') {
    locale = localStorage.locale
  }

  if (!locale && typeof navigator !== 'undefined') {
    const navigatorLanguages = navigator.languages || [navigator.language]

    for (const language of navigatorLanguages) {
      if (messages[language]) {
        locale = language
        break
      }
      const reducedLang = language.slice(0, 2)
      if (messages[reducedLang]) {
        locale = reducedLang
        break
      }
    }
  }
  if (!locale) locale = 'en'

  if (typeof navigator !== 'undefined') {
    import('@hotwired/turbo')
  }

  const i18n = createI18n({
    locale,
    messages
  })

  const head = createHead()

  app.use(i18n)
  app.use(head)

  return app
}
