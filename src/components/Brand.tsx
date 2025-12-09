export default function Brand(): JSX.Element {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 38 38" fill="none" className="h-7 w-7 text-emerald-500">
        <path
          fill="currentColor"
          d="M19 0C8.507 0 0 8.507 0 19c0 4.55 1.603 8.727 4.29 12.012.43.525.66 1.18.66 1.862V38l6.63-2.65c.84-.336 1.76-.39 2.635-.155A18.92 18.92 0 0 0 19 38c10.493 0 19-8.507 19-19S29.493 0 19 0Z"
        />
      </svg>
      <span className="text-lg font-bold tracking-tight text-white">Protocol</span>
    </div>
  )
}