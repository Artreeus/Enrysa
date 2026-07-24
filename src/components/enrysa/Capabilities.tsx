'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/enrysa/SectionLabel'
import { AnimatedText } from '@/components/enrysa/AnimatedText'

const services = [
  {
    number: '01',
    title: 'PRODUCT SOURCING',
    description:
      'Find products and manufacturing opportunities across the global supplier ecosystem.',
  },
  {
    number: '02',
    title: 'IMPORT SOLUTIONS',
    description:
      'Coordinate the journey of products from worldwide markets into Bangladesh.',
  },
  {
    number: '03',
    title: 'B2B PROCUREMENT',
    description:
      'Reliable sourcing and supply solutions designed for businesses, retailers, and growing brands.',
  },
  {
    number: '04',
    title: 'B2C COMMERCE',
    description:
      'Giving consumers access to products and opportunities beyond local market limitations.',
  },
  {
    number: '05',
    title: 'SUPPLIER CONNECTION',
    description:
      'Connect with manufacturing and supplier networks across the globe.',
  },
  {
    number: '06',
    title: 'TRADE COORDINATION',
    description:
      'From sourcing to delivery, ENRYSA helps coordinate the moving parts of cross-border commerce.',
  },
]

function ServiceCard({
  number,
  title,
  description,
  index,
}: {
  number: string
  title: string
  description: string
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const reducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden bg-[#0A0A0A] border border-white/[0.06] p-8 rounded-sm cursor-default"
      style={{
        transition: reducedMotion ? 'none' : 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      initial={reducedMotion ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseOver={(e) => {
        if (!reducedMotion) {
          ;(e.currentTarget as HTMLElement).style.borderColor =
            'rgba(255,255,255,0.15)'
        }
      }}
      onMouseOut={(e) => {
        if (!reducedMotion) {
          ;(e.currentTarget as HTMLElement).style.borderColor =
            'rgba(255,255,255,0.06)'
        }
      }}
    >
      {/* Spotlight radial gradient following cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04), transparent 60%)`,
        }}
      />

      {/* Top sweep line on hover */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{
          scaleX: isHovered ? 1 : 0,
          originX: isHovered ? 0 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ width: '100%' }}
      />

      {/* Large background number */}
      <div className="absolute top-4 right-6 text-6xl font-bold text-white/[0.03] font-cinzel select-none pointer-events-none">
        {number}
      </div>

      {/* Content */}
      <div className="relative z-20">
        <h3 className="text-lg md:text-xl uppercase tracking-[0.1em] text-white font-semibold mt-2">
          {title}
        </h3>
        <p className="text-sm text-[#A1A1AA] mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export function Capabilities() {
  return (
    <section id="capabilities" className="py-32 md:py-40 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="02" label="WHAT WE DO" />

        <AnimatedText>
          <h2 className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.05]">
            <span>COMMERCE.</span>
            <br />
            <span>ENGINEERED.</span>
          </h2>
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              number={service.number}
              title={service.title}
              description={service.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}