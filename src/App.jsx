import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useCustomCursor } from './hooks/useCustomCursor'

function AppContent() {
  const { dotRef, ringRef } = useCustomCursor()
  return (
    <>
      {/* Custom cursor — only shown on desktop via CSS */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyUs />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loader" onFinish={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AppContent />
        </motion.div>
      )}
    </>
  )
}
