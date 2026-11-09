import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onFinish }) {
  const [phase, setPhase] = useState('in') // in | out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 2200)
    const t2 = setTimeout(() => onFinish(), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onFinish])

  const letters = 'BOL BRAND'.split('')

  return (
    <AnimatePresence>
      {phase === 'in' && (
        <motion.div
          key="loader"
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* BG radial glow */}
          <motion.div
            style={{
              position: 'absolute',
              width: '600px', height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,90,31,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />

          {/* Logo letters */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center' }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3rem, 10vw, 6rem)',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  display: 'inline-block',
                  color: i >= 4 ? '#FF5A1F' : 'white',
                  minWidth: letter === ' ' ? '20px' : 'auto',
                  color: letter === ' ' ? 'transparent' : (i >= 4 ? '#FF5A1F' : 'white'),
                }}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.33, 1, 0.68, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            style={{
              position: 'relative', zIndex: 10,
              marginTop: '12px',
              color: '#FF5A1F',
              fontSize: '11px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Creative Digital Agency
          </motion.p>

          {/* Progress bar */}
          <div style={{
            position: 'absolute', bottom: '48px', left: '50%', transform: 'translateX(-50%)',
            width: '160px', height: '1px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
            borderRadius: '1px',
          }}>
            <motion.div
              style={{ height: '100%', background: '#FF5A1F' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.1, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
