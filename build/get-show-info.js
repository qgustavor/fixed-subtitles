const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const parseReadme = require('./parse-readme.js')
const repositoryRoot = path.resolve(__dirname, '..')
const subtitlesDir = path.resolve(repositoryRoot, 'subtitles')
const cacheDir = path.resolve(repositoryRoot, '.cache')

module.exports = async function getShowInfo (folderName) {
  const idMatches = folderName.match(/^(?:([A-Z]+)-)?(\S+) - /)
  if (!idMatches) throw Error(`could not find show id for ${folderName}`)

  const listService = idMatches[1] || 'AL'
  const id = idMatches[2]
  const cacheKey = listService + '-' + id

  // Try to read show info from the show folder
  const showMetadataPath = path.resolve(subtitlesDir, folderName, 'README.md')
  const showMetadata = await fs.promises.readFile(showMetadataPath).catch(() => null)
  if (showMetadata) return parseReadme(showMetadata.toString(), 'show')

  // Try to read show info from the cache
  const cachedMetadataPath = path.resolve(cacheDir, cacheKey + '.json')
  const cachedMetadata = await fs.promises.readFile(cachedMetadataPath).catch(() => null)
  if (cachedMetadata) {
    console.log('Got %s data from cache', cacheKey)
    return JSON.parse(cachedMetadata.toString())
  }

  // Fetch show info using the list service api
  const listFn = listServices[listService]
  if (!listFn) throw Error(`no handler for ${listService} was implemented yet`)

  const showRemoteData = await listFn(id)

  await fs.promises.access(cacheDir).catch(err => {
    if (err.code !== 'ENOENT') throw err
    return fs.promises.mkdir(cacheDir)
  })
  await fs.promises.writeFile(cachedMetadataPath, JSON.stringify(showRemoteData))

  console.log('Got %s data from API', cacheKey)
  return showRemoteData
}

const anilistToken = process.env.ANILIST_TOKEN
const ANILIST_ENDPOINT = 'https://graphql.anilist.co'
const GET_MEDIA_INFO = `
  query ($id: Int, $type: MediaType){
    Media(id: $id, type: $type) {
      title { romaji }
      format
      episodes
      season
      seasonYear
      coverImage { large }
      externalLinks { site url }
    }
  }
`
async function fetchAniList (id) {
  if (!anilistToken) throw Error('Missing ANILIST_TOKEN environment variable')

  let response
  for (let retries = 0; retries < 2; retries++) {
    // Slow down API requests
    // "Rate limiting is currently set to 90 requests per minute."
    // https://anilist.gitbook.io/anilist-apiv2-docs/overview/rate-limiting
    await new Promise(resolve => setTimeout(resolve, (60e3 / 90) * (Math.random() + Math.pow(2, retries))))

    response = await fetch(ANILIST_ENDPOINT, {
      method: 'post',
      headers: {
        authorization: 'Bearer ' + anilistToken,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: GET_MEDIA_INFO,
        variables: {
          type: 'ANIME',
          id
        }
      })
    })
    if (response.ok) break
    console.error(`AniList API response is ${response.status}`)
  }

  if (!response.ok) throw Error('Retried AniList too many times')

  const mediaInfo = await response.json()
  const media = mediaInfo.data.Media
  const externalLinks = media.externalLinks.filter(e => whitelistedSites.includes(e.site))

  return {
    ...media,
    title: media.title.romaji,
    coverImage: media.coverImage.large,
    externalLinks
  }
}

const whitelistedSites = [
  'Amazon',
  'AnimeLab',
  'Crunchyroll',
  'Funimation',
  'Hidive',
  'Hulu',
  'Netflix',
  'VRV',
  'Youtube'
]

const listServices = {
  AL: fetchAniList
}
