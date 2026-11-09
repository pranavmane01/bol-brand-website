import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '../data/siteData'

const O = '#FF5A1F'

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const prev = () => { setDir(-1); setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length) }
  const next = () => { setDir(1); setCurrent(c => (c + 1) % TESTIMONIALS.length) }

  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" ref={ref} style={{ position: 'relative', padding: 'clamp(80px,12vw,140px) 0', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(255,90,31,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span style={{ color: O, fontSize: '11px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>What Clients Say</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 0.95, color: 'white', marginTop: '12px' }}>
            CLIENT <span className="gradient-text">STORIES.</span>
          </motion.h2>

          {/* Demo notice */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <span className="glass" style={{ padding: '6px 20px', borderRadius: '999px', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
              Genuine client feedback
            </span>
          </motion.div>
        </div>

        {/* Testimonial card */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="glass" style={{ borderRadius: '24px', padding: 'clamp(32px,6vw,64px)', position: 'relative', overflow: 'hidden' }}>

            {/* Large quote mark */}
            <div aria-hidden style={{ position: 'absolute', top: '24px', right: '28px', fontFamily: 'serif', fontSize: '8rem', lineHeight: 1, color: 'rgba(255,90,31,0.07)', userSelect: 'none', pointerEvents: 'none' }}>"</div>

            {/* Top glow */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px', height: '1px', background: `linear-gradient(90deg, transparent, ${O}50, transparent)` }} />

            {/* Quote text */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
              >
                <p style={{ fontSize: 'clamp(1rem,2.5vw,1.3rem)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, fontStyle: t.pending ? 'normal' : 'italic', margin: '28px 0 36px', fontFamily: "'Inter', sans-serif" }}>
                  {t.pending ? t.text : `"${t.text}"`}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Avatar */}
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${O}, #E04010)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', color: 'white', fontWeight: 900,
                  }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}>{t.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '2px', fontFamily: "'Inter', sans-serif" }}>{t.role}</div>
                    <div style={{ color: O, fontSize: '10px', marginTop: '4px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>{t.note}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          {TESTIMONIALS.length > 1 && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '28px' }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
                  aria-label={`Testimonial ${i + 1}`}
                  style={{
                    height: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer',
                    background: i === current ? O : 'rgba(255,255,255,0.15)',
                    width: i === current ? '32px' : '8px',
                    transition: 'all 0.3s ease',
                  }} />
              ))}
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={prev} aria-label="Previous"
                className="glass"
                style={{
                  width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', cursor: 'pointer', background: 'rgba(255,255,255,0.03)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = O; e.currentTarget.style.color = O }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={next} aria-label="Next"
                style={{
                  width: '48px', height: '48px', borderRadius: '50%', background: O, border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.08)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>}
        </motion.div>
      </div>
    </section>
  )
}
