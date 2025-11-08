export function getHeaderOffset() {
  const toolbar = document.querySelector('[data-preview-toolbar]')
  const topbar = document.querySelector('[data-topbar]')
  const toolbarH = toolbar ? toolbar.offsetHeight : 0
  const topbarH = topbar ? topbar.offsetHeight : 0
  const extra = 8
  return toolbarH + topbarH + extra
}

export function smoothScrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return

  const headerOffset = getHeaderOffset()
  const rect = el.getBoundingClientRect()
  const targetY = rect.top + window.scrollY - headerOffset
  window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
}