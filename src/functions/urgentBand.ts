import { createServerFn } from '@tanstack/react-start'

export interface HygraphUrgentBand {
    id: string
    text: string
    url: string
    expiration: string
}

export const getUrgentBand = createServerFn({ method: 'GET' })
    .handler(async () => {
        const endpoint = 'https://us-west-2.cdn.hygraph.com/content/cmgfddqlp009007wb7eilssuj/master'
        const query = `
            query UrgentBands {
                urgentBands(first: 1, orderBy: createdAt_DESC) {
                    id
                    text
                    url
                    expiration
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
            const bands = json.data.urgentBands as HygraphUrgentBand[]

            if (!bands || bands.length === 0) {
                return null
            }

            const band = bands[0]
            const now = new Date()

            // Format current local date as YYYY-MM-DD
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const todayStr = `${year}-${month}-${day}`;

            // E.g., if todayStr is "2026-02-24" and expiration is "2026-02-25", it hasn't expired.
            // If todayStr is "2026-02-26" and expiration is "2026-02-25", it has expired.
            if (todayStr > band.expiration) {
                return null
            }

            return band
        } catch (error) {
            console.error('Error fetching UrgentBand from Hygraph:', error)
            return null
        }
    })
