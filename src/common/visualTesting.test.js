import { describe, it, expect } from 'vitest'

import { imgBase64ToDataUrl } from './visualTesting'

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
    const inputA = '', inputB = 'not.a;base64', inputC = 'çÁëỳ',
          inputD = '-_+', inputE = '=abcd', inputF = 'ab=cd'
    // Assert
    expect(() => imgBase64ToDataUrl(inputA)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputB)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputC)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputD)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputE)).toThrow(TypeError, 'argument should be a valid base64 string')
    expect(() => imgBase64ToDataUrl(inputF)).toThrow(TypeError, 'argument should be a valid base64 string')
  })
})
