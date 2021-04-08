import parse from './ass-parser'

export function getFontsFromSubtitle (data) {
  const parsed = parse(data)
  const eventsSection = parsed.find(e => e.section === 'Events')
  const styleSection = parsed.find(e => e.section.includes('Styles'))

  // Get used fonts and variants
  const usedFonts = new Set()
  for (const event of eventsSection.body) {
    if (event.key !== 'Dialogue') continue

    const style = styleSection.body.find(e => e.value.Name === event.value.Style)
    let font = style.value.Fontname.trim()
    let isBold = Number(style.value.Bold) === -1
    let isItalic = Number(style.value.Italic) === -1

    const getKey = () => font + (isBold ? ':bold' : '') + (isItalic ? ':italic' : '')
    let currentKey = null
    const handleKey = () => {
      const oldKey = currentKey
      currentKey = getKey()
      if (oldKey !== currentKey) usedFonts.add(currentKey)
    }

    if (!event.value.Text.startsWith('{')) handleKey()
    const blocks = event.value.Text.replace(/\}\{/g, '').match(/\{.+?\}/g)
    if (!blocks) continue

    for (const block of blocks) {
      const tags = block.slice(1, -1).match(/\\fn[^\\]+|\\[ib]\d+/g) || []
      for (const tag of tags) {
        if (tag.startsWith('\\fn')) {
          font = tag.substr(3).trim()
        } else if (tag.startsWith('\\b')) {
          isBold = tag.substr(2) !== '0'
        } else if (tag.startsWith('\\i')) {
          isItalic = tag.substr(2) !== '0'
        }
      }
      handleKey()
    }
  }

  return Array.from(usedFonts).sort().map(font => {
    const name = font.replace(/(:bold)?(:italic)?$/, '')
    const variant = font.substr(name.length).replace(/:/g, '') || 'regular'
    return { name, variant }
  }).reduce((fonts, e) => {
    const index = fonts.findIndex(font => font.name === e.name)
    if (index === -1) {
      fonts.push({
        name: e.name,
        variants: [e.variant]
      })
    } else {
      fonts[index].variants.push(e.variant)
    }
    return fonts
  }, [])
}
