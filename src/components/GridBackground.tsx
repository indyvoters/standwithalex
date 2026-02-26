export default function GridBackground() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 flex justify-between px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto">
            <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-800 left-6 md:left-12 lg:left-24"></div>
            <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-800 left-1/4 hidden md:block opacity-30"></div>
            <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-800 left-1/2 hidden lg:block opacity-50"></div>
            <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-800 left-3/4 hidden md:block opacity-30"></div>
            <div className="absolute top-0 bottom-0 w-[1px] bg-zinc-800 right-6 md:right-12 lg:right-24"></div>
        </div>
    )
}
