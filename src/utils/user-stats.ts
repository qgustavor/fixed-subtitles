import { init, track, trackPages } from 'insights-js'

export function setupTracking () {
  init('Zihud3kpobeMvNH7')
  trackPages()
}

export { track }
