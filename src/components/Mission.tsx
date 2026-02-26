import { ArrowUpRight, Building2, TrendingUp } from 'lucide-react'

export default function Mission() {
    return (
        <section className="w-full max-w-[1920px] px-6 md:px-12 lg:px-24 py-32 border-b border-zinc-800 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 scroll-element">
                    <h3 className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 mb-4">
                        On a mission for 5% of the vote.
                    </h3>
                    <div className="h-[1px] w-12 bg-white mb-8"></div>
                    <p className="text-zinc-400 text-sm leading-7">
                        Gary is running for Governor of Illinois on the Independence Party ticket. The Independence Party is a political party created to promote political organizing and political campaigns that are independent of the leadership structures of the Democratic and Republican parties in the State of Illinois.
                    </p>
                </div>
                <div
                    className="lg:col-span-8 scroll-element"
                    style={{ transitionDelay: '100ms' }}
                >
                    <h2 className="font-serif font-medium text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-white mb-12">
                        Independence <span className="text-zinc-600">Starts Here.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-800 pt-8">
                        {/* Priority 1 */}
                        <div className="group">
                            <div className="flex justify-between items-start mb-4">
                                <img src="/iplogo-white.svg" alt="Independence Party Logo" className="w-24 h-24 mb-4" />
                                {/* <ArrowUpRight
                                    size={20}
                                    className="text-zinc-600 group-hover:text-white transition-colors"
                                /> */}
                            </div>
                            <h4 className="text-lg font-medium text-white mb-2">
                                The Independence Party
                            </h4>
                            <a href="https://indyvoters.org" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 underline decoration-zinc-500 decoration-offset-4  hover:text-zinc-400 transition-colors ">
                                Learn more
                            </a>
                            {/* <p className="text-sm text-zinc-500">
                                A political party created to promote political organizing and political campaigns that are independent of the leadership structures of the Democratic and Republican parties in the State of Illinois.
                            </p> */}
                        </div>
                        <div className="group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <TrendingUp
                                    size={32}
                                    className="text-white group-hover:text-zinc-300 transition-colors"
                                />
                                {/* <ArrowUpRight
                                    size={20}
                                    className="text-zinc-600 group-hover:text-white transition-colors"
                                /> */}
                            </div>
                            <h4 className="text-lg font-medium text-white mb-2">
                                A Path to 5%
                            </h4>
                            <p className="text-sm text-zinc-500">
                                We have a plan to reach 5% of the vote, unlocking ballot access for Independent candidates in Illinois.
                            </p>
                        </div>
                        {/* Priority 2 */}

                    </div>
                </div>
            </div>
        </section>
    )
}
