export { prerender }
async function prerender () {
  const data = (await import('../../data.json')).default
  const pageCount = Math.ceil(data.length / 24)
  const paginationUrls = ['/shows/']
  for (let i = 1; i < pageCount; i++) {
    paginationUrls.push('/shows/' + i)
  }
  return paginationUrls.map(url => ({ url, pageContext: {} }))
}
