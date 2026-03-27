import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ArtCard = ({ artwork }) => {
  const { addToCart, cartItems } = useCart()
  const inCart = cartItems.some((item) => item.id === artwork.id)

  return (
    <div className="group relative overflow-hidden">

      {/* Image container */}
      <Link to={`/art/${artwork.id}`} className="relative block aspect-[3/4] overflow-hidden">

        {/* Art image */}
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        {/* Always-on dark gradient at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />

        {/* Sold overlay */}
        {!artwork.available && (
          <div className="absolute inset-0 bg-[#0a0a0a]/60 flex items-center justify-center">
            <span className="font-[Montserrat] text-[10px] text-[#fafafa]/60 tracking-[0.4em] uppercase border border-[#fafafa]/20 px-4 py-2">
              Sold
            </span>
          </div>
        )}

        {/* Overlay text — always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1.5">

          {/* Category */}
          <span className="font-[Montserrat] text-[8px] tracking-[0.35em] uppercase text-[#fafafa]/50">
            {artwork.category}
          </span>

          {/* Title + Price row */}
          <div className="flex items-end justify-between gap-2">
            <h3 className="font-[Cormorant_Garamond] text-xl font-light text-[#fafafa] leading-tight">
              {artwork.title}
            </h3>
            <span className="font-[Cormorant_Garamond] text-lg font-light text-[#fafafa]/80 whitespace-nowrap shrink-0">
              £{Number(artwork.price).toLocaleString()}
            </span>
          </div>

          {/* Add to cart — slides up on hover */}
          {artwork.available && (
            <div className="overflow-hidden h-0 group-hover:h-10 transition-all duration-300 ease-in-out mt-1">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  addToCart(artwork)
                }}
                disabled={inCart}
                className={`
                  w-full py-2.5 font-[Montserrat] text-[9px] tracking-[0.3em] uppercase transition-colors duration-200
                  ${inCart
                    ? 'bg-transparent border border-[#fafafa]/30 text-[#fafafa]/40 cursor-default'
                    : 'bg-[#fafafa] text-[#0a0a0a] hover:bg-[#fafafa]/90 cursor-pointer'
                  }
                `}
              >
                {inCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          )}
        </div>
      </Link>

    </div>
  )
}

export default ArtCard