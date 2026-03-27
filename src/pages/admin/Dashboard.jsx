import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useArtworks } from '../../hooks/useArtworks'
import { useOrders } from '../../hooks/useOrders'
import { deleteArtwork, updateArtwork } from '../../firebase/artworks'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'

const CATEGORIES = ['Painting', 'Photography', 'Digital', 'Sculpture', 'Print']

const Dashboard = () => {
  const { artworks, loading: artLoading, refresh } = useArtworks()
  const { orders, loading: ordLoading } = useOrders()

  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [editArtwork, setEditArtwork] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const available = artworks.filter((a) => a.available).length
  const sold = artworks.filter((a) => !a.available).length
  const pending = orders.filter((o) => o.status === 'pending').length

  const stats = [
    { label: 'Total Works', value: artworks.length },
    { label: 'Available', value: available },
    { label: 'Sold', value: sold },
    { label: 'Pending Orders', value: pending },
  ]

  const handleDeleteConfirm = async () => {
    setDeleting(true)
    try {
      await deleteArtwork(deleteId)
      await refresh()
      setDeleteId(null)
    } catch (err) {
      console.error(err)
      alert('Delete failed. Try again.')
    } finally {
      setDeleting(false)
    }
  }

  const openEdit = (artwork) => {
    setEditArtwork(artwork)
    setEditForm({
      title: artwork.title || '',
      price: artwork.price || '',
      category: artwork.category || 'Painting',
      description: artwork.description || '',
      medium: artwork.medium || '',
      dimensions: artwork.dimensions || '',
      year: artwork.year || '',
      available: artwork.available ?? true,
    })
  }

  const handleEditSave = async () => {
    setSaving(true)
    try {
      await updateArtwork(editArtwork.id, {
        ...editForm,
        price: Number(editForm.price),
      })
      await refresh()
      setEditArtwork(null)
    } catch (err) {
      console.error(err)
      alert('Update failed. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-10">

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-[Montserrat] text-[10px] tracking-[0.5em] uppercase text-[#999] mb-2">
            Overview
          </p>
          <h1 className="font-[Cormorant_Garamond] text-5xl font-light">
            Dashboard
          </h1>
        </div>
        {/* <Link to="/admin/upload">
          <Button size="md">+ Upload Artwork</Button>
        </Link> */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e8e8e8] p-6 flex flex-col gap-2">
            <span className="font-[Cormorant_Garamond] text-5xl font-light text-[#0a0a0a]">
              {artLoading || ordLoading ? '—' : stat.value}
            </span>
            <span className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/upload"
          className="bg-white border border-[#e8e8e8] p-8 hover:border-[#0a0a0a] transition-colors group"
        >
          <div className="w-10 h-10 border border-[#e8e8e8] flex items-center justify-center mb-6 group-hover:border-[#0a0a0a] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h2 className="font-[Cormorant_Garamond] text-3xl font-light mb-2">Upload Artwork</h2>
          <p className="font-[Montserrat] text-xs text-[#999] tracking-wide">Add a new piece to the collection</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white border border-[#e8e8e8] p-8 hover:border-[#0a0a0a] transition-colors group"
        >
          <div className="w-10 h-10 border border-[#e8e8e8] flex items-center justify-center mb-6 group-hover:border-[#0a0a0a] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="font-[Cormorant_Garamond] text-3xl font-light mb-2">View Orders</h2>
          <p className="font-[Montserrat] text-xs text-[#999] tracking-wide">Review and manage order requests</p>
        </Link>
      </div>

      {/* Artworks list */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-[Cormorant_Garamond] text-3xl font-light">All Artworks</h2>
          <span className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
            {artworks.length} total
          </span>
        </div>

        {artLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white border border-[#e8e8e8] p-4 flex gap-4">
                <div className="w-16 h-20 bg-[#f0f0f0]" />
                <div className="flex-1 flex flex-col gap-2 justify-center">
                  <div className="h-4 bg-[#f0f0f0] w-1/3" />
                  <div className="h-3 bg-[#f0f0f0] w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : artworks.length === 0 ? (
          <div className="bg-white border border-dashed border-[#e8e8e8] p-16 text-center">
            <p className="font-[Cormorant_Garamond] text-3xl font-light text-[#ccc]">
              No artworks yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="bg-white border border-[#e8e8e8] p-4 flex items-center gap-5 hover:border-[#ccc] transition-colors"
              >
                {/* Image */}
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-14 h-18 object-cover shrink-0"
                  style={{ height: '72px' }}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-[Cormorant_Garamond] text-xl font-light truncate">
                    {artwork.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
                      {artwork.category}
                    </span>
                    <span className="text-[#ddd]">·</span>
                    <span className="font-[Montserrat] text-[10px] text-[#0a0a0a]">
                      £{Number(artwork.price).toLocaleString()}
                    </span>
                    <span className="text-[#ddd]">·</span>
                    <span className={`font-[Montserrat] text-[10px] tracking-widest uppercase ${
                      artwork.available ? 'text-green-500' : 'text-red-400'
                    }`}>
                      {artwork.available ? 'Available' : 'Sold'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(artwork)}
                    className="flex items-center gap-1.5 px-3 py-2 border border-[#e8e8e8] hover:border-[#0a0a0a] font-[Montserrat] text-[10px] tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(artwork.id)}
                    className="flex items-center gap-1.5 px-3 py-2 border border-[#e8e8e8] hover:border-red-400 hover:text-red-400 font-[Montserrat] text-[10px] tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── DELETE CONFIRM MODAL ─── */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Artwork"
      >
        <p className="font-[Montserrat] text-sm text-[#666] leading-relaxed mb-8">
          Are you sure you want to delete this artwork? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="danger"
            size="md"
            loading={deleting}
            onClick={handleDeleteConfirm}
          >
            Yes, Delete
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => setDeleteId(null)}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      {/* ── EDIT MODAL ─── */}
      <Modal
        isOpen={!!editArtwork}
        onClose={() => setEditArtwork(null)}
        title="Edit Artwork"
      >
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">

          {/* Preview */}
          {editArtwork?.imageUrl && (
            <img
              src={editArtwork.imageUrl}
              alt=""
              className="w-full h-40 object-cover"
            />
          )}

          {[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'price', label: 'Price (₦)', type: 'number' },
            { name: 'medium', label: 'Medium', type: 'text' },
            { name: 'dimensions', label: 'Dimensions', type: 'text' },
            { name: 'year', label: 'Year', type: 'text' },
          ].map(({ name, label, type }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
                {label}
              </label>
              <input
                type={type}
                value={editForm[name] || ''}
                onChange={(e) => setEditForm((p) => ({ ...p, [name]: e.target.value }))}
                className="border-b border-[#e8e8e8] bg-transparent py-2 font-[Montserrat] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
              />
            </div>
          ))}

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
              Category
            </label>
            <select
              value={editForm.category || 'Painting'}
              onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))}
              className="border-b border-[#e8e8e8] bg-transparent py-2 font-[Montserrat] text-sm focus:outline-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
              Description
            </label>
            <textarea
              value={editForm.description || ''}
              onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="border-b border-[#e8e8e8] bg-transparent py-2 font-[Montserrat] text-sm focus:outline-none resize-none"
            />
          </div>

          {/* Available toggle */}
          <div className="flex items-center justify-between py-2">
            <label className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
              Mark as Available
            </label>
            <button
              onClick={() => setEditForm((p) => ({ ...p, available: !p.available }))}
              className={`w-11 h-6 relative transition-colors duration-200 cursor-pointer ${
                editForm.available ? 'bg-[#0a0a0a]' : 'bg-[#e8e8e8]'
              }`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white transition-all duration-200 ${
                editForm.available ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-[#f0f0f0]">
          <Button size="md" loading={saving} onClick={handleEditSave}>
            Save Changes
          </Button>
          <Button variant="outline" size="md" onClick={() => setEditArtwork(null)}>
            Cancel
          </Button>
        </div>
      </Modal>

    </div>
  )
}

export default Dashboard