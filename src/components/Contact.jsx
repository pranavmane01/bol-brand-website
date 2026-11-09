import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BRAND, SERVICES } from '../data/siteData'

const O = '#FF5A1F'

const INITIAL_FORM = { name: '', email: '', phone: '', company: '', service: '', message: '' }

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | drafted

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.service) e.service = 'Please select a service'
    if (!form.message.trim()) e.message = 'Please describe your project'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent(`Project enquiry from ${form.name.trim()}`)
    const body = encodeURIComponent([
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim() || 'Not provided'}`,
      `Company: ${form.company.trim() || 'Not provided'}`,
      `Service: ${form.service}`,
      '',
      form.message.trim(),
    ].join('\n'))

    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`
    setStatus('drafted')
  }

  const inputStyle = (field) => ({
    width: '100%',
    background: errors[field] ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px', padding: '14px 18px',
    color: 'white', fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none', transition: 'border-color 0.3s ease, background 0.3s ease',
  })

  const ContactInfo = ({ icon, label, value, href, external }) => (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', transition: 'all 0.3s ease' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,90,31,0.3)'; e.currentTarget.style.background = 'rgba(255,90,31,0.04)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
    >
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,90,31,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: O, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>{label}</div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>{value}</div>
      </div>
    </a>
  )

  return (
    <section id="contact" ref={ref} style={{ position: 'relative', padding: 'clamp(80px,12vw,140px) 0', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 60%, rgba(255,90,31,0.05) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 72px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span style={{ color: O, fontSize: '11px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>Get In Touch</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.4rem,6.5vw,5rem)', fontWeight: 900, lineHeight: 0.95, color: 'white', marginTop: '12px', marginBottom: '16px' }}>
            LET'S CREATE SOMETHING<br /><span className="gradient-text">UNFORGETTABLE.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', fontFamily: "'Inter', sans-serif" }}>
            Have a business idea? Let's turn it into a powerful digital brand.
          </motion.p>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>

          {/* Left — contact info */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div className="glass" style={{ borderRadius: '20px', padding: '32px' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: 'white', marginBottom: '24px', letterSpacing: '0.08em' }}>CONTACT INFO</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <ContactInfo href={`mailto:${BRAND.email}`} label="Email" value={BRAND.email}
                  icon={<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                />
                <ContactInfo href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g,'')}`} external label="WhatsApp" value={BRAND.whatsapp}
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>}
                />
                <ContactInfo href={BRAND.instagram} external label="Instagram" value="@bolbrand_"
                  icon={<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>}
                />
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g,'')}?text=Hi%20BOL%20BRAND%2C%20I%27d%20like%20to%20discuss%20a%20project.`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '16px 24px', borderRadius: '14px',
                background: '#25D366', color: 'white',
                fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
                textDecoration: 'none', border: 'none',
                boxShadow: '0 8px 32px rgba(37,211,102,0.25)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="glass" style={{ borderRadius: '20px', padding: 'clamp(28px,5vw,44px)' }}>
              {status === 'drafted' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,90,31,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={O} strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', color: 'white', marginBottom: '12px', letterSpacing: '0.08em' }}>EMAIL DRAFT READY</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', maxWidth: '300px', lineHeight: 1.7, marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>
                    Your email app should open with your enquiry ready to send. Please send it there to complete your message.
                  </p>
                  <p style={{ color: 'rgba(255,90,31,0.7)', fontSize: '12px', marginBottom: '28px', fontFamily: "'Inter', sans-serif" }}>
                    If no email app opened, contact us at <a href={`mailto:${BRAND.email}`} style={{ color: 'inherit' }}>{BRAND.email}</a>.
                  </p>
                  <button className="btn-orange" onClick={() => setStatus('idle')}>Prepare Another Email</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px' }}>
                    <div>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" style={inputStyle('name')}
                        onFocus={e => e.target.style.borderColor = O} onBlur={e => e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'} />
                      {errors.name && <p style={{ color: '#F87171', fontSize: '11px', marginTop: '4px', fontFamily: "'Inter', sans-serif" }}>{errors.name}</p>}
                    </div>
                    <div>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address *" style={inputStyle('email')}
                        onFocus={e => e.target.style.borderColor = O} onBlur={e => e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'} />
                      {errors.email && <p style={{ color: '#F87171', fontSize: '11px', marginTop: '4px', fontFamily: "'Inter', sans-serif" }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px' }}>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number" style={inputStyle('phone')}
                      onFocus={e => e.target.style.borderColor = O} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" style={inputStyle('company')}
                      onFocus={e => e.target.style.borderColor = O} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>

                  <div>
                    <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle('service'), appearance: 'none' }}>
                      <option value="" disabled>Required Service *</option>
                      {SERVICES.map(s => <option key={s.id} value={s.title} style={{ background: '#111' }}>{s.title}</option>)}
                      <option value="Multiple Services" style={{ background: '#111' }}>Multiple Services</option>
                      <option value="Not Sure Yet" style={{ background: '#111' }}>Not Sure Yet</option>
                    </select>
                    {errors.service && <p style={{ color: '#F87171', fontSize: '11px', marginTop: '4px', fontFamily: "'Inter', sans-serif" }}>{errors.service}</p>}
                  </div>

                  <div>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project *" rows={5}
                      style={{ ...inputStyle('message'), resize: 'none', lineHeight: 1.7 }}
                      onFocus={e => e.target.style.borderColor = O} onBlur={e => e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'} />
                    {errors.message && <p style={{ color: '#F87171', fontSize: '11px', marginTop: '4px', fontFamily: "'Inter', sans-serif" }}>{errors.message}</p>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <motion.button type="submit" className="btn-orange"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>
                      Prepare Email
                    </motion.button>
                    <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                      Opens your email app; no third-party form service or API key is needed.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
