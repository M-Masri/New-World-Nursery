import * as THREE from 'three'

/**
 * ينشئ texture غيمة شفافة (بدون ملف PNG خارجي).
 * يمكن استبدالها لاحقاً بـ TextureLoader + صورة.
 */
export function createCloudTexture() {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, size, size)

  const blobs = [
    { x: 180, y: 290, rx: 95, ry: 62, color: '#f07a7a' },
    { x: 260, y: 270, rx: 110, ry: 72, color: '#f28c8c' },
    { x: 340, y: 295, rx: 78, ry: 55, color: '#ee6b6b' },
    { x: 150, y: 265, rx: 68, ry: 48, color: '#f07a7a' },
    { x: 230, y: 230, rx: 82, ry: 58, color: '#f5a0a0' },
    { x: 310, y: 240, rx: 60, ry: 42, color: '#e86a6a' },
  ]

  blobs.forEach(({ x, y, rx, ry, color }) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.strokeStyle = 'rgba(212, 90, 90, 0.55)'
  ctx.lineWidth = 6
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(120, 290)
  ctx.quadraticCurveTo(180, 320, 240, 300)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}
