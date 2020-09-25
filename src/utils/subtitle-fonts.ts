export function getFontsFromSubtitle (data) {
  const fonts = new Set()
  const lines = data.replace(/\r/g, '').split('\n')

  // WARN: the format line is ignored like VSFilter does
  const usedStyles = new Set()
  const dialogueLines = lines.filter(e => e.startsWith('Dialogue: '))

  for (const line of dialogueLines) {
    const parts = line.split(',')
    usedStyles.add(parts[3])

    const tags = parts.slice(9).join('\n').match(/\{.*?\}/g)
    const fontTags = tags && tags.join('').match(/\\fn[^\\\}]+/g)
    const lineFonts = fontTags && fontTags.map(e => e.substr(3))
    if (!lineFonts) continue

    for (const font of lineFonts) {
      fonts.add(font)
    }
  }

  const styleLines = lines.filter(e => e.startsWith('Style: '))
  for (const style of styleLines) {
    const parts = style.substr(7).split(',')
    if (usedStyles.has(parts[0])) {
      fonts.add(parts[1])
    }
  }

  return Array.from(fonts).sort()
}
