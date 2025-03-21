import { describe, it, expect } from 'vitest'

import { arePixelsSimilar } from './naive'

describe('function #arePixelsSimilar', () => {
  it('should consider two pixels as similar if all their HSL channels diffs are within the threshold', () => {
    // Arrange
    const pixelsWithThreshold = [
      // HSL (0,0,0)     HSL (170,48,48)         HSL (0,0,50)      HSL (175,48,75)        HSL (0,0,100)     HSL (165,49,55)
        [[0, 0, 0],      [64, 181, 162], .5],   [[127, 127, 127],  [161, 222, 217], .5], [[255, 255, 255],  [84, 196, 168], .5],
      // HSL (0,100,50)  HSL (85,78,70)          HSL (120,100,50)  HSL (40,80,30)         HSL (240,100,50)  HSL (320,84,70)
        [[255, 0, 0],    [188, 238, 119], .25], [[0, 255, 0],      [138, 97, 15], .25],  [[0, 0, 255],      [243, 114, 200], .25],
      // HSL (0,68,42)   HSL (30,60,48)          HSL (82,39,30)    HSL (50,45,25)         HSL (219,79,66)   HSL (255,69,76)
        [[178, 34, 34],  [196, 122, 49], .1],   [[85, 107, 47],    [92, 83, 35], .1],    [[100, 149, 237],  [173, 152, 236], .1],
    ]
    let result

    pixelsWithThreshold.forEach(([rgbPixel1, rgbPixel2, threshold]) => {
      // Act
      result = arePixelsSimilar(rgbPixel1, rgbPixel2, threshold)
      // Assert
      expect(result).toBe(true)
    })
  })

  it('should consider two pixels as different if some of their HSL channels diffs surpass the threshold', () => {
    // Arrange
    const pixelsWithThreshold = [
      // HSL (0,0,0)     HSL (190,48,48)         HSL (0,0,50)      HSL (175,52,75)        HSL (0,0,100)     HSL (165,49,45)
        [[0, 0, 0],      [64, 162, 181], .5],   [[127, 127, 127],  [158, 224, 219], .5], [[255, 255, 255],  [59, 171, 143], .5],
      // HSL (0,100,50)  HSL (85,78,80)          HSL (120,100,50)  HSL (40,70,30)         HSL (240,100,50)  HSL (340,84,70)
        [[255, 0, 0],    [211, 244, 164], .25], [[0, 255, 0],      [130, 94, 23], .25],  [[0, 0, 255],      [243, 114, 157], .25],
      // HSL (0,68,42)   HSL (30,56,48)          HSL (82,39,30)    HSL (42,45,25)         HSL (219,79,66)   HSL (255,69,77)
        [[178, 34, 34],  [191, 122, 54], .1],   [[85, 107, 47],    [92, 75, 35], .1],    [[100, 149, 237],  [176, 156, 237], .1],
    ]
    let result

    pixelsWithThreshold.forEach(([rgbPixel1, rgbPixel2, threshold]) => {
      // Act
      result = arePixelsSimilar(rgbPixel1, rgbPixel2, threshold)
      // Assert
      expect(result).toBe(false)
    })
  })

  it('should only accept pixel arguments that are valid RGB vectors', () => {
    // Arrange
    const invalidRgbVectors = [
            '255,255,255', [0, 0, '0'], [127, 127.5, 127], [-64, 64, 64],
            [255, 255, 512], [0, 0], [0, 0, 0, 0], [], null, undefined, false,
          ], validRgbVec = [0, 0, 0], validThreshold = 0.5
    let attempt1, attempt2

    invalidRgbVectors.forEach(invalidRgbVec => {
      // Act
      attempt1 = () => arePixelsSimilar(validRgbVec, invalidRgbVec, validThreshold)
      attempt2 = () => arePixelsSimilar(invalidRgbVec, validRgbVec, validThreshold)
      // Assert
      expect(attempt1).toThrow(TypeError('value should only be a RGB vector (array of 3 integers ranging from 0 to 255)'))
      expect(attempt2).toThrow(TypeError('value should only be a RGB vector (array of 3 integers ranging from 0 to 255)'))
    })
  })

  it('should only accept a threshold argument that is a number > 0 and < 1', () => {
    // Arrange
    const invalidThresholds = [
            0, 1, 1.25, -0.75, '0.5', true, {}, null, undefined, () => {}
          ], validRgbVec1 = [0, 0, 0], validRgbVec2 = [255, 255, 255]
    let attempt

    invalidThresholds.forEach(invalidThreshold => {
      // Act
      attempt = () => arePixelsSimilar(validRgbVec1, validRgbVec2, invalidThreshold)
      // Assert
      expect(attempt).toThrow(TypeError('value should only be a number bigger than 0 and smaller than 1'))
    })
  })
})

describe.todo('function #highlightedDiffPixel')
describe.todo('function #diffResultMessage')
describe.todo('function #calcDiffWithCanvas')
describe.todo('function #testImagesDiff')
