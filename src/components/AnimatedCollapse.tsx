import { useEffect, useRef, useState, ReactNode } from 'react'

interface AnimatedCollapseProps {
  isOpen: boolean
  className?: string
  children: ReactNode
}

// Animated height/opacity collapse. Keeps content mounted for smooth close.
// Props: isOpen (boolean), className (string), children (ReactNode)
export default function AnimatedCollapse({ isOpen, className = '', children }: AnimatedCollapseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<string>(isOpen ? 'none' : '0px')
  const [opacity, setOpacity] = useState<number>(isOpen ? 1 : 0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const contentHeight = el.scrollHeight

    if (isOpen) {
      // from 0 -> content height, then to none after transition
      setMaxHeight(`${contentHeight}px`)
      setOpacity(1)
      const id = requestAnimationFrame(() => {
        // ensure transition runs even if contentHeight was 0
        setMaxHeight(`${el.scrollHeight}px`)
      })
      const onEnd = (e: TransitionEvent) => {
        if (e.propertyName === 'max-height') {
          setMaxHeight('none')
          el.removeEventListener('transitionend', onEnd)
        }
      }
      el.addEventListener('transitionend', onEnd)
      return () => {
        cancelAnimationFrame(id)
        el.removeEventListener('transitionend', onEnd)
      }
    } else {
      // from current height -> 0
      // if currently 'none', set to measured height first
      if (maxHeight === 'none') setMaxHeight(`${contentHeight}px`)
      // next frame collapse
      const id = requestAnimationFrame(() => {
        setMaxHeight('0px')
        setOpacity(0)
      })
      return () => cancelAnimationFrame(id)
    }
  }, [isOpen, maxHeight])

  return (
    <div
      ref={ref}
      style={{ maxHeight, opacity }}
      className={
        'overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out will-change-[max-height,opacity] ' +
        className
      }
      aria-hidden={!isOpen}
    >
      {children}
    </div>
  )
}
