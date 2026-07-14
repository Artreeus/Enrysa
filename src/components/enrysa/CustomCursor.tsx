'use client'

import { useEffect, useRef, useCallback, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorVariant = 'default' | 'link' | 'explore' | 'open'

function useIsTouchDevice() {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {}
      const mql = window.matchMedia('(pointer: coarse)')
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    () => {
      if (typeof window === 'undefined') return false
      return window.matchMedia('(pointer: coarse)').matches
    },
    () => false
  )
}

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default')
  const isTouchDevice = useIsTouchDevice()
  const initializedRef = useRef(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const rafRef = useRef<number>(0)
  const targetX = useRef(-100)
  const targetY = useRef(-100)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (initializedRef.current) return
    initializedRef.current = true

    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX
      targetY.current = e.clientY
    }

    const handleMouseLeave = () => {
      targetX.current = -100
      targetY.current = -100
    }

    const animate = () => {
      cursorX.set(targetX.current)
      cursorY.set(targetY.current)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, isTouchDevice])

  const handleElementHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const closestLink = target.closest('a, button, [data-cursor], [role="button"]')
    if (closestLink) {
      if (closestLink.getAttribute('data-cursor') === 'open') {
        setVariant('open')
      } else if (closestLink.getAttribute('data-cursor') === 'explore' || closestLink.closest('[data-cursor="explore"]')) {
        setVariant('explore')
      } else {
        setVariant('link')
      }
    } else {
      setVariant('default')
    }
  }, [])

  useEffect(() => {
    if (isTouchDevice) return
    document.addEventListener('mouseover', handleElementHover)
    return () => document.removeEventListener('mouseover', handleElementHover)
  }, [isTouchDevice, handleElementHover])

  if (isTouchDevice) return null

  const getCursorSize = () => {
    switch (variant) {
      case 'link':
        return 40
      case 'explore':
      case 'open':
        return 72
      default:
        return 32
    }
  }

  const size = getCursorSize()
  const label = variant === 'explore' ? 'EXPLORE' : variant === 'open' ? 'OPEN' : ''

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          zIndex: 9999,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            border: variant === 'default' ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.3)',
            backgroundColor: variant === 'default' ? 'transparent' : 'rgba(255,255,255,0.05)',
          }}
        >
          {variant === 'default' && (
            <div
              className="rounded-full bg-white"
              style={{ width: 4, height: 4 }}
            />
          )}
          {label && (
            <span className="text-[10px] font-medium tracking-[0.15em] text-white/70 uppercase">
              {label}
            </span>
          )}
        </div>
      </motion.div>
      <style jsx global>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>
    </>
  )
}