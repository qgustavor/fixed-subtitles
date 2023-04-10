// Well, this module started quite huge, when turned that the solution was way simpler.

import JSZip from '@progress/jszip-esm'
import { saveAs } from './file-saver'

const gitHubPrefix = 'https://raw.githubusercontent.com/qgustavor/fixed-subtitles/master/subtitles/'
export async function* downloadRepoFiles (files) {
  for (const file of files) {
    const response = await fetch(gitHubPrefix + file.path)
    if (!response.ok) throw Error('http error')
    file.data = await response.text()
    yield file
  }
}

export async function zipAndDownload (files, folderName) {
  if (files.length === 1) {
    saveAs(new Blob([files[0].data]), files[0].name)
    return
  }

  const zip = new JSZip()
  for (const file of files) {
    zip.file(file.name, file.data)
  }

  const content = await zip.generateAsync({type: 'blob'})
  saveAs(content, folderName + '.zip')
}
