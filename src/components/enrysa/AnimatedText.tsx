'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: any
}

const motionMap: Record<string, any> = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
}

export function AnimatedText({
  children,
  className = '',
  delay = 0,
  as: Tag = 'p',
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reducedMotion = useReducedMotion()

  const MotionTag = motionMap[Tag] || motion.div

  return (
    <div ref={ref}>
      <MotionTag
        className={className}
        initial={
          reducedMotion
            ? { opacity: 1 }
            : { opacity: 0, filter: 'blur(8px)', y: 20 }
        }
        animate={
          isInView
            ? { opacity: 1, filter: 'blur(0px)', y: 0 }
            : reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, filter: 'blur(8px)', y: 20 }
        }
        transition={{
          duration: reducedMotion ? 0 : 0.8,
          delay: reducedMotion ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </MotionTag>
    </div>
  )
}