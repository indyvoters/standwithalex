export async function verifyTurnstileToken(token: string) {
    const secret = process.env.TURNSTILE_SECRET_KEY
    if (!secret) {
        console.warn('TURNSTILE_SECRET_KEY is not set, skipping verification')
        return true // Fail open if secret is missing to avoid blocking users during dev if not configured
    }

    const formData = new FormData()
    formData.append('secret', secret)
    formData.append('response', token)

    try {
        const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            body: formData,
            method: 'POST',
        })

        const outcome = await result.json()
        return outcome.success
    } catch (e) {
        console.error('Turnstile verification error:', e)
        return false
    }
}
