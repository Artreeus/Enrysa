'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { MagneticButton } from './MagneticButton'

const headlineWords = ['TRADE', 'WITHOUT', 'BORDERS.']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobileRef = useRef(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const springX = useSpring(parallaxX, { damping: 30, stiffness: 100 })
  const springY = useSpring(parallaxY, { damping: 30, stiffness: 100 })

  useEffect(() => {
    const update = () => {
      isMobileRef.current = window.innerWidth < 768
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let animId: number

    interface Particle {
      x: number
      y: number
      size: number
      opacity: number
      speedX: number
      speedY: number
    }

    let particles: Particle[] = []

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createParticles = () => {
      const isMobile = window.innerWidth < 768
      const count = isMobile ? 80 : 200
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          speedX: Math.random() * 0.3 + 0.1,
          speedY: (Math.random() - 0.5) * 0.15,
        })
      }
    }

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      ctx.clearRect(0, 0, rect.width, rect.height)

      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.speedX
          p.y += p.speedY
        }

        if (p.x > rect.width + 10) {
          p.x = -10
          p.y = Math.random() * rect.height
        }
        if (p.y < -10 || p.y > rect.height + 10) {
          p.y = Math.random() * rect.height
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    const handleResize = () => {
      resize()
      createParticles()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Mouse parallax for headline
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const maxShift = 10
        parallaxX.set(
          ((e.clientX - centerX) / (rect.width / 2)) * maxShift
        )
        parallaxY.set(
          ((e.clientY - centerY) / (rect.height / 2)) * maxShift
        )
      }
    },
    [parallaxX, parallaxY]
  )

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Above headline */}
        <motion.span
          className="font-cinzel text-xs tracking-[0.3em] text-[#71717A] uppercase mb-8"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          ENRYSA
        </motion.span>

        {/* Main headline with parallax */}
        <motion.div
          className="flex flex-col items-center"
          style={
            prefersReducedMotion
              ? undefined
              : { x: springX, y: springY }
          }
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              className="text-white font-bold tracking-[-0.03em] text-[40px] sm:text-[56px] md:text-[80px] leading-[0.9] block"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 30, filter: 'blur(10px)' }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 1,
                delay: prefersReducedMotion ? 0 : 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-[#A1A1AA] text-base md:text-lg max-w-xl text-center mt-8 leading-relaxed"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1,
            delay: prefersReducedMotion ? 0 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          ENRYSA connects businesses and consumers in Bangladesh with products,
          suppliers, and opportunities across China.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            delay: prefersReducedMotion ? 0 : 1.0,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <MagneticButton
            href="#capabilities"
            className="inline-flex items-center justify-center bg-white text-black px-8 py-3 text-xs uppercase tracking-[0.15em] rounded-sm font-medium hover:bg-white/90 transition-colors min-h-[44px]"
            data-cursor="open"
          >
            START SOURCING
          </MagneticButton>
          <a
            href="#trade-connection"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 text-xs uppercase tracking-[0.15em] rounded-sm border border-white/20 text-white hover:bg-white/5 transition-colors duration-300"
            data-cursor="explore"
          >
            EXPLORE ENRYSA
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1,
          delay: prefersReducedMotion ? 0 : 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-3 bg-white/60"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, 48, 0],
                    opacity: [1, 0.3, 0],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, 4, 0],
                  opacity: [0.6, 1, 0.6],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </section>
  )
}