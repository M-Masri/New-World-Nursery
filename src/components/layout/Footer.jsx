import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'
import Logo from '../ui/Logo'
import { useHomeData } from '../../context/HomeDataContext'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Our Programs', href: '/programs' },
  { label: 'Why Choose Us', href: '/why-us' },
  { label: 'Contact Us', href: '/contact' },
]

function Footer() {
  const { settings } = useHomeData()
  const siteName = settings?.site_name
  const about = settings?.footer_about
  const address = settings?.contact?.address
  const phone = settings?.contact?.phone || settings?.top_bar_phone
  const email = settings?.contact?.email || settings?.top_bar_email

  const socials = [
    { href: settings?.facebook_url, label: 'Facebook', Icon: FacebookIcon },
    { href: settings?.instagram_url, label: 'Instagram', Icon: InstagramIcon },
    { href: settings?.youtube_url, label: 'YouTube', Icon: YoutubeIcon },
  ].filter((item) => item.href)

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="-mt-10">
            <Logo className="h-24 sm:h-28" />
            {about ? (
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                {about}
              </p>
            ) : null}
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
              {address ? (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5bb5a2]" />
                  {address}
                </li>
              ) : null}
              {phone ? (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-[#5bb5a2]" />
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="hover:text-[#5bb5a2]"
                  >
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-[#5bb5a2]" />
                  <a href={`mailto:${email}`} className="hover:text-[#5bb5a2]">
                    {email}
                  </a>
                </li>
              ) : null}
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

      <div className="bg-nursery-footer">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-[11px] text-white/90 sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()}
            {siteName ? ` ${siteName}` : ''}. All rights reserved.
          </p>
          {socials.length > 0 ? (
            <div className="flex items-center gap-0.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-7 w-7 items-center justify-center hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export default Footer
