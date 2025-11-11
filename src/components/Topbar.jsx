import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Brand from './Brand.jsx'

export default function Topbar({ onMenuClick, showBackdrop = true }) {
    const searchRef = useRef(null)

    // Focus search with Ctrl/Cmd + K like many docs sites
    useEffect(() => {
        const onKeyDown = (e) => {
            const isK = e.key === 'k' || e.key === 'K'
            if (isK && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                searchRef.current?.focus()
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])
    return (
        <>
            <header data-topbar className="fixed inset-x-0 top-0 z-30 border-b border-white/5 bg-zinc-900/80 backdrop-blur supports-backdrop-filter:bg-zinc-900/60">
                {/* Emerald radial tint for subtle gradient; fades when not at top */}
                <div aria-hidden className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${showBackdrop ? 'opacity-40 md:opacity-50' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(90%_140%_at_50%_-20%,rgba(16,185,129,0.18),rgba(16,185,129,0)_60%)]" />
                </div>
                {/* On large screens, pad left to the sidebar width so search+nav align with content */}
                <div className="relative px-5 py-2.5 lg:pl-76">
                    {/* Desktop brand anchored at the far left */}
                    <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 select-none lg:flex">
                        <Brand />
                    </div>
                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-6">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="Open menu"
                                onClick={onMenuClick}
                                className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-zinc-300 hover:bg-white/5 lg:hidden"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                                    <path d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm1 4a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2H5Z" />
                                </svg>
                            </button>
                            <span className="lg:hidden"><Brand /></span>
                        </div>

                        <div className="relative hidden md:block">
                            <input
                                ref={searchRef}
                                className="w-[520px] lg:w-[400px] rounded-full border border-white/10 bg-zinc-900/40 px-10 py-2 text-sm text-zinc-200 placeholder-zinc-400 outline-none ring-1 ring-inset ring-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:ring-2 focus:ring-emerald-500/30"
                                placeholder="Find something…"
                                aria-label="Search"
                            />
                            {/* left search icon */}
                            <svg
                                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M10 4a6 6 0 1 0 3.8 10.6l4.3 4.3a1 1 0 0 0 1.4-1.4l-4.3-4.3A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1-4 4 4 4 0 0 1 4-4Z" />
                            </svg>
                        </div>

                        <nav className="hidden items-center gap-8 sm:flex">
                            <Link className="text-sm font-medium text-zinc-300 hover:text-white" to="/">API</Link>
                            <Link className="text-sm font-medium text-zinc-300 hover:text-white" to="#">Documentation</Link>
                            <Link className="text-sm font-medium text-zinc-300 hover:text-white" to="#">Support</Link>
                        </nav>

                        <div className="flex items-center justify-end gap-4">
                            <div className="hidden sm:block h-5 w-px bg-white/10" />
                            {/* theme toggle placeholder */}
                            <button
                                type="button"
                                aria-label="Toggle theme"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-300 hover:bg-white/5"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                                </svg>
                            </button>
                            <button className="rounded-full border border-[#1a4038] bg-[linear-gradient(180deg,rgba(16,185,129,0.14),rgba(16,185,129,0.05)_60%,rgba(0,0,0,0))] px-4 py-1.5 text-sm font-medium text-emerald-300 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.25),0_0_24px_rgba(16,185,129,0.12)] hover:text-emerald-200 transition-colors">
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}