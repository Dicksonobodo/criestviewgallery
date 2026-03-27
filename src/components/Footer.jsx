import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Cart', to: '/cart' },
]

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Pinterest', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#fafafa]">

      {/* Top section */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#fafafa]/10">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <span className="font-[Cormorant_Garamond] text-3xl font-light tracking-[0.35em] uppercase">
            The Gallery
          </span>
          <p className="font-[Montserrat] text-[10px] tracking-wide leading-[1.9] text-[#fafafa]/40 max-w-[220px]">
            A curated collection of original paintings, photography and mixed media works.
          </p>
          {/* Decorative line */}
          <div className="w-8 h-px bg-[#fafafa]/20 mt-1" />
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <p className="font-[Montserrat] text-[8px] tracking-[0.4em] uppercase text-[#fafafa]/30 mb-1">
            Navigate
          </p>
          {LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="font-[Montserrat] text-[10px] tracking-[0.2em] uppercase text-[#fafafa]/60 hover:text-[#fafafa] transition-colors duration-200 w-fit"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Socials + tagline */}
        <div className="flex flex-col gap-4">
          <p className="font-[Montserrat] text-[8px] tracking-[0.4em] uppercase text-[#fafafa]/30 mb-1">
            Follow
          </p>
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-[Montserrat] text-[10px] tracking-[0.2em] uppercase text-[#fafafa]/60 hover:text-[#fafafa] transition-colors duration-200 w-fit"
            >
              {label}
            </a>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-[Montserrat] text-[8px] tracking-[0.3em] uppercase text-[#fafafa]/25">
          © {new Date().getFullYear()} The Gallery. All Rights Reserved.
        </p>
        <p className="font-[Montserrat] text-[8px] tracking-[0.2em] uppercase text-[#fafafa]/20">
          Original works · Worldwide shipping
        </p>
      </div>

    </footer>
  )
}