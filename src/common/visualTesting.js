function rgbToHsl([r, g, b]) {
  r = r / 255; g = g / 255; b = b / 255

  const lBase = Math.max(r, g, b)
  const sBase = lBase - Math.min(r, g, b)
  const hBase = sBase ? (
          (lBase === r) ?
          ((g - b) / sBase) : (
            (lBase === g) ?
            (2 + ((b - r) / sBase)) :
            (4 + ((r - g) / sBase))
          )
        ) :
        0

  const h = ((60 * hBase) < 0) ? ((60 * hBase) + 360) : (60 * hBase)
  const s = 100 * (
          sBase ? (
            (lBase <= 0.5) ?
            (sBase / ((2 * lBase) - sBase)) :
            (sBase / (2 - ((2 * lBase) - sBase)))
          ) :
          0
        )
  const l = (100 * ((2 * lBase) - sBase)) / 2

  return [Math.round(h), Math.round(s), Math.round(l)]
}

/** Comparação em HSL */
function arePixelsEqual([ r1, g1, b1 ], [ r2, g2, b2 ], threshold) {
  const [ h1, s1, l1 ] = rgbToHsl([r1, g1, b1])
  const [ h2, s2, l2 ] = rgbToHsl([r2, g2, b2])
  return (
    (Math.abs(h1 - h2) <= (threshold * 360)) &&
    (Math.abs(s1 - s2) <= (threshold * 100)) &&
    (Math.abs(l1 - l2) <= (threshold * 100))
  )
}

function highlightedDiffPixel(pixel1, pixel2, threshold) {
  return arePixelsEqual(pixel1, pixel2, threshold) ?
         [pixel1[0], pixel1[1], 255, 64] :
         [255, pixel2[1], pixel2[2], 255]
}

function diffResultMessage(diffPixelsCount, totalPixels, threshold) {
  const isBiggerOrEqual = ((diffPixelsCount / totalPixels) >= threshold)

  const diffResultMessage = `different pixels: ${
    isBiggerOrEqual ? 'at least ': ''
  }${diffPixelsCount} out of ${totalPixels} (${
    ((diffPixelsCount / totalPixels) * 100).toFixed(2)
  }%).\n\n` +
  `the difference between images is ${
    isBiggerOrEqual ? 'bigger than or equal' : 'smaller than'
  } the ${threshold * 100}% threshold.`

  return diffResultMessage
}

function calcDiffWithCanvas({
  canvasBase, canvasCurrent, canvasDiff,
  x, y, width, height,
  qtdDiffThreshold, pxDistThreshold,
}) {
  const ctxBase = canvasBase.getContext('2d'),
        ctxCurrent = canvasCurrent.getContext('2d'),
        ctxDiff = canvasDiff.getContext('2d')

  const { data:img1Array } = ctxBase.getImageData(x, y, width, height)
  const { data:img2Array } = ctxCurrent.getImageData(x, y, width, height)

  canvasDiff.width = width; canvasDiff.height = height
  const img3Data = ctxDiff.getImageData(x, y, width, height)
  const img3Array = img3Data.data

  const totalPixels = width * height
  let img1Pixel, img2Pixel, diffPixelsCount = 0, thresholdReached = false
  for (let i = 0, len = img1Array.length; i < len; i += 4) {
    img1Pixel = [img1Array[i], img1Array[i + 1], img1Array[i + 2]]
    img2Pixel = [img2Array[i], img2Array[i + 1], img2Array[i + 2]]
    if (!arePixelsEqual(img1Pixel, img2Pixel, pxDistThreshold) && !thresholdReached) diffPixelsCount++

    const [ diffR, diffG, diffB, diffA ] = highlightedDiffPixel(img1Pixel, img2Pixel, pxDistThreshold)
    img3Array[i] = diffR; img3Array[i + 1] = diffG; img3Array[i + 2] = diffB; img3Array[i + 3] = diffA

    if (((diffPixelsCount / totalPixels) >= qtdDiffThreshold) && !thresholdReached) {
      thresholdReached = true
    }
  }
  ctxDiff.putImageData(img3Data, x, y)

  return {
    thresholdReached,
    totalImgPixels: totalPixels,
    qtdDiffPixels: diffPixelsCount,
    appendResultsTo: canvasContainer => [canvasBase, canvasCurrent, canvasDiff].forEach(
      canvas => canvasContainer.appendChild(canvas)
    ),
  }
}

function loadImage(url, onloadCallback) {
  const img = new Image(); img.crossOrigin = 'anonymous'; img.hasLoaded = false
  img.onload = _=> { img.hasLoaded = true; onloadCallback(img) }
  img.src = url

  return img
}

export function testImagesDiff({
  baseImgUrl, newImgUrl,
  qtdDiffThreshold = 0.05, pxDistThreshold = 0.1,
  maxTries = 30, triesIntervalMs = 100,
}) {
  return new Promise((resolve, reject) => {
    const canvasBase = document.createElement('canvas'), canvasBaseCtx = canvasBase.getContext('2d')
    const canvasCurrent = document.createElement('canvas'), canvasCurrentCtx = canvasCurrent.getContext('2d')
    const canvasDiff = document.createElement('canvas')
    canvasBase.id = 'canvas-base'; canvasCurrent.id = 'canvas-current'; canvasDiff.id = 'canvas-diff'

    const imgBase = loadImage(baseImgUrl, loadedImg => {
      canvasBase.width = loadedImg.width; canvasBase.height = loadedImg.height
      canvasBaseCtx.drawImage(loadedImg, 0, 0)
    })
    const imgCurrent = loadImage(newImgUrl, loadedImg => {
      canvasCurrent.width = loadedImg.width; canvasCurrent.height = loadedImg.height
      canvasCurrentCtx.drawImage(loadedImg, 0, 0)
    })

    let triesCount = 0
    const intervalRef = setInterval(_=> {
      triesCount++
      if (imgBase.hasLoaded && imgCurrent.hasLoaded) {
        clearInterval(intervalRef)

        if ((canvasBase.width !== canvasCurrent.width) || (canvasBase.height !== canvasCurrent.height)) {
          reject(Error('cannot diff images with different sizes.')); return
        }

        const result = calcDiffWithCanvas({
          canvasBase, canvasCurrent, canvasDiff,
          qtdDiffThreshold, pxDistThreshold,
          x: 0, y: 0, width: canvasBase.width, height: canvasBase.height,
        })

        resolve({
          ...result,
          diffResultMessage: diffResultMessage(
            result.qtdDiffPixels, result.totalImgPixels, qtdDiffThreshold,
          ),
        })
      }
      else if (triesCount >= maxTries) {
        reject(Error('some image could not be loaded in the expected time.'))
        clearInterval(intervalRef)
      }
    }, triesIntervalMs)
  })
}

export function imgBase64ToDataUrl(base64String) {
  return `data:image/png;base64,${base64String}`
}
