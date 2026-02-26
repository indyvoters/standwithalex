
import { createFileRoute } from '@tanstack/react-router'
import LandingHeader from '../components/LandingHeader'
import Footer from '../components/Footer'
import GridBackground from '../components/GridBackground'
import PetitionForm from '../components/PetitionForm'
import { useScrollReveal } from '../lib/useScrollReveal'

export const Route = createFileRoute('/petitioning')({
    component: PetitionPage,
})

function PetitionPage() {
    useScrollReveal()

    return (
        <div className="antialiased font-sans selection:bg-white selection:text-zinc-900 overflow-x-hidden bg-[#18181b] text-white min-h-screen">
            <LandingHeader />
            <GridBackground />

            <main className="relative w-full min-h-screen pt-[136px] px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 relative z-10">

                    {/* Left Column: Form */}
                    <div className="w-full lg:w-1/2 pt-12 lg:pt-20 pb-24 text-center">
                        {/* <div className="mb-12">
                            <h2
                                className="font-serif font-medium text-3xl md:text-3xl lg:text-3xl tracking-tight text-white mb-6 animate-fade-in-up"
                                style={{ animationDelay: '0.1s' }}
                            >
                                Signup here so Gary and Alex<br></br> know you're with us!
                            </h2>
                        </div> */}

                        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <PetitionForm />
                        </div>
                    </div>

                    {/* Right Column: Donate - Sticky */}
                    <div className="w-full lg:w-1/2 md:min-h-full border-b lg:h-[calc(100vh-6rem)] lg:sticky lg:top-[136px] flex flex-col justify-center items-start border-t lg:border-t-0 lg:border-l border-zinc-800 pt-12 lg:pt-0 lg:pl-0">
                        <div className="flex flex-col items-start text-left">
                            <h2
                                className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-8 animate-fade-in-up"
                                style={{ animationDelay: '0.4s' }}
                            >
                                This petitioning campaign will be costly.
                            </h2>
                            <div className="w-24 h-1 bg-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}></div>
                            <p
                                className="text-zinc-400 max-w-md text-lg leading-relaxed animate-fade-in-up mb-10"
                                style={{ animationDelay: '0.6s' }}
                            >
                                Can you spare $5 or whatever you can afford to help us achieve 5% in Illinois?
                            </p>
                            <a
                                href="https://secure.anedot.com/gary-pierce-for-governor/donate"
                                target="_blank"
                                className="group relative bg-white text-zinc-900 overflow-hidden font-bold uppercase tracking-widest px-10 py-5 animate-fade-in-up"
                                style={{ animationDelay: '0.7s' }}
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Donate Now</span>
                                <div className="absolute inset-0 bg-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </a>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}
