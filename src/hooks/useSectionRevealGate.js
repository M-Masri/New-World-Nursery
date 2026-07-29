import { startTransition, useEffect, useRef, useState } from 'react'

const IMAGE_AFTER_CARDS_MS = 320

/** Survives remounts so Home sections only reveal once per page session. */
const gateCache = new Map()

/**
 * Sequences section work so scroll stays smooth:
 * 1) brush highlight alone
 * 2) card motion
 * 3) image loads
 *
 * @param {boolean} hasHighlight
 * @param {string} [persistKey] When set, reveal runs once then stays ready.
 */
export function useSectionRevealGate(hasHighlight, persistKey) {
  const cached = persistKey ? gateCache.get(persistKey) : null
  const startReady = Boolean(cached?.ready) || !hasHighlight
  const [cardsReady, setCardsReady] = useState(startReady)
  const [allowImages, setAllowImages] = useState(startReady)
  const alreadyRevealedRef = useRef(startReady)

  useEffect(() => {
    if (!hasHighlight) {
      setCardsReady(true)
      setAllowImages(true)
      alreadyRevealedRef.current = true
      if (persistKey) gateCache.set(persistKey, { ready: true })
    }
  }, [hasHighlight, persistKey])

  const onHighlightComplete = () => {
    if (alreadyRevealedRef.current && cardsReady && allowImages) return

    startTransition(() => setCardsReady(true))
    window.setTimeout(() => {
      startTransition(() => {
        setAllowImages(true)
        alreadyRevealedRef.current = true
        if (persistKey) gateCache.set(persistKey, { ready: true })
      })
    }, IMAGE_AFTER_CARDS_MS)
  }

  return {
    cardsReady,
    allowImages,
    onHighlightComplete,
    /** True when this section already finished its first reveal (skip re-animating). */
    skipEntrance: alreadyRevealedRef.current && startReady,
  }
}
