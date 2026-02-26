import { createServerFn } from '@tanstack/react-start'
import { verifyTurnstileToken } from '../lib/server/turnstile'
import { supabase } from '../lib/server/supabase'

type VolunteerData = {
    first_name: string
    last_name: string
    email: string
    phone: string
    opt_in: boolean
    webSource: string
    volunteer_roles: {
        selected: { role: string; category: string }[]
        other: string | null
    }
    notes?: string
    turnstileToken: string
}

export const submitVolunteer = createServerFn({ method: 'POST' })
    .inputValidator((data: VolunteerData) => data)
    .handler(async ({ data }) => {
        const { turnstileToken, ...rest } = data

        if (!turnstileToken) {
            return { success: false, message: 'Please complete the CAPTCHA.' }
        }

        const isValidToken = await verifyTurnstileToken(turnstileToken)
        if (!isValidToken) {
            return { success: false, message: 'CAPTCHA verification failed. Please try again.' }
        }

        try {
            const { error } = await supabase
                .from('Email Subscribers')
                .insert([rest])

            if (error) {
                console.error('Subscribe Error:', error)
                return { success: false, message: 'We had an error submitting your email. Please try again later.' }
            }

            return { success: true, message: 'We will be in touch!' }
        } catch (e) {
            console.error('Submission Exception:', e)
            return { success: false, message: 'An unexpected error occurred.' }
        }
    })
