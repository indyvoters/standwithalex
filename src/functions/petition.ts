import { createServerFn } from '@tanstack/react-start'
import { verifyTurnstileToken } from '../lib/server/turnstile'
import { supabase } from '../lib/server/supabase'

type PetitionData = {
    first_name: string
    last_name: string
    email: string
    phone: string
    address?: string
    webSource: string
    volunteer_roles: {
        selected: { role: string; category: string }[]
        other: string | null
    }
    notes?: string
    turnstileToken: string
}

export const submitPetition = createServerFn({ method: 'POST' })
    .inputValidator((data: PetitionData) => data)
    .handler(async ({ data }) => {
        const { turnstileToken, ...rest } = data

        if (!turnstileToken) {
            return { success: false, message: 'Please complete the CAPTCHA.' }
        }

        const isValidToken = await verifyTurnstileToken(turnstileToken)
        if (!isValidToken) {
            return { success: false, message: 'CAPTCHA verification failed. Please try again.' }
        }

        const fallbackToN8N = async () => {
            try {
                console.log('Attempting fallback to n8n...')
                const response = await fetch('https://indyvoters.app.n8n.cloud/webhook-test/f3fefb04-fb23-428c-b6cf-c76f5ebf5a48', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(rest)
                })

                if (response.ok) {
                    console.log('Fallback successful')
                    return { success: true, message: 'Thank you for standing with Gary!' }
                } else {
                    console.error('Fallback failed with status:', response.status)
                }
            } catch (err) {
                console.error('Fallback exception:', err)
            }
            return { success: false, message: 'We had an error submitting your information. Please try again later.' }
        }

        try {
            const { error } = await supabase
                .from('Email Subscribers')
                .insert([rest])

            if (error) {
                console.error('Petition Subscribe Error:', error)
                return await fallbackToN8N()
            }

            return { success: true, message: 'Thank you for standing with Gary!' }
        } catch (e) {
            console.error('Petition Submission Exception:', e)
            return await fallbackToN8N()
        }
    })
