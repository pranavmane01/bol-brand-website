import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook: applies GSAP ScrollTrigger reveal animations to child elements
 * matching [data-gsap] within the target ref.
 *
 * Usage:
 *   const ref = useGSAPReveal()
 *   <section ref={ref}>
 *     <h2 data-gsap="fadeUp">...</h2>
 *     <p  data-gsap="fadeUp" data-delay="0.2">...</p>
 *   </section>
 */
export function useGSAPReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = el.querySelectorAll('[data-gsap]')

    targets.forEach((target) => {
      const type = target.dataset.gsap || 'fadeUp'
      const delay = parseFloat(target.dataset.delay || 0)
      const duration = parseFloat(target.dataset.duration || 0.9)

      let fromVars = {}
      if (type === 'fadeUp') fromVars = { y: 60, opacity: 0 }
      else if (type === 'fadeLeft') fromVars = { x: -60, opacity: 0 }
      else if (type === 'fadeRight') fromVars = { x: 60, opacity: 0 }
      else if (type === 'fadeIn') fromVars = { opacity: 0 }
      else if (type === 'scaleIn') fromVars = { scale: 0.85, opacity: 0 }

      gsap.from(target, {
        ...fromVars,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target,
          start: options.start || 'top 85%',
          once: true,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [options.start])

  return ref
}

/**
 * Horizontal scroll text marquee driven by GSAP.
 * Faster / premium feel compared to pure CSS.
 */
export function useGSAPMarquee(speed = 1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const totalWidth = el.scrollWidth / 2
    const tl = gsap.to(el, {
      x: -totalWidth,
      duration: totalWidth / (60 * speed),
      ease: 'none',
      repeat: -1,
    })

    return () => tl.kill()
  }, [speed])

  return ref
}

