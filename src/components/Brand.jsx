export default function Brand() {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2a10 10 0 1 0 10 10A10.012 10.012 0 0 0 12 2Zm0 3.5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 12 5.5ZM7 17a1 1 0 0 1 0-2h3V9a1 1 0 0 1 2 0v6h3a1 1 0 0 1 0 2Z"/>
        </svg>
      </span>
      <span className="font-semibold tracking-tight">Protocol</span>
    </div>
  )
}
