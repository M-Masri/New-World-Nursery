import { Mail, MapPin, Phone, User } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'

function TopBar() {
  return (
    <div className="border-b border-gray-100 bg-nursery-cream">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs text-gray-600 sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <a href="tel:+971501234567" className="flex items-center gap-1.5 hover:text-nursery-teal">
            <Phone className="h-3.5 w-3.5 text-nursery-teal" />
            +971 50 123 4567
          </a>
          <a
            href="mailto:info@newworldnursery.ae"
            className="flex items-center gap-1.5 hover:text-nursery-teal"
          >
            <Mail className="h-3.5 w-3.5 text-nursery-teal" />
            info@newworldnursery.ae
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="flex items-center gap-1.5 hover:text-nursery-teal">
            <MapPin className="h-3.5 w-3.5 text-nursery-teal" />
            Find Us
          </a>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
            <a href="#facebook" className="text-nursery-teal hover:text-nursery-teal-dark">
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a href="#instagram" className="text-nursery-teal hover:text-nursery-teal-dark">
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a href="#youtube" className="text-nursery-teal hover:text-nursery-teal-dark">
              <YoutubeIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
