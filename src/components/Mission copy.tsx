import { ArrowUpRight, Building2, TrendingUp } from 'lucide-react'

export default function Mission() {
    return (
        <section className="w-full max-w-[1920px] px-6 md:px-12 lg:px-24 py-32 border-b border-zinc-800 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 scroll-element">
                    <h3 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 mb-4">
                        The Mission
                    </h3>
                    <div className="h-[1px] w-12 bg-white mb-8"></div>
                    <p className="text-zinc-400 text-sm leading-7">
                        We are entering a new era of governance. One that eschews the noise
                        of the past for the clarity of data, design, and direct action. Join
                        us in building a state that works as efficiently as the technology
                        we use every day.
                    </p>
                </div>
                <div
                    className="lg:col-span-8 scroll-element"
                    style={{ transitionDelay: '100ms' }}
                >
                    <h2 className="font-serif font-medium text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-white mb-12">
                        Governance <span className="text-zinc-600">Redesigned.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-800 pt-8">
                        {/* Priority 1 */}
                        <div className="group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <TrendingUp
                                    size={32}
                                    className="text-white group-hover:text-zinc-300 transition-colors"
                                />
                                <ArrowUpRight
                                    size={20}
                                    className="text-zinc-600 group-hover:text-white transition-colors"
                                />
                            </div>
                            <h4 className="text-lg font-medium text-white mb-2">
                                Economic Velocity
                            </h4>
                            <p className="text-sm text-zinc-500">
                                Streamlining regulation to unleash market potential.
                            </p>
                        </div>
                        {/* Priority 2 */}
                        <div className="group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <Building2
                                    size={32}
                                    className="text-white group-hover:text-zinc-300 transition-colors"
                                />
                                <ArrowUpRight
                                    size={20}
                                    className="text-zinc-600 group-hover:text-white transition-colors"
                                />
                            </div>
                            <h4 className="text-lg font-medium text-white mb-2">
                                Urban Resilience
                            </h4>
                            <p className="text-sm text-zinc-500">
                                Modernizing infrastructure for the next century.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
