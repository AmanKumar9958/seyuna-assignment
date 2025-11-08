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
                        {/* Routed page content */}
                        <main className="flex-1">
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
                        </main>
                    </div>
                </div>
                    </div>
                </BrowserRouter>
    )
}