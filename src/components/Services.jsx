import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SERVICES } from '../data/siteData'

const O = '#FF5A1F'

const ICONS = {
  Instagram: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  TrendingUp: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  PenTool: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
    </svg>
  ),
  Video: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  Layers: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Monitor: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Cpu: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Megaphone: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11l19-9v18L3 11z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
}

function ServiceCard({ service, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const onMove = (e) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    setTilt({ x: dy * -7, y: dx * 7 })
  }

  return (
    <motion.div
      ref={cardRef}
      className="glass"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.33, 1, 0.68, 1] }}
      style={{
        borderRadius: '18px', padding: '32px', position: 'relative', overflow: 'hidden',
        cursor: 'default',
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.08s ease, border-color 0.3s ease, box-shadow 0.3s ease' : 'transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        border: hovered ? '1px solid rgba(255,90,31,0.3)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered ? '0 20px 60px rgba(255,90,31,0.1)' : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      {/* Inner radial glow on hover */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '18px', pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 20%, rgba(255,90,31,0.07) 0%, transparent 65%)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease',
      }} />

      {/* Top arrow indicator */}
      <div style={{
        position: 'absolute', top: '20px', right: '20px',
        width: '30px', height: '30px', borderRadius: '50%', background: O,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-45deg)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: hovered ? 'rgba(255,90,31,0.15)' : 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '22px',
        color: hovered ? O : 'rgba(255,255,255,0.55)',
        transition: 'all 0.3s ease',
      }}>
        {ICONS[service.icon]}
      </div>

      {/* Title */}
      <h3 style={{
        color: hovered ? O : 'white',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '1rem', fontWeight: 700, marginBottom: '10px',
        transition: 'color 0.3s ease',
      }}>
        {service.title}
      </h3>

      {/* Description */}
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.7, marginBottom: '20px', fontFamily: "'Inter', sans-serif" }}>
        {service.description}
      </p>

      {/* Feature list */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {service.features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.38)', fontFamily: "'Inter', sans-serif" }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: O, flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>

      {/* Bottom label */}
      <div style={{
        marginTop: '24px', paddingTop: '18px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', gap: '6px',
        fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
        color: hovered ? O : 'rgba(255,255,255,0.25)',
        transition: 'color 0.3s ease',
        fontFamily: "'Montserrat', sans-serif",
      }}>
        View Service
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} style={{ position: 'relative', padding: 'clamp(80px,12vw,140px) 0', overflow: 'hidden' }}>
      {/* BG accent */}
      <div style={{ position: 'absolute', top: '50%', left: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,31,0.05) 0%, transparent 70%)', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="orange-line" />
            <span style={{ color: O, fontSize: '11px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>What We Do</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900, lineHeight: 0.95, color: 'white', margin: '12px 0 16px' }}>
            OUR <span className="gradient-text">SERVICES.</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Everything your brand needs to dominate the digital landscape — under one roof.
          </motion.p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
