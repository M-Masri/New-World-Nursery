import { useEffect, useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useContactFormPopup } from '../../context/ContactFormContext'
import { useHomeData } from '../../context/HomeDataContext'
import { useLanguage } from '../../i18n'
import { lockBodyScroll } from '../../lib/bodyScrollLock'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

function Navbar() {
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const { t, language, setLanguage } = useLanguage()
  const enquireLabel =
    language === 'ar'
      ? t('common.enquireNow')
      : settings?.hero?.cta_primary?.trim() || t('common.enquireNow')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  const navLinks = useMemo(
    () => [
      { label: t('nav.home'), to: '/', isRoute: true },
      { label: t('nav.about'), to: '/about', isRoute: true },
      { label: t('nav.blogs'), to: '/blog', isRoute: true },
      { label: t('nav.programs'), to: '/programs', isRoute: true },
      { label: t('nav.gallery'), to: '/gallery', isRoute: true },
      { label: t('nav.whyUs'), to: '/why-us', isRoute: true },
      { label: t('nav.contact'), to: '/contact', isRoute: true },
    ],
    [t, language],
  )

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    const unlockScroll = lockBodyScroll()
    window.addEventListener('keydown', onKeyDown)

    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleEnquire = () => {
    closeMenu()
    openContactForm()
  }

  const LanguageToggle = ({ className = '' }) => (
    <div
      className={`inline-flex items-center rounded-xl border border-gray-200 p-0.5 text-xs font-extrabold ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`min-h-8 min-w-9 rounded-lg px-2 transition ${
          language === 'en'
            ? 'bg-[#5bb5a2] text-white'
            : 'text-brand-muted hover:text-[#5bb5a2]'
        }`}
        aria-pressed={language === 'en'}
        aria-label={t('lang.switchToEn')}
      >
        {t('lang.en')}
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`min-h-8 min-w-9 rounded-lg px-2 transition ${
          language === 'ar'
            ? 'bg-[#5bb5a2] text-white'
            : 'text-brand-muted hover:text-[#5bb5a2]'
        }`}
        aria-pressed={language === 'ar'}
        aria-label={t('lang.switchToAr')}
      >
        {t('lang.ar')}
      </button>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-page items-center justify-between gap-5 page-gutter py-3 sm:gap-6">
        <Link
          to="/"
          className="shrink-0 transition-opacity hover:opacity-90"
          aria-label={t('common.homeAria')}
          onClick={closeMenu}
        >
          <Logo className="h-[4.75rem] sm:h-[5.5rem] lg:h-24" />
        </Link>

        <nav
          className="hidden items-center gap-6 xl:flex"
          aria-label={t('common.primaryNav')}
        >
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-semibold whitespace-nowrap text-brand-muted transition-colors hover:text-[#5bb5a2]"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.to}
                href={link.to}
                className="text-sm font-semibold whitespace-nowrap text-brand-muted transition-colors hover:text-[#5bb5a2]"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />

          <Button
            className="hidden min-w-[8.5rem] shrink-0 px-6 py-2.5 text-sm sm:inline-flex"
            onClick={openContactForm}
          >
            {enquireLabel}
          </Button>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-gray-200 text-brand-ink transition hover:border-[#5bb5a2] hover:text-[#5bb5a2] xl:hidden"
            aria-label={menuOpen ? t('common.closeMenu') : t('common.openMenu')}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id={menuId}
          className="border-t border-gray-100 bg-white xl:hidden"
        >
          <nav
            className="mx-auto flex max-w-page flex-col gap-1 page-gutter py-4"
            aria-label={t('common.mobileNav')}
          >
            <div className="mb-2 flex items-center justify-between px-3 py-2 sm:hidden">
              <LanguageToggle />
            </div>
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-brand-ink transition hover:bg-[#eef8f5] hover:text-[#5bb5a2]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-brand-ink transition hover:bg-[#eef8f5] hover:text-[#5bb5a2]"
                >
                  {link.label}
                </a>
              ),
            )}
            <Button className="mt-2 w-full py-3 text-sm" onClick={handleEnquire}>
              {enquireLabel}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
