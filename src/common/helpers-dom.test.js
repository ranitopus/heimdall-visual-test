// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest'

import { loadHtmlImage } from './helpers'

function generateAwaitedPromise() {
  let resolveAwaited, rejectAwaited
  const awaited = new Promise((resolve, reject) => {
    resolveAwaited = () => {
      console.log('[DEBUG] try to resolve the awaited Promise')
      resolve()
    }
    rejectAwaited = () => {
      console.log('[DEBUG] try to reject the awaited Promise')
      reject()
    }
  })
  return {
    awaited,
    resolveAwaited() { return resolveAwaited; },
    rejectAwaited() { return rejectAwaited; },
  }
}

describe('function #loadHtmlImage', () => {
  const heartImageDataURI = () => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAaRJREFUeJzt3cFtwjAAQNFQdQYG6BRs0Y7aMZiiq9BLr42RQkjIf+8aAiZ8WbIPeJoAAAAAAAAAgKM5bT2AaZpuK7//0u+49/Et8rblh7M9AcQJIE4AcQKIE0CcAOKesQadXUffLpdVP/x0vS66fwfjW/U3MgPECSBOAHECiBNAnADiBBD3iDXm7Dr/e3Dz5wMGsGsfg+vn+X2GtfcJzABxAogTQJwA4gQQJ4A4AcS9bz2Aw/sZXD8/ZRT/MgPECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBC3+XkBh/8fwcF5A84LYFMCiBNAnADiBBAngDgBxG16dv2f194n2Pk6f8QMECeAOAHECSBOAHECiBNA3B72AUa23Sd48XX+iBkgTgBxAogTQJwA4gQQJ4C4Xa9R77Ron2Dka/ySl36GZoA4AcQJIE4AcQKIE0CcAOJeeg17p9l9gjsc+hmZAeIEECeAOAHECSBOAHECAAAAAAAAAAA4mF94NB2vTkgkBwAAAABJRU5ErkJggg=='

  it.only('should correctly load an image from a given URL', () => {
    // Arrange
    const imageSrc = heartImageDataURI()
    // Act
    const result = loadHtmlImage(imageSrc)
    if (result.onload) result.onload()
    // Assert
    expect(result.hasLoaded).toBe(true)
    // await vi.waitFor(async () => {
    //   console.log('[DEBUG] result:', result)
    //   expect(result.hasLoaded).toBe(true)
    // }, {timeout: 2000})
  })

  it('should correctly execute a given callback when an image loads', async () => {
    // Arrange
    const imageSrc = heartImageDataURI(), onloadCallback = vi.fn()
    // Act
    const result = loadHtmlImage(imageSrc, onloadCallback)
    document.body.appendChild(result)
    // Assert
    await vi.waitFor(() => {
      return expect(onloadCallback).toBeCalled()
    }, {timeout: 2000})
  })
})
