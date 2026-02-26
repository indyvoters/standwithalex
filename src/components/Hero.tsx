import { ArrowRight, Stars } from 'lucide-react'
import GridBackground from './GridBackground'
import { useLoaderData } from '@tanstack/react-router'

interface HeroProps {
    onOpenBio: () => void
}

export default function Hero({ onOpenBio }: HeroProps) {
    const { urgentBand } = useLoaderData({ from: '__root__' })
    return (
        <section className={`relative w-full max-w-[1920px] mx-auto h-[calc(200vh-5rem)] ${urgentBand ? 'sm:h-[calc(100vh-8rem)]' : 'sm:h-[calc(100vh-4rem)]'} flex flex-col lg:flex-row border-b border-zinc-800 relative`}>
            {/* Background Grid Lines */}

            {/* Background Grid Lines */}
            <GridBackground />


            {/* Left Side: Governor */}
            <div className="relative w-full lg:w-1/2 h-dvh sm:h-full group overflow-hidden border-r border-zinc-800 candidate-wrapper">
                <div className="absolute inset-0 bg-zinc-900 z-0">
                    <img
                        src="/gary.jpg"
                        alt="Governor Candidate"
                        className="w-full h-full object-cover object-top opacity-80 candidate-img"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-90"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 z-10 flex flex-col items-start justify-end h-full">
                    <span
                        className="inline-block py-1 px-3 border border-zinc-700 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-300 mb-4 animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        For Governor
                    </span>
                    <h2
                        className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-2 animate-fade-in-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Gary Pierce
                    </h2>
                    <p
                        className="text-zinc-400 max-w-sm text-sm md:text-base leading-relaxed animate-fade-in-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        Drawing on 25 years of experience in ministry and addiction recovery, Gary T. Pierce is a dedicated advocate who believes government must serve citizens rather than elites. He champions the conviction that leadership is about lifting burdens and protecting rights that are God-given, not granted by politicians.
                    </p>
                    <div
                        className="mt-8 flex gap-4 animate-fade-in-up"
                        style={{ animationDelay: '0.4s' }}
                    >
                        {/* <button
                            onClick={onOpenBio}
                            className="flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors text-sm tracking-wide focus:outline-none"
                        >
                            Learn More <ArrowRight size={16} />
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Right Side: Lt. Governor */}
            <div className="relative w-full lg:w-1/2 h-dvh sm:h-full group overflow-hidden candidate-wrapper">
                <div className="absolute inset-0 bg-zinc-900 z-0">
                    <img
                        src="/alex.jpg"
                        alt="Lieutenant Governor Candidate"
                        className="w-full h-full object-cover object-top opacity-80 candidate-img"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-90"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 z-10 flex flex-col items-start justify-end h-full">
                    <span
                        className="inline-block py-1 px-3 border border-zinc-700 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-300 mb-4 animate-fade-in-up"
                        style={{ animationDelay: '0.5s' }}
                    >
                        Lt. Governor
                    </span>
                    <h2
                        className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-2 animate-fade-in-up"
                        style={{ animationDelay: '0.6s' }}
                    >
                        Alejandro Cabrera
                    </h2>
                    <p
                        className="text-zinc-400 max-w-sm text-sm md:text-base leading-relaxed animate-fade-in-up"
                        style={{ animationDelay: '0.7s' }}
                    >
                        Driven by a fresh vision for a healthy Illinois, Alex is eager to serve with new ideas that put people first. He wants to renew our State government by ending the 'revolving door' between industry and regulators, while fiercely protecting our civil liberties and the free speech rights of every citizen.
                    </p>
                    <div
                        className="mt-8 flex gap-4 animate-fade-in-up"
                        style={{ animationDelay: '0.8s' }}
                    >
                        {/* <button className="flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors text-sm tracking-wide focus:outline-none">
                            Biography <ArrowRight size={16} />
                        </button> */}
                    </div>
                </div>

            </div>

            {/* Center Overlay Badge (Desktop) used to be top-1/2 -translate-y-1/2 */}
            {/* <div className="hidden lg:flex absolute bottom-0 left-1/2 transform -translate-x-1/2  z-20 flex-col items-center">
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent mb-4 opacity-50"></div>
                <div
                    className="glass-panel px-6 py-4 border border-zinc-700/50 flex items-center gap-3 shadow-2xl shadow-black/50 animate-fade-in-up"
                    style={{ animationDelay: '1s' }}
                >

                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">
                        The Independence Party Ticket
                    </span>
                </div>
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent mt-4 opacity-50"></div>
            </div> */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-50">
                <img src="/iplogo-white.svg" alt="Independence Party Logo" className="w-14 h-14 opacity-70 hidden sm:flex" />

                <div
                    className="glass-panel px-6 py-4 border border-zinc-700/50 flex items-center gap-3 shadow-2xl shadow-black/50 animate-fade-in-up"
                    style={{ animationDelay: '1s' }}
                >

                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">
                        The Independence Party Ticket
                    </span>
                    <button
                        onClick={() => window.open('https://secure.anedot.com/gary-pierce-for-governor/donate', '_blank')}
                        className="flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors text-sm tracking-wide focus:outline-none"
                    >
                        Donate <ArrowRight size={16} />
                    </button>
                </div>
                {/* <span className="text-sm font-bold tracking-[0.2em] opacity-50 uppercase text-white">The Independence Party</span> */}
            </div>

        </section>
    )
}
