const variants = {
  primary:
    'bg-nursery-coral text-white hover:bg-nursery-coral-dark shadow-md shadow-nursery-coral/30',
  outline:
    'border-2 border-nursery-teal text-nursery-teal bg-white hover:bg-nursery-mint',
  outlineCoral:
    'border-2 border-[#f07a7a] text-[#f07a7a] bg-white hover:bg-[#fde8e8]',
  outlineWhite:
    'border-2 border-white text-white bg-transparent hover:bg-white/10',
}

function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`rounded-full px-7 py-2.5 text-sm font-bold tracking-wide uppercase transition-all duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
