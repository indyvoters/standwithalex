import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import { useEffect, useState } from "react"
import { getEvents, type HygraphEvent } from "@/functions/events"

const EventCard = ({
    eventName,
    location,
    eventDateTime,
    url,
}: HygraphEvent) => {
    const date = new Date(eventDateTime)
    const now = new Date()

    // Check if it's the same day (CST/local)
    const isToday = date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date)

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-4 transition-colors",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-col gap-1">
                <div className="flex items-center">
                    <h3 className="text-sm font-bold dark:text-white line-clamp-1">
                        {eventName}
                    </h3>
                    {isToday && (
                        <span className="shrink-0 ml-2 rounded-full bg-cyan-600 px-1.5 py-0.5 text-[10px] font-bold text-white animate-pulse">
                            TODAY
                        </span>
                    )}
                </div>
                <p className="text-xs font-bold text-blue-500 dark:text-blue-400 ">
                    {formattedDate}
                </p>
                <p className="text-xs font-medium dark:text-white/60">
                    {location} {location == 'Online' ? <b>• <span className="text-bold text-white">Click to Join</span></b> : ''}
                </p>
            </div>
        </a>
    )
}

export function MarqueeDemo() {
    const [events, setEvents] = useState<HygraphEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents()
                setEvents(data)
            } catch (error) {
                console.error("Failed to fetch events:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchEvents()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
        )
    }

    if (events.length === 0) {
        return null
    }

    return (
        <div className="relative w-full overflow-hidden py-14">
            <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2">
                {events.length > 0 && (
                    <Marquee pauseOnHover className="[--duration:40s]" repeat={10}>
                        {events.map((event, index) => (
                            <EventCard key={`${event.id}-${index}`} {...event} />
                        ))}
                    </Marquee>
                )}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#18181b] to-transparent z-10"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#18181b] to-transparent z-10"></div>
            </div>
        </div>
    )
}
