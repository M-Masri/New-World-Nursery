import { Link } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'

const navLinks = [
  { label: 'Home', to: '/', isRoute: true },
  { label: 'About Us', to: '/about', isRoute: true },
  { label: 'Our Programs', to: '#programs', isRoute: false },
  { label: 'Why Choose Us', to: '#why-us', isRoute: false },
  { label: 'Gallery', to: '#gallery', isRoute: false },
  { label: 'Contact Us', to: '#contact', isRoute: false },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-semibold text-gray-600 transition-colors hover:text-nursery-teal"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.to}
                className="text-sm font-semibold text-gray-600 transition-colors hover:text-nursery-teal"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <Button className="hidden sm:inline-flex">Enquire Now</Button>
      </div>
    </header>
  )
}

export default Navbar
