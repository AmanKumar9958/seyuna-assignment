import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import SectionTitle from './SectionTitle.jsx'
import { smoothScrollToId } from '../utils/scroll.js'

// NavGroup renders a vertical list of items.
// If an item has children (provided via subMap), clicking it will expand
// the children and collapse any other expanded item (accordion behavior).
export default function NavGroup({ title, items, subMap = {}, prefix = '', anchorParent, anchorMap, onNavigate }) {
    const [openItem, setOpenItem] = useState(null)
        const navigate = useNavigate()
        const location = useLocation()
        const [activeAnchor, setActiveAnchor] = useState(null)

    // Auto-open when the route matches the anchor parent (e.g., /introduction)
    useEffect(() => {
        if (anchorParent && location.pathname === anchorParent) {
            // Open the item that owns the anchors (the key in subMap that has anchorMap children)
            const owner = Object.keys(subMap).find((k) => subMap[k]?.some((c) => anchorMap?.[c]))
            if (owner) setOpenItem(owner)
        }
    }, [anchorParent, location.pathname, subMap, anchorMap])

        // Listen for section changes broadcast by pages with anchors (Introduction, Quickstart, etc.)
        useEffect(() => {
            const handler = (e) => setActiveAnchor(e.detail)
            window.addEventListener('sectionchange', handler)
            return () => window.removeEventListener('sectionchange', handler)
        }, [])

        // Reset active anchor when route changes (prevents stale highlight when navigating)
        useEffect(() => {
            setActiveAnchor(null)
        }, [location.pathname])

        const handleClick = (item) => {
            const hasChildren = subMap[item]?.length
            if (hasChildren) {
                setOpenItem((curr) => (curr === item ? null : item))
                const isAnchorOwner = anchorParent && subMap[item].some((c) => anchorMap?.[c])
                if (isAnchorOwner) {
                    // E.g., "Introduction" anchors live on /introduction
                    if (location.pathname !== anchorParent) {
                        navigate(anchorParent)
                        onNavigate && onNavigate()
                    }
                } else {
                    // For parents with children that are not anchor owners (e.g., Quickstart),
                    // also navigate to their own route so the right panel updates.
                    const slug = item.toLowerCase().replace(/\s+/g, '-')
                    const path = prefix ? `/${prefix}/${slug}` : `/${slug}`
                    if (location.pathname !== path) {
                        navigate(path)
                        onNavigate && onNavigate()
                    }
                }
            } else {
                // Clicking an item without children collapses any open submenu
                setOpenItem(null)
                // Navigate to the item's route
                const slug = item.toLowerCase().replace(/\s+/g, '-')
                const path = prefix ? `/${prefix}/${slug}` : `/${slug}`
                navigate(path)
                onNavigate && onNavigate()
            }
        }

    return (
            <SectionTitle title={title}>
                <nav className="mt-3 flex flex-col gap-1">
                    {items.map((item) => {
                          // Determine active state from current route
                        const slug = item.toLowerCase().replace(/\s+/g, '-')
                        const itemPath = prefix ? `/${prefix}/${slug}` : `/${slug}`
                        const isActive = location.pathname === itemPath
                        const hasChildren = Array.isArray(subMap[item]) && subMap[item].length > 0
                        const expanded = openItem === item

                        return (
                            <div key={item}>
                                                <button
                                    type="button"
                                    onClick={() => handleClick(item)}
                                    className={
                                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 " +
                                        (isActive ? 'bg-white/5 text-emerald-400' : 'text-zinc-300')
                                    }
                                >
                                    <span>{item}</span>
                                                    {hasChildren && (
                                        <svg
                                            className={"h-3.5 w-3.5 transition-transform " + (expanded ? 'rotate-90' : '')}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M7 5l6 5-6 5V5z" />
                                        </svg>
                                    )}
                                </button>

                                {/* Children list */}
                                {hasChildren && expanded && (
                                    <div className="ml-2 rounded-lg bg-white/5 p-1.5">
                                        {subMap[item].map((child) => {
                                            // Case 1: Anchors owned by a specific parent page (e.g., Introduction)
                                            const anchorId = anchorMap?.[child]
                                            if (anchorParent && anchorId) {
                                                const isActiveAnchor = location.pathname === anchorParent && activeAnchor === anchorId
                                                const onClick = (e) => {
                                                    e.preventDefault()
                                                    if (location.pathname !== anchorParent) navigate(anchorParent)
                                                    const doScroll = () => smoothScrollToId(anchorId)
                                                    // Ensure scroll runs after route render
                                                    requestAnimationFrame(doScroll)
                                                    setActiveAnchor(anchorId)
                                                    onNavigate && onNavigate()
                                                }
                                                return (
                                                    <a
                                                        key={child}
                                                        href="#"
                                                        onClick={onClick}
                                                        className={
                                                            `block rounded-md px-3 py-2 text-sm transition-colors ` +
                                                            (isActiveAnchor
                                                                ? 'bg-white/10 text-zinc-100'
                                                                : 'text-zinc-300 hover:bg-white/10 hover:text-zinc-100')
                                                        }
                                                    >
                                                        {child}
                                                    </a>
                                                )
                                            }

                                            // Case 2: Children as in-page anchors of their parent page (e.g., Quickstart subsections)
                                            if (!prefix) {
                                                const parentSlug = item.toLowerCase().replace(/\s+/g, '-')
                                                const parentPath = `/${parentSlug}`
                                                const childAnchor = child
                                                    .toLowerCase()
                                                    .replace(/['’`]/g, '')
                                                    .replace(/[^a-z0-9\s-]/g, '')
                                                    .replace(/\s+/g, '-')
                                                const isActiveAnchor = location.pathname === parentPath && activeAnchor === childAnchor
                                                const onClick = (e) => {
                                                    e.preventDefault()
                                                    if (location.pathname !== parentPath) navigate(parentPath)
                                                    // Delay to allow navigation render before scrolling
                                                    requestAnimationFrame(() => smoothScrollToId(childAnchor))
                                                    setActiveAnchor(childAnchor)
                                                    onNavigate && onNavigate()
                                                }
                                                return (
                                                    <a
                                                        key={child}
                                                        href="#"
                                                        onClick={onClick}
                                                        className={
                                                            `block rounded-md px-3 py-2 text-sm transition-colors ` +
                                                            (isActiveAnchor
                                                                ? 'bg-white/10 text-zinc-100'
                                                                : 'text-zinc-300 hover:bg-white/10 hover:text-zinc-100')
                                                        }
                                                    >
                                                        {child}
                                                    </a>
                                                )
                                            }

                                            // Case 3: Fallback to route navigation (for resources children with prefix)
                                            const childSlug = child.toLowerCase().replace(/\s+/g, '-')
                                            const childPath = prefix ? `/${prefix}/${childSlug}` : `/${childSlug}`
                                            return (
                                                <NavLink
                                                    key={child}
                                                    to={childPath}
                                                    onClick={() => onNavigate && onNavigate()}
                                                    className={({ isActive }) =>
                                                        `block rounded-md px-3 py-2 text-sm transition-colors ${
                                                            isActive
                                                                ? 'bg-white/10 text-zinc-100'
                                                                : 'text-zinc-300 hover:bg-white/10 hover:text-zinc-100'
                                                        }`
                                                    }
                                                >
                                                    {child}
                                                </NavLink>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>
            </SectionTitle>
    )
}
