export default function Footer(): JSX.Element {
    const year = new Date().getFullYear()
    return (
        <footer className="mt-10 mb-16 border-t border-white/10">
            <div className="mx-auto max-w-[1100px] flex items-center justify-between px-6 py-6 text-sm">
                <p className="text-zinc-400">© Copyright {year}. All rights reserved.</p>
                <div className="flex items-center gap-5 text-zinc-500">
                    <a
                        href="#"
                        aria-label="X (Twitter)"
                        className="hover:text-zinc-300 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4l16 16M20 4L4 20" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        aria-label="GitHub"
                        className="hover:text-zinc-300 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.18-3.37-1.18-.45-1.14-1.11-1.45-1.11-1.45-.9-.62.07-.61.07-.61 1 .07 1.54 1.03 1.54 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.11 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        aria-label="Discord"
                        className="hover:text-zinc-300 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                            <path d="M20 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2.7l-.62-1.24c-.22-.43-.77-.61-1.22-.41-.9.4-1.87.63-2.88.63s-1.98-.23-2.88-.63c-.45-.2-1 .02-1.22.41L7.86 20H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h15Zm-9.75 5.5c-.69 0-1.25.67-1.25 1.5s.56 1.5 1.25 1.5S11.5 12.83 11.5 12s-.56-1.5-1.25-1.5Zm6.5 0c-.69 0-1.25.67-1.25 1.5s.56 1.5 1.25 1.5S18 12.83 18 12s-.56-1.5-1.25-1.5Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    )
}
