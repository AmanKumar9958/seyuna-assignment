import { useEffect } from 'react'

/**
 * useSectionObserver
 * Observes a list of section element IDs and dispatches a global `sectionchange` CustomEvent
 * with the id of the section that is most visible in the viewport. This enables sidebar
 * navigation groups to highlight anchors as the user scrolls without modifying the URL hash.
 *
 * @param {string[]} ids - Array of DOM element ids to observe.
 */
export default function useSectionObserver(ids = []) {
  useEffect(() => {
    if (!ids.length || typeof window === 'undefined') return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const id = visible.target.id
          window.dispatchEvent(new CustomEvent('sectionchange', { detail: id }))
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])
}
