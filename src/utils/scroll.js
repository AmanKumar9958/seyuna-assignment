// Utilities for smooth scrolling with offset-aware behavior

/**
 * Measures the combined height of sticky/fixed headers so we can offset scroll positions.
 * Looks for elements annotated with data attributes in PreviewToolbar and Topbar.
 */
export function getHeaderOffset() {
  const toolbar = document.querySelector('[data-preview-toolbar]')
  const topbar = document.querySelector('[data-topbar]')
  const toolbarH = toolbar ? toolbar.offsetHeight : 0
  const topbarH = topbar ? topbar.offsetHeight : 0
  // Add a small padding to give breathing room
  const extra = 8
  return toolbarH + topbarH + extra
}

/**
 * Smoothly scrolls the page so that the element with the given id appears just below the headers.
 * Falls back gracefully if element is not found.
 * @param {string} id - Element id to scroll to
 */
export function smoothScrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return

  const headerOffset = getHeaderOffset()
  const rect = el.getBoundingClientRect()
  const targetY = rect.top + window.scrollY - headerOffset
  window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
}
