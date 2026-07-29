import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ContactPageHero from '../components/sections/contact/ContactPageHero'
import EnquiryFormSection from '../components/sections/contact/EnquiryFormSection'
import ContactInfoMapSection from '../components/sections/contact/ContactInfoMapSection'
import BookTourCtaSection from '../components/sections/about/BookTourCtaSection'

function Contact() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace(/^#/, '')
    const el = document.getElementById(id)
    if (!el) return
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <>
      <ContactPageHero />
      <EnquiryFormSection />
      <ContactInfoMapSection />
      <BookTourCtaSection />
    </>
  )
}

export default Contact
