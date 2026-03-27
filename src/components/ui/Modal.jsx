import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a]/70" />

      {/* Modal box */}
      <div
        className="relative z-10 bg-[#fafafa] w-full max-w-lg mx-4 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-[Cormorant_Garamond] text-2xl font-light tracking-wide">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-[#999] hover:text-[#0a0a0a] transition-colors text-xl leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal