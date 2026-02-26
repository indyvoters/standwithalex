import { Link } from '@tanstack/react-router'

export default function Footer() {
    return (
        <footer className="w-full max-w-[1920px] px-6 md:px-12 lg:px-24 py-24 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="w-full md:w-1/2 scroll-element">
                    <h2 className="font-serif font-medium text-3xl md:text-4xl text-white mb-6 tracking-tight">
                        Reclaim Your Independence
                    </h2>
                    <div className="text-zinc-500 scroll-element items-end mb-8">
                        <img src="/iplogo-white.svg" alt="Independence Party Logo" className="w-24 h-24 mb-4" />
                        <p className="text-xl text-zinc-300 max-w-md leading-relaxed">
                            We're building a political party based on a set of core principles that have united people across the political spectrum.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <a href="#volunteer">
                            <button className="bg-white text-zinc-900 px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors">
                                Join Us
                            </button>
                        </a>
                        <a href="https://secure.anedot.com/gary-pierce-for-governor/donate" target="_blank" rel="noopener noreferrer">
                            <button className="bg-transparent border border-white text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-zinc-900 transition-colors">
                                Donate
                            </button>
                        </a>
                    </div>
                </div>
                <div
                    className="w-full md:w-auto flex flex-col items-end gap-2 text-zinc-500 scroll-element"
                    style={{ transitionDelay: '100ms' }}
                >
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest border border-zinc-800 p-4 inline-block">
                            Paid for by the Illinois Committee for Independent Political Action and Gary Pierce for Governor.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-24 flex flex-col md:flex-row justify-between items-center border-t border-zinc-800 pt-8 text-xs text-zinc-600 uppercase tracking-wider">
                <p>© Gary Pierce 2026</p>
                <div className="flex gap-8 mt-4 md:mt-0 px-12">
                    <Link to="/privacy" className="hover:text-zinc-400 transition-colors">
                        Privacy
                    </Link>
                    {/* <a href="#" className="hover:text-zinc-400 transition-colors">
                        Terms
                    </a> */}
                    <a href="https://www.facebook.com/GaryForGovernor" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 inline-block fill-zinc-200 text-white" viewBox="0 0 52.01 84"><path d="M42 20h8c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H38C25.87 0 16 9.87 16 22v10.16H2c-1.1 0-2 .9-2 2V50c0 1.1.9 2 2 2h12.61v30c0 1.1.9 2 2 2h16.7c1.1 0 2-.9 2-2V52h10.52a2 2 0 0 0 1.94-1.5l4.17-16a2 2 0 0 0-1.93-2.51h-14v-6c0-3.31 2.69-6 6-6H42Zm-8 16h13.41l-3.13 12H33.3c-1.1 0-2 .9-2 2v30H18.6V50c0-1.1-.9-2-2-2H3.99V36.16h14c1.1 0 2-.9 2-2V22c0-9.92 8.07-18 18-18h10v12h-6c-5.51 0-10 4.49-10 10v8c0 1.1.9 2 2 2Z" /></svg>
                    </a>
                </div>
            </div>
        </footer>
    )
}
