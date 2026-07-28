import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ContactFormProvider } from '../../context/ContactFormContext'
import { HomeDataProvider } from '../../context/HomeDataContext'
import CustomCursor from './CustomCursor'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'

const ContactFormPopup = lazy(() => import('../ui/ContactFormPopup'))

function Layout() {
  return (
    <HomeDataProvider>
      <ContactFormProvider>
        <div className="min-h-screen bg-white text-gray-800">
          <CustomCursor />
          <TopBar />
          <Navbar />
          <main className="min-h-[85vh]">
            <Outlet />
          </main>
          <Footer />
          <Suspense fallback={null}>
            <ContactFormPopup />
          </Suspense>
        </div>
      </ContactFormProvider>
    </HomeDataProvider>
  )
}

export default Layout
