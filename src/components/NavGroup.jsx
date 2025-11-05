import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import SectionTitle from './SectionTitle.jsx'

// NavGroup renders a vertical list of items.
// If an item has children (provided via subMap), clicking it will expand
// the children and collapse any other expanded item (accordion behavior).
export default function NavGroup({ title, items, subMap = {}, prefix = '', anchorParent, anchorMap }) {
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

        // Listen for section changes broadcast by the Introduction page
        useEffect(() => {
            const handler = (e) => setActiveAnchor(e.detail)
            window.addEventListener('sectionchange', handler)
            return () => window.removeEventListener('sectionchange', handler)
        }, [])

        const handleClick = (item) => {
            if (subMap[item]?.length) {
                setOpenItem((curr) => (curr === item ? null : item))
                // If this item owns anchors (e.g., Introduction), also ensure we are on its parent route
                if (anchorParent && subMap[item].some((c) => anchorMap?.[c])) {
                    if (location.pathname !== anchorParent) navigate(anchorParent)
                }
        } else {
            // Clicking an item without children collapses any open submenu
            setOpenItem(null)
            // Navigate to the item's route
            const slug = item.toLowerCase().replace(/\s+/g, '-')
            const path = prefix ? `/${prefix}/${slug}` : `/${slug}`
            navigate(path)
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
                                    <div className="ml-3 border-l border-white/10 pl-3">
                                                        {subMap[item].map((child) => {
                                                            const anchorId = anchorMap?.[child]
                                                                                    if (anchorParent && anchorId) {
                                                                                        const isActiveAnchor = location.pathname === anchorParent && activeAnchor === anchorId
                                                                                        const onClick = (e) => {
                                                                                            e.preventDefault()
                                                                                            // Ensure we are on the introduction route (without changing URL visibly)
                                                                                            if (location.pathname !== anchorParent) navigate(anchorParent)
                                                                                            // Smooth scroll to the section id
                                                                                            const el = document.getElementById(anchorId)
                                                                                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                                                            // Locally mark active anchor (no hash updates)
                                                                                            setActiveAnchor(anchorId)
                                                                                        }
                                                                return (
                                                                    <a
                                                                        key={child}
                                                                                                href="#"
                                                                        onClick={onClick}
                                                                        className={
                                                                            `block rounded-md px-3 py-2 text-sm hover:bg-white/5 ` +
                                                                            (isActiveAnchor ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-200')
                                                                        }
                                                                    >
                                                                        {child}
                                                                    </a>
                                                                )
                                                            }

                                                            // Default: navigate to a separate route
                                                            const childSlug = child.toLowerCase().replace(/\s+/g, '-')
                                                            const childPath = prefix ? `/${prefix}/${childSlug}` : `/${childSlug}`
                                                            return (
                                                                <NavLink
                                                                    key={child}
                                                                    to={childPath}
                                                                    className={({ isActive }) =>
                                                                        `block rounded-md px-3 py-2 text-sm hover:bg-white/5 ${
                                                                            isActive ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
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
