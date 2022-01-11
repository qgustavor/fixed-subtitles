export { prerender }
async function prerender () {
  const data = (await import('../../data.json')).default
  const showUrls = []
  for (const show of data) {
    showUrls.push('/show/' + show[1])
  }
  return showUrls.map(url => ({ url, pageContext: {} }))
}
