import { Link, useLocation } from 'react-router-dom'

const ROUTES = [
    { path: '/introduction', label: 'Introduction' },
    { path: '/quickstart', label: 'Quickstart' },
    { path: '/sdks', label: 'SDKs' },
    { path: '/authentication', label: 'Authentication' },
    { path: '/pagination', label: 'Pagination' },
    { path: '/errors', label: 'Errors' },
    { path: '/webhooks', label: 'Webhooks' },
    { path: '/resources/contacts', label: 'Contacts' },
    { path: '/resources/conversations', label: 'Conversations' },
    { path: '/resources/messages', label: 'Messages' },
    { path: '/resources/groups', label: 'Groups' },
    { path: '/resources/attachments', label: 'Attachments' },
]

export default function DocPager() {
    const location = useLocation()
    const currentPath = (location.pathname || '').toLowerCase()
    const index = ROUTES.findIndex((r) => r.path === currentPath)

    const prev = index > 0 ? ROUTES[index - 1] : null
    const next = index >= 0 && index < ROUTES.length - 1 ? ROUTES[index + 1] : null

    if (!prev && !next) return null

    return (
        <div className="px-6 pb-10 pt-6 sm:pt-8">
            <div className="mx-auto max-w-5xl border-t border-white/10 pt-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        {prev ? (
                            <div className="inline-flex flex-col">
                                <Link
                                    to={prev.path}
                                    className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300 hover:bg-white/5"
                                >
                                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
                                        <path d="M13 5l-6 5 6 5V5z" />
                                    </svg>
                                    Previous
                                </Link>
                                <Link to={prev.path} className="mt-3 text-base font-semibold text-zinc-100 hover:underline">
                                    {prev.label}
                                </Link>
                            </div>
                        ) : (
                            <span />
                        )}
                    </div>

                    <div className="min-w-0 flex-1 text-right">
                        {next ? (
                            <div className="inline-flex flex-col items-end">
                                <Link
                                    to={next.path}
                                    className="inline-flex items-center gap-2 self-end rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300 hover:bg-white/5"
                                >
                                    Next
                                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
                                        <path d="M7 5l6 5-6 5V5z" />
                                    </svg>
                                </Link>
                                <Link to={next.path} className="mt-3 text-base font-semibold text-zinc-100 hover:underline">
                                    {next.label}
                                </Link>
                            </div>
                        ) : (
                            <span />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}