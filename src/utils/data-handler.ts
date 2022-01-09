import rawData from '../data.json'

let totalChangedLines = 0
let totalFixedFiles = 0
const shows = rawData.map(show => {
  let lastModifiedShow = 0

  const groups = show.slice(3).map(group => {
    let lastModifiedGroup = 0
    let changedLinesGroup = 0

    const files = group.slice(2).map(file => {
      lastModifiedShow = Math.max(lastModifiedShow, file[1])
      lastModifiedGroup = Math.max(lastModifiedGroup, file[1])
      changedLinesGroup += file[2]
      if (file[2] > 0) totalFixedFiles++

      return {
        name: file[0],
        lastModified: file[1],
        changedLines: file[2]
      }
    })
    
    totalChangedLines += changedLinesGroup

    return {
      name: group[0],
      metadata: group[1],
      lastModified: lastModifiedGroup,
      changedLines: changedLinesGroup,
      files
    }
  })

  return {
    folder: show[0],
    slug: show[1],
    metadata: show[2],
    lastModified: lastModifiedShow,
    groups
  }
}).sort((a, b) => b.lastModified - a.lastModified)

const lastUpdatedShows = shows.slice(0, 4)

export { shows, lastUpdatedShows, totalChangedLines, totalFixedFiles }
