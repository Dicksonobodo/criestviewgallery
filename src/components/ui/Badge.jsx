const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={`
        inline-block px-3 py-1
        text-[10px] font-[Montserrat] font-500 tracking-widest uppercase
        border border-[#0a0a0a] text-[#0a0a0a]
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge