'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Globe2, ShieldCheck } from 'lucide-react'

export function BrandShowcaseCard() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative bg-black py-16 md:py-24 px-6 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-zinc-800/20 via-white/5 to-zinc-800/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-black backdrop-blur-xl p-8 md:p-14 overflow-hidden transition-all duration-700 hover:border-white/25 hover:shadow-[0_0_50px_rgba(255,255,255,0.06)]"
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] tracking-[0.2em] text-zinc-400 font-mono uppercase">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                <span>OFFICIAL BRAND MARK</span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Architecting the Future of Cross-Border Trade
              </h3>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
                ENRYSA bridges businesses and consumers in Bangladesh with verified suppliers and markets across the globe through unified digital commerce infrastructure.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-mono">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-zinc-400" />
                  <span>GLOBAL REACH</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                  <span>ENTERPRISE GRADE</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Logo Container */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent border border-white/10 transition-all duration-700 group-hover:border-white/30 group-hover:bg-white/[0.06] group-hover:scale-[1.03]">
                {/* Dynamic Aura Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Logo Image with Monochrome to Color Hover Transition */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 transition-all duration-700 filter grayscale contrast-125 brightness-110 group-hover:filter-none group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">
                  <Image
                    src="/enrysa-icon.png"
                    alt="ENRYSA Official Brand Icon"
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <span className="mt-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono transition-colors duration-500 group-hover:text-zinc-300">
                Hover to unveil original brand mark
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
