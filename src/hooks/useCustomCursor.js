import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    const lerp = (start, end, factor) => start + (end - start) * factor

    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.12)
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'
      rafRef.current = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animateRing)

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { dotRef, ringRef }
}
