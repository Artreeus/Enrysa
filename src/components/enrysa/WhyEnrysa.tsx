'use client'

import React, { useRef, useCallback, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/enrysa/SectionLabel'
import { AnimatedText } from '@/components/enrysa/AnimatedText'

const pillars = [
  {
    number: '01',
    word: 'ACCESS',
    title: 'Unrestricted Market Access',
    desc: 'Break through local supply chain limitations. We open direct channels to the world\'s most robust manufacturing ecosystems — giving you access to products, materials, and categories previously out of reach.',
    detail: 'From raw materials to finished goods, our network spans 40+ industrial hubs across international trade zones.',
  },
  {
    number: '02',
    word: 'CONNECTION',
    title: 'Bridging Two Economies',
    desc: 'We don\'t just move products — we connect suppliers, manufacturers, logistics providers, and end consumers across borders into one seamless flow of commerce.',
    detail: 'Language, currency, regulations, and distance dissolve when you have the right infrastructure behind you.',
  },
  {
    number: '03',
    word: 'COORDINATION',
    title: 'Systematized Trade Operations',
    desc: 'Cross-border trade is complex by nature. We transform that complexity into clarity — with structured processes, real-time tracking, and proactive problem resolution.',
    detail: 'From factory floor to final delivery, every step is monitored, managed, and optimized for efficiency.',
  },
  {
    number: '04',
    word: 'OPPORTUNITY',
    title: 'Turning Access Into Growth',
    desc: 'Global sourcing isn\'t just about cost — it\'s about possibility. We help you discover product categories, market gaps, and business models that transform how you compete.',
    detail: 'Our clients don\'t just import. They expand, innovate, and lead their markets with products that set them apart.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(12px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: {
      duration: 1.6,
      delay: 0.4 + i * 0.15,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
}

const numberVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.2 + i * 0.15,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
}

function PillarCard({
  pillar,
  index,
  reducedMotion,
}: {
  pillar: (typeof pillars)[number]
  index: number
  reducedMotion: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || reducedMotion) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      cardRef.current.style.setProperty('--mx', `${x}px`)
      cardRef.current.style.setProperty('--my', `${y}px`)
    },
    [reducedMotion]
  )

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mx', '50%')
      cardRef.current.style.setProperty('--my', '50%')
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      variants={reducedMotion ? undefined : cardVariants}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: false, amount: 0.2 }}
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden border border-white/[0.06] p-6 md:p-8 lg:p-10 transition-colors duration-700 hover:border-white/[0.12]"
      style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
    >
      {/* Mouse-tracking spotlight */}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
          style={{
            background:
              'radial-gradient(600px circle at var(--mx) var(--my), rgba(255,255,255,0.03), transparent 40%)',
          }}
        />
      )}

      {/* Top row: number + word */}
      <div className="relative z-10 flex items-start justify-between mb-6 md:mb-8">
        <motion.span
          variants={reducedMotion ? undefined : numberVariants}
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={{ once: false, amount: 0.2 }}
          custom={index}
          className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-white/[0.06] leading-none select-none"
        >
          {pillar.number}
        </motion.span>

        <motion.span
          variants={reducedMotion ? undefined : cardVariants}
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={{ once: false, amount: 0.2 }}
          custom={index}
          className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[-0.02em] leading-none"
        >
          {pillar.word}
        </motion.span>
      </div>

      {/* Animated divider line */}
      <motion.div
        variants={reducedMotion ? undefined : lineVariants}
        initial={reducedMotion ? false : 'hidden'}
        whileInView={reducedMotion ? undefined : 'visible'}
        viewport={{ once: false, amount: 0.2 }}
        custom={index}
        className="relative z-10 h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent origin-left mb-6 md:mb-8"
      />

      {/* Title */}
      <h3 className="relative z-10 text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 tracking-[-0.01em]">
        {pillar.title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-sm md:text-base text-[#A1A1AA] leading-relaxed mb-4 md:mb-6">
        {pillar.desc}
      </p>

      {/* Detail line */}
      <p className="relative z-10 text-xs md:text-sm text-[#71717A] leading-relaxed border-l border-white/[0.08] pl-3 md:pl-4">
        {pillar.detail}
      </p>

      {/* Corner accent on hover */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-white/20 to-transparent" />
      </div>

      {/* Bottom-left corner accent on hover */}
      <div className="absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute bottom-0 left-0 w-px h-8 bg-gradient-to-t from-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-8 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
    </motion.div>
  )
}

export function WhyEnrysa() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  return (
    <section
      id="why-enrysa"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 bg-[#050505] overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionLabel number="04" label="WHY ENRYSA" />

        <AnimatedText
          as="h2"
          className="font-cinzel text-white font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[-0.02em] mb-6 md:mb-8"
        >
          BEYOND
          <br />
          IMPORTING.
        </AnimatedText>

        <motion.p
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : reducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1] as any,
          }}
          className="text-base md:text-lg text-[#71717A] max-w-xl mb-16 md:mb-24 leading-relaxed"
        >
          ENRYSA exists at the intersection of local markets and global trade.
          We don&apos;t facilitate transactions — we build the infrastructure for
          trade to flow intelligently.
        </motion.p>

        {/* 2x2 Grid with centered ENRYSA watermark */}
        <div className="relative">
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          >
            <span className="font-cinzel text-[120px] md:text-[200px] lg:text-[260px] font-bold text-white/[0.07] leading-none whitespace-nowrap">
              ENRYSA
            </span>
          </motion.div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            {pillars.map((pillar, index) => (
              <PillarCard
                key={pillar.word}
                pillar={pillar}
                index={index}
                reducedMotion={!!reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1] as any,
          }}
          className="mt-16 md:mt-24 border-t border-white/[0.06] pt-10 md:pt-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {[
            { value: '40+', label: 'Industrial Hubs' },
            { value: '2', label: 'Connected Economies' },
            { value: '500+', label: 'Verified Suppliers' },
            { value: '24/7', label: 'Trade Operations' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[-0.02em] mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-[#71717A] uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}