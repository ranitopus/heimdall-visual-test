// @vitest-environment jsdom
import { describe, it } from 'vitest'

import { calcDiffWithCanvas, testImagesDiff } from './naive'

describe('function #calcDiffWithCanvas', () => {
  it.todo('should receive two canvas with same resolution and return how many pixels both have')
  it.todo('should compare similar images from two canvas and generate information accordingly')
  it.todo('should compare different images from two canvas and generate information accordingly')
  it.todo('should result in a function tha can put into a container element the two original canvas plus a third canvas with the image diff')
})

describe('function #testImagesDiff', () => {
  it.todo('should receive two URLs representing two similar images, compare them and generate information accordingly')
  it.todo('should receive two URLs representing two different images, compare them and generate information accordingly')
  it.todo('should check a certain number of times if both URL images loaded before proceeding with comparisons')
  it.todo('should fail if any of the URL images is unable to load after the max retry count is surpassed')
})
