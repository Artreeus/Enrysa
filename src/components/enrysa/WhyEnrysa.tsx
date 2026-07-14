'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/enrysa/SectionLabel'
import { AnimatedText } from '@/components/enrysa/AnimatedText'

const statements = [
  { word: 'ACCESS', desc: 'Reach beyond local market limitations.' },
  { word: 'CONNECTION', desc: 'Bridge suppliers, products, businesses, and consumers.' },
  { word: 'COORDINATION', desc: 'Bring complex trade processes into a clearer system.' },
  { word: 'OPPORTUNITY', desc: 'Turn global product access into business possibilities.' },
]

function StatementItem({
  statement,
  index,
  scrollYProgress,
}: {
  statement: { word: string; desc: string }
  index: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const segmentCount = statements.length
  const segmentSize = 1 / segmentCount

  const start = index * segmentSize
  const end = start + segmentSize
  const mid = start + segmentSize / 2

  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - segmentSize * 0.5),
      start + segmentSize * 0.2,
      end - segmentSize * 0.2,
      Math.min(1, end + segmentSize * 0.5),
    ],
    [0, 1, 1, 0]
  )

  const blur = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - segmentSize * 0.5),
      start + segmentSize * 0.2,
      end - segmentSize * 0.2,
      Math.min(1, end + segmentSize * 0.5),
    ],
    [8, 0, 0, 8]
  )

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - segmentSize * 0.5),
      start + segmentSize * 0.2,
      end - segmentSize * 0.2,
      Math.min(1, end + segmentSize * 0.5),
    ],
    [0.92, 1, 1, 0.92]
  )

  const y = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - segmentSize * 0.3),
      mid,
      Math.min(1, end + segmentSize * 0.3),
    ],
    [40, 0, -40]
  )

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, filter: blur, scale, y }}
    >
      <h3
        className="text-4xl md:text-6xl lg:text-[120px] font-bold text-white tracking-[-0.03em] leading-none"
      >
        {statement.word}
      </h3>
      <p className="text-lg md:text-xl text-[#A1A1AA] max-w-lg mt-4 leading-relaxed">
        {statement.desc}
      </p>
    </motion.div>
  )
}

export function WhyEnrysa() {
  const containerRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  if (reducedMotion) {
    return (
      <section id="why-enrysa" className="py-32 md:py-48 px-6 bg-black" ref={containerRef}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel number="04" label="WHY ENRYSA" />
          <AnimatedText as="h2" className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-16">
            BEYOND
            <br />
            IMPORTING.
          </AnimatedText>
          <div className="space-y-16">
            {statements.map((statement) => (
              <div key={statement.word}>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] leading-none">
                  {statement.word}
                </h3>
                <p className="text-lg md:text-xl text-[#A1A1AA] max-w-lg mt-4 leading-relaxed">
                  {statement.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="why-enrysa"
      className="py-32 md:py-48 px-6 bg-black"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="04" label="WHY ENRYSA" />
        <AnimatedText
          as="h2"
          className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-8"
        >
          BEYOND
          <br />
          IMPORTING.
        </AnimatedText>
      </div>

      <div className="relative" style={{ height: `${statements.length * 50}vh` }}>
        {statements.map((statement, index) => (
          <StatementItem
            key={statement.word}
            statement={statement}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}