let lockCount = 0

/**
 * Reference-counted body scroll lock.
 * Safe when multiple loaders/modals/menus lock at once.
 * @returns {() => void} unlock function (idempotent per call)
 */
export function lockBodyScroll() {
  lockCount += 1
  if (lockCount === 1) {
    document.body.style.overflow = 'hidden'
  }

  let released = false
  return () => {
    if (released) return
    released = true
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) {
      document.body.style.overflow = ''
    }
  }
}
