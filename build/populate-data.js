const { orderBy } = require('natural-orderby')
const cp = require('child_process')
const fs = require('fs').promises
const util = require('util')
const path = require('path')

const getShowInfo = require('./get-show-info')
const parseReadme = require('./parse-readme')
const execFile = util.promisify(cp.execFile)

// Get commit hash and author date
const logDelimiter = '#!#@(!)!$#@'
const logFormat = ['', '%H', '%ai', ''].join(logDelimiter)

const repositoryRoot = path.resolve(__dirname, '..')
const subtitlesDir = path.resolve(repositoryRoot, 'subtitles')

async function populateData () {
  const shows = orderBy(await fs.readdir(subtitlesDir))
  const data = []

  for (const show of shows) {
    const showDir = path.resolve(subtitlesDir, show)
    let showInfo
    try {
      showInfo = await getShowInfo(show)
    } catch (err) {
      console.error('Error while getting show info:', err)
      console.error('This show will not be listed until the next rebuild.')
      continue
    }
    const groups = orderBy(await fs.readdir(showDir))

    const [, service, id] = show.match(/^(?:([A-Z]+)-)?(\S+) - /)
    const slug = service ? (service + '-' + id).toLowerCase() : id

    const showData = [show, slug, showInfo]
    data.push(showData)

    for (const group of groups) {
      if (group === 'README.md') continue
      const groupDir = path.resolve(showDir, group)

      const groupMetadataPath = path.resolve(groupDir, 'README.md')
      const groupMetadataBuffer = await fs.readFile(groupMetadataPath)
      const groupMetadata = parseReadme(groupMetadataBuffer.toString(), 'group')
      const groupCommits = []
      const knownCommits = new Set()
      const groupData = [group, groupMetadata, groupCommits]
      showData.push(groupData)

      const groupFiles = orderBy(await fs.readdir(groupDir))
      for (const file of groupFiles) {
        if (file === 'README.md') continue
        const filePath = path.resolve(groupDir, file)
        const fileInfo = await getGitInfo(filePath)

        groupData.push([
          file,
          Math.floor(fileInfo.lastModified.getTime() / 1000),
          fileInfo.changedLines
        ])

        for (const commit of fileInfo.commits) {
          if (commit.status !== 'M') continue
          const shortCommit = commit.hash.slice(0, 7)
          if (knownCommits.has(shortCommit)) continue
          knownCommits.add(shortCommit)
          groupCommits.push([
            shortCommit,
            Math.floor(new Date(commit.date).getTime() / 1000)
          ])
        }
      }
    }
  }

  const targetPath = path.resolve(repositoryRoot, 'src/data.json')
  await fs.writeFile(targetPath, JSON.stringify(data))
}

async function getGitInfo (file) {
  const log = await execFile('git', [
    'log', '--ignore-all-space', '--follow', '--name-status', '--find-renames=95%', '--format=' + logFormat, file
  ], { cwd: repositoryRoot })

  const commitsRaw = log.stdout.split(logDelimiter).map(e => e.trim())
  const commits = []
  for (let i = 1; i < commitsRaw.length; i += 3) {
    const status = commitsRaw[i + 2].split('\t')
    const data = {
      hash: commitsRaw[i],
      date: commitsRaw[i + 1],
      status: status[0],
      file: handleGitFilename(status[1])
    }
    if (status[2]) {
      data.renamedFile = handleGitFilename(status[2])
    }
    commits.push(data)
  }

  if (commits.length === 0) {
    throw Error(`commit ${file} before running this script`)
  }

  // Last modified date considers only commits that modify the file
  const modifiedCommits = commits.filter(e => e.status === 'M')
  if (modifiedCommits.length === 0) {
    // The file was never modified
    return {
      lastModified: new Date(commits[0].date),
      changedLines: 0,
      commits
    }
  }
  const lastModified = new Date(modifiedCommits[0].date)

  const firstCommit = commits[commits.length - 1]
  const lastCommit = commits[0]
  const diffRaw = await execFile('git', [
    'diff', '--numstat',
    firstCommit.hash + ':' + firstCommit.file,
    lastCommit.hash + ':' + (lastCommit.renamedFile || lastCommit.file)
  ], { cwd: repositoryRoot })
  const diff = diffRaw.stdout.split(/\t| => /g)
  const changedLines = Number(diff[0])

  return { lastModified, changedLines, commits }
}

function handleGitFilename (rawName) {
  // WARN: this behavior might vary based on the OS
  return Buffer.from(rawName.replace(/^"|"$/g, '')
    .replace(/\\([0-7]{3})/g, (all, e) => String.fromCharCode(parseInt(e, 8))), 'ascii'
  ).toString()
}

populateData().catch(error => {
  console.error(error)
  process.exit(1)
})
