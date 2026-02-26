import { createServerFn } from '@tanstack/react-start'

export const getAutocompleteSuggestions = createServerFn({ method: 'GET' })
    .inputValidator((searchInput: string) => searchInput)
    .handler(async ({ data: searchInput }) => {
        if (!searchInput) return []

        const apiKey = process.env.PUBLIC_GOOGLE_MAPS_API_KEY
        if (!apiKey) {
            console.error('Missing Google Maps API Key')
            return []
        }

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(searchInput)}&key=${apiKey}`
            )

            if (!response.ok) {
                console.error('Google Maps API Error:', response.status)
                return []
            }

            const data = await response.json()
            if (data.status === 'OK' && data.predictions) {
                return data.predictions.map((p: any) => ({
                    description: p.description,
                    place_id: p.place_id
                }))
            }

            return []
        } catch (error) {
            console.error('Error fetching address suggestions:', error)
            return []
        }
    })
