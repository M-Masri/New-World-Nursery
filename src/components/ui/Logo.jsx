import logo from '../../assets/logo.png'

function Logo({ className = '' }) {
  return (
    <img
      src={logo}
      alt="New World Nursery"
      className={`w-auto object-contain drop-shadow-[0_2px_8px_rgba(45,58,74,0.2)] brightness-[1.03] contrast-[1.08] ${className}`}
    />
  )
}

export default Logo
