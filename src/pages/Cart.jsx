import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Button from '../components/ui/Button'

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart()

  if (cartItems.length === 0) return (
    <main style={{ paddingTop: 'var(--nav-h)' }} className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-[Cormorant_Garamond] text-5xl font-light text-[#ccc] mb-4">Your cart is empty</p>
        <p className="font-[Montserrat] text-[9px] tracking-[0.3em] uppercase text-[#999994] mb-10">Discover something you love</p>
        <Link to="/gallery"><Button size="lg">Browse Collection</Button></Link>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 pb-28">

        {/* Header */}
        <div className="py-12 border-b border-[#e8e8e4] mb-16">
          <p className="font-[Montserrat] text-[9px] tracking-[0.5em] uppercase text-[#999994] mb-5">Review</p>
          <h1 className="font-[Cormorant_Garamond] font-light" style={{ fontSize: 'clamp(3rem,6vw,5rem)' }}>Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 xl:gap-24">

          {/* Items */}
          <div className="flex flex-col gap-0">
            {cartItems.map((item, i) => (
              <div key={item.id} className={`flex gap-6 py-8 ${i !== 0 ? 'border-t border-[#e8e8e4]' : ''}`}>
                <Link to={`/art/${item.id}`}>
                  <img src={item.imageUrl} alt={item.title} className="w-24 h-32 object-cover shrink-0" />
                </Link>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-[Cormorant_Garamond] text-2xl font-light">{item.title}</h3>
                    <p className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994] mt-1">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-[Cormorant_Garamond] text-2xl font-light">₦{Number(item.price).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(item.id)}
                      className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994] hover:text-red-500 transition-colors cursor-pointer">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-[#e8e8e4]">
              <button onClick={clearCart}
                className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994] hover:text-red-500 transition-colors cursor-pointer">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="border border-[#e8e8e4] p-8 flex flex-col gap-6 sticky top-24">
              <h2 className="font-[Cormorant_Garamond] text-2xl font-light">Order Summary</h2>

              <div className="flex flex-col gap-3 py-4 border-y border-[#e8e8e4]">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <span className="font-[Montserrat] text-[10px] text-[#999994] tracking-wide truncate">{item.title}</span>
                    <span className="font-[Montserrat] text-[10px] text-[#0a0a0a] shrink-0">₦{Number(item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994]">Total</span>
                <span className="font-[Cormorant_Garamond] text-3xl font-light">₦{Number(cartTotal).toLocaleString()}</span>
              </div>

              <Link to="/checkout"><Button size="lg" className="w-full">Proceed to Checkout</Button></Link>
              <Link to="/gallery"><Button variant="outline" size="lg" className="w-full">Continue Shopping</Button></Link>

              <p className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994] text-center">
                Free shipping on all orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}