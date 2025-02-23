// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest'

import { loadHtmlImage } from './helpers'

describe('function #loadHtmlImage', () => {
  const testImageDataURI = () => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAaRJREFUeJzt3cFtwjAAQNFQdQYG6BRs0Y7aMZiiq9BLr42RQkjIf+8aAiZ8WbIPeJoAAAAAAAAAgKM5bT2AaZpuK7//0u+49/Et8rblh7M9AcQJIE4AcQKIE0CcAOKesQadXUffLpdVP/x0vS66fwfjW/U3MgPECSBOAHECiBNAnADiBBD3iDXm7Dr/e3Dz5wMGsGsfg+vn+X2GtfcJzABxAogTQJwA4gQQJ4A4AcS9bz2Aw/sZXD8/ZRT/MgPECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBC3+XkBh/8fwcF5A84LYFMCiBNAnADiBBAngDgBxG16dv2f194n2Pk6f8QMECeAOAHECSBOAHECiBNA3B72AUa23Sd48XX+iBkgTgBxAogTQJwA4gQQJ4C4Xa9R77Ron2Dka/ySl36GZoA4AcQJIE4AcQKIE0CcAOJeeg17p9l9gjsc+hmZAeIEECeAOAHECSBOAHECAAAAAAAAAAA4mF94NB2vTkgkBwAAAABJRU5ErkJggg=='

  it('should correctly change indicator attribute when the image loads', async () => {
    // Arrange
    const imageSrc = testImageDataURI()
    // Act
    const result = loadHtmlImage(imageSrc)
    // Assert
    expect(result.hasLoaded).not.toBeDefined()
    await vi.waitFor(() => {
      expect(result.hasLoaded).toBe(true)
    })
  })

  it('should correctly execute a given success callback when the image loads', async () => {
    // Arrange
    const imageSrc = testImageDataURI(), onloadCallback = vi.fn()
    // Act
    const result = loadHtmlImage(imageSrc, onloadCallback)
    // Assert
    expect(onloadCallback).not.toBeCalled()
    await vi.waitFor(() => {
      expect(onloadCallback).toHaveBeenCalledOnce()
      expect(onloadCallback).toHaveBeenCalledWith(result, expect.anything())
    })
  })

  it('should correctly change indicator attribute when the image fails to load', async () => {
    // Arrange
    const imageSrc = 'invalid image source'
    // Act
    const result = loadHtmlImage(imageSrc)
    // Assert
    expect(result.hasLoaded).not.toBeDefined()
    await vi.waitFor(() => {
      expect(result.hasLoaded).toBe(false)
    })
  })

  it('should correctly execute a given failure callback when the image fails to load', async () => {
    // Arrange
    const imageSrc = 'invalid image source', onerrorCallback = vi.fn()
    // Act
    loadHtmlImage(imageSrc, null, onerrorCallback)
    // Assert
    expect(onerrorCallback).not.toBeCalled()
    await vi.waitFor(() => {
      expect(onerrorCallback).toHaveBeenCalledOnce()
    })
  })

  it('should only accept non-empty string as URL argument', () => {
    // Arrange
    const imageSrc = ''
    // Act
    const attempt = () => loadHtmlImage(imageSrc)
    // Assert
    expect(attempt).toThrow(TypeError('value should only be a non-empty string'))
  })
})
