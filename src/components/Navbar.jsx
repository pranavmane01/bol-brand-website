import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/siteData'

const O = '#FF5A1F'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s ease',
        padding: scrolled ? '12px 0' : '20px 0',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <button onClick={() => handleNav('#home')} aria-label="BOL BRAND home"
          style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'none', border: 'none' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.15em', color: 'white' }}>BOL</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.15em', color: O }}>BRAND</span>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: 'none' }} className="md-nav">
          <style>{`@media(min-width:768px){.md-nav{display:flex!important;align-items:center;gap:32px}}`}</style>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  position: 'relative',
                  background: 'none', border: 'none',
                  color: isActive ? O : 'rgba(255,255,255,0.72)',
                  fontSize: '13px', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: "'Montserrat', sans-serif",
                  padding: '4px 0',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.72)' }}
              >
                {link.label}
                {/* active underline */}
                <span style={{
                  position: 'absolute', bottom: '-2px', left: 0,
                  height: '2px', width: isActive ? '100%' : '0%',
                  background: O, borderRadius: '2px',
                  transition: 'width 0.3s ease',
                }} />
              </button>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="md-cta" style={{ display: 'none' }}>
          <style>{`@media(min-width:768px){.md-cta{display:block!important}}`}</style>
          <motion.button
            onClick={() => handleNav('#contact')}
            style={{
              background: O, color: 'white',
              padding: '10px 24px', borderRadius: '4px',
              border: 'none',
              fontSize: '12px', fontWeight: 700,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif",
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 4px 24px rgba(255,90,31,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Talk
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md-hide"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', color: 'white', padding: '8px', display: 'flex' }}
        >
          <style>{`@media(min-width:768px){.md-hide{display:none!important}}`}</style>
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={24} /></motion.span>
              : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              background: 'rgba(8,8,8,0.96)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  style={{
                    textAlign: 'left', background: 'none', border: 'none',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '2rem', fontWeight: 900, letterSpacing: '0.08em',
                    color: 'white',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={e => e.currentTarget.style.color = O}
                  onMouseLeave={e => e.currentTarget.style.color = 'white'}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => handleNav('#contact')}
                style={{
                  marginTop: '8px', padding: '14px 24px',
                  background: O, color: 'white', border: 'none', borderRadius: '4px',
                  fontSize: '12px', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  fontFamily: "'Montserrat', sans-serif",
                }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              >
                Let's Talk
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
