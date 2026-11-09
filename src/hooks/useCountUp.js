import { useEffect, useRef, useState } from 'react'

export function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHasStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!hasStarted) return

    // Parse numeric value from string like "50+" or "100%"
    const numericPart = parseInt(end.replace(/\D/g, ''), 10)
    const suffix = end.replace(/[\d]/g, '')

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericPart) + suffix)
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [hasStarted, end, duration])

  return { count, ref }
}

