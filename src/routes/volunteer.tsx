import { createFileRoute } from '@tanstack/react-router'
import LandingHeader from '../components/LandingHeader'
import VolunteerForm from '../components/VolunteerForm'
import Footer from '../components/Footer'
import { useScrollReveal } from '../lib/useScrollReveal'

export const Route = createFileRoute('/volunteer')({ component: VolunteerPage })

function VolunteerPage() {
  useScrollReveal()

  return (
    <div className="antialiased font-sans selection:bg-white selection:text-zinc-900 overflow-x-hidden bg-[#18181b] text-white min-h-screen">
      <LandingHeader />

      <main className="relative w-full min-h-screen pt-[120px] flex flex-col items-center">
        <VolunteerForm />
        <Footer />
      </main>
    </div>
  )
}
