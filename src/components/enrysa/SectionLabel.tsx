'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useMemo } from 'react'

interface SectionLabelProps {
  number: string
  label: string
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reducedMotion = useReducedMotion()

  const initial = useMemo(
    () => (reducedMotion ? {} : { opacity: 0, x: -20 }),
    [reducedMotion]
  )

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-4 mb-12 md:mb-16"
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0 } : initial}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="w-px h-8 bg-white/10" />
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#71717A] font-medium tabular-nums">
          {number}
        </span>
        <span className="text-white/10">/</span>
        <span className="text-xs uppercase tracking-[0.2em] text-[#71717A] font-medium">
          {label}
        </span>
      </div>
    </motion.div>
  )
}