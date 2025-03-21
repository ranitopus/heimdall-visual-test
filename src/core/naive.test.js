import { describe, it, expect } from 'vitest'

import { arePixelsSimilar } from './naive'

describe('function #arePixelsSimilar', () => {
  it.todo('should consider two pixels as similar if all their HSL channels diffs are within the threshold', () => {

  })

  it.todo('should consider two pixels as different if all their HSL channels diffs are within the threshold', () => {

  })

  it('should only accept pixel arguments that are valid RGB vectors', () => {
    // Arrange
    const invalidRgbVectors = [
            '255,255,255', [0, 0, '0'], [127, 127.5, 127], [-64, 64, 64],
            [255, 255, 512], [0, 0], [0, 0, 0, 0], [], null, undefined, false,
          ], validRgbVector = [0, 0, 0], validThreshold = 0.5
    let attempt1, attempt2

    invalidRgbVectors.forEach(rgbVec => {
      // Act
      attempt1 = () => arePixelsSimilar(validRgbVector, rgbVec, validThreshold)
      attempt2 = () => arePixelsSimilar(rgbVec, validRgbVector, validThreshold)
      // Assert
      expect(attempt1).toThrow(TypeError('value should only be a RGB vector (array of 3 integers ranging from 0 to 255)'))
      expect(attempt2).toThrow(TypeError('value should only be a RGB vector (array of 3 integers ranging from 0 to 255)'))
    })
  })

  it('should only accept a threshold argument that is a number > 0 and < 1', () => {
    // Arrange
    const invalidThresholds = [
            0, 1, 1.25, -0.75, '0.5', true, {}, null, undefined, () => {}
          ], rgbPx1 = [0, 0, 0], rgbPx2 = [255, 255, 255]
    let attempt

    invalidThresholds.forEach(threshold => {
      // Act
      attempt = () => arePixelsSimilar(rgbPx1, rgbPx2, threshold)
      // Assert
      expect(attempt).toThrow(TypeError('value should only be a number bigger than 0 and smaller than 1'))
    })
  })
})

describe.todo('function #highlightedDiffPixel')
describe.todo('function #diffResultMessage')
describe.todo('function #calcDiffWithCanvas')
describe.todo('function #testImagesDiff')
