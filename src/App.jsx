import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Topbar from './components/Topbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import NavGroup from './components/NavGroup.jsx'
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
  // Two-phase state to allow enter/exit animations
  const [menuMounted, setMenuMounted] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const openMenu = () => {
    setMenuMounted(true)
    // next tick to ensure mount before starting animation
    requestAnimationFrame(() => setMenuVisible(true))
  }
  const closeMenu = () => {
    setMenuVisible(false)
    // Unmount after animation finishes (duration 200ms)
    setTimeout(() => setMenuMounted(false), 220)
  }
  return (
    // BrowserRouter updates the visible URL (e.g., /introduction, /quickstart)
    <BrowserRouter>
      <TitleManager />
      <div className="min-h-dvh bg-[#1D202A] text-zinc-200">
        <PreviewToolbar />
        {/* Make the main layout full-bleed so the sidebar sits flush left */}
        <div className="px-0">
          <div>
            <Topbar onMenuClick={openMenu} />
            {/* Spacer to offset the fixed Topbar height so content isn't hidden underneath */}
            <div aria-hidden className="h-14 md:h-16"></div>
            <div className="flex">
              <Sidebar />
              {/* Routed page content with a Back to top button and pager */}
              {/* --- MODIFICATION: Added min-w-0 to prevent overflow --- */}
              <main className="flex-1 relative min-w-0">
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

              {/* --- ADD THIS SECTION FOR THE 3RD COLUMN --- */}
              {/* This is the "white panel" from your image.
                - `hidden` = Hides it on mobile
                - `lg:block` = Makes it visible on large screens
              */}
              {/* --- END OF ADDED SECTION --- */}

            </div>
          </div>
        </div>
        {/* Mobile menu overlay */}
        {menuMounted && (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            {/* Backdrop fades in/out */}
            <div
              className={
                `absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
                  menuVisible ? 'opacity-100' : 'opacity-0'
                }`
              }
              onClick={closeMenu}
            ></div>
            {/* Sliding panel */}
            <div
              className={
                `absolute inset-y-0 left-0 w-80 max-w-[80%] overflow-y-auto border-r border-white/10 bg-[#18181B] p-5 shadow-xl transform transition-transform duration-200 ${
                  menuVisible ? 'translate-x-0' : '-translate-x-full'
                }`
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-100">Protocol</span>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M6.34 4.93a1 1 0 0 0-1.41 1.41L10.59 12l-5.66 5.66a1 1 0 1 0 1.41 1.41L12 13.41l5.66 5.66a1 1 0 0 0 1.41-1.41L13.41 12l5.66-5.66a1 1 0 0 0-1.41-1.41L12 10.59 6.34 4.93Z" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 space-y-8">
                <MobileNav closeMenu={closeMenu} />
              </div>
            </div>
          </div>
        )}
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

function MobileNav({ closeMenu }) {
  return (
    <>
      <NavGroup
        title="Guides"
        items={['Introduction', 'Quickstart', 'SDKs', 'Authentication', 'Pagination', 'Errors', 'Webhooks']}
        subMap={{ Introduction: ['Guides', 'Resources'], Quickstart: ['Choose your client', 'Making your first API request', 'What’s next?'], SDKs: ['Official libraries'] }}
        anchorParent="/introduction"
        anchorMap={{ Guides: 'guides', Resources: 'resources' }}
        onNavigate={closeMenu}
      />
      <NavGroup
        title="Resources"
        items={['Contacts', 'Conversations', 'Messages', 'Groups', 'Attachments']}
        prefix="resources"
        onNavigate={closeMenu}
      />
      <button
        onClick={closeMenu}
        className="mt-4 w-full rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
      >
        Close menu
      </button>
    </>
  )
}