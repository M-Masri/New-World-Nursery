import * as THREE from 'three'

/**
 * ينشئ texture غيمة شفافة بألوان brand هادئة.
 */
export function createCloudTexture() {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, size, size)

  const blobs = [
    { x: 180, y: 290, rx: 95, ry: 62, color: '#7ec8b8' },
    { x: 260, y: 270, rx: 110, ry: 72, color: '#5bb5a2' },
    { x: 340, y: 295, rx: 78, ry: 55, color: '#8ed4c6' },
    { x: 150, y: 265, rx: 68, ry: 48, color: '#f4a0b0' },
    { x: 230, y: 230, rx: 82, ry: 58, color: '#a8ddd2' },
    { x: 310, y: 240, rx: 60, ry: 42, color: '#f7b8c4' },
  ]

  blobs.forEach(({ x, y, rx, ry, color }) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.strokeStyle = 'rgba(91, 181, 162, 0.45)'
  ctx.lineWidth = 6
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(120, 290)
  ctx.quadraticCurveTo(180, 320, 240, 300)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
