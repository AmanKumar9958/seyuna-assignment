import { Link } from 'react-router-dom'
import Brand from './Brand.jsx'

export default function Topbar() {
    return (
        <>
            {/* Fixed top navigation bar (sits below the PreviewToolbar) */}
            <header data-topbar className="fixed inset-x-5 top-16 z-30 rounded-2xl border-b border-white/5 bg-zinc-900/80 backdrop-blur supports-backdrop-filter:bg-zinc-900/60">
                <div className="mx-auto px-5 py-3">
                {/* 4 columns: brand | search (flex-1) | links | actions */}
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-4">
                    {/* Brand at far left */}
                    <Brand />

                    {/* Search bar (grows to take available space) */}
                    <div className="relative hidden md:block">
                        {/* Input used for searching the docs */}
                        <input
                            className="w-2xl border border-white/10 bg-zinc-800/80 px-10 py-2 text-sm text-zinc-200 placeholder-zinc-400 outline-none ring-emerald-500/30 focus:ring-2 rounded-3xl"
                            placeholder="Find something…"
                            aria-label="Search"
                        />
                        {/* Magnifying glass icon */}
                        <svg
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M10 4a6 6 0 1 0 3.8 10.6l4.3 4.3a1 1 0 0 0 1.4-1.4l-4.3-4.3A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1-4 4 4 4 0 0 1 4-4Z" />
                        </svg>
                    </div>

                    {/* Top-level nav links */}
                    <nav className="hidden items-center gap-4 sm:flex">
                        <Link className="text-sm font-medium text-zinc-200 hover:text-white" to="/">API</Link>
                        <Link className="text-sm font-medium text-zinc-200 hover:text-white" to="#">Documentation</Link>
                        <Link className="text-sm font-medium text-zinc-200 hover:text-white" to="#">Support</Link>
                    </nav>

                    {/* Right-side actions */}
                    <div className="flex items-center justify-end gap-3">
                        {/* Sign in button */}
                        <button className="rounded-md border border-[#162B27] px-3 py-1.5 text-sm text-[#00BC7D] hover:cursor-pointer hover:border-[#00BC7D]">Sign in</button>
                    </div>
                </div>
                </div>
            </header>
        </>
    )
}
