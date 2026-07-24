import { Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'

function TopBar() {
  return (
    <div className="hidden border-b border-gray-100 bg-nursery-cream sm:block">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 text-xs text-gray-600 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <a href="tel:+971501234567" className="flex items-center gap-1.5 hover:text-nursery-teal">
            <Phone className="h-3.5 w-3.5 shrink-0 text-nursery-teal" />
            +971 50 123 4567
          </a>
          <a
            href="mailto:info@newworldnursery.ae"
            className="flex items-center gap-1.5 hover:text-nursery-teal"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-nursery-teal" />
            info@newworldnursery.ae
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="flex items-center gap-1.5 hover:text-nursery-teal">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-nursery-teal" />
            Find Us
          </a>
          <div className="flex items-center gap-1 border-l border-gray-200 pl-3 sm:gap-1.5 sm:pl-4">
            <a
              href="#facebook"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-nursery-teal hover:text-nursery-teal-dark"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="#instagram"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-nursery-teal hover:text-nursery-teal-dark"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="#youtube"
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-nursery-teal hover:text-nursery-teal-dark"
              aria-label="YouTube"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
