import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'
import Logo from '../ui/Logo'

const quickLinks = [
  'Home',
  'About Us',
  'Our Programs',
  'Why Choose Us',
  'Gallery',
  'Contact Us',
]

function Footer() {
  return (
    <footer className="bg-white">
      <div className="px-4 py-14 sm:px-6">
        <div className="mx-auto grid  max-w-page items-start gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className='-mt-7'>
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              New World Nursery provides a safe, nurturing, and stimulating
              environment where children learn, play, and grow with confidence
              every day.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold tracking-wider text-nursery-dark uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 transition-colors hover:text-nursery-teal"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold tracking-wider text-nursery-dark uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-nursery-teal" />
                Al Barsha, Dubai, United Arab Emirates
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-nursery-teal" />
                +971 50 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-nursery-teal" />
                info@newworldnursery.ae
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-nursery-teal" />
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

      <div className="bg-nursery-footer px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 text-sm text-white/90">
          <p>© {new Date().getFullYear()} New World Nursery. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#facebook" className="hover:text-white">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#instagram" className="hover:text-white">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#youtube" className="hover:text-white">
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
