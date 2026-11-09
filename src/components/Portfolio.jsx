import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../data/siteData'

const O = '#FF5A1F'

const CARD_PATTERNS = [
  { bg: 'linear-gradient(135deg,#1a0a04 0%,#0d0808 100%)', accent: '#FF5A1F' },
  { bg: 'linear-gradient(135deg,#06061a 0%,#080810 100%)', accent: '#6366F1' },
  { bg: 'linear-gradient(135deg,#031410 0%,#060e0a 100%)', accent: '#10B981' },
  { bg: 'linear-gradient(135deg,#1a1200 0%,#0d0d04 100%)', accent: '#F59E0B' },
  { bg: 'linear-gradient(135deg,#1a0612 0%,#0d040d 100%)', accent: '#EC4899' },
  { bg: 'linear-gradient(135deg,#180a00 0%,#100808 100%)', accent: '#FF7A45' },
]

function PortfolioCard({ item, index, inView, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const p = CARD_PATTERNS[index % CARD_PATTERNS.length]

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.33, 1, 0.68, 1] }}
      style={{
        position: 'relative', borderRadius: '16px', overflow: 'hidden',
        aspectRatio: '4/3', cursor: 'default',
        background: p.bg,
        border: hovered ? `1px solid ${p.accent}44` : '1px solid rgba(255,255,255,0.05)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? `0 24px 60px ${p.accent}18` : 'none',
      }}
    >
      {/* Geometric background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 24px, ${p.accent}08 24px, ${p.accent}08 25px),repeating-linear-gradient(-45deg, transparent, transparent 24px, ${p.accent}06 24px, ${p.accent}06 25px)`,
        transition: 'opacity 0.4s ease',
        ...(hovered && { opacity: 0.8 }),
      }} />

      {/* Center glow on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 50%, ${p.accent}18 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.4s ease',
      }} />

      <button
        className="portfolio-card-trigger"
        type="button"
        aria-label={`View demo concept: ${item.title}`}
        onClick={() => onSelect(item)}
      />

      {/* Large decorative letter */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(100px, 20vw, 160px)', fontWeight: 900,
        color: `${p.accent}10`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        transition: 'transform 0.6s ease',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        {item.title.charAt(0)}
      </div>

      {/* DEMO badge */}
      <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 3 }}>
        <span style={{
          fontSize: '9px', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: '999px', fontFamily: "'Montserrat', sans-serif",
          background: `${p.accent}22`, color: p.accent, border: `1px solid ${p.accent}33`,
        }}>
          {item.tag}
        </span>
      </div>

      {/* Hover action icon */}
      <div style={{
        position: 'absolute', top: '16px', right: '16px', zIndex: 3,
        width: '36px', height: '36px', borderRadius: '50%', background: p.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: hovered ? 'scale(1) translateY(0)' : 'scale(0) translateY(-8px)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* Bottom content */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '24px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
        zIndex: 2,
      }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: p.accent, marginBottom: '6px', fontFamily: "'Montserrat', sans-serif" }}>
          {item.category}
        </span>
        <h3 style={{ color: 'white', fontSize: '1.05rem', fontWeight: 700, fontFamily: "'Montserrat', sans-serif", marginBottom: '8px' }}>
          {item.title}
        </h3>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
          opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
          View Concept
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const closeButtonRef = useRef(null)
  const activeTriggerRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = active === 'All' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(p => p.category === active)

  useEffect(() => {
    if (!selectedProject) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      activeTriggerRef.current?.focus()
    }
  }, [selectedProject])

  return (
    <section id="work" ref={ref} style={{ position: 'relative', padding: 'clamp(80px,12vw,140px) 0', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,31,0.05) 0%, transparent 70%)', transform: 'translate(30%,30%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <span className="orange-line" />
              <span style={{ color: O, fontSize: '11px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>Portfolio</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 0.95, color: 'white', margin: '12px 0 0' }}>
              OUR CREATIVITY<br /><span className="gradient-text">IN ACTION.</span>
            </motion.h2>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', maxWidth: '260px', textAlign: 'right', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Explore 12 fictional project concepts across our creative services. Each is clearly marked as a demo.
          </motion.p>
        </div>

        {/* Category filter tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} aria-pressed={active === cat}
              style={{
                padding: '8px 20px', borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif",
                background: active === cat ? O : 'rgba(255,255,255,0.05)',
                color: active === cat ? 'white' : 'rgba(255,255,255,0.4)',
                border: active === cat ? `1px solid ${O}` : '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.25s ease', cursor: 'pointer',
              }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filtered.map((item, i) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={i}
                inView={inView}
                onSelect={(project) => {
                  activeTriggerRef.current = document.activeElement
                  setSelectedProject(project)
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedProject(null)
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'grid', placeItems: 'center', padding: '24px', background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(12px)' }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'relative', width: 'min(100%, 560px)', maxHeight: 'min(80vh, 640px)', overflowY: 'auto', padding: 'clamp(28px,6vw,48px)', borderRadius: '20px', border: `1px solid ${selectedProject.color}55`, background: 'linear-gradient(145deg, #17120f, #0b0b0b 65%)', boxShadow: '0 32px 100px rgba(0,0,0,0.6)' }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', display: 'grid', placeItems: 'center', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
              <span style={{ display: 'inline-block', marginBottom: '20px', padding: '6px 12px', borderRadius: '999px', color: selectedProject.color, background: `${selectedProject.color}18`, border: `1px solid ${selectedProject.color}44`, fontFamily: "'Montserrat', sans-serif", fontSize: '10px', fontWeight: 800, letterSpacing: '2px' }}>
                {selectedProject.tag} · {selectedProject.category}
              </span>
              <h3 id="project-dialog-title" style={{ maxWidth: '440px', marginBottom: '16px', color: 'white', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem,7vw,3.5rem)', lineHeight: 0.98 }}>
                {selectedProject.title}
              </h3>
              <p style={{ marginBottom: '28px', color: 'rgba(255,255,255,0.62)', fontFamily: "'Inter', sans-serif", fontSize: '15px', lineHeight: 1.8 }}>
                {selectedProject.summary}
              </p>
              <h4 style={{ marginBottom: '14px', color: selectedProject.color, fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Concept deliverables
              </h4>
              <ul style={{ display: 'grid', gap: '10px', padding: 0, listStyle: 'none' }}>
                {selectedProject.deliverables.map((deliverable) => (
                  <li key={deliverable} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.78)', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                    <span aria-hidden="true" style={{ width: '6px', height: '6px', flexShrink: 0, borderRadius: '50%', background: selectedProject.color }} />
                    {deliverable}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter', sans-serif", fontSize: '12px', lineHeight: 1.6 }}>
                This is a fictional portfolio concept created to showcase creative direction, not commissioned client work.
              </p>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
