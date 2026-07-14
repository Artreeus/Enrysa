'use client'

const navLinks = [
  { label: 'Trade', href: '#trade' },
  { label: 'Sourcing', href: '#sourcing' },
  { label: 'B2B', href: '#b2b' },
  { label: 'B2C', href: '#b2c' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const marketLinks = [
  { label: 'Bangladesh', href: '#' },
  { label: 'China', href: '#' },
]

const businessLinks = [
  { label: 'B2B', href: '#b2b' },
  { label: 'B2C', href: '#b2c' },
]

function RuneE() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white/10"
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

export function Footer() {
  return (
    <footer className="bg-[#000000] relative overflow-hidden pt-24 md:pt-32 pb-8 px-6">
      {/* Huge faded ENRYSA watermark */}
      <div
        className="font-cinzel text-[150px] md:text-[250px] lg:text-[350px] font-bold text-white/[0.02] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        ENRYSA
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top - ENRYSA wordmark */}
        <div className="mb-2">
          <span className="font-cinzel text-xl md:text-2xl tracking-[0.2em] text-white">
            ENRYSA
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#71717A] mt-1">
          CHINA × BANGLADESH
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-[#71717A] mt-0.5">
          CROSS-BORDER COMMERCE
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.06] my-12" />

        {/* Middle - Navigation columns */}
        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1 - Navigate */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#71717A] mb-4">
                NAVIGATE
              </h3>
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#71717A] hover:text-white transition-colors duration-400 py-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 - Markets */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#71717A] mb-4">
                MARKETS
              </h3>
              <ul className="flex flex-col">
                {marketLinks.map((link) => (
                  <li key={link.label}>
                    <span className="text-sm text-[#71717A] py-1 inline-block">
                      {link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Business */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#71717A] mb-4">
                BUSINESS
              </h3>
              <ul className="flex flex-col">
                {businessLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#71717A] hover:text-white transition-colors duration-400 py-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - placeholder */}
            <div aria-hidden="true" />
          </div>
        </nav>

        {/* Bottom divider */}
        <div className="w-full h-px bg-white/[0.06] my-8" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[#71717A] tracking-[0.1em]">
            © ENRYSA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* Rune E symbol - bottom right */}
      <div className="absolute bottom-4 right-6" aria-hidden="true">
        <RuneE />
      </div>
    </footer>
  )
}