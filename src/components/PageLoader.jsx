export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fafafa]">
      <div className="flex flex-col items-center gap-4">
        <span className="font-[Cormorant_Garamond] text-[1.1rem] font-light tracking-[0.35em] uppercase text-[#0a0a0a]">
          The Gallery
        </span>
        <div className="w-8 h-[1px] bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#999994] animate-[slide_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  )
}