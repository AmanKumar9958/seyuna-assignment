import { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import SectionTitle from './SectionTitle'
import AnimatedCollapse from './AnimatedCollapse'
import { smoothScrollToId } from '../utils/scroll'

interface NavGroupProps {
    title: string;
    items: string[];
    subMap?: Record<string, string[]>;
    prefix?: string;
    anchorParent?: string;
    anchorMap?: Record<string, string>;
    onNavigate?: () => void;
}

export default function NavGroup({ title, items, subMap = {}, prefix = '', anchorParent, anchorMap, onNavigate }: NavGroupProps) {
    const [openItem, setOpenItem] = useState<string | null>(null)
    const navigate = useNavigate()
    const location = useLocation()
    const [activeAnchor, setActiveAnchor] = useState<string | null>(null)
    const navRef = useRef<HTMLElement>(null)
    const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 })

    useEffect(() => {
        if (anchorParent && location.pathname === anchorParent) {
            const owner = Object.keys(subMap).find((k) => subMap[k]?.some((c) => anchorMap?.[c]))
            if (owner) setOpenItem(owner)
        }
    }, [anchorParent, location.pathname, subMap, anchorMap])

    useEffect(() => {
        const handler = (e: Event) => setActiveAnchor((e as CustomEvent).detail)
        window.addEventListener('sectionchange', handler)
        return () => window.removeEventListener('sectionchange', handler)
    }, [])

    useEffect(() => {
        setActiveAnchor(null)
    }, [location.pathname])

    useEffect(() => {
        const updateIndicator = () => {
            if (!navRef.current) return
            const activeEl = navRef.current.querySelector('[data-active="true"]') as HTMLElement
            if (activeEl) {
                const navRect = navRef.current.getBoundingClientRect()
                const activeRect = activeEl.getBoundingClientRect()
                const top = activeRect.top - navRect.top
                // Center a 24px (h-6) indicator vertically within the item
                const indicatorHeight = 24
                const centeredTop = top + (activeRect.height - indicatorHeight) / 2
                
                setIndicatorStyle({
                    top: centeredTop,
                    height: indicatorHeight,
                    opacity: 1
                })
            } else {
                setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
            }
        }

        // Update immediately and after a short delay to handle animations/layout shifts
        updateIndicator()
        const timeout = setTimeout(updateIndicator, 350) // slightly longer than transition
        return () => clearTimeout(timeout)
    }, [location.pathname, activeAnchor, openItem])

    const handleClick = (item: string) => {
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
            <nav ref={navRef} className="relative mt-3 flex flex-col gap-1 border-l border-white/5">
                <div
                    className="absolute -left-[1px] top-0 w-[2px] bg-emerald-400 transition-[transform,height,opacity] duration-200 ease-out"
                    style={{
                        transform: `translateY(${indicatorStyle.top}px)`,
                        height: `${indicatorStyle.height}px`,
                        opacity: indicatorStyle.opacity
                    }}
                />
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
                                data-active={isActive}
                                className={
                                    "relative flex w-full items-center py-2 pl-4 text-left text-sm transition-colors hover:text-white cursor-pointer " +
                                    (isActive ? 'text-zinc-100 font-medium' : 'text-zinc-400')
                                }
                            >
                                <span>{item}</span>
                            </button>

                            {hasChildren && (
                                <AnimatedCollapse isOpen={expanded} className="mt-1 flex flex-col gap-1">
                                    {subMap[item].map((child) => {
                                        const anchorId = anchorMap?.[child]
                                        if (anchorParent && anchorId) {
                                            const isActiveAnchor = location.pathname === anchorParent && activeAnchor === anchorId
                                            const onClick = (e: React.MouseEvent) => {
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
                                                    data-active={isActiveAnchor}
                                                    className={
                                                        `block rounded-md py-2 pl-8 text-sm transition-colors cursor-pointer ` +
                                                        (isActiveAnchor
                                                            ? 'bg-white/5 text-zinc-100 font-medium'
                                                            : 'text-zinc-400 hover:text-white')
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
                                            const onClick = (e: React.MouseEvent) => {
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
                                                    data-active={isActiveAnchor}
                                                    className={
                                                        `block rounded-md py-2 pl-8 text-sm transition-colors cursor-pointer ` +
                                                        (isActiveAnchor
                                                            ? 'bg-white/5 text-zinc-100 font-medium'
                                                            : 'text-zinc-400 hover:text-white')
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
                                                    `block py-2 pl-8 text-sm transition-colors cursor-pointer ${
                                                        isActive
                                                            ? 'text-zinc-100 font-medium'
                                                            : 'text-zinc-400 hover:text-white'
                                                    }`
                                                }
                                            >
                                                {({ isActive }) => (
                                                    <span data-active={isActive}>{child}</span>
                                                )}
                                            </NavLink>
                                        )
                                    })}
                                </AnimatedCollapse>
                            )}
                        </div>
                    )
                })}
            </nav>
        </SectionTitle>
    )
}