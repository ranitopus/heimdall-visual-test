import { describe, it, expect } from 'vitest'

import { imgBase64ToDataUrl, rgbToHsl, loadHtmlImage } from './helpers'

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
    const resultA  = imgBase64ToDataUrl(inputA),
          resultB  = imgBase64ToDataUrl(inputB),
          attemptC = () => imgBase64ToDataUrl(inputC)
    // Assert
    expect(resultA).toMatch(new RegExp(`^data:image/[a-z]{3,4};base64,${inputA}`))
    expect(resultB).toMatch(new RegExp(`^data:image/[a-z]{3,4};base64,${inputB}`))
    expect(attemptC).toThrow(TypeError, 'argument should be a valid base64 string')
  })

  it('should not accept a non-string input', () => {
    // Arrange
    const inputA = false, inputB = 0, inputC = {}
    // Act
    const attemptA = () => imgBase64ToDataUrl(inputA),
          attemptB = () => imgBase64ToDataUrl(inputB),
          attemptC = () => imgBase64ToDataUrl(inputC)
    // Assert
    expect(attemptA).toThrow(TypeError, 'argument should be a string')
    expect(attemptB).toThrow(TypeError, 'argument should be a string')
    expect(attemptC).toThrow(TypeError, 'argument should be a string')
  })

  it('should not accept an invalid base64 string as argument', () => {
    // Arrange
    const inputA = '',    inputB = 'not.a;base64', inputC = 'çÁëỳ',
          inputD = '-_+', inputE = '=abcd',        inputF = 'ab=cd'
    // Act
    const attemptA = () => imgBase64ToDataUrl(inputA),
          attemptB = () => imgBase64ToDataUrl(inputB),
          attemptC = () => imgBase64ToDataUrl(inputC),
          attemptD = () => imgBase64ToDataUrl(inputD),
          attemptE = () => imgBase64ToDataUrl(inputE),
          attemptF = () => imgBase64ToDataUrl(inputF)
    // Assert
    expect(attemptA).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(attemptB).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(attemptC).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(attemptD).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(attemptE).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(attemptF).toThrow(TypeError, 'argument should be a valid base64 string')
  })
})

describe('function #rgbToHsl', () => {
  it('should correctly convert an RGB vector to a HSL vector', () => {
    // Arrange
    const inputA = [0, 0, 0],     inputB = [127, 127, 127], inputC = [255, 255, 255], // black,     grey,           white,
          inputD = [255, 0, 0],   inputE = [0, 255, 0],     inputF = [0, 0, 255],     // red,       green,          blue,
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

  it('should not accept an input that is not a valid RGB vector (array of 3 integers ranging from 0 to 255)', () => {
    // Arrange
    const inputA = '255,255,255',     inputB = [],            inputC = [0, 0, '0'],
          inputD = [127, 127.5, 127], inputE = [-64, 64, 64], inputF = [255, 255, 512],
          inputG = null,              inputH = [0, 0],        inputI = [0, 0, 0, 0]
    // Act
    const attemptA = () => rgbToHsl(inputA), attemptB = () => rgbToHsl(inputB),
          attemptC = () => rgbToHsl(inputC), attemptD = () => rgbToHsl(inputD),
          attemptE = () => rgbToHsl(inputE), attemptF = () => rgbToHsl(inputF),
          attemptG = () => rgbToHsl(inputG), attemptH = () => rgbToHsl(inputH),
          attemptI = () => rgbToHsl(inputI)
    // Assert
    expect(attemptA).toThrow(TypeError,  'value should be an array')
    expect(attemptB).toThrow(RangeError, 'value should have exactly 3 items')
    expect(attemptC).toThrow(TypeError,  'some item in value is not an integer number')
    expect(attemptD).toThrow(TypeError,  'some item in value is not an integer number')
    expect(attemptE).toThrow(RangeError, 'some item in value is not a positive integer')
    expect(attemptF).toThrow(RangeError, 'some item in value is over 255')
    expect(attemptG).toThrow(TypeError,  'value should not be falsy/empty')
    expect(attemptH).toThrow(RangeError, 'value should have exactly 3 items')
    expect(attemptI).toThrow(RangeError, 'value should have exactly 3 items')
  })
})

describe.todo('function #loadHtmlImage')
