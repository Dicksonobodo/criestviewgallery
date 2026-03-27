const CATEGORIES = ['All', 'Painting', 'Photography', 'Digital', 'Sculpture', 'Print']

const SearchFilter = ({ search, setSearch, category, setCategory }) => {
  return (
    <div className="flex flex-col gap-8">

      {/* Search row */}
      <div className="flex items-end gap-0 group">

        {/* Label */}
        <span className="font-[Montserrat] text-[8px] tracking-[0.4em] uppercase text-[#999994] pb-3 pr-5 shrink-0 hidden sm:block">
          Search
        </span>

        {/* Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Title, medium, artist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-transparent
              border-b border-[#e8e8e4] focus:border-[#0a0a0a]
              py-3 pl-0 pr-10
              font-[Cormorant_Garamond] text-2xl font-light
              placeholder:text-[#ccc] text-[#0a0a0a]
              focus:outline-none transition-colors duration-300
            "
          />

          {/* Search icon / clear */}
          {search ? (
            <button
              onClick={() => setSearch('')}
              className="absolute right-0 top-3 text-[#999] hover:text-[#0a0a0a] transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-3.5 w-4 h-4 text-[#ccc]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Category filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">

        {/* Label */}
        <span className="font-[Montserrat] text-[8px] tracking-[0.4em] uppercase text-[#999994] shrink-0">
          Filter
        </span>

        {/* Divider — desktop only */}
        <div className="hidden sm:block w-px h-4 bg-[#e8e8e4] shrink-0" />

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                font-[Montserrat] text-[9px] tracking-[0.3em] uppercase
                px-4 py-2 transition-all duration-200 cursor-pointer
                ${category === cat
                  ? 'bg-[#0a0a0a] text-[#fafafa]'
                  : 'bg-transparent text-[#999994] hover:text-[#0a0a0a]'
                }
              `}
            >
              {category === cat && (
                <span className="inline-block w-1 h-1 rounded-full bg-[#fafafa] mr-2 mb-px align-middle" />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Active filter indicator */}
        {(search || category !== 'All') && (
          <button
            onClick={() => { setSearch(''); setCategory('All') }}
            className="sm:ml-auto font-[Montserrat] text-[8px] tracking-[0.3em] uppercase text-[#999994] hover:text-red-400 transition-colors duration-200 cursor-pointer flex items-center gap-2 w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all
          </button>
        )}

      </div>
    </div>
  )
}

export default SearchFilter