import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { signInWithGoogle, logOut } from '../firebase/auth'

export default function Navbar({ onCartOpen }) {
  const { user, isAdmin } = useAuth()
  const { cartCount } = useCart()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Shop', to: '/gallery' },
/*     { label: 'Contact', to: '#contact' },
 */  ]

  return (
    <>
      <header
        style={{ height: 'var(--nav-h)' }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center transition-all duration-300 ${scrolled ? 'bg-[#fafafa] border-b border-[#e8e8e4]' : 'bg-[#fafafa]/95 backdrop-blur-sm'}`}
      >
        <div className="w-full max-w-1400px mx-auto px-6 lg:px-12 flex items-center justify-between">

          <Link to="/" className="font-[Cormorant_Garamond] text-[1.1rem] font-light tracking-[0.35em] uppercase">
            The Gallery
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.map(({ label, to }) => (
              <Link key={label} to={to}
                className={`font-[Montserrat] text-[10px] tracking-[0.2em] uppercase transition-colors ${location.pathname === to ? 'text-[#0a0a0a]' : 'text-[#999994] hover:text-[#0a0a0a]'}`}>
                {label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="font-[Montserrat] text-[10px] tracking-[0.2em] uppercase text-[#999994] hover:text-[#0a0a0a] transition-colors">
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-5">
            <button onClick={onCartOpen} className="relative cursor-pointer group">
              <svg className="w-18px h-18px text-[#0a0a0a] group-hover:opacity-60 transition-opacity" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#0a0a0a] text-[#fafafa] text-[8px] font-[Montserrat] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full object-cover" />
                <button onClick={logOut} className="font-[Montserrat] text-[10px] tracking-[0.2em] uppercase text-[#999994] hover:text-[#0a0a0a] transition-colors cursor-pointer">
                  Sign Out
                </button>
              </div>
            ) : (
              <button onClick={signInWithGoogle} className="hidden md:block font-[Montserrat] text-[10px] tracking-[0.2em] uppercase text-[#999994] hover:text-[#0a0a0a] transition-colors cursor-pointer">
                Sign In
              </button>
            )}

<button onClick={() => setOpen(!open)} className="md:hidden cursor-pointer flex flex-col gap-[6px]">
  <span className={`block w-6 h-[2px] bg-[#0a0a0a] transition-all duration-300 ${open ? 'rotate-45 translate-y-[8px]' : ''}`} />
  <span className={`block w-6 h-[2px] bg-[#0a0a0a] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
  <span className={`block w-6 h-[2px] bg-[#0a0a0a] transition-all duration-300 ${open ? '-rotate-45 -translate-y-[8px]' : ''}`} />
</button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div style={{ top: 'var(--nav-h)' }}
        className={`fixed inset-x-0 z-40 bg-[#fafafa] border-b border-[#e8e8e4] transition-all duration-300 md:hidden overflow-hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="max-w-1400px mx-auto px-6 py-8 flex flex-col gap-5">
          {links.map(({ label, to }) => (
            <Link key={label} to={to} className="font-[Montserrat] text-[11px] tracking-[0.2em] uppercase text-[#0a0a0a]">{label}</Link>
          ))}
          {isAdmin && <Link to="/admin" className="font-[Montserrat] text-[11px] tracking-[0.2em] uppercase text-[#0a0a0a]">Admin</Link>}
          <div className="w-8 h-px bg-[#e8e8e4]" />
          {user
            ? <button onClick={logOut} className="font-[Montserrat] text-[11px] tracking-[0.2em] uppercase text-[#999994] cursor-pointer text-left">Sign Out</button>
            : <button onClick={signInWithGoogle} className="font-[Montserrat] text-[11px] tracking-[0.2em] uppercase text-[#999994] cursor-pointer text-left">Sign In</button>}
        </div>
      </div>
    </>
  )
}