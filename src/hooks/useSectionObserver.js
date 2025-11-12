import { useEffect, useRef } from 'react'

export default function useSectionObserver(ids = []) {
  const lastIdRef = useRef(null)

  useEffect(() => {
    if (!ids.length || typeof window === 'undefined') return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const emitIfChanged = (id) => {
      if (!id || lastIdRef.current === id) return
      lastIdRef.current = id
      window.dispatchEvent(new CustomEvent('sectionchange', { detail: id }))
    }

    const isNearBottom = () => {
      const doc = document.documentElement
      // Consider within 120px of bottom as "near bottom"
      return window.innerHeight + window.scrollY >= doc.scrollHeight - 120
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // If we're near the bottom of the page, force the last section as active
        if (isNearBottom()) {
          emitIfChanged(ids[ids.length - 1])
          return
        }

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) emitIfChanged(visible.target.id)
      },
      {
        root: null,
        // Slightly bias towards the element closer to the bottom half
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((el) => observer.observe(el))
    
    const handleScroll = () => {
      if (isNearBottom()) emitIfChanged(ids[ids.length - 1])
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [ids])
}