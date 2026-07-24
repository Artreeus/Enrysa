'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export function BrandStatement() {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const firstLineOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.55], [1, 1, 0])
  const firstLineY = useTransform(scrollYProgress, [0.2, 0.45, 0.55], [0, 0, -20])

  const secondLineScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 1, 1.2])
  const secondLineOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])

  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.8], [0.02, 0.04, 0.08])
  const glowScale = useTransform(scrollYProgress, [0.1, 0.8], [1, 1.5])

  const wordmarkOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.6], [1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="min-h-[200vh] relative bg-black"
    >
      {/* Sticky viewport-height container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Animated connecting line - Global to Bangladesh */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-full h-px relative"
            style={{ opacity: glowOpacity, scale: glowScale }}
          >
            {/* Base line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {/* Pulse traveling left to right */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-32 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              }}
              animate={
                reducedMotion
                  ? {}
                  : {
                      left: ['0%', '100%'],
                      opacity: [0, 1, 1, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            {/* Glow around pulse */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-48 h-4 blur-xl"
              style={{
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.15), transparent)',
              }}
              animate={
                reducedMotion
                  ? {}
                  : {
                      left: ['-5%', '105%'],
                      opacity: [0, 0.5, 0.5, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            {/* Left endpoint dot */}
            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
            {/* Right endpoint dot */}
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
          </motion.div>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* ENRYSA wordmark */}
          <motion.span
            className="font-cinzel text-2xl md:text-3xl tracking-[0.3em] text-white/30 mb-12"
            style={reducedMotion ? {} : { opacity: wordmarkOpacity }}
          >
            ENRYSA
          </motion.span>

          {/* First sentence */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-[#A1A1AA] tracking-[0.05em] text-center"
            style={
              reducedMotion
                ? {}
                : { opacity: firstLineOpacity, y: firstLineY }
            }
          >
            WE DON&apos;T JUST MOVE PRODUCTS.
          </motion.p>

          {/* Second sentence - dramatic reveal */}
          <motion.h2
            className="text-5xl md:text-7xl lg:text-[100px] font-bold text-white tracking-[-0.03em] text-center mt-6 leading-none"
            style={
              reducedMotion
                ? {}
                : {
                    scale: secondLineScale,
                    opacity: secondLineOpacity,
                  }
            }
          >
            WE MOVE
            <br className="hidden sm:block" /> OPPORTUNITY.
          </motion.h2>
        </div>
      </div>
    </section>
  )
}