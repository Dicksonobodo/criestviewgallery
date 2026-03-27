import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useOrders } from '../../hooks/useOrders'

const STATUS = {
  pending:   { label: 'Pending',   dot: 'bg-amber-400',  text: 'text-amber-600',  bar: 'bg-amber-400/10 border-amber-200/60' },
  confirmed: { label: 'Confirmed', dot: 'bg-emerald-400', text: 'text-emerald-600', bar: 'bg-emerald-400/10 border-emerald-200/60' },
  cancelled: { label: 'Cancelled', dot: 'bg-red-400',    text: 'text-red-500',    bar: 'bg-red-400/10 border-red-200/60' },
}

const StatusBadge = ({ status }) => {
  const s = STATUS[status] || STATUS.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 border font-[Montserrat] text-[9px] tracking-[0.3em] uppercase ${s.text} ${s.bar}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

const Orders = () => {
  const { orders, loading } = useOrders()
  const [updating, setUpdating] = useState(null)
  const [expanded, setExpanded] = useState(null)

  const updateStatus = async (orderId, status) => {
    setUpdating(orderId)
    try {
      await updateDoc(doc(db, 'orders', orderId), { status })
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id)

  // Summary counts
  const counts = orders.reduce((acc, o) => {
    const s = o.status || 'pending'
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-[Montserrat] text-[9px] tracking-[0.4em] uppercase text-[#999] mb-2">
            Admin
          </p>
          <h1 className="font-[Cormorant_Garamond] text-5xl font-light">
            Orders
          </h1>
        </div>

        {/* Summary pills */}
        {!loading && orders.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {Object.entries(STATUS).map(([key, val]) => (
              <div key={key} className={`px-4 py-2 border font-[Montserrat] text-[9px] tracking-[0.25em] uppercase flex items-center gap-2 ${val.bar} ${val.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${val.dot}`} />
                {counts[key] || 0} {val.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white border border-[#e8e8e8] h-24" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white border border-[#e8e8e8] p-20 text-center">
          <p className="font-[Cormorant_Garamond] text-4xl font-light text-[#ccc]">No orders yet</p>
          <p className="font-[Montserrat] text-[9px] tracking-[0.3em] uppercase text-[#ddd] mt-3">Orders will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order, idx) => {
            const isOpen = expanded === order.id
            const s = STATUS[order.status] || STATUS.pending

            return (
              <div key={order.id} className="bg-white border border-[#e8e8e8] overflow-hidden">

                {/* Order row — always visible */}
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="w-full text-left px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#fafafa] transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    {/* Index */}
                    <span className="font-[Montserrat] text-[9px] tracking-widest text-[#ccc] w-5 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Name + date */}
                    <div>
                      <p className="font-[Cormorant_Garamond] text-xl font-light text-[#0a0a0a]">
                        {order.buyerName}
                      </p>
                      <p className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#bbb] mt-0.5">
                        {order.createdAt?.toDate?.().toLocaleDateString('en-NG', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 sm:gap-7 ml-10 sm:ml-0">
                    {/* Items count */}
                    <span className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#bbb]">
                      {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
                    </span>

                    {/* Total */}
                    <span className="font-[Cormorant_Garamond] text-2xl font-light text-[#0a0a0a]">
                      £{Number(order.total).toLocaleString()}
                    </span>

                    {/* Status */}
                    <StatusBadge status={order.status} />

                    {/* Chevron */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-3.5 h-3.5 text-[#ccc] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="border-t border-[#f0f0f0] px-6 py-6 flex flex-col gap-6">

                    {/* Buyer info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        ['Email', order.buyerEmail],
                        ['Phone', order.buyerPhone],
                        ['Message', order.buyerMessage || '—'],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="font-[Montserrat] text-[8px] tracking-[0.35em] uppercase text-[#ccc] mb-1">{label}</p>
                          <p className="font-[Montserrat] text-xs text-[#555] leading-relaxed">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-3 border-t border-[#f5f5f5] pt-5">
                      <p className="font-[Montserrat] text-[8px] tracking-[0.35em] uppercase text-[#ccc] mb-1">Items</p>
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-10 h-12 object-cover shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                          />
                          <div className="flex-1 flex items-center justify-between gap-4">
                            <div>
                              <p className="font-[Cormorant_Garamond] text-lg font-light text-[#0a0a0a]">{item.title}</p>
                              <p className="font-[Montserrat] text-[9px] tracking-widest uppercase text-[#bbb]">{item.category}</p>
                            </div>
                            <span className="font-[Cormorant_Garamond] text-xl font-light text-[#0a0a0a] shrink-0">
                              £{Number(item.price).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 border-t border-[#f5f5f5] pt-5">
                      <button
                        onClick={() => updateStatus(order.id, 'confirmed')}
                        disabled={order.status === 'confirmed' || updating === order.id}
                        className="
                          font-[Montserrat] text-[9px] tracking-[0.3em] uppercase px-5 py-2.5
                          bg-[#0a0a0a] text-[#fafafa]
                          hover:bg-[#333] transition-colors duration-200 cursor-pointer
                          disabled:opacity-30 disabled:cursor-not-allowed
                        "
                      >
                        {updating === order.id ? 'Saving...' : 'Confirm'}
                      </button>
                      <button
                        onClick={() => updateStatus(order.id, 'cancelled')}
                        disabled={order.status === 'cancelled' || updating === order.id}
                        className="
                          font-[Montserrat] text-[9px] tracking-[0.3em] uppercase px-5 py-2.5
                          border border-[#e8e8e8] text-[#999]
                          hover:border-red-300 hover:text-red-500 transition-colors duration-200 cursor-pointer
                          disabled:opacity-30 disabled:cursor-not-allowed
                        "
                      >
                        Cancel
                      </button>

                      {/* Order ID */}
                      <span className="ml-auto font-[Montserrat] text-[8px] tracking-widest text-[#ddd] hidden sm:block">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>

                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Orders