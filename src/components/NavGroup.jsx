import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import SectionTitle from './SectionTitle.jsx'
import { smoothScrollToId } from '../utils/scroll.js'

export default function NavGroup({ title, items, subMap = {}, prefix = '', anchorParent, anchorMap, onNavigate }) {
    const [openItem, setOpenItem] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [activeAnchor, setActiveAnchor] = useState(null)

    useEffect(() => {
        if (anchorParent && location.pathname === anchorParent) {
            const owner = Object.keys(subMap).find((k) => subMap[k]?.some((c) => anchorMap?.[c]))
            if (owner) setOpenItem(owner)
        }
    }, [anchorParent, location.pathname, subMap, anchorMap])

    useEffect(() => {
        const handler = (e) => setActiveAnchor(e.detail)
        window.addEventListener('sectionchange', handler)
        return () => window.removeEventListener('sectionchange', handler)
    }, [])

    useEffect(() => {
        setActiveAnchor(null)
    }, [location.pathname])

    const handleClick = (item) => {
        const hasChildren = subMap[item]?.length
        if (hasChildren) {
            setOpenItem((curr) => (curr === item ? null : item))
            const isAnchorOwner = anchorParent && subMap[item].some((c) => anchorMap?.[c])
            if (isAnchorOwner) {
                if (location.pathname !== anchorParent) {
                    navigate(anchorParent)
                    onNavigate && onNavigate()
                }
            } else {
                const slug = item.toLowerCase().replace(/\s+/g, '-')
                const path = prefix ? `/${prefix}/${slug}` : `/${slug}`
                if (location.pathname !== path) {
                    navigate(path)
                    onNavigate && onNavigate()
                }
            }
        } else {
            setOpenItem(null)
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
                                    "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors hover:text-white " +
                                    (isActive ? 'border-l-2 border-emerald-400 bg-white/5 text-zinc-400' : 'text-zinc-400')
                                }
                            >
                                <span>{item}</span>
                            </button>

                            {hasChildren && expanded && (
                                <div className="ml-2 rounded-lg bg-white/5 p-1.5">
                                    {subMap[item].map((child) => {
                                        const anchorId = anchorMap?.[child]
                                        if (anchorParent && anchorId) {
                                            const isActiveAnchor = location.pathname === anchorParent && activeAnchor === anchorId
                                            const onClick = (e) => {
                                                e.preventDefault()
                                                if (location.pathname !== anchorParent) navigate(anchorParent)
                                                const doScroll = () => smoothScrollToId(anchorId)
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
                                                            : 'text-zinc-200 hover:text-white')
                                                    }
                                                >
                                                    {child}
                                                </a>
                                            )
                                        }

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
                                                            : 'text-zinc-200 hover:text-white')
                                                    }
                                                >
                                                    {child}
                                                </a>
                                            )
                                        }

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
                                                            : 'text-zinc-200 hover:text-white'
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