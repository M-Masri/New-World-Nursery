import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ContactFormProvider } from '../../context/ContactFormContext'
import { HomeDataProvider } from '../../context/HomeDataContext'
import CustomCursor from './CustomCursor'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'
import RouteTransitionLoader from './RouteTransitionLoader'
import ScrollToTop from './ScrollToTop'
import HomePageLoader from '../ui/HomePageLoader'

function Layout() {
  return (
    <HomeDataProvider>
      <ContactFormProvider>
        <div className="min-h-screen bg-white text-gray-800">
          <ScrollToTop />
          <CustomCursor />
          <TopBar />
          <Navbar />
          <RouteTransitionLoader />
          <main className="min-h-[85vh]">
            <Suspense fallback={<HomePageLoader />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
        </div>
      </ContactFormProvider>
    </HomeDataProvider>
  )
}

export default Layout
