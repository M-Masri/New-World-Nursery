import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { ScrollTrigger } from '../lib/gsap'

export default function useLottieScroll({
  animationData,
  triggerRef,
  start = 'top bottom',
  end = 'bottom top',
  scrub = 0.5,
  mode = 'scrub',
  speed = 1,
  repeatCount = 1,
  rendererSettings,
}) {
  const containerRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const triggerEl = triggerRef?.current ?? container

    if (!container || !animationData || !triggerEl) return undefined

    let scrollTrigger = null
    let playCount = 0

    const anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData,
      ...(rendererSettings ? { rendererSettings } : {}),
    })

    anim.setSpeed(speed)

    const playFromStart = () => {
      playCount = 0
      anim.stop()
      anim.goToAndStop(0, true)
      anim.play()
    }

    const startLooping = () => {
      anim.loop = true
      playFromStart()
    }

    const stopLooping = () => {
      anim.loop = false
      anim.pause()
    }

    const handleComplete = () => {
      playCount += 1
      if (playCount < repeatCount) {
        anim.goToAndStop(0, true)
        anim.play()
      }
    }

    const bindScroll = () => {
      if (mode === 'playWhileInView') {
        scrollTrigger = ScrollTrigger.create({
          trigger: triggerEl,
          start: start ?? 'top bottom',
          end: end ?? 'bottom top',
          onToggle: (self) => {
            if (self.isActive) startLooping()
            else stopLooping()
          },
        })
      } else if (mode === 'playOnEnter') {
        anim.addEventListener('complete', handleComplete)

        scrollTrigger = ScrollTrigger.create({
          trigger: triggerEl,
          start,
          onEnter: () => {
            if (hasPlayedRef.current) return
            hasPlayedRef.current = true
            playFromStart()
          },
        })
      } else {
        const totalFrames = Math.max(anim.totalFrames - 1, 0)

        scrollTrigger = ScrollTrigger.create({
          trigger: triggerEl,
          start,
          end,
          scrub,
          onUpdate: (self) => {
            const frame = Math.round(self.progress * totalFrames)
            anim.goToAndStop(frame, true)
          },
        })
      }

      ScrollTrigger.refresh()
    }

    const handleReady = () => bindScroll()

    anim.addEventListener('DOMLoaded', handleReady)

    if (anim.totalFrames > 0) {
      handleReady()
    }

    return () => {
      anim.removeEventListener('DOMLoaded', handleReady)
      anim.removeEventListener('complete', handleComplete)
      scrollTrigger?.kill()
      anim.destroy()
      hasPlayedRef.current = false
    }
  }, [animationData, triggerRef, start, end, scrub, mode, speed, repeatCount, rendererSettings])

  return containerRef
}
