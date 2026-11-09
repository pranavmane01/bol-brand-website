import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '../data/siteData'
import { useCountUp } from '../hooks/useCountUp'

const O = '#FF5A1F'

function StatCard({ stat }) {
  const { count, ref } = useCountUp(stat.value)
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div className="gradient-text" style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
        fontWeight: 900, lineHeight: 1, marginBottom: '8px',
      }}>
        {count}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
        {stat.label}
      </div>
    </div>
  )
}

const fadeUp = {
  hidden: { y: 50, opacity: 0 },
  show: (i) => ({ y: 0, opacity: 1, transition: { duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] } }),
}

const SKILLS = [
  { label: 'Brand Strategy',      pct: 92 },
  { label: 'Creative Design',     pct: 96 },
  { label: 'Digital Marketing',   pct: 88 },
  { label: 'Content Production',  pct: 94 },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ position: 'relative', padding: 'clamp(80px,12vw,140px) 0', overflow: 'hidden' }}>

      {/* BG glow top-right */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,31,0.07) 0%, transparent 70%)', transform: 'translate(30%,-30%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Label */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} style={{ marginBottom: '16px' }}>
          <span className="orange-line" />
          <span style={{ color: O, fontSize: '11px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>About Us</span>
        </motion.div>

        {/* Two-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

          {/* Left — text */}
          <div>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 0.95, color: 'white', marginBottom: '28px' }}>
              CREATIVITY<br />MEETS <span className="gradient-text">STRATEGY.</span>
            </motion.h2>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>
              We are <strong style={{ color: 'white' }}>BOL BRAND</strong>, a creative digital agency helping businesses build a powerful online presence. We combine creativity, strategy, and technology to transform businesses into memorable brands.
            </motion.p>

            <motion.p custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '36px', fontFamily: "'Inter', sans-serif" }}>
              From social media management to AI-powered video production, we provide everything your brand needs to thrive in the digital age.
            </motion.p>

            {/* Feature pills */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
              {['Creative', 'Strategic', 'Modern', 'Results-Driven'].map((tag) => (
                <span key={tag} className="glass-orange" style={{ padding: '6px 16px', borderRadius: '999px', fontSize: '11px', color: O, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.button custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="btn-orange"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Work With Us
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </motion.button>
          </div>

          {/* Right — card */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} style={{ position: 'relative' }}>
            <div className="glass" style={{ borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden' }}>

              {/* Inner glow */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,31,0.12) 0%, transparent 70%)', transform: 'translate(30%,-30%)', pointerEvents: 'none' }} />

              {/* Agency label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <div style={{ width: '36px', height: '36px', background: O, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '14px', fontFamily: "'Montserrat', sans-serif" }}>BOL BRAND</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>Digital Agency</div>
                </div>
              </div>

              {/* Skill bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {SKILLS.map((s, i) => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>{s.label}</span>
                      <span style={{ color: O, fontSize: '12px', fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>{s.pct}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div
                        style={{ height: '100%', background: `linear-gradient(90deg, ${O}, #FF7A45)`, borderRadius: '4px' }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${s.pct}%` } : { width: 0 }}
                        transition={{ duration: 1.4, delay: 0.8 + i * 0.12, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontStyle: 'italic', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
                  "We don't just build brands — we build legacies."
                </p>
                <p style={{ color: O, fontSize: '11px', marginTop: '8px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>
                  — BOL BRAND
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="glass-orange"
              style={{ position: 'absolute', bottom: '-20px', left: '-20px', padding: '16px 20px', borderRadius: '14px' }}
              initial={{ scale: 0, rotate: -10 }}
              animate={inView ? { scale: 1, rotate: -4 } : { scale: 0 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 160 }}
            >
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: O, lineHeight: 1 }}>BOLD</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>by design</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px', marginTop: '80px', paddingTop: '56px', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {STATS.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </motion.div>
      </div>
    </section>
  )
}
