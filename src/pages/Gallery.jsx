import { useState } from 'react'
import { useArtworks } from '../hooks/useArtworks'
import ArtCard from '../components/ArtCard'
import SearchFilter from '../components/SearchFilter'

const PER_PAGE = 8

export default function Gallery() {
  const { artworks, loading } = useArtworks()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = artworks.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || a.category === category
    return matchSearch && matchCat
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSearch = (val) => { setSearch(val); setPage(1) }
  const handleCategory = (val) => { setCategory(val); setPage(1) }

  const goTo = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="py-16 md:py-24 border-b border-[#e8e8e4]">
          <p className="font-[Montserrat] text-[9px] tracking-[0.5em] uppercase text-[#999994] mb-5">
            All Works
          </p>
          <h1
            className="font-[Cormorant_Garamond] font-light"
            style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}
          >
            The Collection
          </h1>
        </div>

        {/* Search & Filter */}
        <div className="py-8 border-b border-[#e8e8e4] mb-10">
          <SearchFilter
            search={search}
            setSearch={handleSearch}
            category={category}
            setCategory={handleCategory}
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 pb-28">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse aspect-[3/4] bg-[#f0f0ee]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-[Cormorant_Garamond] text-5xl font-light text-[#ddd]">
              No artworks found
            </p>
            <p className="font-[Montserrat] text-[9px] tracking-[0.3em] uppercase text-[#ccc] mt-4">
              Try a different search or category
            </p>
            {/* Spacer */}
            <div className="h-24 md:h-32" />
          </div>
        ) : (

          
          <div className="pb-6">

            <div className="h-10 md:h-10" />

            {/* Count + page indicator */}
            <div className="flex items-center justify-between mb-8">
              <p className="font-[Montserrat] text-[9px] tracking-[0.3em] uppercase text-[#999994]">
                {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
              </p>
              {totalPages > 1 && (
                <p className="font-[Montserrat] text-[9px] tracking-[0.2em] uppercase text-[#999994]">
                  Page {page} of {totalPages}
                </p>
              )}
            </div>

            {/* Art grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {paginated.map(a => (
                <ArtCard key={a.id} artwork={a} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">

                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  className="
                    font-[Montserrat] text-[9px] tracking-[0.25em] uppercase
                    px-5 py-3 border border-[#e8e8e4]
                    text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#fafafa] hover:border-[#0a0a0a]
                    transition-all duration-200 cursor-pointer
                    disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent
                    disabled:hover:text-[#0a0a0a] disabled:hover:border-[#e8e8e4]
                  "
                >
                  ← Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => goTo(p)}
                      className={`
                        w-9 h-9 font-[Montserrat] text-[10px] tracking-widest
                        border transition-all duration-200 cursor-pointer
                        ${p === page
                          ? 'bg-[#0a0a0a] text-[#fafafa] border-[#0a0a0a]'
                          : 'border-[#e8e8e4] text-[#0a0a0a] hover:border-[#0a0a0a]'
                        }
                      `}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goTo(page + 1)}
                  disabled={page === totalPages}
                  className="
                    font-[Montserrat] text-[9px] tracking-[0.25em] uppercase
                    px-5 py-3 border border-[#e8e8e4]
                    text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#fafafa] hover:border-[#0a0a0a]
                    transition-all duration-200 cursor-pointer
                    disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent
                    disabled:hover:text-[#0a0a0a] disabled:hover:border-[#e8e8e4]
                  "
                >
                  Next →
                </button>

              </div>
            )}

            {/* Spacer before footer */}
            <div className="h-40 md:h-40" />

          </div>
        )}

      </div>
    </main>
  )
}