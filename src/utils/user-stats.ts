import { init, track, trackPages } from 'insights-js'

export function setupTracking () {
  if (window.__PRERENDER_INJECTED) return
  init('Zihud3kpobeMvNH7')
  trackPages()
}

export { track }
