import { motion } from 'framer-motion'
import { BRAND, NAV_LINKS, SERVICES } from '../data/siteData'

const O = '#FF5A1F'

const SocialIcon = ({ href, label, children, external = true }) => (
  <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
    aria-label={label}
    style={{
      width: '40px', height: '40px', borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.08)',
      background: 'rgba(255,255,255,0.03)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
      transition: 'all 0.25s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,90,31,0.5)'; e.currentTarget.style.color = O; e.currentTarget.style.background = 'rgba(255,90,31,0.08)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
  >
    {children}
  </a>
)

const NavLink = ({ label, onClick }) => (
  <button onClick={onClick}
    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: "'Inter', sans-serif", cursor: 'pointer', textAlign: 'left', padding: 0, transition: 'color 0.25s ease', display: 'block' }}
    onMouseEnter={e => e.currentTarget.style.color = O}
    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
  >
    {label}
  </button>
)

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const nav = (id) => document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(255,90,31,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 24px 40px', position: 'relative', zIndex: 2 }}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', paddingBottom: '56px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

          {/* Brand col */}
          <div>
            <button onClick={scrollTop} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', fontWeight: 900, letterSpacing: '0.15em', color: 'white' }}>BOL</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', fontWeight: 900, letterSpacing: '0.15em', color: O }}>BRAND</span>
            </button>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', lineHeight: 1.75, marginBottom: '24px', fontFamily: "'Inter', sans-serif" }}>
              {BRAND.description}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <SocialIcon href={BRAND.instagram} label="Instagram">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </SocialIcon>
              <SocialIcon href={BRAND.linkedin} label="LinkedIn">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </SocialIcon>
              <SocialIcon href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g,'')}`} label="WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </SocialIcon>
              <SocialIcon href={`mailto:${BRAND.email}`} label="Email" external={false}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: 'white', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {NAV_LINKS.map(l => <NavLink key={l.href} label={l.label} onClick={() => nav(l.href)} />)}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: 'white', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SERVICES.map(s => <NavLink key={s.id} label={s.title} onClick={() => nav('#services')} />)}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontFamily: "'Montserrat', sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {[
                { icon: <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, href: `mailto:${BRAND.email}`, label: BRAND.email },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, href: `https://wa.me/${BRAND.whatsapp.replace(/\D/g,'')}`, label: BRAND.whatsapp },
                { icon: <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, href: BRAND.instagram, label: '@bolbrand_' },
              ].map(item => (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none', fontFamily: "'Inter', sans-serif", transition: 'color 0.25s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = O} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                  <span style={{ color: O }}>{item.icon}</span> {item.label}
                </a>
              ))}
            </div>
            <button className="btn-orange" style={{ width: '100%', justifyContent: 'center' }} onClick={() => nav('#contact')}>
              Start a Project
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} BOL BRAND. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
            Designed & Built by BOL BRAND
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollTop}
        aria-label="Back to top"
        style={{
          position: 'fixed', bottom: '28px', right: '28px', zIndex: 40,
          width: '48px', height: '48px', borderRadius: '50%',
          background: O, border: 'none', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(255,90,31,0.4)',
          cursor: 'pointer',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1, boxShadow: '0 12px 32px rgba(255,90,31,0.5)' }}
        whileTap={{ scale: 0.93 }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </footer>
  )
}
