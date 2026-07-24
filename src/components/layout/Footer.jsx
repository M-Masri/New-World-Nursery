import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'
import Logo from '../ui/Logo'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Programs', href: '#programs' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Contact Us', href: '#contact' },
]

function Footer() {
  return (
    <footer className="bg-white">
      <div className="page-gutter py-14">
        <div className="mx-auto grid max-w-page items-start gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Logo className="h-24 sm:h-28" />
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              New World Nursery provides a safe, nurturing, and stimulating
              environment where children learn, play, and grow with confidence
              every day.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold tracking-wider text-brand-ink uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted transition-colors hover:text-[#5bb5a2]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold tracking-wider text-brand-ink uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5bb5a2]" />
                Al Barsha, Dubai, United Arab Emirates
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#5bb5a2]" />
                +971 50 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#5bb5a2]" />
                info@newworldnursery.ae
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#5bb5a2]" />
                <span>
                  Sun – Thu: 7:00 AM – 6:00 PM
                  <br />
                  Fri – Sat: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-nursery-footer page-gutter py-4">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 text-sm text-white/90">
          <p>© {new Date().getFullYear()} New World Nursery. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#facebook" className="hover:text-white" aria-label="Facebook">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#instagram" className="hover:text-white" aria-label="Instagram">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#youtube" className="hover:text-white" aria-label="YouTube">
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
