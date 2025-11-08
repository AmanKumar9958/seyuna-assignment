import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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
import DocPager from './components/DocPager.jsx'
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
            <TitleManager />
            <div className="min-h-dvh bg-[#1D202A] text-zinc-200">
                <PreviewToolbar />
                <div className="mx-5 rounded-2xl border border-white/10">
                    <Topbar />
                    {/* Spacer to offset the fixed Topbar height so content isn't hidden underneath */}
                    <div aria-hidden className="h-14 md:h-16"></div>
                    <div className="mx-auto flex">
                        <Sidebar />
                        {/* Routed page content with a Back to top button and pager */}
                        <main className="flex-1 relative">
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
                                <Route path="/resources/contacts" element={<Contacts />} />
                                <Route path="/resources/conversations" element={<Conversations />} />
                                <Route path="/resources/messages" element={<Messages />} />
                                <Route path="/resources/groups" element={<Groups />} />
                                <Route path="/resources/attachments" element={<Attachments />} />
                            </Routes>
                            {/* Pager shown beneath content */}
                            <DocPager />
                        </main>
                                        </div>
                </div>
                    </div>
                </BrowserRouter>
    )
}

// Updates the document.title based on the active route
function TitleManager() {
    const location = useLocation()

    // Map known routes to human-readable titles
    const titles = {
        '/introduction': 'Introduction',
        '/quickstart': 'Quickstart',
        '/sdks': 'SDKs',
        '/authentication': 'Authentication',
        '/pagination': 'Pagination',
        '/errors': 'Errors',
        '/webhooks': 'Webhooks',
        '/resources/contacts': 'Contacts',
        '/resources/conversations': 'Conversations',
        '/resources/messages': 'Messages',
        '/resources/groups': 'Groups',
        '/resources/attachments': 'Attachments',
    }

    const base = 'Seyuna Assignment'
    const path = (location.pathname || '').toLowerCase()
    const explicit = titles[path]

    // Fallback: title-case the last segment of the path
    const fallback = path
        .split('/')
        .filter(Boolean)
        .pop()
    const titleCased = fallback
        ? fallback
                .replace(/[-_]+/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase())
        : ''

    const finalTitle = explicit || titleCased || base

        // Update title on route change
        useEffect(() => {
        if (finalTitle === base) {
            document.title = base
        } else {
            document.title = `${finalTitle} - ${base}`
        }
    }, [finalTitle])

    return null
}