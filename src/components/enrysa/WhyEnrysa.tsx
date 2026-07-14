'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '@/components/enrysa/SectionLabel'
import { AnimatedText } from '@/components/enrysa/AnimatedText'

const statements = [
  { word: 'ACCESS', desc: 'Reach beyond local market limitations.' },
  { word: 'CONNECTION', desc: 'Bridge suppliers, products, businesses, and consumers.' },
  { word: 'COORDINATION', desc: 'Bring complex trade processes into a clearer system.' },
  { word: 'OPPORTUNITY', desc: 'Turn global product access into business possibilities.' },
]

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export function WhyEnrysa() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="why-enrysa" className="py-32 md:py-48 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="04" label="WHY ENRYSA" />
        <AnimatedText
          as="h2"
          className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-20 md:mb-28"
        >
          BEYOND
          <br />
          IMPORTING.
        </AnimatedText>

        <div className="flex flex-col gap-20 md:gap-28 lg:gap-36">
          {statements.map((statement, index) => (
            <motion.div
              key={statement.word}
              className="border-t border-white/[0.06] pt-12 md:pt-16"
              variants={reducedMotion ? undefined : itemVariants}
              initial={reducedMotion ? false : 'hidden'}
              whileInView={reducedMotion ? undefined : 'visible'}
              viewport={{ once: false, amount: 0.3 }}
              custom={index}
            >
              <h3 className="text-5xl md:text-7xl lg:text-[110px] xl:text-[130px] font-bold text-white tracking-[-0.03em] leading-none">
                {statement.word}
              </h3>
              <p className="text-lg md:text-xl text-[#A1A1AA] max-w-lg mt-6 leading-relaxed">
                {statement.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}