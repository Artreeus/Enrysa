'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/enrysa/CustomCursor'), {
  ssr: false,
})

import Navbar from '@/components/enrysa/Navbar'
import Hero from '@/components/enrysa/Hero'
import TradeConnection from '@/components/enrysa/TradeConnection'
import { Capabilities } from '@/components/enrysa/Capabilities'
import { BusinessModels } from '@/components/enrysa/BusinessModels'
import { ProcessTimeline } from '@/components/enrysa/ProcessTimeline'
import { TradeNetwork } from '@/components/enrysa/TradeNetwork'
import { WhyEnrysa } from '@/components/enrysa/WhyEnrysa'
import { BrandStatement } from '@/components/enrysa/BrandStatement'
import { ContactCTA } from '@/components/enrysa/ContactCTA'
import { Footer } from '@/components/enrysa/Footer'

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <TradeConnection />
      <Capabilities />
      <BusinessModels />
      <ProcessTimeline />
      <TradeNetwork />
      <WhyEnrysa />
      <BrandStatement />
      <ContactCTA />
      <Footer />
    </main>
  )
}