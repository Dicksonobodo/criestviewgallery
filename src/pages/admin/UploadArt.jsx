import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadArtworkImage, addArtwork } from '../../firebase/artworks'
import Button from '../../components/ui/Button'

const CATEGORIES = ['Painting', 'Photography', 'Digital', 'Sculpture', 'Print']

const UploadArt = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Painting',
    medium: '',
    dimensions: '',
    year: '',
  })
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFile = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async () => {
    if (!file) return alert('Please select an image')
    if (!form.title || !form.price) return alert('Title and price are required')
    setLoading(true)
    try {
      const imageUrl = await uploadArtworkImage(file)
      await addArtwork({ ...form, price: Number(form.price), imageUrl })
      navigate('/admin')
    } catch (err) {
      console.error(err)
      alert('Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-10">

      {/* Header */}
      <div>
        <p className="font-[Montserrat] text-xs tracking-[0.4em] uppercase text-[#999] mb-2">
          Admin
        </p>
        <h1 className="font-[Cormorant_Garamond] text-5xl font-light">
          Upload Artwork
        </h1>
      </div>

      <div className="bg-white border border-[#e8e8e8] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Image upload */}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="image"
              className="relative block aspect-[3/4] border-2 border-dashed border-[#e8e8e8] hover:border-[#0a0a0a] transition-colors cursor-pointer overflow-hidden"
            >
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-[Montserrat] text-xs tracking-widest uppercase text-[#999]">
                    Click to upload
                  </span>
                </div>
              )}
              <input id="image" type="file" accept="image/*" onChange={handleFile} className="sr-only" />
            </label>
            {preview && (
              <button
                onClick={() => { setPreview(null); setFile(null) }}
                className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999] hover:text-red-500 transition-colors cursor-pointer self-start"
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-5">
            {[
              { name: 'title', label: 'Title *', placeholder: 'Artwork title', type: 'text' },
              { name: 'price', label: 'Price (£) *', placeholder: 'e.g. 150000', type: 'number' },
              { name: 'medium', label: 'Medium', placeholder: 'e.g. Oil on canvas', type: 'text' },
              { name: 'dimensions', label: 'Dimensions', placeholder: 'e.g. 60 x 80 cm', type: 'text' },
              { name: 'year', label: 'Year', placeholder: 'e.g. 2024', type: 'text' },
            ].map(({ name, label, placeholder, type }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <label className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="border-b border-[#e8e8e8] bg-transparent py-2.5 font-[Montserrat] text-sm placeholder:text-[#ccc] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                />
              </div>
            ))}

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border-b border-[#e8e8e8] bg-transparent py-2.5 font-[Montserrat] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="font-[Montserrat] text-[10px] tracking-widest uppercase text-[#999]">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the artwork..."
                rows={3}
                className="border-b border-[#e8e8e8] bg-transparent py-2.5 font-[Montserrat] text-sm placeholder:text-[#ccc] focus:outline-none focus:border-[#0a0a0a] transition-colors resize-none"
              />
            </div>

            <Button size="lg" className="w-full mt-2" loading={loading} onClick={handleSubmit}>
              Upload Artwork
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadArt