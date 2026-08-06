'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    // Animate percentage counter from 0 to 100
    const duration = 1600
    const intervalTime = 20
    const steps = duration / intervalTime
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const nextProgress = Math.min(100, Math.round((currentStep / steps) * 100))
      setProgress(nextProgress)

      if (currentStep >= steps) {
        clearInterval(interval)
        setTimeout(() => {
          setIsLoading(false)
        }, 200)
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reducedMotion ? 1 : 1.03,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto overflow-hidden"
        >
          {/* Deep Ambient Glow (No harsh border circles) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.95)_70%)] pointer-events-none" />

          {/* Subtle Grid Backdrop Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Central Content */}
          <div className="relative flex flex-col items-center justify-center z-10">
            {/* Logo Wrapper with Dynamic Ambient Glow */}
            <motion.div
              initial={reducedMotion ? {} : { scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center p-6"
            >
              {/* Soft Light Pulse behind Logo */}
              <motion.div
                animate={
                  reducedMotion
                    ? {}
                    : {
                        opacity: [0.3, 0.7, 0.3],
                        scale: [0.95, 1.1, 0.95],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-40 h-40 md:w-52 md:h-52 bg-white/10 blur-3xl rounded-full pointer-events-none"
              />

              {/* Logo Image */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]">
                <Image
                  src="/enrysa-icon.png"
                  alt="ENRYSA"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Brand Title & Status */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-center"
            >
              <h1 className="text-white font-bold text-xl md:text-2xl tracking-[0.35em] uppercase font-sans">
                ENRYSA
              </h1>
              <p className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-mono mt-2">
                Global Trade Infrastructure
              </p>
            </motion.div>

            {/* Tech Progress Bar & Counter */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-2"
            >
              {/* Minimal Line Bar */}
              <div className="w-48 md:w-64 h-[2px] bg-zinc-900 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-zinc-600 via-white to-zinc-300 transition-all duration-75 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Percentage Display */}
              <div className="flex items-center justify-between w-48 md:w-64 text-[10px] font-mono text-zinc-500 tracking-wider">
                <span>SYSTEM INIT</span>
                <span className="text-zinc-300 font-semibold">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
