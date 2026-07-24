import { Link } from 'react-router-dom'
import { useContactFormPopup } from '../../context/ContactFormContext'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

const navLinks = [
  { label: 'Home', to: '/', isRoute: true },
  { label: 'About Us', to: '/about', isRoute: true },
  { label: 'Our Programs', to: '#programs', isRoute: false },
  { label: 'Why Choose Us', to: '#why-us', isRoute: false },
  { label: 'Contact Us', to: '#contact', isRoute: false },
]

function Navbar() {
  const { openContactForm } = useContactFormPopup()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex max-w-page items-center justify-between gap-5 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="shrink-0 transition-opacity hover:opacity-90"
          aria-label="New World Nursery home"
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

        <Button
          className="hidden shrink-0 px-6 py-2.5 text-sm sm:inline-flex"
          onClick={openContactForm}
        >
          Enquire Now
        </Button>
      </div>
    </header>
  )
}

export default Navbar
