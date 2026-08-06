'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    // Show preloader for 1.8 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reducedMotion ? 1 : 1.04,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_65%)] pointer-events-none" />

          {/* Logo Container */}
          <div className="relative flex flex-col items-center justify-center z-10">
            {/* Animated Outer Pulse Ring */}
            <motion.div
              initial={reducedMotion ? {} : { scale: 0.8, opacity: 0 }}
              animate={
                reducedMotion
                  ? { opacity: 0.2 }
                  : {
                      scale: [0.9, 1.15, 1],
                      opacity: [0.2, 0.5, 0.3],
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-sm"
            />

            {/* Logo Image */}
            <motion.div
              initial={reducedMotion ? {} : { scale: 0.7, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-24 h-24 md:w-28 md:h-28 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              <Image
                src="/enrysa-icon.png"
                alt="ENRYSA"
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Title & Status */}
            <motion.div
              initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-center"
            >
              <h1 className="text-white font-bold text-lg md:text-xl tracking-[0.3em] uppercase">
                ENRYSA
              </h1>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-[11px] tracking-[0.25em] text-zinc-400 uppercase font-mono">
                  Connecting Global Trade
                </p>
              </div>
            </motion.div>

            {/* Progress Line */}
            <motion.div
              className="w-36 h-[2px] bg-zinc-800 rounded-full mt-6 overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-zinc-500 via-white to-zinc-400"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
