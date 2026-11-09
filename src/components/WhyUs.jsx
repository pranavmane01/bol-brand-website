import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WHY_CARDS } from '../data/siteData'

const O = '#FF5A1F'

const ICONS = {
  Lightbulb: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18h6M10 21h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L12 17l-3.7-2C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z" />
    </svg>
  ),
  Target: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Zap: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  BarChart3: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect x="18" y="2" width="4" height="20" rx="1" /><rect x="10" y="8" width="4" height="14" rx="1" /><rect x="2" y="14" width="4" height="8" rx="1" />
    </svg>
  ),
}

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why" ref={ref} style={{ position: 'relative', padding: 'clamp(80px,12vw,140px) 0', overflow: 'hidden' }}>

      {/* Large watermark text */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Bebas Neue', sans-serif", fontSize: '22vw', fontWeight: 900,
        color: 'rgba(255,255,255,0.012)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
      }}>
        BOL
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 72px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span style={{ color: O, fontSize: '11px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>Why Choose Us</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 0.95, color: 'white', marginTop: '12px' }}>
            WHY <span className="gradient-text">BOL BRAND?</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon]
            return (
              <motion.div
                key={card.title}
                className="glass"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.33, 1, 0.68, 1] }}
                whileHover={{ y: -10, boxShadow: '0 24px 60px rgba(255,90,31,0.1)' }}
                style={{ borderRadius: '20px', padding: '36px 28px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Hover border glow overlay */}
                <motion.div
                  style={{ position: 'absolute', inset: 0, borderRadius: '20px', border: `1px solid ${O}`, opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 0.3 }}
                />

                {/* Top glow */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '1px', background: `linear-gradient(90deg, transparent, ${O}60, transparent)` }} />

                {/* Number */}
                <span style={{
                  position: 'absolute', top: '20px', right: '20px',
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '3.5rem', fontWeight: 900,
                  color: 'rgba(255,90,31,0.07)', lineHeight: 1, userSelect: 'none',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <motion.div
                  style={{
                    width: '60px', height: '60px', borderRadius: '16px',
                    background: 'rgba(255,90,31,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '24px', color: O,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5, background: 'rgba(255,90,31,0.18)' }}
                >
                  {Icon}
                </motion.div>

                <h3 style={{ color: 'white', fontFamily: "'Montserrat', sans-serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
                  {card.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}>
                  {card.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: `linear-gradient(90deg, ${O}, transparent)` }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
