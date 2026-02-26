import { createServerFn } from '@tanstack/react-start'

export interface HygraphEvent {
    createdAt: string
    eventName: string
    id: string
    location: string
    url: string
    eventDateTime: string
}

export const getEvents = createServerFn({ method: 'GET' })
    .handler(async () => {
        const endpoint = 'https://us-west-2.cdn.hygraph.com/content/cmgfddqlp009007wb7eilssuj/master'
        const query = `
            query Events {
                events(orderBy: eventDateTime_ASC, first: 100) {
                    createdAt
                    eventName
                    id
                    location
                    url
                    eventDateTime
                }
            }
        `
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            })

            const json = await response.json()
            const events = json.data.events as HygraphEvent[]

            const now = new Date()
            const ONE_DAY_MS = 24 * 60 * 60 * 1000

            // Filter out events that are a day or more in the past
            return events
                .filter(event => {
                    const eventDate = new Date(event.eventDateTime)
                    return now.getTime() - eventDate.getTime() < ONE_DAY_MS
                })
                .sort((a, b) => new Date(a.eventDateTime).getTime() - new Date(b.eventDateTime).getTime())
        } catch (error) {
            console.error('Error fetching events from Hygraph:', error)
            return []
        }
    })
