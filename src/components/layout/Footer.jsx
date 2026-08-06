import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/SocialIcons'
import Logo from '../ui/Logo'
import { useHomeData } from '../../context/HomeDataContext'
import { useLanguage } from '../../i18n'

function Footer() {
  const { pathname } = useLocation()
  const { settings } = useHomeData()
  const { t, language } = useLanguage()
  const isHome = pathname === '/'
  const siteName = settings?.site_name
  const about = settings?.footer_about
  const address = settings?.contact?.address
  const phone = settings?.contact?.phone || settings?.top_bar_phone
  const email = settings?.contact?.email || settings?.top_bar_email

  const quickLinks = useMemo(
    () => [
      { label: t('nav.home'), href: '/' },
      { label: t('nav.about'), href: '/about' },
      { label: t('nav.blogs'), href: '/blog' },
      { label: t('nav.programs'), href: '/programs' },
      { label: t('nav.learningPhilosophy'), href: '/learning-philosophy' },
      { label: t('nav.signaturePrograms'), href: '/signature-programs' },
      { label: t('nav.awardsNetwork'), href: '/awards-network' },
      { label: t('nav.gallery'), href: '/gallery' },
      { label: t('nav.whyUs'), href: '/why-us' },
      { label: t('nav.contact'), href: '/contact' },
    ],
    [t, language],
  )

  const socials = [
    { href: settings?.facebook_url, label: 'Facebook', Icon: FacebookIcon },
    { href: settings?.instagram_url, label: 'Instagram', Icon: InstagramIcon },
    { href: settings?.youtube_url, label: 'YouTube', Icon: YoutubeIcon },
  ].filter((item) => item.href)

  const year = new Date().getFullYear()
  const rights = t('footer.rightsReserved', {
    year: String(year),
    name: siteName ? ` ${siteName}` : '',
  })

  return (
    <footer className="bg-white">
      {!isHome ? (
        <div
          className="mx-auto max-w-page page-gutter"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#5bb5a2]/50 to-transparent" />
        </div>
      ) : null}
      <div className="mx-auto max-w-page page-gutter py-14">
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
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
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
              {t('footer.contactUs')}
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
                  {t('footer.hoursWeekdays')}
                  <br />
                  {t('footer.hoursWeekend')}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-nursery-footer">
        <div
          className="mx-auto flex max-w-page flex-col items-start gap-1.5 page-gutter py-2.5 text-start text-xs text-white/90 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:py-2 sm:text-[11px]"
        >
          <p className="max-w-[22rem] leading-relaxed sm:max-w-none">
            {rights}{' '}
            {t('footer.supervisedBy')}{' '}
            <a
              href="https://www.sawatech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline-offset-2 transition hover:underline"
            >
              SawaTech
            </a>
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
