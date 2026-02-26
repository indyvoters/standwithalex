import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useState } from 'react'
import LandingHeader from '../components/LandingHeader'
import Hero from '../components/Hero'
import Mission from '../components/Mission'
import VolunteerForm from '../components/VolunteerForm'
import Footer from '../components/Footer'
import BioDrawer from '../components/BioDrawer'
import { useScrollReveal } from '../lib/useScrollReveal'
import { MarqueeDemo } from '../components/Marquee'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [isBioOpen, setIsBioOpen] = useState(false)
  const { urgentBand } = useLoaderData({ from: '__root__' })

  useScrollReveal()

  return (
    <div className="antialiased font-sans selection:bg-white selection:text-zinc-900 overflow-x-hidden bg-[#18181b] text-white min-h-screen">
      <LandingHeader />

      <main className={`relative w-full min-h-screen ${urgentBand ? 'pt-[120px]' : ''} flex flex-col items-center`}>
        <Hero onOpenBio={() => setIsBioOpen(true)} />
        <MarqueeDemo />
        <Mission />
        <VolunteerForm />
        <Footer />
      </main>

      <BioDrawer isOpen={isBioOpen} onClose={() => setIsBioOpen(false)} />
    </div>
  )
}
