const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const cheerio = require('cheerio')
const Prerenderer = require('@prerenderer/prerenderer')
const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer')

const staticDir = path.join(__dirname, '../dist')
const prerenderer = new Prerenderer({
  staticDir,
  indexPath: path.join(staticDir, 'fixed-subtitles/index.html'),
  renderer: new PuppeteerRenderer({
    renderAfterElementExists: '.router-main > *'
  })
})
const baseUrl = 'https://qgustavor.github.io/fixed-subtitles/'
const baseUrlObj = new URL(baseUrl)

async function doPreendering () {
  await prerenderer.initialize()

  const processedRoutes = new Set()
  const pendingRoutes = new Set(['/fixed-subtitles/'])

  while (pendingRoutes.size !== 0) {
    const renderedRoutes = await prerenderer.renderRoutes(Array.from(pendingRoutes))

    for (const route of pendingRoutes) {
      processedRoutes.add(route)
      pendingRoutes.delete(route)
    }

    for (const renderedRoute of renderedRoutes) {
      const outputDir = path.join(staticDir, renderedRoute.route)
      const outputFile = path.join(outputDir, 'index.html')

      await mkdirp(outputDir)
      fs.promises.writeFile(outputFile, renderedRoute.html.trim())

      const $ = cheerio.load(renderedRoute.html)
      const anchors = $('a').get()
      for (const anchor of anchors) {
        const anchorHref = $(anchor).attr('href')
        if (!anchorHref) continue
        const url = new URL(anchorHref, baseUrl)
        if (url.hostname === baseUrlObj.hostname && !processedRoutes.has(url.pathname)) {
          pendingRoutes.add(url.pathname)
        }
      }
    }
  }

  prerenderer.destroy()
}

doPreendering().catch(err => {
  prerenderer.destroy()
  console.error(err)
  process.exit(1)
})
