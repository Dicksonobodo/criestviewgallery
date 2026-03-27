import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Button from './ui/Button'

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, cartTotal } = useCart()

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0a0a0a]/40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-[#fafafa] flex flex-col transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#f0f0f0]">
          <h2 className="font-[Cormorant_Garamond] text-2xl font-light tracking-wide">
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-[#999] hover:text-[#0a0a0a] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p className="font-[Cormorant_Garamond] text-2xl font-light text-[#999]">
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="font-[Montserrat] text-xs tracking-widest uppercase text-[#0a0a0a] border-b border-[#0a0a0a] pb-0.5 cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-24 object-cover"
                  />
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-[Cormorant_Garamond] text-lg font-light">
                        {item.title}
                      </h4>
                      <p className="font-[Montserrat] text-xs text-[#999] tracking-widest uppercase mt-1">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-[Cormorant_Garamond] text-lg">
                        £{Number(item.price).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999] hover:text-red-500 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-8 py-6 border-t border-[#f0f0f0] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-[Montserrat] text-xs tracking-widest uppercase text-[#999]">
                Total
              </span>
              <span className="font-[Cormorant_Garamond] text-2xl font-light">
                £{Number(cartTotal).toLocaleString()}
              </span>
            </div>
            <Link to="/checkout" onClick={onClose}>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/cart" onClick={onClose}>
              <Button variant="outline" className="w-full" size="lg">
                View Cart
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer