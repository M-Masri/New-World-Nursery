import logo from '../assets/logo.png'

function Logo({ className = '' }) {
  return (
    <img
      src={logo}
      alt="New World Nursery"
      className={`h-20 w-auto object-contain sm:h-24 ${className}`}
    />
  )
}

export default Logo
