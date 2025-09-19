import fs from 'fs/promises'
import { normalizeTestImageFilename as normalizeFilename } from '../common/helpers.js'

const defaultImageExtension = 'png'

/** Provides the neccessary Node.js Cypress tasks to be used as helpers for the visual testing command */
export default function visualTestingTasks(cypressConfig) {
  return {
    /** Checks if the given image exists in the base images directory */
    async maybeVisualTestExists({ imageName }) {
      imageName = normalizeFilename(imageName, defaultImageExtension)

      try {
        await fs.stat(`${cypressConfig.visualTestFolder}/${imageName}`)
        return true
      } catch (err) {
        if (err.code === 'ENOENT') return false
        else throw err
      }
    },
    /** Moves an existing screenshot into the base images directory */
    async mvToVisualTestFolder({ imageName }) {
      imageName = normalizeFilename(imageName, defaultImageExtension)

      try {
        await fs.stat(cypressConfig.visualTestFolder)
      } catch (err) {
        if (err.code === 'ENOENT') fs.mkdir(cypressConfig.visualTestFolder)
        else throw err
      }

      await fs.rename(
        `${cypressConfig.screenshotsFolder}/${imageName}`,
        `${cypressConfig.visualTestFolder}/${imageName}`
      )
      return null
    },
    /** Erases an image from the screenshots folder */
    async rmCurrentVisualState({ imageName }) {
      imageName = normalizeFilename(imageName, defaultImageExtension)
      await fs.rm(`${cypressConfig.screenshotsFolder}/${imageName}`)
      return null
    },
  }
}
