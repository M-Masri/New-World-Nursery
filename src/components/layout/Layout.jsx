import { Outlet } from 'react-router-dom'
import { ContactFormProvider } from '../../context/ContactFormContext'
import ContactFormPopup from '../ui/ContactFormPopup'
import CustomCursor from './CustomCursor'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <ContactFormProvider>
      <div className="min-h-screen bg-white text-gray-800">
        <CustomCursor />
        <TopBar />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ContactFormPopup />
      </div>
    </ContactFormProvider>
  )
}

export default Layout
