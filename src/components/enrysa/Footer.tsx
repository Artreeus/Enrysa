'use client'

import { useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const navigateLinks = [
  { label: 'Trade', href: '#trade-connection' },
  { label: 'Sourcing', href: '#capabilities' },
  { label: 'B2B', href: '#business-models' },
  { label: 'B2C', href: '#business-models' },
  { label: 'Network', href: '#trade-network' },
  { label: 'About', href: '#why-enrysa' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  { label: 'Product Sourcing', href: '#capabilities' },
  { label: 'Import Solutions', href: '#capabilities' },
  { label: 'B2B Procurement', href: '#business-models' },
  { label: 'B2C Commerce', href: '#business-models' },
  { label: 'Trade Coordination', href: '#process' },
]

function RuneE({ className = '' }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 4H10V20H6V4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <path
        d="M10 4H14V10H10V4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <path
        d="M10 14H18V20H10V14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <path
        d="M14 10H18V14H14V10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

function FooterLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}) {
  return (
    <li>
      <a
        href={href}
        onClick={(e) => onClick(e, href)}
        className="text-sm text-[#71717A] hover:text-white transition-colors duration-500 py-1.5 inline-block relative group"
      >
        {children}
        <span className="absolute bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-500" />
      </a>
    </li>
  )
}

function BackToTop() {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <a
      href="#"
      onClick={handleClick}
      className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#71717A] hover:text-white transition-colors duration-500"
    >
      <span className="w-8 h-8 rounded-full border border-white/[0.15] flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-500">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 10V2M6 2L2 6M6 2L10 6" />
        </svg>
      </span>
      BACK TO TOP
    </a>
  )
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.1 })

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    []
  )

  return (
    <footer
      ref={footerRef}
      className="bg-[#000000] relative overflow-hidden border-t border-white/[0.04]"
    >
      {/* Huge faded ENRYSA watermark */}
      <motion.div
        className="font-cinzel text-[120px] sm:text-[180px] md:text-[280px] lg:text-[400px] font-bold text-white/[0.015] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none leading-none"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        ENRYSA
      </motion.div>

      {/* Top CTA band */}
      <div className="relative z-10 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.15em] text-white">
              ENRYSA
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-[#71717A] mt-2">
              GLOBAL × BANGLADESH&ensp;·&ensp;CROSS-BORDER COMMERCE
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-xs uppercase tracking-[0.15em] bg-white text-black px-8 py-3.5 rounded-sm font-medium hover:bg-white/90 transition-colors duration-500 min-h-[44px] flex items-center"
          >
            START SOURCING
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1 - Navigate */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/20" />
              Navigate
            </h3>
            <ul className="flex flex-col">
              {navigateLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} onClick={handleNavClick}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 2 - Services */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/20" />
              Services
            </h3>
            <ul className="flex flex-col">
              {serviceLinks.map((link) => (
                <FooterLink key={link.label} href={link.href} onClick={handleNavClick}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 3 - Markets */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/20" />
              Markets
            </h3>
            <ul className="flex flex-col">
              <li className="text-sm text-[#71717A] py-1.5 inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/30" />
                Bangladesh
              </li>
              <li className="text-sm text-[#71717A] py-1.5 inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/30" />
                Global Markets
              </li>
            </ul>

            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-5 mt-10 flex items-center gap-2">
              <span className="w-4 h-px bg-white/20" />
              Business
            </h3>
            <ul className="flex flex-col">
              <FooterLink href="#business-models" onClick={handleNavClick}>B2B</FooterLink>
              <FooterLink href="#business-models" onClick={handleNavClick}>B2C</FooterLink>
            </ul>
          </div>

          {/* Column 4 - Contact + Back to top */}
          <div className="sm:col-span-2 lg:col-span-3 lg:border-l lg:border-white/[0.04] lg:pl-8">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/20" />
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3 mb-10">
              <a
                href="mailto:info@enrysa.com"
                className="text-sm text-white/70 hover:text-white transition-colors duration-500"
              >
                info@enrysa.com
              </a>
              <a
                href="tel:+8801714396144"
                className="text-sm text-white/70 hover:text-white transition-colors duration-500"
              >
                +880 171 439 6144
              </a>
              <span className="text-sm text-[#71717A] leading-relaxed">
                Sky Deck, 13th Floor, Glass House,<br />
                38 Gulshan Avenue, Dhaka 1212
              </span>
            </div>

            <BackToTop />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#71717A] tracking-[0.08em]">
            © {new Date().getFullYear()} ENRYSA. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-4">
            {/* Rune E symbol */}
            <RuneE className="text-white/[0.08]" />
          </div>
        </div>
      </div>
    </footer>
  )
}