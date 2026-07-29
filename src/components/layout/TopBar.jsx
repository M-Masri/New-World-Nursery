import { Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'
import { useHomeData } from '../../context/HomeDataContext'

/**
 * Always reserve top-bar height on sm+ so settings load doesn't push the navbar (CLS).
 */
function TopBar() {
  const { settings } = useHomeData()
  const phone = settings?.top_bar_phone
  const email = settings?.top_bar_email
  const socials = [
    { href: settings?.facebook_url, label: 'Facebook', Icon: FacebookIcon },
    { href: settings?.instagram_url, label: 'Instagram', Icon: InstagramIcon },
    { href: settings?.youtube_url, label: 'YouTube', Icon: YoutubeIcon },
  ].filter((item) => item.href)

  const hasContent = Boolean(phone || email || socials.length > 0)

  return (
    <div
      className="hidden min-h-[2.125rem] border-b border-gray-100 bg-nursery-cream sm:block"
      aria-hidden={!hasContent}
    >
      {hasContent ? (
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-1.5 text-[11px] text-gray-600 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-nursery-teal"
              >
                <Phone className="h-3 w-3 shrink-0 text-nursery-teal" />
                {phone}
              </a>
            ) : null}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 hover:text-nursery-teal"
              >
                <Mail className="h-3 w-3 shrink-0 text-nursery-teal" />
                {email}
              </a>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/contact#find-us"
              className="flex items-center gap-1.5 hover:text-nursery-teal"
            >
              <MapPin className="h-3 w-3 shrink-0 text-nursery-teal" />
              Find Us
            </a>
            {socials.length > 0 ? (
              <div className="flex items-center gap-0.5 border-l border-gray-200 pl-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-7 w-7 items-center justify-center text-nursery-teal hover:text-nursery-teal-dark"
                    aria-label={label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TopBar
