'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { AnimatedText } from '@/components/enrysa/AnimatedText'

const metrics = [
  { value: '2', label: 'CONNECTED MARKETS' },
  { value: 'B2B + B2C', label: 'COMMERCE MODELS' },
  { value: 'GLOBAL → BD', label: 'CORE TRADE CORRIDOR' },
  { value: '24/7', label: 'CONNECTED OPERATIONS' },
]

interface NodeData {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

interface PacketData {
  fromIdx: number
  toIdx: number
  progress: number
  speed: number
}

interface NetworkState {
  nodes: NodeData[]
  edges: [number, number][]
  packets: PacketData[]
  w: number
  h: number
  isMobile: boolean
}

function buildNetwork(w: number, h: number, isMobile: boolean): NetworkState {
  const nodeCount = isMobile ? 18 : 40
  const connectionDist = isMobile ? 120 : 160
  const nodes: NodeData[] = []
  const edges: [number, number][] = []
  const packets: PacketData[] = []

  for (let i = 0; i < nodeCount; i++) {
    const x = Math.random() * (w - 40) + 20
    const y = Math.random() * (h - 40) + 20
    nodes.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2 + 2,
      opacity: Math.random() * 0.4 + 0.1,
    })
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < connectionDist) {
        edges.push([i, j])
      }
    }
  }

  const packetCount = isMobile ? 3 : 6
  for (let i = 0; i < packetCount; i++) {
    if (edges.length === 0) break
    const edgeIdx = Math.floor(Math.random() * edges.length)
    packets.push({
      fromIdx: edges[edgeIdx][0],
      toIdx: edges[edgeIdx][1],
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.004,
    })
  }

  return { nodes, edges, packets, w, h, isMobile }
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let state: NetworkState | null = null
    let animId = 0

    const setup = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      state = buildNetwork(rect.width, rect.height, rect.width < 768)
    }

    const draw = () => {
      if (!state) return
      const { nodes, edges, packets, w, h, isMobile: mobile } = state

      ctx.clearRect(0, 0, w, h)

      // Subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.02)'
      ctx.lineWidth = 0.5
      const gridSize = mobile ? 50 : 60
      for (let gx = 0; gx < w; gx += gridSize) {
        ctx.beginPath()
        ctx.moveTo(gx, 0)
        ctx.lineTo(gx, h)
        ctx.stroke()
      }
      for (let gy = 0; gy < h; gy += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, gy)
        ctx.lineTo(w, gy)
        ctx.stroke()
      }

      // Edges
      for (const [a, b] of edges) {
        const na = nodes[a]
        const nb = nodes[b]
        if (!na || !nb) continue
        ctx.beginPath()
        ctx.moveTo(na.x, na.y)
        ctx.lineTo(nb.x, nb.y)
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Nodes - update and draw
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        node.x += node.vx
        node.y += node.vy
        if (node.x < 10 || node.x > w - 10) node.vx *= -1
        if (node.y < 10 || node.y > h - 10) node.vy *= -1
        node.x = Math.max(10, Math.min(w - 10, node.x))
        node.y = Math.max(10, Math.min(h - 10, node.y))

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${node.opacity})`
        ctx.fill()
      }

      // Data packets
      for (let i = 0; i < packets.length; i++) {
        const pkt = packets[i]
        pkt.progress += pkt.speed
        if (pkt.progress >= 1) {
          if (edges.length === 0) continue
          const edgeIdx = Math.floor(Math.random() * edges.length)
          pkt.fromIdx = edges[edgeIdx][0]
          pkt.toIdx = edges[edgeIdx][1]
          pkt.progress = 0
          pkt.speed = 0.002 + Math.random() * 0.004
        }

        const fromNode = nodes[pkt.fromIdx]
        const toNode = nodes[pkt.toIdx]
        if (!fromNode || !toNode) continue

        const px = fromNode.x + (toNode.x - fromNode.x) * pkt.progress
        const py = fromNode.y + (toNode.y - fromNode.y) * pkt.progress

        // Glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 8)
        gradient.addColorStop(0, 'rgba(255,255,255,0.6)')
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.1)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(px, py, 8, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    setup()
    animId = requestAnimationFrame(draw)

    const handleResize = () => {
      cancelAnimationFrame(animId)
      setup()
      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="absolute inset-0 top-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export function TradeNetwork() {
  const metricsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(metricsRef, { once: true, margin: '-100px' })
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="trade-network"
      className="relative min-h-screen overflow-hidden bg-[#050505] flex flex-col"
    >
      {/* Headline */}
      <div className="relative z-10 pt-20 md:pt-32 px-6 text-center">
        <AnimatedText>
          <h2 className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.05]">
            <span>A NETWORK</span>
            <br />
            <span>BUILT TO MOVE.</span>
          </h2>
        </AnimatedText>
      </div>

      {/* Canvas visualization */}
      <div className="relative flex-1 min-h-[400px] flex items-center justify-center pointer-events-none">
        <NetworkCanvas />

        {/* Central Master Hub Badge */}
        <motion.div
          initial={reducedMotion ? {} : { scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center justify-center p-4 md:p-5 rounded-full border border-white/15 bg-black/70 backdrop-blur-md shadow-[0_0_50px_rgba(255,255,255,0.1)] pointer-events-auto group cursor-pointer hover:border-white/30 transition-all duration-500"
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src="/enrysa-icon.png"
              alt="ENRYSA Central Trade Hub"
              fill
              className="object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]"
            />
          </div>
          <div className="absolute -bottom-6 md:-bottom-7 whitespace-nowrap text-[9px] md:text-[10px] tracking-[0.25em] font-mono text-zinc-300 uppercase bg-zinc-950/90 border border-white/15 px-3 py-0.5 rounded-full shadow-xl">
            CENTRAL TRADE HUB
          </div>
        </motion.div>
      </div>

      {/* Metrics overlay */}
      <div
        ref={metricsRef}
        className="relative z-10 pb-16 md:pb-24 px-6"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="text-center sm:text-left"
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : reducedMotion
                    ? {}
                    : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: reducedMotion ? 0 : 0.2 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="text-3xl md:text-5xl font-bold text-white">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#71717A] mt-1">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}