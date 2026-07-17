import { useEffect } from 'react'
import * as THREE from 'three'
import { createCloudTexture } from '../lib/createCloudTexture'

const DEFAULT_CONFIG = {
  horizontalPosition: 0.88,
  verticalPosition: 0.08,
  bobAmplitude: 14,
  bobSpeed: 1,
  driftAmplitude: 10,
  driftSpeed: 0.7,
  cloudScale: 1.3,
  zIndex: 0,
}

function updateOrthoCamera(camera, width, height) {
  camera.left = 0
  camera.right = width
  camera.top = height
  camera.bottom = 0
  camera.updateProjectionMatrix()
}

/**
 * غيمة Three.js مثبتة بإحداثيات الهيرو (absolute) — floating فقط بدون أي ربط بالسكرول.
 */
export function useCloudScroll3D(canvasRef, userConfig = {}) {
  const config = { ...DEFAULT_CONFIG, ...userConfig }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    let renderer
    let scene
    let camera
    let cloudSprite
    let animationFrameId
    let resizeObserver
    let bootFrameId
    let isDisposed = false
    let baseX = 0
    let baseY = 0
    let layoutWidth = 0
    let layoutHeight = 0
    const clockStart = performance.now()

    const getCloudSize = (trackWidth) => {
      const mobile = trackWidth < 640
      const baseWidth = (mobile ? 120 : 180) * config.cloudScale
      const baseHeight = baseWidth * (110 / 180)
      return { width: baseWidth, height: baseHeight }
    }

    const computeBasePosition = () => {
      const { width: cloudWidth } = getCloudSize(layoutWidth)
      const half = cloudWidth * 0.5
      const inset = half * 0.05
      const target = layoutWidth * config.horizontalPosition
      baseX = Math.min(
        layoutWidth - inset - half,
        Math.max(inset + half, target),
      )
      baseY = layoutHeight * config.verticalPosition
    }

    const syncLayout = () => {
      layoutWidth = canvas.clientWidth || 1
      layoutHeight = canvas.clientHeight || 1

      if (!renderer || !camera) return

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(layoutWidth, layoutHeight, false)
      updateOrthoCamera(camera, layoutWidth, layoutHeight)

      if (cloudSprite) {
        const { width: cloudWidth, height: cloudHeight } =
          getCloudSize(layoutWidth)
        cloudSprite.scale.set(cloudWidth, cloudHeight, 1)
      }

      computeBasePosition()
    }

    const initThree = () => {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      })
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      camera = new THREE.OrthographicCamera(0, 1, 1, 0, -100, 100)
      camera.position.z = 10

      const texture = createCloudTexture()
      texture.needsUpdate = true

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        opacity: 1,
      })

      cloudSprite = new THREE.Sprite(material)
      cloudSprite.position.z = config.zIndex
      scene.add(cloudSprite)

      syncLayout()
    }

    const animate = () => {
      if (isDisposed || !renderer || !scene || !camera) return

      animationFrameId = requestAnimationFrame(animate)

      const elapsed = (performance.now() - clockStart) / 1000
      const bobOffset =
        Math.sin(elapsed * config.bobSpeed) * config.bobAmplitude
      const driftOffset =
        Math.sin(elapsed * config.driftSpeed) * config.driftAmplitude

      if (cloudSprite) {
        cloudSprite.position.set(
          baseX + driftOffset,
          layoutHeight - (baseY + bobOffset),
          config.zIndex,
        )
      }

      renderer.render(scene, camera)
    }

    const boot = () => {
      if (isDisposed) return

      if (canvas.clientWidth <= 1 || canvas.clientHeight <= 1) {
        bootFrameId = requestAnimationFrame(boot)
        return
      }

      initThree()
      animate()

      resizeObserver = new ResizeObserver(syncLayout)
      resizeObserver.observe(canvas)
    }

    bootFrameId = requestAnimationFrame(boot)

    return () => {
      isDisposed = true
      cancelAnimationFrame(bootFrameId)
      cancelAnimationFrame(animationFrameId)
      resizeObserver?.disconnect()

      if (cloudSprite) {
        cloudSprite.material.map?.dispose()
        cloudSprite.material.dispose()
        scene?.remove(cloudSprite)
      }

      renderer?.dispose()
    }
  }, [
    canvasRef,
    config.horizontalPosition,
    config.verticalPosition,
    config.bobAmplitude,
    config.bobSpeed,
    config.driftAmplitude,
    config.driftSpeed,
    config.cloudScale,
    config.zIndex,
  ])
}
