'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { AnimatedText } from './AnimatedText'

const pipelineSteps = ['SOURCE', 'VERIFY', 'PROCURE', 'MOVE', 'DELIVER']

export default function TradeConnection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineScaleX = useTransform(scrollYProgress, [0.15, 0.5], [0, 1])
  const lineScaleY = useTransform(scrollYProgress, [0.15, 0.5], [0, 1])

  const [linePct, setLinePct] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.min(Math.max((latest - 0.15) / 0.35, 0), 1)
    setLinePct(clamped)
  })

  return (
    <section
      id="trade-connection"
      ref={sectionRef}
      className="bg-[#050505] py-32 md:py-40 px-6"
    >
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel number="01" label="THE CONNECTION" />

        <AnimatedText as="h2" className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.1]">
          <span className="block">TWO MARKETS.</span>
          <span className="block">ONE NETWORK.</span>
        </AnimatedText>

        <AnimatedText delay={0.2} className="text-[#A1A1AA] text-lg max-w-2xl mt-8 leading-relaxed">
          From China&apos;s manufacturing ecosystem to Bangladesh&apos;s growing
          market, ENRYSA builds the connection between supply and demand.
        </AnimatedText>

        {/* Interactive visual */}
        <div className="mt-16 md:mt-24">
          {/* Desktop horizontal layout */}
          <div className="hidden md:block relative">
            <div className="relative h-px bg-white/[0.08] mx-16 lg:mx-24">
              {/* Animated progress line */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-white/30 origin-left"
                style={{ scaleX: prefersReducedMotion ? 1 : lineScaleX }}
              />

              {/* Moving dot along the line */}
              {!prefersReducedMotion && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                  style={{
                    left: `${linePct * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                    transition: 'left 0.1s linear',
                  }}
                />
              )}

              {/* Pipeline step labels */}
              <div className="absolute -top-8 left-0 right-0 flex justify-between">
                {pipelineSteps.map((step, i) => (
                  <motion.span
                    key={step}
                    className="text-[10px] uppercase tracking-[0.2em] text-white/40"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 5 }
                    }
                    animate={
                      isInView
                        ? { opacity: 1, y: 0 }
                        : prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: 5 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: prefersReducedMotion ? 0 : 0.3 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {step}
                  </motion.span>
                ))}
              </div>

              {/* Flowing dots along the line */}
              {pipelineSteps.map((_, i) => {
                const position = ((i + 0.5) / pipelineSteps.length) * 100
                return (
                  <motion.div
                    key={`dot-${i}`}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/20"
                    style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
                    animate={
                      prefersReducedMotion
                        ? { scale: 1, opacity: 0.2 }
                        : {
                            scale: [1, 1.8, 1],
                            opacity: [0.2, 0.6, 0.2],
                          }
                    }
                    transition={{
                      duration: 2.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )
              })}
            </div>

            {/* Endpoint labels */}
            <div className="flex justify-between mt-10">
              <motion.span
                className="text-xs uppercase tracking-[0.3em] text-[#71717A]"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, x: -15 }
                }
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, x: -15 }
                }
                transition={{
                  duration: 0.8,
                  delay: prefersReducedMotion ? 0 : 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                CHINA
              </motion.span>
              <motion.span
                className="text-xs uppercase tracking-[0.3em] text-[#71717A]"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, x: 15 }
                }
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, x: 15 }
                }
                transition={{
                  duration: 0.8,
                  delay: prefersReducedMotion ? 0 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                BANGLADESH
              </motion.span>
            </div>
          </div>

          {/* Mobile vertical layout */}
          <div className="md:hidden relative px-4">
            <div className="relative w-px h-[400px] bg-white/[0.08] mx-auto">
              {/* Vertical progress line */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-white/30 origin-top"
                style={{ scaleY: prefersReducedMotion ? 1 : lineScaleY }}
              />

              {/* Moving dot */}
              {!prefersReducedMotion && (
                <div
                  className="absolute left-1/2 w-2 h-2 rounded-full bg-white"
                  style={{
                    top: `${linePct * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                    transition: 'top 0.1s linear',
                  }}
                />
              )}

              {/* Pipeline step labels */}
              <div className="absolute top-0 bottom-0 left-4 flex flex-col justify-between py-4">
                {pipelineSteps.map((step, i) => (
                  <motion.span
                    key={step}
                    className="text-[10px] uppercase tracking-[0.2em] text-white/40"
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, x: 5 }
                    }
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, x: 5 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: prefersReducedMotion ? 0 : 0.3 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {step}
                  </motion.span>
                ))}
              </div>

              {/* Flowing dots */}
              {pipelineSteps.map((_, i) => {
                const position = ((i + 0.5) / pipelineSteps.length) * 100
                return (
                  <motion.div
                    key={`mdot-${i}`}
                    className="absolute left-1/2 w-1.5 h-1.5 rounded-full bg-white/20"
                    style={{ top: `${position}%`, transform: 'translate(-50%, 0)' }}
                    animate={
                      prefersReducedMotion
                        ? { scale: 1, opacity: 0.2 }
                        : {
                            scale: [1, 1.8, 1],
                            opacity: [0.2, 0.6, 0.2],
                          }
                    }
                    transition={{
                      duration: 2.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )
              })}
            </div>

            {/* Endpoint labels */}
            <div className="flex justify-between mt-6">
              <motion.span
                className="text-xs uppercase tracking-[0.3em] text-[#71717A]"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 10 }
                }
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: 0.8,
                  delay: prefersReducedMotion ? 0 : 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                CHINA
              </motion.span>
              <motion.span
                className="text-xs uppercase tracking-[0.3em] text-[#71717A]"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 10 }
                }
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: 0.8,
                  delay: prefersReducedMotion ? 0 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                BANGLADESH
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}