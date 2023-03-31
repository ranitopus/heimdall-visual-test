const fs = require('fs/promises')

function normalizeFilename(filename) {
  return filename.trim().replace(/\//g, '_') + '.png'
}

module.exports = function visualTestingTasks(cypressConfig) {
  return {
    maybeVisualTestExists({ imageName }) {
      imageName = normalizeFilename(imageName)

      return fs.stat(`${cypressConfig.visualTestFolder}/${imageName}`)
        .then(_=> true)
        .catch(err => {
          if (err.code === 'ENOENT') return false
          else throw err
        })
    },
    async mvToVisualTestFolder({ imageName }) {
      imageName = normalizeFilename(imageName)

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
      imageName = normalizeFilename(imageName)
      return fs.rm(`${cypressConfig.screenshotsFolder}/${imageName}`)
        .then(_=> null)
    },
  }
}
