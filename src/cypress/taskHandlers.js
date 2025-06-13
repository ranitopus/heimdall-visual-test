import fs from 'fs/promises'
import { normalizeTestImageFilename as normalizeFilename } from '../common/helpers.js'

const defaultImageExtension = 'png'

export default function visualTestingTasks(cypressConfig) {
  return {
    maybeVisualTestExists({ imageName }) {
      imageName = normalizeFilename(imageName, defaultImageExtension)

      return fs.stat(`${cypressConfig.visualTestFolder}/${imageName}`)
        .then(_=> true)
        .catch(err => {
          if (err.code === 'ENOENT') return false
          else throw err
        })
    },
    async mvToVisualTestFolder({ imageName }) {
      imageName = normalizeFilename(imageName, defaultImageExtension)

      await fs.stat(cypressConfig.visualTestFolder).catch(err => {
        if (err.code === 'ENOENT') return fs.mkdir(cypressConfig.visualTestFolder)
        else throw err
      })

      return fs.rename(
        `${cypressConfig.screenshotsFolder}/${imageName}`,
        `${cypressConfig.visualTestFolder}/${imageName}`
      )
        .then(_=> null)
    },
    rmCurrentVisualState({ imageName }) {
      imageName = normalizeFilename(imageName, defaultImageExtension)
      return fs.rm(`${cypressConfig.screenshotsFolder}/${imageName}`)
        .then(_=> null)
    },
  }
}
