import { Outlet } from 'react-router-dom'
import CustomCursor from './CustomCursor'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <CustomCursor />
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
