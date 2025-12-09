import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import NavGroup from './components/NavGroup'

// Pages (guides)
import Introduction from './pages/guides/Introduction'
import Quickstart from './pages/guides/Quickstart'
import SDKs from './pages/guides/SDKs'
import Authentication from './pages/guides/Authentication'
import Pagination from './pages/guides/Pagination'
import Errors from './pages/guides/Errors'
import Webhooks from './pages/guides/Webhooks'
import DocPager from './components/DocPager'
import Footer from './components/Footer'
// Pages (resources)
import Contacts from './pages/resources/Contacts'
import Conversations from './pages/resources/Conversations'
import Messages from './pages/resources/Messages'
import Groups from './pages/resources/Groups'
import Attachments from './pages/resources/Attachments'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <TitleManager />
      <Layout />
    </BrowserRouter>
  )
}

function Layout() {
  const [menuMounted, setMenuMounted] = useState<boolean>(false)
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [atTop, setAtTop] = useState<boolean>(true)
  const location = useLocation()

  const isIntroPage = location.pathname === '/' || location.pathname === '/introduction'

  const openMenu = () => {
    setMenuMounted(true)
    requestAnimationFrame(() => setMenuVisible(true))
  }

  const closeMenu = () => {
    setMenuVisible(false)
    setTimeout(() => setMenuMounted(false), 300)
  }

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-dvh bg-[#18181B] text-zinc-200">
      <div className="px-0">
        <div>
          <Sidebar />
          <Topbar onMenuClick={menuVisible ? closeMenu : openMenu} isMenuOpen={menuVisible} showBackdrop={atTop && isIntroPage} />
          <div className="lg:pl-72">
            <div aria-hidden className="h-16"></div>
            <main className="relative min-w-0 bg-[#18181B]">
              {/* Top background effect visible only when near top */}
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-[360px] transition-opacity duration-300 ${atTop && isIntroPage ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(120%_140%_at_50%_-20%,rgba(16,185,129,0.18),rgba(16,185,129,0)_60%)]" />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(115deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(295deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px,32px_32px]" />
              </div>
              <Routes>
                <Route path="/" element={<Navigate to="/introduction" replace />} />
                <Route path="/introduction" element={<Introduction />} />
                <Route path="/quickstart" element={<Quickstart />} />
                <Route path="/sdks" element={<SDKs />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/pagination" element={<Pagination />} />
                <Route path="/errors" element={<Errors />} />
                <Route path="/webhooks" element={<Webhooks />} />
                <Route path="/resources/contacts" element={<Contacts />} />
                <Route path="/resources/conversations" element={<Conversations />} />
                <Route path="/resources/messages" element={<Messages />} />
                <Route path="/resources/groups" element={<Groups />} />
                <Route path="/resources/attachments" element={<Attachments />} />
              </Routes>
              <DocPager />
              <Footer />
            </main>
          </div>
        </div>
      </div>
      {menuMounted && (
        <div
          className={`fixed inset-x-0 top-16 bottom-0 z-20 overflow-y-auto border-t border-white/10 bg-[#18181B] transition-transform duration-300 ease-in-out lg:hidden ${
            menuVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            <MobileNav closeMenu={closeMenu} />
          </div>
        </div>
      )}
    </div>
  )
}

function TitleManager() {
  const location = useLocation()

  const titles: Record<string, string> = {
    '/introduction': '',
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

  useEffect(() => {
    if (finalTitle === base) {
      document.title = base
    } else {
      document.title = `${finalTitle} - ${base}`
    }
  }, [finalTitle])

  return null
}

interface MobileNavProps {
  closeMenu: () => void;
}

function MobileNav({ closeMenu }: MobileNavProps) {
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
    </>
  )
}