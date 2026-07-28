/** Shared media query for skipping heavy desktop-only effects on phones. */
export const MOBILE_PERF_QUERY =
  '(max-width: 768px), (pointer: coarse), (hover: none)'

export function isMobilePerf() {
  if (typeof window === 'undefined') return true
  return window.matchMedia(MOBILE_PERF_QUERY).matches
}
