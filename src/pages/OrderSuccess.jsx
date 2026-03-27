import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const OrderSuccess = () => {
  return (
    <main
      style={{ paddingTop: 'var(--navbar-h)' }}
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="w-full max-w-2xl">

        {/* Top line */}
        <div className="w-full h-px bg-[#0a0a0a] mb-16" />

        {/* Main content */}
        <div className="flex flex-col md:flex-row items-start gap-16">

          {/* Left — large checkmark */}
          <div className="shrink-0">
            <div className="w-20 h-20 border border-[#0a0a0a] flex items-center justify-center relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-[#0a0a0a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {/* Corner accent */}
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#0a0a0a]" />
            </div>
          </div>

          {/* Right — text */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-[Montserrat] text-[10px] tracking-[0.5em] uppercase text-[#999] mb-4">
                Order Submitted
              </p>
              <h1 className="font-[Cormorant_Garamond] text-6xl md:text-7xl font-light leading-[0.9]">
                Thank<br />You
              </h1>
            </div>

            <div className="w-10 h-px bg-[#ddd]" />

            <p className="font-[Montserrat] text-xs text-[#666] leading-relaxed tracking-wide max-w-xs">
              Your order request has been received. We'll reach out within 24 hours to confirm your order and arrange delivery.
            </p>

            {/* What happens next */}
            <div className="flex flex-col gap-4 mt-2">
              {[
                { step: '01', text: 'We review your order request' },
                { step: '02', text: 'We contact you to confirm details' },
                { step: '03', text: 'Artwork is carefully packaged & shipped' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-center gap-4">
                  <span className="font-[Cormorant_Garamond] text-2xl font-light text-[#ddd] shrink-0 w-8">
                    {step}
                  </span>
                  <span className="font-[Montserrat] text-xs text-[#999] tracking-wide">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link to="/gallery">
                <Button size="lg">Continue Browsing</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="w-full h-px bg-[#f0f0f0] mt-16" />

        {/* Footer note */}
        <p className="font-[Montserrat] text-[10px] text-[#ccc] tracking-widest uppercase mt-6 text-center">
          A confirmation has been saved · The Gallery
        </p>

      </div>
    </main>
  )
}

export default OrderSuccess