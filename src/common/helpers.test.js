import { describe, it, expect } from 'vitest'

import { imgBase64ToDataUrl, rgbToHsl, normalizeTestImageFilename } from './helpers'

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

  it('should accept a base64 string with slashes and plus signs', () => {
    // Arrange
    const input = 'lorem+ipsum/123/+456',
          formattedInputForRegExp = input.replace(/\//g, '\\/').replace(/\+/g, '\\+')
    // Act
    const result = imgBase64ToDataUrl(input)
    // Assert
    expect(result).toMatch(new RegExp(`^data:image/[a-z]{3,4};base64,${formattedInputForRegExp}`))
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
    expect(attemptC).toThrow(TypeError('value should only be a valid base64 string'))
  })

  it('should only accept a valid base64 string as argument', () => {
    // Arrange
    const invalidInputs = [
      false, 0, {}, '', 'not.a;base64', 'çÁëỳ', '-_+', '=abcd', 'ab=cd',
    ]
    let attempt

    invalidInputs.forEach(input => {
      // Act
      attempt = () => imgBase64ToDataUrl(input)
      // Assert
      expect(attempt).toThrow(TypeError('value should only be a valid base64 string'))
    })
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

  it('should only accept a valid RGB vector as argument (array of 3 integers ranging from 0 to 255)', () => {
    // Arrange
    const invalidInputs = [
      '255,255,255', [0, 0, '0'], [127, 127.5, 127], [-64, 64, 64],
      [255, 255, 512], [0, 0], [0, 0, 0, 0], [], null, undefined, false,
    ]
    let attempt

    invalidInputs.forEach(input => {
      // Act
      attempt = () => rgbToHsl(input)
      // Assert
      expect(attempt).toThrow(TypeError('value should only be a RGB vector (array of 3 integers ranging from 0 to 255)'))
    })
  })
})

describe('function #normalizeTestImageFilename', () => {
  it('should convert string from format "a/b/c" to "a_b_c"', () => {
    // Arrange
    const filename = 'path/to/file'
    // Act
    const result = normalizeTestImageFilename(filename)
    // Assert
    expect(result).toMatch('path_to_file')
  })

  it('should add file extension when valid argument is passed (for now: jpg/jpeg, png, webp)', () => {
    // Arrange
    const filename = 'another/file/path', validExtensions = [
      'jpg', 'jpeg', 'png', 'webp',
      'JPG', 'JPEG', 'PNG', 'WEBP',
      'Jpg', 'jPeg', 'pnG', 'wEbP',
    ]
    let result

    validExtensions.forEach(extension => {
      // Act
      result = normalizeTestImageFilename(filename, extension)
      // Assert
      expect(result).toMatch(/another_file_path\.[jpg|jpeg|png|webp]/)
    })
  })

  it('should only accept a non-empty string as filename argument', () => {
    // Arrange
    const invalidFilenames = [
      /regex\/to\/file/, '', 1337, false, null, undefined, {}, [], () => {},
    ]
    let attempt

    invalidFilenames.forEach(filename => {
      // Act
      attempt = () => normalizeTestImageFilename(filename)
      // Assert
      expect(attempt).toThrow(TypeError('value should only be a non-empty string'))
    })
  })

  it('should not accept invalid image extensions as second argument', () => {
    // Arrange
    const filename = 'yet/another/path', invalidExtensions = [
      1337, false, {}, [], () => {}, '',
      'mp3', 'wav', 'svg', 'gif', 'webm', 'mkv', 'html',
    ]
    let attempt

    invalidExtensions.forEach(extension => {
      // Act
      attempt = () => normalizeTestImageFilename(filename, extension)
      // Accept
      expect(attempt).toThrow(TypeError('value should only be an accepted image extension (strings jpg, jpeg, png or webp)'))
    })
  })
})
