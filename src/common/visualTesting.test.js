import { describe, it, expect } from 'vitest'

import { imgBase64ToDataUrl, rgbToHsl } from './visualTesting'

describe('function #imgBase64ToDataUrl', () => {
  it('should generate a valid URL', () => {
    // Arrange
    const input = 'loremipsum123456'
    // Act
    const result = imgBase64ToDataUrl(input)
    // Assert
    expect(result).toMatch(new RegExp(`^data:image/[a-z]{3,4};base64,${input}`))
  })

  it('should accept a base64 string with whitespaces', () => {
    // Arrange
    const input = 'lorem ipsum\n123456\t',
          cleanInput = 'loremipsum123456'
    // Act
    const result = imgBase64ToDataUrl(input)
    // Assert
    expect(result).toMatch(new RegExp(`^data:image/[a-z]{3,4};base64,${cleanInput}`))
  })

  it('should accept a base64 string with up to 2 "=" characters at the end', () => {
    // Arrange
    const inputA = 'abcd=', inputB = 'abcd==', inputC = 'abcd==='
    // Act
    const resultA = imgBase64ToDataUrl(inputA)
    const resultB = imgBase64ToDataUrl(inputB)
    // Assert
    expect(resultA).toMatch(new RegExp(`^data:image/[a-z]{3,4};base64,${inputA}`))
    expect(resultB).toMatch(new RegExp(`^data:image/[a-z]{3,4};base64,${inputB}`))
    expect(() => imgBase64ToDataUrl(inputC)).toThrow(TypeError, 'argument should be a valid base64 string')
  })

  it('should not accept a non-string input', () => {
    // Arrange
    const inputA = false, inputB = 0, inputC = {}
    // Assert
    expect(() => imgBase64ToDataUrl(inputA)).toThrow(TypeError, 'argument should be a string')
    expect(() => imgBase64ToDataUrl(inputB)).toThrow(TypeError, 'argument should be a string')
    expect(() => imgBase64ToDataUrl(inputC)).toThrow(TypeError, 'argument should be a string')
  })

  it('should not accept an invalid base64 string as argument', () => {
    // Arrange
    const inputA = '',    inputB = 'not.a;base64', inputC = 'çÁëỳ',
          inputD = '-_+', inputE = '=abcd',        inputF = 'ab=cd'
    // Assert
    expect(() => imgBase64ToDataUrl(inputA)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputB)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputC)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputD)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputE)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputF)).toThrow(TypeError, 'argument should be a valid base64 string')
  })
})

describe('function #rgbToHsl', () => {
  it('should correctly convert an RGB vector to a HSL vector', () => {
    // Arrange
    const inputA = [0, 0, 0],     inputB = [127, 127, 127], inputC = [255, 255, 255], // white, grey, black
          inputD = [255, 0, 0],   inputE = [0, 255, 0],     inputF = [0, 0, 255],     // red, green, blue
          inputG = [178, 34, 34], inputH = [85, 107, 47],   inputI = [100, 149, 237]  // firebrick, darkolivegreen, cornflowerblue
    // Act
    const resultA = rgbToHsl(inputA), resultB = rgbToHsl(inputB), resultC = rgbToHsl(inputC),
          resultD = rgbToHsl(inputD), resultE = rgbToHsl(inputE), resultF = rgbToHsl(inputF),
          resultG = rgbToHsl(inputG), resultH = rgbToHsl(inputH), resultI = rgbToHsl(inputI)
    // Assert
    expect(resultA).toStrictEqual([0, 0, 0])
    expect(resultB).toStrictEqual([0, 0, 50])
    expect(resultC).toStrictEqual([0, 0, 100])
    expect(resultD).toStrictEqual([0, 100, 50])
    expect(resultE).toStrictEqual([120, 100, 50])
    expect(resultF).toStrictEqual([240, 100, 50])
    expect(resultG).toStrictEqual([0, 68, 42])
    expect(resultH).toStrictEqual([82, 39, 30])
    expect(resultI).toStrictEqual([219, 79, 66])
  })
})

describe.todo('function #arePixelsEqual')
describe.todo('function #highlightedDiffPixel')
describe.todo('function #diffResultMessage')
describe.todo('function #calcDiffWithCanvas')
describe.todo('function #loadImage')
describe.todo('function #testImagesDiff')
