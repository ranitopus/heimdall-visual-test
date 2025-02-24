function isValidRgbVector(value) {
  if (
    !Array.isArray(value) || (value.length !== 3) ||
    value.some(item => !Number.isInteger(item)) ||
    value.some(item => (item < 0 || item > 255))
  ) return TypeError('value should only be a RGB vector (array of 3 integers ranging from 0 to 255)')

  return true
}

/**
 * @summary Converts RGB vector to HSL vector
 * @description Sources used for research to implement this function:
 * - https://css-tricks.com/converting-color-spaces-in-javascript/#aa-rgb-to-hsl
 * - https://www.30secondsofcode.org/js/s/rgb-to-hsl/
 * - https://en.wikipedia.org/wiki/HSL_and_HSV
 */
export function rgbToHsl(rgbVector) {
  const validationResult = isValidRgbVector(rgbVector)
  if (validationResult !== true) throw validationResult

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

const validBase64Regex = /^[a-z0-9]+={0,2}$/i

function isValidBase64String(value) {
  if (
    typeof value !== 'string' ||
    !validBase64Regex.test(value.replace(/\s/g, ''))
  ) return TypeError('value should only be a valid base64 string')

  return true
}

export function imgBase64ToDataUrl(base64String) {
  const validationResult = isValidBase64String(base64String)
  if (validationResult !== true) throw validationResult

  return `data:image/png;base64,${base64String.replace(/\s/g, '')}`
}

function isNonEmptyString(value) {
  if (typeof value !== 'string' || !value.trim())
    return TypeError('value should only be a non-empty string')

  return true
}

export function loadHtmlImage(url, onloadCallback, onerrorCallback) {
  const validationResult = isNonEmptyString(url)
  if (validationResult !== true) throw validationResult

  const img = new Image(); img.crossOrigin = 'anonymous'
  img.onload = (...args) => {
    img.hasLoaded = true
    if (typeof onloadCallback === 'function') onloadCallback(img, ...args)
  }
  img.onerror = (...args) => {
    img.hasLoaded = false
    if (typeof onerrorCallback === 'function') onerrorCallback(...args)
  }

  img.src = url
  return img
}

const acceptedImageExtensions = ['jpg', 'jpeg', 'png', 'webp']

function isAcceptedImageExtension(value) {
  if (
    typeof value !== 'string' ||
    !acceptedImageExtensions.includes(value.toLowerCase())
  ) return TypeError('value should only be an accepted image extension (strings jpg, jpeg, png or webp)')

  return true
}

export function normalizeTestImageFilename(filename, extension) {
  const filenameValidationResult = isNonEmptyString(filename)
  if (filenameValidationResult !== true) throw filenameValidationResult

  let normalizedFilename = filename.trim().replace(/\//g, '_')

  if (extension != null) {
    const extensionValidationResult = isAcceptedImageExtension(extension)
    if (extensionValidationResult !== true) throw extensionValidationResult

    normalizedFilename += '.' + extension.toLowerCase()
  }

  return normalizedFilename
}
