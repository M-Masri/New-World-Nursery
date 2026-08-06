import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useContactFormPopup } from '../../context/ContactFormContext'
import { useHomeData } from '../../context/HomeDataContext'
import { useLanguage } from '../../i18n'
import { lockBodyScroll } from '../../lib/bodyScrollLock'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

function Navbar() {
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const { t, language, setLanguage, isRtl } = useLanguage()
  const enquireLabel =
    language === 'ar'
      ? t('common.enquireNow')
      : settings?.hero?.cta_primary?.trim() || t('common.enquireNow')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(null)
  const menuId = useId()
  const submenuIdPrefix = useId()
  const desktopMenusRef = useRef({})

  const navLinks = useMemo(
    () => [
      { label: t('nav.home'), to: '/', isRoute: true },
      { label: t('nav.about'), to: '/about', isRoute: true },
      { label: t('nav.blogs'), to: '/blog', isRoute: true },
      {
        id: 'programs',
        label: t('nav.programs'),
        to: '/programs',
        isRoute: true,
        children: [
          {
            label: t('nav.learningPhilosophy'),
            to: '/learning-philosophy',
          },
          {
            label: t('nav.signaturePrograms'),
            to: '/signature-programs',
          },
        ],
      },
      { label: t('nav.gallery'), to: '/gallery', isRoute: true },
      {
        id: 'why-us',
        label: t('nav.whyUs'),
        to: '/why-us',
        isRoute: true,
        children: [
          {
            label: t('nav.awardsNetwork'),
            to: '/awards-network',
          },
        ],
      },
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

  useEffect(() => {
    if (!openDesktopMenu) return undefined

    const onPointerDown = (event) => {
      const root = desktopMenusRef.current[openDesktopMenu]
      if (!root?.contains(event.target)) {
        setOpenDesktopMenu(null)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenDesktopMenu(null)
    }

    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [openDesktopMenu])

  useEffect(() => {
    if (!menuOpen) setOpenMobileMenu(null)
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    setOpenMobileMenu(null)
    setOpenDesktopMenu(null)
  }

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

  const linkClass =
    'text-sm font-semibold whitespace-nowrap text-brand-muted transition-colors hover:text-[#5bb5a2]'
  const mobileLinkClass =
    'rounded-xl px-3 py-3 text-base font-semibold text-brand-ink transition hover:bg-[#eef8f5] hover:text-[#5bb5a2]'
  const submenuLinkClass =
    'block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-brand-muted transition hover:bg-[#eef8f5] hover:text-[#5bb5a2]'

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
            link.children ? (
              <div
                key={link.to}
                ref={(node) => {
                  desktopMenusRef.current[link.id] = node
                }}
                className="relative -my-2 py-2"
                onMouseEnter={() => setOpenDesktopMenu(link.id)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <div className="flex items-center gap-1">
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md text-brand-muted transition hover:text-[#5bb5a2]"
                    aria-expanded={openDesktopMenu === link.id}
                    aria-controls={`${submenuIdPrefix}-${link.id}`}
                    aria-label={link.label}
                    onClick={() =>
                      setOpenDesktopMenu((current) =>
                        current === link.id ? null : link.id,
                      )
                    }
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openDesktopMenu === link.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {openDesktopMenu === link.id ? (
                  <div
                    className={`absolute top-full z-50 pt-1 ${
                      isRtl ? 'right-0' : 'left-0'
                    }`}
                  >
                    <div
                      id={`${submenuIdPrefix}-${link.id}`}
                      role="menu"
                      className="min-w-[13.5rem] rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          role="menuitem"
                          className={submenuLinkClass}
                          onClick={() => setOpenDesktopMenu(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : link.isRoute ? (
              <Link key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              <a key={link.to} href={link.to} className={linkClass}>
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
              link.children ? (
                <div key={link.to} className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Link
                      to={link.to}
                      onClick={closeMenu}
                      className={`${mobileLinkClass} flex-1`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-brand-ink transition hover:bg-[#eef8f5] hover:text-[#5bb5a2]"
                      aria-expanded={openMobileMenu === link.id}
                      aria-controls={`${submenuIdPrefix}-${link.id}-mobile`}
                      aria-label={link.label}
                      onClick={() =>
                        setOpenMobileMenu((current) =>
                          current === link.id ? null : link.id,
                        )
                      }
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openMobileMenu === link.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                  {openMobileMenu === link.id ? (
                    <div
                      id={`${submenuIdPrefix}-${link.id}-mobile`}
                      className="ms-3 flex flex-col gap-1 border-s border-[#5bb5a2]/30 ps-3"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={closeMenu}
                          className={mobileLinkClass}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : link.isRoute ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={closeMenu}
                  className={mobileLinkClass}
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
