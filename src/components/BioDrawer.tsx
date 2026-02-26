import { X } from 'lucide-react'
import { useEffect } from 'react'

interface BioDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function BioDrawer({ isOpen, onClose }: BioDrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <div
            id="bio-drawer"
            className={`fixed inset-0 z-[100] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
        >
            {/* Backdrop */}
            <div
                id="bio-backdrop"
                className={`absolute inset-0 bg-zinc-950/80 backdrop-blur-sm drawer-backdrop transition-opacity duration-600 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            ></div>

            {/* Drawer Panel */}
            <div
                id="bio-panel"
                className={`absolute top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-[#18181b] border-l border-zinc-800 shadow-2xl transform drawer-panel flex flex-col ${isOpen ? 'translate-x-0 drawer-open' : 'translate-x-full'
                    }`}
            >
                {/* Sticky Header */}
                <div className="flex-shrink-0 flex items-center ulistify-between px-8 py-6 border-b border-zinc-800 bg-[#18181b]/90 backdrop-blur z-20">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
                        Candidate Profile
                    </span>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800"
                    >
                        <X size={28} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-10 relative">

                    {/* <div className="drawer-content" style={{ transitionDelay: '0.1s' }}>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="inline-block py-1 px-3 border border-zinc-700 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                                Governor
                            </span>
                            <div className="h-[1px] flex-1 bg-zinc-800"></div>
                        </div>

                        <h2 className="font-serif font-medium text-4xl md:text-5xl tracking-tight text-white mb-6">
                            Gary Pierce
                        </h2>


                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="p-4 bg-zinc-900 border border-zinc-800">
                                <span className="block text-2xl font-serif text-white mb-1">
                                    12
                                </span>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider">
                                    Years Public Service
                                </span>
                            </div>
                            <div className="p-4 bg-zinc-900 border border-zinc-800">
                                <span className="block text-2xl font-serif text-white mb-1">
                                    34
                                </span>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider">
                                    Economic Bills
                                </span>
                            </div>
                        </div>

                        <h3 className="font-sans text-lg font-medium text-white mb-4">
                            Gary Pierce for Governor
                        </h3>
                        <p className="text-zinc-400 text-sm leading-7 mb-6">
                           textabout gary
                        </p>
                        <p className="text-zinc-400 text-sm leading-7 mb-8">
                            "We don't need more government," Gary says
                        </p>


                        <div className="space-y-8 border-l border-zinc-800 ml-2 pl-8 relative">
                            <div className="relative">
                                <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-zinc-900 border border-zinc-600"></div>
                                <span className="text-xs font-bold text-zinc-500 mb-1 block">
                                    2018 - Present
                                </span>
                                <h4 className="text-white text-base font-medium">
                                    State Treasurer
                                </h4>
                                <p className="text-zinc-500 text-sm mt-2">
                                    Digitized the state pension fund, reducing overhead by 14% and
                                    increasing transparency.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-zinc-900 border border-zinc-600"></div>
                                <span className="text-xs font-bold text-zinc-500 mb-1 block">
                                    2012 - 2018
                                </span>
                                <h4 className="text-white text-base font-medium">
                                    Director of Commerce
                                </h4>
                                <p className="text-zinc-500 text-sm mt-2">
                                    Spearheaded the "Open Business" initiative, cutting red tape
                                    for small startups.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-zinc-900 border border-zinc-600"></div>
                                <span className="text-xs font-bold text-zinc-500 mb-1 block">
                                    Previous
                                </span>
                                <h4 className="text-white text-base font-medium">
                                    Systems Architect
                                </h4>
                                <p className="text-zinc-500 text-sm mt-2">
                                    Private sector consultant for logistics and urban planning
                                    firms.
                                </p>
                            </div>
                        </div>
                    </div> */}

                    <div
                        className="drawer-content mt-12 pt-8 border-t border-zinc-800"
                        style={{ transitionDelay: '0.2s' }}
                    >
                        <a href="https://secure.anedot.com/gary-pierce-for-governor/donate" target="_blank" rel="noopener noreferrer">
                            <button className="w-full bg-white text-zinc-900 px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors">
                                Donate to Campaign
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
