'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/enrysa/SectionLabel'
import { AnimatedText } from '@/components/enrysa/AnimatedText'

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'We identify the product or opportunity.' },
  { num: '02', title: 'SOURCE', desc: 'We connect with suitable suppliers and product channels.' },
  { num: '03', title: 'COORDINATE', desc: 'We organize procurement and trade requirements.' },
  { num: '04', title: 'MOVE', desc: 'Products begin their journey from China.' },
  { num: '05', title: 'DELIVER', desc: 'The connection reaches Bangladesh.' },
]

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.45'],
  })

  const progressX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const progressY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const stepIndex = Math.min(
      Math.floor(latest * steps.length),
      steps.length - 1
    )
    setActiveStep(stepIndex)
  })

  return (
    <section id="process" className="py-32 md:py-40 px-6 bg-[#000000]" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="03" label="THE SYSTEM" />

        <AnimatedText>
          <h2 className="text-white font-bold text-4xl md:text-6xl tracking-[-0.02em] leading-[1.05]">
            <span>FROM SOURCE</span>
            <br />
            <span>TO DESTINATION.</span>
          </h2>
        </AnimatedText>

        {/* Desktop horizontal timeline */}
        <div className="mt-20 hidden md:block">
          <div className="relative px-2 lg:px-6">
            {/* The horizontal line */}
            <div className="relative h-px bg-white/[0.08]">
              {/* Progress fill */}
              {!reducedMotion && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white/40 origin-left"
                  style={{ scaleX: scrollYProgress }}
                />
              )}
              {reducedMotion && (
                <div className="absolute top-0 left-0 h-full w-full bg-white/40" />
              )}
              {/* Glowing dot */}
              {!reducedMotion && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white"
                  style={{
                    left: progressX,
                    boxShadow: '0 0 12px rgba(255,255,255,0.5), 0 0 24px rgba(255,255,255,0.2)',
                  }}
                />
              )}
            </div>

            {/* Steps */}
            <div className="flex justify-between mt-8">
              {steps.map((step, i) => {
                const isReached = i <= activeStep
                const isCurrent = i === activeStep
                return (
                  <motion.div
                    key={step.num}
                    className="relative flex flex-col items-center text-center"
                    style={{ width: `${100 / steps.length}%` }}
                    initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.3 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Connector dot on the line */}
                    <div
                      className="absolute -top-[0.65rem] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-700"
                      style={{
                        backgroundColor: isReached
                          ? 'rgba(255,255,255,0.6)'
                          : 'rgba(255,255,255,0.1)',
                        boxShadow: isCurrent
                          ? '0 0 8px rgba(255,255,255,0.4)'
                          : 'none',
                      }}
                    />

                    <span
                      className="text-3xl font-bold font-cinzel transition-all duration-700"
                      style={{
                        color: isReached
                          ? 'rgba(255,255,255,0.3)'
                          : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      className="text-sm uppercase tracking-[0.15em] mt-2 font-medium transition-colors duration-700"
                      style={{
                        color: isReached
                          ? 'rgba(255,255,255,1)'
                          : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {step.title}
                    </span>
                    <span
                      className="text-xs mt-1 max-w-[140px] leading-relaxed transition-colors duration-700"
                      style={{
                        color: isReached
                          ? 'rgba(161,161,170,1)'
                          : 'rgba(113,113,122,0.6)',
                      }}
                    >
                      {step.desc}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="mt-16 md:hidden">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.08]">
              {!reducedMotion && (
                <motion.div
                  className="absolute top-0 left-0 w-full bg-white/40 origin-top"
                  style={{ scaleY: scrollYProgress }}
                />
              )}
              {reducedMotion && (
                <div className="absolute top-0 left-0 w-full h-full bg-white/40" />
              )}
              {!reducedMotion && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                  style={{
                    top: progressY,
                    boxShadow: '0 0 8px rgba(255,255,255,0.4)',
                  }}
                />
              )}
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-10">
              {steps.map((step, i) => {
                const isReached = i <= activeStep
                return (
                  <motion.div
                    key={step.num}
                    className="relative"
                    initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Dot on the line */}
                    <div
                      className="absolute -left-8 top-1.5 w-1.5 h-1.5 rounded-full -translate-x-1/2 transition-all duration-700"
                      style={{
                        backgroundColor: isReached
                          ? 'rgba(255,255,255,0.6)'
                          : 'rgba(255,255,255,0.15)',
                      }}
                    />

                    <span
                      className="text-2xl font-bold font-cinzel transition-colors duration-700"
                      style={{
                        color: isReached
                          ? 'rgba(255,255,255,0.25)'
                          : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      className="text-sm uppercase tracking-[0.15em] mt-1 block font-medium transition-colors duration-700"
                      style={{
                        color: isReached
                          ? 'rgba(255,255,255,1)'
                          : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {step.title}
                    </span>
                    <span
                      className="text-xs mt-1 leading-relaxed transition-colors duration-700"
                      style={{
                        color: isReached
                          ? 'rgba(161,161,170,1)'
                          : 'rgba(113,113,122,0.6)',
                      }}
                    >
                      {step.desc}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}