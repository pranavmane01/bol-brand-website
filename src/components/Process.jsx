import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROCESS_STEPS } from '../data/siteData'

const O = '#FF5A1F'

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" ref={ref} style={{ position: 'relative', padding: 'clamp(80px,12vw,140px) 0', overflow: 'hidden' }}>

      {/* Grid bg */}
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      {/* BG glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,31,0.04) 0%, transparent 70%)', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 80px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span style={{ color: O, fontSize: '11px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>How We Work</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 0.95, color: 'white', marginTop: '12px' }}>
            OUR <span className="gradient-text">PROCESS.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>

          {/* Connecting line (desktop) */}
          <div style={{ position: 'absolute', top: '32px', left: '10%', right: '10%', height: '1px', background: 'rgba(255,255,255,0.05)', display: 'none' }} className="process-line" />
          <style>{`@media(min-width:1024px){.process-line{display:block!important}}`}</style>

          <motion.div
            style={{ position: 'absolute', top: '32px', left: '10%', height: '1px', background: `linear-gradient(90deg, ${O}, rgba(255,90,31,0.1))`, zIndex: 1 }}
            initial={{ width: 0 }}
            animate={inView ? { width: '80%' } : { width: 0 }}
            transition={{ duration: 2, delay: 0.6, ease: 'easeOut' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', position: 'relative', zIndex: 2 }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                {/* Circle */}
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <motion.div
                    whileHover={{ scale: 1.15, background: O }}
                    style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: i === 0 ? O : 'rgba(255,255,255,0.04)',
                      border: i === 0 ? 'none' : `1px solid rgba(255,90,31,0.4)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', color: i === 0 ? 'white' : O }}>
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Pulse ring on first step */}
                  {i === 0 && (
                    <motion.div
                      style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `1px solid ${O}` }}
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </div>

                {/* Content */}
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', fontWeight: 900,
                  letterSpacing: '0.08em', color: 'white', marginBottom: '10px',
                }}>
                  {step.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
                  {step.description}
                </p>

                {/* Mobile vertical connector */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="mobile-connector" style={{ display: 'none' }}>
                    <style>{`@media(max-width:1023px){.mobile-connector{display:block!important}}`}</style>
                    <div style={{ width: '1px', height: '32px', background: `linear-gradient(to bottom, ${O}, transparent)`, margin: '16px auto 0' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 1.2 }}
          style={{ textAlign: 'center', marginTop: '72px' }}
        >
          <button className="btn-orange" style={{ padding: '16px 44px', fontSize: '13px' }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Start Your Project
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
