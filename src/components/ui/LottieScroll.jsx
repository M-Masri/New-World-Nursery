import useLottieScroll from '../../hooks/useLottieScroll'

function LottieScroll({
  animationData,
  className = '',
  triggerRef,
  start,
  end,
  scrub,
  mode = 'scrub',
  speed = 1,
  repeatCount = 1,
  rendererSettings,
}) {
  const containerRef = useLottieScroll({
    animationData,
    triggerRef,
    start,
    end,
    scrub,
    mode,
    speed,
    repeatCount,
    rendererSettings,
  })

  return <div ref={containerRef} className={className} aria-hidden="true" />
}

export default LottieScroll
