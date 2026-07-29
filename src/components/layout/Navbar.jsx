import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useContactFormPopup } from '../../context/ContactFormContext'
import { useHomeData } from '../../context/HomeDataContext'
import { lockBodyScroll } from '../../lib/bodyScrollLock'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

const navLinks = [
  { label: 'Home', to: '/', isRoute: true },
  { label: 'About Us', to: '/about', isRoute: true },
  { label: 'Blogs', to: '/blog', isRoute: true },
  { label: 'Our Programs', to: '/programs', isRoute: true },
  { label: 'Gallery', to: '/gallery', isRoute: true },
  { label: 'Why Choose Us', to: '/why-us', isRoute: true },
  { label: 'Contact Us', to: '/contact', isRoute: true },
]

function Navbar() {
  const { openContactForm } = useContactFormPopup()
  const { settings } = useHomeData()
  const enquireLabel = settings?.hero?.cta_primary
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-page items-center justify-between gap-5 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="shrink-0 transition-opacity hover:opacity-90"
          aria-label="New World Nursery home"
          onClick={closeMenu}
        >
          <Logo className="h-[4.75rem] sm:h-[5.5rem] lg:h-24" />
        </Link>

        <nav
          className="hidden items-center gap-6 xl:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-semibold whitespace-nowrap text-brand-muted transition-colors hover:text-[#5bb5a2]"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.to}
                className="text-sm font-semibold whitespace-nowrap text-brand-muted transition-colors hover:text-[#5bb5a2]"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            className="hidden min-w-[8.5rem] shrink-0 px-6 py-2.5 text-sm sm:inline-flex"
            onClick={openContactForm}
          >
            {enquireLabel || 'Enquire Now'}
          </Button>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-gray-200 text-brand-ink transition hover:border-[#5bb5a2] hover:text-[#5bb5a2] xl:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
          <nav className="mx-auto flex max-w-page flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-brand-ink transition hover:bg-[#eef8f5] hover:text-[#5bb5a2]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-brand-ink transition hover:bg-[#eef8f5] hover:text-[#5bb5a2]"
                >
                  {link.label}
                </a>
              ),
            )}
            {enquireLabel ? (
              <Button className="mt-2 w-full py-3 text-sm" onClick={handleEnquire}>
                {enquireLabel}
              </Button>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
