import {
  imgBase64ToDataUrl, normalizeTestImageFilename as normalizeFilename,
} from '../common/helpers.js'
import { testImagesDiff } from '../core/naive.js'

Cypress.Commands.add('visualTest', {prevSubject: 'optional'}, (_, {
  snapshotName, commandTimeout = 30_000, imageDiffOptions = {},
}) => {
  const previousCommandTimeout = Cypress.config('defaultCommandTimeout')
  Cypress.config('defaultCommandTimeout', commandTimeout)

  const snapshotSuffix = `--${
    Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')
  }`
  const snapshotCompleteName = normalizeFilename(`${snapshotName}${snapshotSuffix}`)

  cy.task('maybeVisualTestExists', {imageName: snapshotCompleteName})
    .then(result => {
      if (result === false) {
        cy.log('Saving base screen image for Visual Testing...')
        cy.screenshot(snapshotCompleteName).then(_=> cy.task('mvToVisualTestFolder', {imageName: snapshotCompleteName}))
        Cypress.config('defaultCommandTimeout', previousCommandTimeout)
        return
      }

      cy.log('Updating current screen image for Visual Testing comparison...')
      cy.screenshot(snapshotCompleteName, {overwrite: true})

      cy.readFile(`${Cypress.config('visualTestFolder')}/${snapshotCompleteName}.png`, 'base64')
        .then(baseImgUrl => {
          cy.readFile(`${Cypress.config('screenshotsFolder')}/${snapshotCompleteName}.png`, 'base64')
            .then(async newImgUrl => {
              await cy.task('rmCurrentVisualState', {imageName: snapshotCompleteName})

              baseImgUrl = imgBase64ToDataUrl(baseImgUrl)
              newImgUrl = imgBase64ToDataUrl(newImgUrl)

              const { thresholdReached, diffResultMessage } = await testImagesDiff({...imageDiffOptions, baseImgUrl, newImgUrl})

              if (thresholdReached) throw Error(
                'The current screen was evaluated as different from the expected in comparison to the base image.\n\n' +
                diffResultMessage
              )
              else cy.log(diffResultMessage)
            })
        })
    })
})
