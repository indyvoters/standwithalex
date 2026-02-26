import { Link, useLoaderData } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LandingHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { urgentBand } = useLoaderData({ from: '__root__' })

    // Handle body scroll locking
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMenuOpen])

    return (
        <>
            {urgentBand && (
                <div className={`fixed top-0 w-full bg-[#cc0000] text-white flex items-center justify-center py-2 px-4 shadow-md font-bold tracking-widest uppercase z-[700] transition-transform duration-300 ${isMenuOpen ? '-translate-y-full' : 'translate-y-0'}`}>
                    <a href={urgentBand.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 text-sm md:text-base">
                        {urgentBand.text} <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            )}

            <nav className={`fixed w-full transition-all duration-300 ${isMenuOpen ? 'z-[600] top-0 bg-transparent' : `z-[100] ${urgentBand ? 'top-10' : 'top-0'} glass-panel border-b border-zinc-800`}`}>
                <div className="md:px-12 lg:px-24 flex h-20 max-w-[1920px] mr-auto ml-auto pr-6 pl-6 items-center justify-between">
                    {/* Logo - Hidden when menu is open as requested/implied by user change */}
                    <Link
                        to="/"
                        className={`z-[110] hover:opacity-80 transition-opacity mix-blend-difference`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img
                            src="/GARYforgov.svg"
                            alt="Gary for Gov"
                            className="h-auto mt-8 w-[200px]"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center text-center space-x-8">
                        <a
                            href="https://secure.anedot.com/gary-pierce-for-governor/donate" target="_blank"
                            className="text-sm text-zinc-200 hover:text-white text-center transition-colors tracking-wide uppercase underline underline-offset-8"
                        >
                            Donate
                        </a>
                        <Link
                            to="/petition"
                            className="border-zinc-200 text-zinc-200 text-bold text-md border px-8 py-2 cursor-pointer bg-none hover:text-white uppercase tracking-widest border-2 font-medium hover:bg-zinc-800 transition-colors"
                        >
                            Petition Drive
                        </Link>
                        <a href="/#volunteer" className="border-zinc-200 text-zinc-950 text-bold text-md border px-8 py-2 cursor-pointer bg-zinc-200 hover:text-white uppercase tracking-widest border-2 font-medium hover:bg-zinc-800 transition-colors">
                            Join Us
                        </a>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button
                        className="md:hidden text-white z-[500] p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - MOVED OUTSIDE NAV to avoid backdrop-filter clipping */}
            <div
                className={`fixed inset-0 bg-zinc-950/98 backdrop-blur-xl z-[400] md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-12 p-8">
                    <nav className="flex flex-col items-center space-y-10 text-center">
                        <Link
                            to="/"
                            className="text-3xl text-zinc-400 text-center hover:text-white transition-all tracking-[0.2em] uppercase font-light hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/petition"
                            className="text-3xl text-zinc-400 text-center hover:text-white transition-all tracking-[0.2em] uppercase font-light hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Petition Drive
                        </Link>
                        <a
                            href="https://secure.anedot.com/gary-pierce-for-governor/donate" target="_blank"
                            className="text-3xl text-zinc-400 text-center hover:text-white transition-all tracking-[0.2em] uppercase font-light hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Donate
                        </a>
                        <a
                            href="/#volunteer"
                            className="text-3xl text-zinc-400 hover:text-white transition-all tracking-[0.2em] uppercase font-light hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Join Us
                        </a>
                    </nav>

                    <div className="mt-16 pt-16 border-t border-zinc-900 w-48 flex flex-col items-center space-y-8">
                        <img
                            src="/GARYforgov.svg"
                            alt="Alex Cabrera for Lieutenant Governor"
                            className="h-auto w-32 opacity-20"
                        />
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-medium text-center">
                            Standing With Illinois
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
