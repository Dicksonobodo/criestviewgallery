import { Link } from 'react-router-dom'
import { useArtworks } from '../hooks/useArtworks'
import ArtCard from '../components/ArtCard'
import Button from '../components/ui/Button'

const HERO_IMAGE_URL = 'https://res.cloudinary.com/ds5u1pcll/image/upload/v1774578043/zft0xp0b3rrehq1pmssl.jpg'

export default function Home() {
  const { artworks, loading } = useArtworks()
  const featured = artworks.slice(0, 3)

  return (
    <main>

      {/* HERO */}
      <section style={{ paddingTop: 'var(--nav-h)' }} className="relative min-h-screen flex overflow-hidden">

        {/* Mobile background image — full bleed behind everything */}
        <div className="md:hidden absolute inset-0 z-0">
          <img
            src={HERO_IMAGE_URL}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay: strong at bottom for text legibility, subtle at top */}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/20" />
        </div>

        {/* Left — text */}
        <div className="relative z-10 flex flex-col justify-end md:justify-center w-full md:w-[45%] px-6 lg:px-16 py-12 md:py-20">

          <p className="font-[Montserrat] text-[9px] tracking-[0.5em] uppercase text-[#fafafa]/50 md:text-[#999994] mb-6 md:mb-8">
            Original Artworks
          </p>

          <h1
            className="font-[Cormorant_Garamond] font-light leading-[0.88] text-[#fafafa] md:text-[#0a0a0a] mb-8 md:mb-10"
            style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
          >
            The<br />Gallery
          </h1>

          <p className="font-[Montserrat] text-[11px] text-[#fafafa]/70 md:text-[#555552] tracking-wide leading-[1.9] mb-10 md:mb-12 max-w-240px">
            A curated collection of original paintings, photography and mixed media works available for purchase.
          </p>

          <div className="flex items-center gap-8 flex-wrap mb-4 md:mb-0">
            <Link to="/gallery">
              {/* On mobile: white filled button; on desktop: default dark */}
              <button className="
                md:hidden
                font-[Montserrat] text-[10px] tracking-[0.3em] uppercase
                bg-[#fafafa] text-[#0a0a0a]
                px-8 py-3.5
                hover:bg-white/80 transition-colors
              ">
                Explore Collection
              </button>
              <span className="hidden md:block">
                <Button size="lg">Explore Collection</Button>
              </span>
            </Link>

            <Link
              to="/gallery"
              className="font-[Montserrat] text-[10px] tracking-[0.25em] uppercase text-[#fafafa]/80 md:text-[#0a0a0a] border-b border-[#fafafa]/40 md:border-[#0a0a0a] pb-px hover:opacity-60 transition-opacity"
            >
              View All →
            </Link>
          </div>

          {/* Mobile artwork count badge */}
          {artworks.length > 0 && (
            <p className="md:hidden mt-6 font-[Montserrat] text-[9px] tracking-[0.3em] uppercase text-[#fafafa]/40">
              {artworks.length} works available
            </p>
          )}
        </div>

        {/* Right — image (desktop only) */}
        <div className="hidden md:block absolute top-0 right-0 w-[58%] h-full">
          <img src={HERO_IMAGE_URL} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#fafafa] to-transparent" />
        </div>

        {/* Counter */}
        <div className="absolute bottom-0 left-0 md:left-[42%] z-10">
          <div className="bg-[#0a0a0a] px-8 py-4 flex items-center gap-5">
            <button className="font-[Montserrat] text-[10px] text-[#fafafa]/50 hover:text-[#fafafa] transition-colors tracking-widest cursor-pointer">← 01</button>
            <div className="w-px h-3 bg-[#fafafa]/20" />
            <button className="font-[Montserrat] text-[10px] text-[#fafafa]/50 hover:text-[#fafafa] transition-colors tracking-widest cursor-pointer">02 →</button>
          </div>
        </div>
      </section>

    </main>
  )
}