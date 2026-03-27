import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { saveOrder } from '../firebase/orders'
import Button from '../components/ui/Button'

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async () => {
    if (!phone) return alert('Please enter your phone number')
    setLoading(true)
    try {
      await saveOrder({
        buyerEmail: user.email,
        buyerName: user.displayName,
        buyerPhone: phone,
        buyerMessage: message,
        items: cartItems,
        total: cartTotal,
        status: 'pending',
      })
      clearCart()
      navigate('/order-success')
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    navigate('/gallery')
    return null
  }

  return (
    <main className="max-w-3xl mx-auto px-8 pt-28 pb-24">

      {/* Header */}
      <div className="mb-14">
        <p className="font-[Montserrat] text-xs tracking-[0.4em] uppercase text-[#999] mb-3">
          Almost There
        </p>
        <h1 className="font-[Cormorant_Garamond] text-6xl font-light">
          Request Order
        </h1>
        <p className="font-[Montserrat] text-xs text-[#999] tracking-wide leading-relaxed mt-4">
          Submit your order request and we'll contact you within 24 hours to arrange payment and delivery.
        </p>
      </div>

      {/* Order summary */}
      <div className="border border-[#f0f0f0] p-8 mb-8">
        <h2 className="font-[Cormorant_Garamond] text-2xl font-light mb-6">
          Order Summary
        </h2>
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 pb-4 border-b border-[#f0f0f0]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-20 object-cover"
              />
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="font-[Cormorant_Garamond] text-xl font-light">
                    {item.title}
                  </p>
                  <p className="font-[Montserrat] text-xs text-[#999] tracking-widest uppercase mt-1">
                    {item.category}
                  </p>
                </div>
                <span className="font-[Cormorant_Garamond] text-xl">
                  £{Number(item.price).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="font-[Montserrat] text-xs tracking-widest uppercase text-[#999]">
            Total
          </span>
          <span className="font-[Cormorant_Garamond] text-3xl font-light">
            £{Number(cartTotal).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Contact details */}
      <div className="border border-[#f0f0f0] p-8 mb-8 flex flex-col gap-6">
        <h2 className="font-[Cormorant_Garamond] text-2xl font-light">
          Your Details
        </h2>

        {/* Google user info */}
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-[Montserrat] text-sm text-[#0a0a0a]">
              {user?.displayName}
            </p>
            <p className="font-[Montserrat] text-xs text-[#999]">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-[#f0f0f0]" />

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="font-[Montserrat] text-xs tracking-widest uppercase text-[#999]">
            Phone Number *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+000 000 000 0000"
            className="border-b border-[#0a0a0a] bg-transparent py-3 font-[Montserrat] text-sm tracking-wide placeholder:text-[#ccc] focus:outline-none"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="font-[Montserrat] text-xs tracking-widest uppercase text-[#999]">
            Message (optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any special requests or questions..."
            rows={3}
            className="border-b border-[#0a0a0a] bg-transparent py-3 font-[Montserrat] text-sm tracking-wide placeholder:text-[#ccc] focus:outline-none resize-none"
          />
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        loading={loading}
        onClick={handleSubmit}
      >
        Submit Order Request
      </Button>

      <p className="font-[Montserrat] text-[10px] text-[#999] tracking-widest uppercase text-center mt-6">
        We'll reach out within 24 hours to confirm your order
      </p>
    </main>
  )
}

export default Checkout