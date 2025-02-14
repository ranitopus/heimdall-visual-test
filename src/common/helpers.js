function isValidRgbVector(value) {
  if (!value) return TypeError('value should not be falsy/empty')
  if (!Array.isArray(value)) return TypeError('value should be an array')
  if (value.length !== 3) return RangeError('value should have exactly 3 items')
  if (value.some(item => !Number.isInteger(item))) return TypeError('some item in value is not an integer number')
  if (value.some(item => item < 0)) return RangeError('some item in value is not a positive integer')
  if (value.some(item => item > 255)) return RangeError('some item in value is over 255')

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
  if (typeof base64String !== 'string') throw TypeError('argument should be a string')

  base64String = base64String.replace(/\s/g, '')
  if (!/^[a-z0-9]+={0,2}$/i.test(base64String)) throw TypeError('argument should be a valid base64 string')

  return `data:image/png;base64,${base64String}`
}

export function loadHtmlImage(url, onloadCallback) {
  const img = new Image(); img.crossOrigin = 'anonymous'; img.hasLoaded = false
  img.onload = _=> { img.hasLoaded = true; onloadCallback(img) }
  img.src = url

  return img
}
