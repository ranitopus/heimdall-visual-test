function isValidRgbVector(value) {
  if (
    !value || !Array.isArray(value) || (value.length !== 3) ||
    value.some(item => !Number.isInteger(item)) ||
    value.some(item => item < 0) || value.some(item => item > 255)
  )
    return TypeError('value should only be a RGB vector (array of 3 integers ranging from 0 to 255)')

  return true
}

/**
 * Sources used for research to implement this function:
 * - https://css-tricks.com/converting-color-spaces-in-javascript/#aa-rgb-to-hsl
 * - https://www.30secondsofcode.org/js/s/rgb-to-hsl/
 * - https://en.wikipedia.org/wiki/HSL_and_HSV
 */
export function rgbToHsl(rgbVector) {
  const result = isValidRgbVector(rgbVector)
  if (result !== true) throw result

  let [ r, g, b ] = rgbVector
  r = r / 255; g = g / 255; b = b / 255

  const min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min
  let h = 0, s = 0, l = 0

  if (delta === 0)
    h = 0
  else if (max === r)
    h = ((g - b) / delta) % 6
  else if (max === g)
    h = (b - r) / delta + 2
  else
    h = (r - g) / delta + 4

  l = (max + min) / 2

  s = (delta === 0) ? 0 : delta / (1 - Math.abs(2 * l - 1))

  return [Math.round(h * 60), Math.round(s * 100), Math.round(l * 100)]
}

export function imgBase64ToDataUrl(base64String) {
  if (typeof base64String !== 'string') throw TypeError('value should only be a valid base64 string')

  base64String = base64String.replace(/\s/g, '')
  if (!/^[a-z0-9]+={0,2}$/i.test(base64String)) throw TypeError('value should only be a valid base64 string')

  return `data:image/png;base64,${base64String}`
}

export function loadHtmlImage(url, onloadCallback) {
  const img = new Image(); img.crossOrigin = 'anonymous'; img.hasLoaded = false
  img.onload  = _=> {
    console.log('[DEBUG] img did load:', img)
    img.hasLoaded = true
    onloadCallback?.(img)
  }
  console.log('[DEBUG] will pass src to <img>:', url)
  img.src = url

  return img
}

function isNonEmptyString(value) {
  if (!value || typeof value !== 'string' || !value.trim())
    return TypeError('value should only be a non-empty string')

  return true
}

const acceptedImageExtensions = ['jpg', 'jpeg', 'png', 'webp']

function isAcceptedImageExtension(value) {
  if (
    isNonEmptyString(value) !== true ||
    !acceptedImageExtensions.includes(value.toLowerCase())
  )
    return TypeError('value should only be an accepted image extension (strings jpg, jpeg, png or webp)')

  return true
}

export function normalizeTestImageFilename(filename, extension) {
  const filenameResult = isNonEmptyString(filename)
  if (filenameResult !== true) throw filenameResult

  let normalizedFilename = filename.trim().replace(/\//g, '_')

  if (extension != null) {
    const extensionResult = isAcceptedImageExtension(extension)
    if (extensionResult !== true) throw extensionResult

    normalizedFilename += '.' + extension.toLowerCase()
  }

  return normalizedFilename
}
