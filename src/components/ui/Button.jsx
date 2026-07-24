const variants = {
  primary:
    'bg-[#5bb5a2] text-white hover:bg-[#4a9e8d] shadow-md shadow-[#5bb5a2]/25',
  outline:
    'border-2 border-[#5bb5a2] text-[#5bb5a2] bg-white hover:bg-[#eef8f5]',
  outlineCoral:
    'border-2 border-[#f4a0b0] text-[#e8899a] bg-white hover:bg-[#fdf0f3]',
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
      className={`rounded-xl px-8 py-2.5 text-sm font-extrabold tracking-wide uppercase transition-all duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
