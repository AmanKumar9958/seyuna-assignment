import { CiMobile1, CiDesktop, CiLaptop } from 'react-icons/ci'

export default function PreviewToolbar() {
    return (
        <div data-preview-toolbar className="sticky top-0 z-20 border-b border-white/5 bg-[#1D202A]">
            <div className="mx-auto flex items-center justify-between px-5 py-5">
                <div className="min-w-0">
                    <h1 className="truncate text-sm font-medium text-zinc-200">
                        <span className="font-semibold">Protocol</span>
                        <span className="mx-1">·</span>
                        <span>API reference template</span>
                    </h1>
                    <p className="mt-0.5 hidden text-xs text-zinc-400 sm:block">
                        Next.js <span className="mx-1 text-zinc-600">/</span> Tailwind CSS <span className="mx-1 text-zinc-600">/</span> Headless UI <span className="mx-1 text-zinc-600">/</span> React <span className="mx-1 text-zinc-600">/</span> MDX
                    </p>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                    <button
                        aria-label="Preview: mobile"
                        className="rounded-md border border-white/20 p-1.5 text-zinc-300 hover:bg-white/5"
                    >
                        <CiMobile1 size={18} />
                    </button>
                    <button
                        aria-label="Preview: desktop (selected)"
                        className="rounded-md border-2 border-white p-1.5 text-zinc-100"
                    >
                        <CiDesktop size={18} />
                    </button>
                </div>

                <div>
                    <button className="rounded-full bg-slate-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-500">
                        Get template
                    </button>
                </div>
            </div>
        </div>
    )
}