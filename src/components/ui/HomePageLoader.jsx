import Logo from './Logo'

function HomePageLoader({ fading = false }) {
  return (
    <div
      className={`home-loader fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#faf7f2] transition-opacity duration-500 ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-busy={!fading}
      aria-label="Loading page"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 40%, #eef8f5 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 80%, rgba(244,160,176,0.18) 0%, transparent 60%), radial-gradient(ellipse 35% 28% at 15% 75%, rgba(91,181,162,0.2) 0%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <div className="home-loader-logo-wrap relative">
          <span className="home-loader-ring" aria-hidden="true" />
          <Logo className="relative z-10 h-28 sm:h-32" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="home-loader-dots flex items-center gap-2" aria-hidden="true">
            <span className="home-loader-dot bg-nursery-teal" />
            <span className="home-loader-dot bg-nursery-coral" />
            <span className="home-loader-dot bg-nursery-yellow" />
          </div>
          <p className="text-sm font-bold tracking-[0.2em] text-brand-muted uppercase">
            Loading
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePageLoader
