import { useParams, Link } from 'react-router-dom'
import { useArtwork } from '../hooks/useArtworks'
import { useCart } from '../context/CartContext'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

export default function ArtDetail() {
  const { id } = useParams()
  const { artwork, loading } = useArtwork(id)
  const { addToCart, cartItems } = useCart()
  const inCart = cartItems.some(i => i.id === id)

  if (loading) return (
    <div style={{ paddingTop: 'var(--nav-h)' }} className="max-w-1400px mx-auto px-6 lg:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 animate-pulse">
        <div className="aspect-3/4 bg-[#f0f0ee]" />
        <div className="flex flex-col gap-4 pt-4">
          <div className="h-8 bg-[#f0f0ee] w-3/4" />
          <div className="h-5 bg-[#f0f0ee] w-1/4 mt-2" />
        </div>
      </div>
    </div>
  )

  if (!artwork) return (
    <div style={{ paddingTop: 'var(--nav-h)' }} className="max-w-1400px mx-auto px-6 py-20 text-center">
      <p className="font-[Cormorant_Garamond] text-4xl font-light text-[#999]">Artwork not found</p>
      <Link to="/gallery"><Button className="mt-8">Back to Gallery</Button></Link>
    </div>
  )

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="max-w-1400px mx-auto px-6 lg:px-12 py-16 pb-28">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-14">
          {[['Home','/'],['Gallery','/gallery']].map(([label, to]) => (
            <span key={to} className="flex items-center gap-3">
              <Link to={to} className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994] hover:text-[#0a0a0a] transition-colors">{label}</Link>
              <span className="text-[#e8e8e4]">/</span>
            </span>
          ))}
          <span className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#0a0a0a]">{artwork.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* Image */}
          <div className="relative">
            <img src={artwork.imageUrl} alt={artwork.title} className="w-full object-cover" />
            {!artwork.available && (
              <div className="absolute inset-0 bg-[#0a0a0a]/50 flex items-center justify-center">
                <span className="font-[Montserrat] text-xs text-[#fafafa] tracking-widest uppercase">Sold</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center gap-7 py-4">
            <div>
              <Badge>{artwork.category}</Badge>
              <h1 className="font-[Cormorant_Garamond] font-light leading-1.0 mt-5" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
                {artwork.title}
              </h1>
            </div>

            <p className="font-[Cormorant_Garamond] text-4xl font-light">
              £{Number(artwork.price).toLocaleString()}
            </p>

            <div className="w-10 h-px bg-[#e8e8e4]" />

            {artwork.description && (
              <p className="font-[Montserrat] text-[11px] text-[#555552] leading-[1.9] tracking-wide">
                {artwork.description}
              </p>
            )}

            <div className="flex flex-col gap-2.5">
              {[['Medium', artwork.medium], ['Dimensions', artwork.dimensions], ['Year', artwork.year]]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <span className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994] w-24 shrink-0 pt-px">{label}</span>
                    <span className="font-[Montserrat] text-[11px] text-[#0a0a0a]">{value}</span>
                  </div>
                ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {artwork.available ? (
                <>
                  <Button size="lg" onClick={() => addToCart(artwork)} disabled={inCart} variant={inCart ? 'outline' : 'primary'}>
                    {inCart ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                  {inCart && (
                    <Link to="/cart"><Button variant="outline" size="lg" className="w-full">View Cart →</Button></Link>
                  )}
                </>
              ) : (
                <Button disabled size="lg">Sold Out</Button>
              )}
            </div>

            <p className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994]">
              Free shipping · Certificate of authenticity included
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}