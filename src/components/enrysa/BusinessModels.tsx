'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const b2bCategories = [
  'Retailers',
  'Wholesalers',
  'Brands',
  'Entrepreneurs',
  'Corporate Procurement',
]

function B2CParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const dots: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = []
    const DOT_COUNT = 40

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
    }

    const init = () => {
      resize()
      dots.length = 0
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      for (let i = 0; i < DOT_COUNT; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.12 + 0.03,
        })
      }
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.x < 0 || dot.x > w) dot.vx *= -1
        if (dot.y < 0 || dot.y > h) dot.vy *= -1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${dot.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: reducedMotion ? 0 : 1 }}
    />
  )
}

export function BusinessModels() {
  const [hoveredSide, setHoveredSide] = useState<'b2b' | 'b2c' | null>(null)
  const reducedMotion = useReducedMotion()

  const getFlex = (side: 'b2b' | 'b2c') => {
    if (hoveredSide === side) return '1.1'
    if (hoveredSide === 'b2b' || hoveredSide === 'b2c') return '0.9'
    return '1'
  }

  return (
    <section
      id="business-models"
      className="flex flex-col md:flex-row min-h-screen"
    >
      {/* B2B Side */}
      <motion.div
        className="relative flex flex-col justify-center p-10 md:p-16 min-h-[50vh] md:min-h-screen border-b md:border-b-0 md:border-r border-white/[0.06] bg-[#0A0A0A]"
        style={{
          flex: getFlex('b2b'),
          transition: reducedMotion
            ? 'none'
            : 'flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        initial={reducedMotion ? {} : { opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHoveredSide('b2b')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#71717A] mb-4 block">
            B2B
          </span>
          <h2 className="text-white font-bold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1]">
            BUILT FOR
            <br />
            BUSINESS.
          </h2>
          <p className="text-[#A1A1AA] text-base mt-6 max-w-md leading-relaxed">
            Enterprise-grade procurement and supply chain solutions designed
            for businesses that need reliable cross-border operations at scale.
          </p>

          <div className="mt-8 space-y-0">
            {b2bCategories.map((cat, i) => (
              <motion.div
                key={cat}
                className="text-sm text-white/60 py-2 border-b border-white/[0.04]"
                initial={reducedMotion ? {} : { opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {cat}
              </motion.div>
            ))}
          </div>

          <motion.button
            className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white group cursor-pointer"
            initial={reducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ x: 4 }}
          >
            EXPLORE B2B
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>
        </div>
      </motion.div>

      {/* B2C Side */}
      <motion.div
        className="relative flex flex-col justify-center p-10 md:p-16 min-h-[50vh] md:min-h-screen bg-[#050505]"
        style={{
          flex: getFlex('b2c'),
          transition: reducedMotion
            ? 'none'
            : 'flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        initial={reducedMotion ? {} : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => setHoveredSide('b2c')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <B2CParticles />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#71717A] mb-4 block">
            B2C
          </span>
          <h2 className="text-white font-bold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1]">
            ACCESS
            <br />
            MORE.
          </h2>
          <p className="text-[#A1A1AA] text-base mt-6 max-w-md leading-relaxed">
            Breaking down borders for consumers. Access products, brands,
            and opportunities previously limited by geography and
            distribution.
          </p>

          <motion.button
            className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white group cursor-pointer"
            initial={reducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ x: 4 }}
          >
            EXPLORE B2C
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}