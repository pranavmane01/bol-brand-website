import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const O = '#FF5A1F'
const Hero3DScene = lazy(() => import('./Hero3DScene'))

function MouseGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      ref.current.style.background = `radial-gradient(650px circle at ${x}% ${y}%, rgba(255,90,31,0.11) 0%, transparent 60%)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <div ref={ref} style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} aria-hidden />
}

const MARQUEE_ITEMS = [
  'SOCIAL MEDIA MARKETING', 'CONTENT CREATION', 'AI VIDEO PRODUCTION',
  'BRAND IDENTITY', 'DIGITAL MARKETING', 'WEB DEVELOPMENT',
  'AI AUTOMATION', 'BUSINESS PROMOTION',
]

export default function Hero() {
  const [showScene, setShowScene] = useState(false)
  const handleNav = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return

    const timer = window.setTimeout(() => setShowScene(true), 500)
    return () => window.clearTimeout(timer)
  }, [])

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } } }
  const item = { hidden: { y: 55, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.33, 1, 0.68, 1] } } }

  return (
    <section id="home" className="animated-gradient grid-pattern" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <MouseGlow />

      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.85 }}>
        {showScene && (
          <Suspense fallback={null}>
            <Hero3DScene />
          </Suspense>
        )}
      </div>

      {/* Top vignette */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '140px', background: 'linear-gradient(to bottom, #080808, transparent)', zIndex: 3, pointerEvents: 'none' }} />
      {/* Bottom vignette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '220px', background: 'linear-gradient(to top, #080808, transparent)', zIndex: 3, pointerEvents: 'none' }} />

      {/* Content */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '130px 24px 80px', textAlign: 'center', width: '100%' }}
      >
        {/* Badge */}
        <motion.div variants={item} style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
          <span className="glass" style={{
            border: '1px solid rgba(255,90,31,0.3)', color: O,
            fontSize: '11px', fontWeight: 700, letterSpacing: '4px',
            textTransform: 'uppercase', padding: '8px 20px', borderRadius: '999px',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            ✦ &nbsp;Creative Digital Agency&nbsp; ✦
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3.2rem, 10.5vw, 9.5rem)',
            fontWeight: 900, lineHeight: 0.95,
            letterSpacing: '-0.01em',
            color: 'white', marginBottom: '24px',
          }}
        >
          WE BUILD <span className="gradient-text">BRANDS</span>
          <br />
          THAT MAKE{' '}
          <span style={{ WebkitTextStroke: '2px #FF5A1F', color: 'transparent' }}>NOISE.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          style={{
            maxWidth: '560px', margin: '0 auto 40px',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.58)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          We turn ideas into powerful digital experiences through creative
          storytelling, social media, and strategic digital marketing.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          <motion.button
            onClick={() => handleNav('work')}
            className="btn-orange"
            style={{ padding: '15px 36px', fontSize: '13px' }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            Explore Our Work
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => handleNav('contact')}
            className="btn-outline"
            style={{ padding: '15px 36px', fontSize: '13px' }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            Start a Project
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={item} style={{ marginTop: '72px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>
            Scroll to explore
          </span>
          <motion.div
            style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, #FF5A1F, transparent)', transformOrigin: 'top' }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Marquee strip */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.012)', padding: '14px 0' }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', padding: '0 24px', color: 'rgba(255,255,255,0.38)', fontSize: '12px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif", whiteSpace: 'nowrap' }}>
              {text}
              <span style={{ color: O, fontSize: '14px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
