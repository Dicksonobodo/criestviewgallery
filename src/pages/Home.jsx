import { Link } from 'react-router-dom'
import { useArtworks } from '../hooks/useArtworks'
import Button from '../components/ui/Button'

const HERO_IMAGE_URL = 'https://res.cloudinary.com/ds5u1pcll/image/upload/v1774578043/zft0xp0b3rrehq1pmssl.jpg'

export default function Home() {
  const { artworks } = useArtworks()

  return (
    <main>

      {/* ── HERO ─────────────────────────────────── */}
      <section
        style={{ paddingTop: 'var(--nav-h)' }}
        className="relative min-h-screen flex items-center overflow-hidden"
      >

        {/* Background image — full bleed */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE_URL}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0a0a0a]/50" />
        </div>

        {/* Center content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 py-24">

          <p className="font-[Montserrat] text-[9px] tracking-[0.6em] uppercase text-[#fafafa]/50 mb-8">
            Original Artworks
          </p>

          <h1
            className="font-[Cormorant_Garamond] font-light leading-[0.88] text-[#fafafa] mb-10"
            style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
          >
            The<br />Gallery
          </h1>

          <p className="font-[Montserrat] text-[11px] text-[#fafafa]/60 tracking-wide leading-[1.9] mb-14 max-w-xs">
            A curated collection of original paintings, photography and mixed media works available for purchase.
          </p>

          <div className="flex items-center gap-10 flex-wrap justify-center">
            <Link to="/gallery">
              <button className="font-[Montserrat] text-[10px] tracking-[0.3em] uppercase bg-[#fafafa] text-[#0a0a0a] px-10 py-4 hover:bg-white/80 transition-colors">
                Explore Collection
              </button>
            </Link>
            <Link
              to="/gallery"
              className="font-[Montserrat] text-[10px] tracking-[0.25em] uppercase text-[#fafafa]/70 border-b border-[#fafafa]/30 pb-px hover:opacity-60 transition-opacity"
            >
              View All →
            </Link>
          </div>

          {artworks.length > 0 && (
            <p className="mt-16 font-[Montserrat] text-[9px] tracking-[0.4em] uppercase text-[#fafafa]/30">
              {artworks.length} works available
            </p>
          )}

        </div>

        {/* Counter — bottom left */}
        <div className="absolute bottom-0 left-0 z-10">
          <div className="bg-[#0a0a0a]/80 backdrop-blur-sm px-8 py-4 flex items-center gap-5">
            <button className="font-[Montserrat] text-[10px] text-[#fafafa]/40 hover:text-[#fafafa] transition-colors tracking-widest cursor-pointer">← 01</button>
            <div className="w-px h-3 bg-[#fafafa]/20" />
            <button className="font-[Montserrat] text-[10px] text-[#fafafa]/40 hover:text-[#fafafa] transition-colors tracking-widest cursor-pointer">02 →</button>
          </div>
        </div>

      </section>

      {/* ── SPACER BEFORE FOOTER ─────────────────── */}
      <div className="bg-[#fafafa] py-20 flex flex-col items-center justify-center gap-6 text-center px-6">
        <div className="w-px h-16 bg-[#e8e8e4] mx-auto" />
        <p className="font-[Montserrat] text-[9px] tracking-[0.5em] uppercase text-[#ccc]">
          The Gallery · Original Works
        </p>
        <div className="w-px h-16 bg-[#e8e8e4] mx-auto" />
      </div>

    </main>
  )
}