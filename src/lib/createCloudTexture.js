/**
 * ينشئ texture غيمة شفافة بألوان brand هادئة.
 * يستقبل THREE بعد dynamic import حتى لا يدخل three.js في الـ critical bundle.
 */
export function createCloudTexture(THREE) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const s = size / 512

  ctx.clearRect(0, 0, size, size)

  const cloudColor = '#5bb5a2'

  const blobs = [
    { x: 180, y: 290, rx: 95, ry: 62 },
    { x: 260, y: 270, rx: 110, ry: 72 },
    { x: 340, y: 295, rx: 78, ry: 55 },
    { x: 150, y: 265, rx: 68, ry: 48 },
    { x: 230, y: 230, rx: 82, ry: 58 },
    { x: 310, y: 240, rx: 60, ry: 42 },
  ]

  blobs.forEach(({ x, y, rx, ry }) => {
    ctx.fillStyle = cloudColor
    ctx.beginPath()
    ctx.ellipse(x * s, y * s, rx * s, ry * s, 0, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.strokeStyle = cloudColor
  ctx.lineWidth = Math.max(2, 6 * s)
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(120 * s, 290 * s)
  ctx.quadraticCurveTo(180 * s, 320 * s, 240 * s, 300 * s)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
