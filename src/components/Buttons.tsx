import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
}

export function PrimaryButton({ children }: ButtonProps) {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-emerald-950 shadow hover:bg-emerald-400">
      {children}
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" />
      </svg>
    </button>
  )
}

export function GhostButton({ children }: ButtonProps) {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/5">
      {children}
    </button>
  )
}