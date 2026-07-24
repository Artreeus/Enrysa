'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from './SectionLabel'
import { AnimatedText } from './AnimatedText'

const pipelineSteps = ['SOURCE', 'VERIFY', 'PROCURE', 'MOVE', 'DELIVER']

interface Hub {
  name: string
  lat: number
  lon: number
  label: string
  isHome?: boolean
}

const HUBS: Hub[] = [
  { name: 'Dhaka', lat: 23.6850, lon: 90.3563, label: 'DHAKA (BD)', isHome: true },
  { name: 'Guangzhou', lat: 23.1291, lon: 113.2644, label: 'GUANGZHOU (CN)' },
  { name: 'London', lat: 51.5074, lon: -0.1278, label: 'LONDON (UK)' },
  { name: 'New York', lat: 40.7128, lon: -74.0060, label: 'NEW YORK (US)' },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, label: 'TOKYO (JP)' },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, label: 'DUBAI (UAE)' },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, label: 'SYDNEY (AU)' },
  { name: 'Frankfurt', lat: 50.1109, lon: 8.6821, label: 'FRANKFURT (DE)' },
  { name: 'Sao Paulo', lat: -23.5505, lon: -46.6333, label: 'SAO PAULO (BR)' },
]

// Simplified polygons for continents in [longitude, latitude] coordinates
const POLY_NORTH_AMERICA: [number, number][] = [
  [-168, 65], [-150, 70], [-120, 72], [-90, 75], [-60, 75], [-50, 60], [-60, 45], [-75, 40], [-80, 25], [-90, 16], [-100, 20], [-110, 8], [-100, 15], [-110, 25], [-125, 33], [-125, 48], [-160, 58], [-168, 65]
]
const POLY_SOUTH_AMERICA: [number, number][] = [
  [-80, 12], [-72, 10], [-60, 5], [-50, -5], [-35, -6], [-40, -22], [-60, -40], [-70, -55], [-76, -45], [-80, -20], [-81, -5], [-80, 12]
]
const POLY_AFRICA: [number, number][] = [
  [-17, 32], [-5, 36], [10, 36], [25, 32], [34, 30], [51, 12], [46, -5], [40, -20], [30, -34], [18, -34], [10, -10], [8, 5], [-10, 5], [-17, 15], [-17, 32]
]
const POLY_EURASIA: [number, number][] = [
  [-10, 62], [10, 58], [5, 50], [15, 45], [25, 40], [35, 30], [30, 20], [34, 12], [48, 12], [50, 25], [60, 25], [68, 23], [78, 8], [85, 20], [95, 20], [105, 8], [110, 15], [110, 25], [120, 20], [125, 38], [140, 50], [170, 60], [180, 65], [160, 55], [120, 60], [90, 70], [60, 75], [30, 70], [10, 75], [-10, 70], [-10, 62]
]
const POLY_AUSTRALIA: [number, number][] = [
  [113, -25], [115, -15], [130, -12], [136, -10], [142, -12], [145, -20], [153, -28], [150, -35], [140, -38], [115, -35], [113, -25]
]
const POLY_GREENLAND: [number, number][] = [
  [-60, 80], [-30, 83], [-40, 60], [-55, 60], [-60, 80]
]

function isPointInPolygon(point: [number, number], polygon: [number, number][]) {
  const [x, y] = point
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1]
    const xj = polygon[j][0], yj = polygon[j][1]
    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }
  return inside
}

function isLand(lat: number, lon: number) {
  const p: [number, number] = [lon, lat]
  return (
    isPointInPolygon(p, POLY_NORTH_AMERICA) ||
    isPointInPolygon(p, POLY_SOUTH_AMERICA) ||
    isPointInPolygon(p, POLY_AFRICA) ||
    isPointInPolygon(p, POLY_EURASIA) ||
    isPointInPolygon(p, POLY_AUSTRALIA) ||
    isPointInPolygon(p, POLY_GREENLAND)
  )
}

// Convert lat/lon to 3D Cartesian coordinates on unit sphere
function convertToUnitSphere(lat: number, lon: number) {
  const radLat = lat * (Math.PI / 180)
  const radLon = lon * (Math.PI / 180)
  return {
    x: Math.cos(radLat) * Math.sin(radLon),
    y: -Math.sin(radLat), // Negated because Canvas Y goes down
    z: Math.cos(radLat) * Math.cos(radLon),
  }
}

// 3D rotations
function rotateY(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: x * cos + z * sin,
    y: y,
    z: -x * sin + z * cos,
  }
}

function rotateX(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: x,
    y: y * cos - z * sin,
    z: y * sin + z * cos,
  }
}

// Generate points on sphere using Fibonacci spiral lattice and classify land
function generateSpherePoints(count: number) {
  const points = []
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - 2 * (i + 0.5) / count)
    const phi = (2 * Math.PI * i) / goldenRatio
    
    const lat = 90 - theta * (180 / Math.PI)
    let lon = (phi * (180 / Math.PI)) % 360
    if (lon > 180) lon -= 360

    const coords = convertToUnitSphere(lat, lon)
    points.push({
      x: coords.x,
      y: coords.y,
      z: coords.z,
      isLand: isLand(lat, lon),
    })
  }
  return points
}

interface Packet {
  progress: number
  speed: number
  inbound: boolean
}

interface Connection {
  hub: Hub
  hubCoords: { x: number; y: number; z: number }
  packets: Packet[]
}

export default function TradeConnection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Pre-convert home coordinates
  const homeHub = HUBS.find((h) => h.isHome)!
  const homeCoords = convertToUnitSphere(homeHub.lat, homeHub.lon)

  // Rotation angles
  const angYRef = useRef(0)
  const angXRef = useRef(0.2)
  const isDraggingRef = useRef(false)
  const lastMouseXRef = useRef(0)
  const lastMouseYRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    // Generate 1200 points for a high-definition continent mesh
    const points = generateSpherePoints(1200)
    
    // Setup connections with outbound and inbound packets
    const connections: Connection[] = HUBS.filter((h) => !h.isHome).map((hub) => ({
      hub,
      hubCoords: convertToUnitSphere(hub.lat, hub.lon),
      packets: [
        { progress: Math.random(), speed: 0.002 + Math.random() * 0.003, inbound: true },
        { progress: Math.random(), speed: 0.002 + Math.random() * 0.003, inbound: false },
      ],
    }))

    // Handle resizing
    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // 3D Arc calculation
    const getArcPoint = (
      hC: { x: number; y: number; z: number },
      bdC: { x: number; y: number; z: number },
      t: number
    ) => {
      // Linear interpolation
      const xt = hC.x * (1 - t) + bdC.x * t
      const yt = hC.y * (1 - t) + bdC.y * t
      const zt = hC.z * (1 - t) + bdC.z * t
      const len = Math.sqrt(xt * xt + yt * yt + zt * zt)
      if (len === 0) return { x: 0, y: 0, z: 0 }
      const ux = xt / len
      const uy = yt / len
      const uz = zt / len

      // Arch elevation
      const heightVal = 0.22 * Math.sin(Math.PI * t)
      return {
        x: ux * (1 + heightVal),
        y: uy * (1 + heightVal),
        z: uz * (1 + heightVal),
      }
    }

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      const cx = w / 2
      const cy = h / 2
      const R = Math.min(cx, cy) * 0.58

      ctx.clearRect(0, 0, w, h)

      // Background ambient glow behind the globe
      const ambient = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6)
      ambient.addColorStop(0, 'rgba(255, 255, 255, 0.015)')
      ambient.addColorStop(0.5, 'rgba(255, 255, 255, 0.005)')
      ambient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = ambient
      ctx.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4)

      // Update rotation if not dragging
      if (!isDraggingRef.current) {
        angYRef.current += 0.0018
      }

      const angY = angYRef.current
      const angX = angXRef.current

      // Project points
      const projectedPoints = points.map((p) => {
        const ry = rotateY(p.x, p.y, p.z, angY)
        const rx = rotateX(ry.x, ry.y, ry.z, angX)
        const scale = 320 / (320 + rx.z * R)
        return {
          sx: cx + rx.x * R * scale,
          sy: cy + rx.y * R * scale,
          sz: rx.z,
          isLand: p.isLand,
        }
      })

      // Separate background and foreground points
      const backPoints = projectedPoints.filter((p) => p.sz > 0)
      const frontPoints = projectedPoints.filter((p) => p.sz <= 0)

      // 1. Draw back hemisphere dots (fainter ocean dots, slightly brighter land dots)
      for (const p of backPoints) {
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, p.isLand ? 0.7 : 0.35, 0, Math.PI * 2)
        ctx.fillStyle = p.isLand ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)'
        ctx.fill()
      }

      // 2. Draw back connections (hubs on the far side)
      connections.forEach((conn) => {
        const ryHub = rotateY(conn.hubCoords.x, conn.hubCoords.y, conn.hubCoords.z, angY)
        const rxHub = rotateX(ryHub.x, ryHub.y, ryHub.z, angX)

        const ryHome = rotateY(homeCoords.x, homeCoords.y, homeCoords.z, angY)
        const rxHome = rotateX(ryHome.x, ryHome.y, ryHome.z, angX)

        const averageZ = (rxHub.z + rxHome.z) / 2

        if (averageZ > 0) {
          // Draw arc line
          ctx.beginPath()
          const segments = 25
          for (let step = 0; step <= segments; step++) {
            const pt = getArcPoint(conn.hubCoords, homeCoords, step / segments)
            const ryPt = rotateY(pt.x, pt.y, pt.z, angY)
            const rxPt = rotateX(ryPt.x, ryPt.y, ryPt.z, angX)
            const scale = 320 / (320 + rxPt.z * R)
            const sx = cx + rxPt.x * R * scale
            const sy = cy + rxPt.y * R * scale
            if (step === 0) ctx.moveTo(sx, sy)
            else ctx.lineTo(sx, sy)
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      // 3. Draw front connections (hubs on near side) and active packets
      connections.forEach((conn) => {
        const ryHub = rotateY(conn.hubCoords.x, conn.hubCoords.y, conn.hubCoords.z, angY)
        const rxHub = rotateX(ryHub.x, ryHub.y, ryHub.z, angX)

        const ryHome = rotateY(homeCoords.x, homeCoords.y, homeCoords.z, angY)
        const rxHome = rotateX(ryHome.x, ryHome.y, ryHome.z, angX)

        const averageZ = (rxHub.z + rxHome.z) / 2

        if (averageZ <= 0) {
          // Draw arc line
          ctx.beginPath()
          const segments = 30
          for (let step = 0; step <= segments; step++) {
            const pt = getArcPoint(conn.hubCoords, homeCoords, step / segments)
            const ryPt = rotateY(pt.x, pt.y, pt.z, angY)
            const rxPt = rotateX(ryPt.x, ryPt.y, ryPt.z, angX)
            const scale = 320 / (320 + rxPt.z * R)
            const sx = cx + rxPt.x * R * scale
            const sy = cy + rxPt.y * R * scale
            if (step === 0) ctx.moveTo(sx, sy)
            else ctx.lineTo(sx, sy)
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
          ctx.lineWidth = 0.8
          ctx.stroke()

          // Draw moving packets
          conn.packets.forEach((p) => {
            p.progress += p.speed
            if (p.progress > 1) {
              p.progress = 0
              p.speed = 0.002 + Math.random() * 0.003
            }

            const t = p.inbound ? p.progress : 1 - p.progress
            const pt = getArcPoint(conn.hubCoords, homeCoords, t)
            const ryPt = rotateY(pt.x, pt.y, pt.z, angY)
            const rxPt = rotateX(ryPt.x, ryPt.y, ryPt.z, angX)
            const scale = 320 / (320 + rxPt.z * R)
            const px = cx + rxPt.x * R * scale
            const py = cy + rxPt.y * R * scale

            // Glowing dot
            const glow = ctx.createRadialGradient(px, py, 0, px, py, 6)
            glow.addColorStop(0, 'rgba(255, 255, 255, 0.85)')
            glow.addColorStop(0.3, 'rgba(255, 255, 255, 0.25)')
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(px, py, 6, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = '#FFFFFF'
            ctx.beginPath()
            ctx.arc(px, py, 1.2, 0, Math.PI * 2)
            ctx.fill()
          })
        }
      })

      // 4. Draw front hemisphere dots (brighter land dots, very faint ocean dots)
      for (const p of frontPoints) {
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, p.isLand ? 1.3 : 0.5, 0, Math.PI * 2)
        ctx.fillStyle = p.isLand ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.05)'
        ctx.fill()
      }

      // 5. Draw active hub labels and markers
      HUBS.forEach((hub) => {
        const hc = convertToUnitSphere(hub.lat, hub.lon)
        const ry = rotateY(hc.x, hc.y, hc.z, angY)
        const rx = rotateX(ry.x, ry.y, ry.z, angX)

        if (rx.z <= 0) {
          const scale = 320 / (320 + rx.z * R)
          const sx = cx + rx.x * R * scale
          const sy = cy + rx.y * R * scale

          // Marker circle
          ctx.beginPath()
          ctx.arc(sx, sy, hub.isHome ? 3.5 : 2, 0, Math.PI * 2)
          ctx.fillStyle = hub.isHome ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'
          ctx.fill()

          if (hub.isHome) {
            // Pulse ring around home
            const pulseRadius = 3.5 + 4 * Math.abs(Math.sin(Date.now() * 0.002))
            ctx.beginPath()
            ctx.arc(sx, sy, pulseRadius, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }

          // Hub Label text
          ctx.font = '8px system-ui, -apple-system, sans-serif'
          ctx.fillStyle = hub.isHome ? 'rgba(255,255,255,0.9)' : 'rgba(255, 255, 255, 0.42)'
          ctx.fillText(hub.label, sx + 6, sy + 3)
        }
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    // Mouse Drag events
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      lastMouseXRef.current = e.clientX
      lastMouseYRef.current = e.clientY
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      const dx = e.clientX - lastMouseXRef.current
      const dy = e.clientY - lastMouseYRef.current
      angYRef.current += dx * 0.004
      angXRef.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, angXRef.current + dy * 0.004))
      lastMouseXRef.current = e.clientX
      lastMouseYRef.current = e.clientY
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    // Touch Drag events
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      isDraggingRef.current = true
      lastMouseXRef.current = e.touches[0].clientX
      lastMouseYRef.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return
      const dx = e.touches[0].clientX - lastMouseXRef.current
      const dy = e.touches[0].clientY - lastMouseYRef.current
      angYRef.current += dx * 0.004
      angXRef.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, angXRef.current + dy * 0.004))
      lastMouseXRef.current = e.touches[0].clientX
      lastMouseYRef.current = e.touches[0].clientY
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleMouseUp)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
      window.removeEventListener('resize', resize)
    }
  }, [homeCoords])

  return (
    <section
      id="trade-connection"
      ref={sectionRef}
      className="bg-[#050505] py-32 md:py-40 px-6 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel number="01" label="GLOBAL CONNECTION" />

        <AnimatedText as="h2" className="text-white font-bold text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.1]">
          <span className="block">GLOBAL TRADE.</span>
          <span className="block">ONE NETWORK.</span>
        </AnimatedText>

        <AnimatedText delay={0.2} className="text-[#A1A1AA] text-lg max-w-2xl mt-8 leading-relaxed">
          Connecting Bangladesh with the global trade ecosystem. ENRYSA integrates product sourcing,
          supply chain logistics, and verification systems across international borders.
        </AnimatedText>

        {/* 3D Interactive Globe Container */}
        <div ref={containerRef} className="w-full h-[360px] sm:h-[480px] md:h-[600px] relative mt-16 md:mt-20 flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
          <canvas ref={canvasRef} className="absolute max-w-full max-h-full" />
          
          {/* Helper overlay hint */}
          <div className="absolute bottom-2 text-[10px] uppercase tracking-[0.2em] text-[#71717A]/50 pointer-events-none select-none">
            DRAG TO ROTATE GLOBE
          </div>
        </div>

        {/* Global Pipeline step labels grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-16 text-center border-t border-white/[0.06] pt-12">
          {pipelineSteps.map((step, i) => (
            <div key={step} className="flex flex-col items-center">
              <span className="font-cinzel text-xl font-bold text-white/20 mb-2">0{i + 1}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-semibold">{step}</span>
              <span className="text-[10px] text-[#71717A] mt-2 max-w-[150px] leading-relaxed">
                {i === 0 && 'Identify and source high-quality products worldwide.'}
                {i === 1 && 'Rigorous supplier and cargo validation.'}
                {i === 2 && 'Procure materials and manage trade compliance.'}
                {i === 3 && 'Seamless logistics routing across global lanes.'}
                {i === 4 && 'Direct delivery to warehouses and consumers in BD.'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}