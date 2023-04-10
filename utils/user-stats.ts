import { init, track, trackPages } from 'insights-js'

export function setupTracking () {
  if (import.meta.env.MODE === 'development') return
  init('Zihud3kpobeMvNH7')
  trackPages({
    search: true
  })
}

export { track }
