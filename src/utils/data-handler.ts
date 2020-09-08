import rawData from '../data.json'

const shows = rawData.map(show => {
  let lastModifiedShow = 0

  const groups = show.slice(3).map(group => {
    let lastModifiedGroup = 0
    let totalChangedLines = 0

    const files = group.slice(2).map(file => {
      lastModifiedShow = Math.max(lastModifiedShow, file[1])
      lastModifiedGroup = Math.max(lastModifiedGroup, file[1])
      totalChangedLines += file[2]

      return {
        name: file[0],
        lastModified: file[1],
        changedLines: file[2]
      }
    })

    return {
      name: group[0],
      metadata: group[1],
      lastModified: lastModifiedGroup,
      changedLines: totalChangedLines,
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

export { shows, lastUpdatedShows }
