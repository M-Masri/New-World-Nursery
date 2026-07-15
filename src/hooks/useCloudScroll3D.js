import { useEffect } from 'react'
import * as THREE from 'three'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { createCloudTexture } from '../lib/createCloudTexture'

const DEFAULT_CONFIG = {
  sectionSelector: 'main > section',
  verticalPosition: 0.22,
  bobAmplitude: 14,
  bobSpeed: 1,
  scrubSmoothness: 3.2,
  cloudScale: 1.3,
  zIndex: 0,
}

function getSections(selector) {
  return Array.from(document.querySelectorAll(selector))
}

function getTrackWidth() {
  return (
    document.body.clientWidth ||
    document.documentElement.clientWidth ||
    window.innerWidth
  )
}

function getViewportHeight() {
  return window.innerHeight
}

function updateOrthoCamera(camera, width, height) {
  camera.left = 0
  camera.right = width
  camera.top = height
  camera.bottom = 0
  camera.updateProjectionMatrix()
}

/**
 * غيمة Three.js — zigzag أفقي مربوط بسكرول كل سكشن وعرض body.
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
    let scrollTriggers = []
    let resizeObserver
    let bootFrameId
    let isDisposed = false
    const clockStart = performance.now()

    const cloudPos = { x: 0, y: 0 }

    const getCloudSize = () => {
      const trackWidth = getTrackWidth()
      const mobile = trackWidth < 640
      const baseWidth = (mobile ? 120 : 180) * config.cloudScale
      const baseHeight = baseWidth * (110 / 180)
      return { width: baseWidth, height: baseHeight }
    }

    const getHorizontalBounds = () => {
      const trackWidth = getTrackWidth()
      const { width: cloudWidth } = getCloudSize()
      const half = cloudWidth * 0.5

      return {
        left: half,
        right: trackWidth - half,
      }
    }

    const getBaseY = () => getViewportHeight() * config.verticalPosition

    const applyCloudX = (sectionIndex, progress) => {
      const { left, right } = getHorizontalBounds()
      const even = sectionIndex % 2 === 0
      const fromX = even ? right : left
      const toX = even ? left : right
      cloudPos.x = gsap.utils.interpolate(fromX, toX, progress)
      cloudPos.y = getBaseY()
    }

    const syncRendererSize = () => {
      if (!renderer || !camera || !canvas) return

      const width = canvas.clientWidth || getTrackWidth()
      const height = canvas.clientHeight || getViewportHeight()

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)
      updateOrthoCamera(camera, width, height)

      if (cloudSprite) {
        const { width: cloudWidth, height: cloudHeight } = getCloudSize()
        cloudSprite.scale.set(cloudWidth, cloudHeight, 1)
      }
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
      })

      cloudSprite = new THREE.Sprite(material)
      cloudSprite.position.z = config.zIndex
      scene.add(cloudSprite)

      syncRendererSize()
    }

    const initSectionScrollTriggers = (sections) => {
      const drivers = sections.map(() => ({ progress: 0, active: false }))

      const syncFromDrivers = () => {
        let chosen = null

        sections.forEach((_, index) => {
          const driver = drivers[index]
          if (!driver?.active) return
          if (!chosen || index >= chosen.index) {
            chosen = { index, progress: driver.progress }
          }
        })

        if (chosen) {
          applyCloudX(chosen.index, chosen.progress)
        }
      }

      sections.forEach((section, index) => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: config.scrubSmoothness,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            drivers[index].progress = self.progress
            drivers[index].active = self.isActive
            syncFromDrivers()
          },
          onToggle: (self) => {
            drivers[index].active = self.isActive
            syncFromDrivers()
          },
        })

        scrollTriggers.push(trigger)
      })

      applyCloudX(0, 0)
    }

    const animate = () => {
      if (isDisposed || !renderer || !scene || !camera) return

      animationFrameId = requestAnimationFrame(animate)

      const elapsed = (performance.now() - clockStart) / 1000
      const bobOffset =
        Math.sin(elapsed * config.bobSpeed) * config.bobAmplitude
      const y = cloudPos.y + bobOffset

      if (cloudSprite) {
        cloudSprite.position.set(
          cloudPos.x,
          getViewportHeight() - y,
          config.zIndex,
        )
      }

      renderer.render(scene, camera)
    }

    const onResize = () => {
      syncRendererSize()
      ScrollTrigger.refresh()
    }

    const boot = () => {
      if (isDisposed) return

      const sections = getSections(config.sectionSelector)
      if (!sections.length || getTrackWidth() <= 0) {
        bootFrameId = requestAnimationFrame(boot)
        return
      }

      initThree()
      initSectionScrollTriggers(sections)
      animate()

      window.addEventListener('resize', onResize)
      window.visualViewport?.addEventListener('resize', onResize)

      resizeObserver = new ResizeObserver(onResize)
      resizeObserver.observe(document.body)
      resizeObserver.observe(document.documentElement)
      sections.forEach((section) => resizeObserver.observe(section))

      ScrollTrigger.refresh()
      applyCloudX(0, 0)
    }

    bootFrameId = requestAnimationFrame(boot)

    return () => {
      isDisposed = true
      cancelAnimationFrame(bootFrameId)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', onResize)
      window.visualViewport?.removeEventListener('resize', onResize)

      scrollTriggers.forEach((trigger) => trigger.kill())
      scrollTriggers = []
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
    config.sectionSelector,
    config.verticalPosition,
    config.bobAmplitude,
    config.bobSpeed,
    config.scrubSmoothness,
    config.cloudScale,
    config.zIndex,
  ])
}
