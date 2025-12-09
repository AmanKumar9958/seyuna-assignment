import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Brand from './Brand'

interface TopbarProps {
  onMenuClick: () => void;
  isMenuOpen?: boolean;
  showBackdrop?: boolean;
}

export default function Topbar({ onMenuClick, isMenuOpen = false, showBackdrop = false }: TopbarProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 transition-all duration-300 left-0 lg:left-72 ${
        showBackdrop
          ? 'border-b border-transparent bg-[radial-gradient(120%_140%_at_50%_-20%,rgba(16,185,129,0.18),rgba(16,185,129,0)_60%)]'
          : 'border-b border-[#303032] bg-[#18181B]/80 backdrop-blur'
      }`}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-0">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-8 w-8 items-center justify-center text-zinc-400 hover:text-zinc-100"
          >
            {isMenuOpen ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/50 ring-1 ring-white/10">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <Brand />
        </div>

        {/* Center/Right: Search & Nav */}
        <div className="flex flex-1 items-center justify-end gap-4 px-4 sm:gap-8 md:justify-between lg:px-8">
          {/* Search */}
          <div className="relative hidden max-w-md flex-1 md:block">
            <div className="group relative flex items-center">
              <svg
                className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-500 group-focus-within:text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                placeholder="Find something..."
                className="h-9 w-full rounded-2xl border border-white/10 bg-zinc-900/50 pl-10 pr-12 text-sm text-zinc-200 placeholder-zinc-500 outline-none ring-1 ring-transparent transition-all focus:border-emerald-500/50 focus:bg-zinc-900 focus:ring-emerald-500/20"
              />
              <div className="pointer-events-none absolute right-3 flex items-center gap-1 text-xs text-zinc-500">
                <kbd className="font-sans">Ctrl</kbd>
                <kbd className="font-sans">K</kbd>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              <Link to="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100">API</Link>
              <Link to="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100">Documentation</Link>
              <Link to="#" className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100">Support</Link>
            </nav>

            <div className="hidden h-5 w-px bg-white/10 md:block" />

            <div className="flex items-center gap-4">
              {/* Mobile Search Icon */}
              <button type="button" className="text-zinc-400 hover:text-zinc-100 md:hidden">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3" />
                </svg>
              </button>

              <button type="button" className="text-zinc-400 transition-colors hover:text-zinc-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
              <button className="hidden rounded-md bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20 hover:text-emerald-300 md:block">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}