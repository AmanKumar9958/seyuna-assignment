import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Topbar from './components/Topbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import PreviewToolbar from './components/PreviewToolbar.jsx'

// Pages (guides)
import Introduction from './pages/guides/Introduction.jsx'
import Quickstart from './pages/guides/Quickstart.jsx'
import SDKs from './pages/guides/SDKs.jsx'
import Authentication from './pages/guides/Authentication.jsx'
import Pagination from './pages/guides/Pagination.jsx'
import Errors from './pages/guides/Errors.jsx'
import Webhooks from './pages/guides/Webhooks.jsx'
// Pages (resources)
import Contacts from './pages/resources/Contacts.jsx'
import Conversations from './pages/resources/Conversations.jsx'
import Messages from './pages/resources/Messages.jsx'
import Groups from './pages/resources/Groups.jsx'
import Attachments from './pages/resources/Attachments.jsx'

export default function App() {
        return (
            // BrowserRouter updates the visible URL (e.g., /introduction, /quickstart)
            <BrowserRouter>
            <div className="min-h-dvh bg-[#1D202A] text-zinc-200">
                <PreviewToolbar />
                <div className="mx-5 rounded-2xl border border-white/10">
                    <Topbar />
                    {/* Spacer to offset the fixed Topbar height so content isn't hidden underneath */}
                    <div aria-hidden className="h-14 md:h-16"></div>
                    <div className="mx-auto flex">
                        <Sidebar />
                        {/* Routed page content with a Back to top button */}
                        <main className="flex-1 relative">
                            <BackToTop />
                            <Routes>
                                {/* Default to Introduction */}
                                <Route path="/" element={<Navigate to="/introduction" replace />} />

                                {/* Guides */}
                                <Route path="/introduction" element={<Introduction />} />
                                <Route path="/quickstart" element={<Quickstart />} />
                                <Route path="/sdks" element={<SDKs />} />
                                <Route path="/authentication" element={<Authentication />} />
                                <Route path="/pagination" element={<Pagination />} />
                                <Route path="/errors" element={<Errors />} />
                                <Route path="/webhooks" element={<Webhooks />} />

                                {/* Resources */}
                                <Route path="/contacts" element={<Contacts />} />
                                <Route path="/conversations" element={<Conversations />} />
                                <Route path="/messages" element={<Messages />} />
                                <Route path="/groups" element={<Groups />} />
                                <Route path="/attachments" element={<Attachments />} />
                            </Routes>
                        </main>
                                        </div>
                </div>
                    </div>
                </BrowserRouter>
    )
}

import { useState, useEffect } from 'react'

function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handler = () => {
            setVisible(window.scrollY > 400)
        }
        window.addEventListener('scroll', handler, { passive: true })
        handler()
        return () => window.removeEventListener('scroll', handler)
    }, [])

    const onClick = () => {
        // Scroll to top considering header offset for consistency (target top minus offset -> 0)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            onClick={onClick}
            aria-label="Back to top"
            className={
                'pointer-events-auto fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-800/70 px-4 py-2 text-sm font-medium text-zinc-200 backdrop-blur transition-opacity hover:bg-zinc-700/70 ' +
                (visible ? 'opacity-100' : 'opacity-0')
            }
        >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M12 5a1 1 0 0 0-.7.3l-6 6a1 1 0 0 0 1.4 1.4L11 8.41V18a1 1 0 0 0 2 0V8.41l4.3 4.29a1 1 0 0 0 1.4-1.4l-6-6A1 1 0 0 0 12 5Z" />
            </svg>
            Top
        </button>
    )
}