import { Check, Loader2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import skillsData from '../data/volunteerRoles.json'
import { submitVolunteer } from '../functions/volunteer'

declare global {
    interface Window {
        turnstile: any
    }
}

export default function VolunteerForm() {
    const [activeCategory, setActiveCategory] = useState(skillsData[0].category)
    const [selections, setSelections] = useState<Set<string>>(new Set())
    const [otherRoleText, setOtherRoleText] = useState('')

    // Form State
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [notes, setNotes] = useState('')
    const [consent, setConsent] = useState(false)

    // Status
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    // Turnstile
    const turnstileContainer = useRef<HTMLDivElement>(null)
    const turnstileWidgetId = useRef<string | null>(null)
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

    useEffect(() => {
        const initTurnstile = () => {
            if (window.turnstile && turnstileContainer.current) {
                if (!turnstileWidgetId.current) {
                    turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
                        sitekey: import.meta.env.VITE_PUBLIC_TURNSTILE_SITE_KEY,
                        callback: (token: string) => setTurnstileToken(token),
                        'expired-callback': () => setTurnstileToken(null),
                        'error-callback': () => {
                            setTurnstileToken(null)
                            setErrorMessage('Verification failed. Please try again.')
                            setSubmissionStatus('error')
                        },
                    })
                }
            } else {
                setTimeout(initTurnstile, 100)
            }
        }
        initTurnstile()

        return () => {
            if (window.turnstile && turnstileWidgetId.current) {
                try {
                    window.turnstile.remove(turnstileWidgetId.current)
                    turnstileWidgetId.current = null
                } catch (e) {
                    // ignore
                }
            }
        }
    }, [])

    const toggleSelection = (role: string) => {
        const newSelections = new Set(selections)
        if (newSelections.has(role)) {
            newSelections.delete(role)
        } else {
            newSelections.add(role)
        }
        setSelections(newSelections)
    }

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // Strip non-digits
        const digits = value.replace(/\D/g, '').slice(0, 10)

        // Format
        let formatted = digits
        if (digits.length > 6) {
            formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
        } else if (digits.length > 3) {
            formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`
        } else if (digits.length > 0) {
            formatted = `(${digits}`
        }

        setPhone(formatted)
    }

    const getRawPhone = () => phone.replace(/\D/g, '')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!turnstileToken) {
            setErrorMessage('Please complete the CAPTCHA.')
            setSubmissionStatus('error')
            return
        }

        if (!email.trim() && !getRawPhone()) {
            setErrorMessage('Please provide either an email address or a phone number.')
            setSubmissionStatus('error')
            return
        }

        setIsSubmitting(true)
        setErrorMessage('')

        const selectedRoles = Array.from(selections).map(role => {
            // Find category for role
            const category = skillsData.find(cat => cat.options.includes(role))
            return {
                role,
                category: category ? category.category : 'Unknown'
            }
        })

        const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone: getRawPhone(),
            opt_in: consent,
            webSource: 'STANDWITHGARY.COM',
            turnstileToken,
            notes: notes.trim() || undefined,
            volunteer_roles: {
                selected: selectedRoles,
                other: otherRoleText || null
            }
        }

        try {
            const result = await submitVolunteer({ data: payload })
            if (result.success) {
                setSubmissionStatus('success')
                // Reset form
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setNotes('')
                setConsent(false)
                setSelections(new Set())
                setOtherRoleText('')
            } else {
                setSubmissionStatus('error')
                setErrorMessage(result.message || 'An error occurred.')
            }
        } catch (err) {
            setSubmissionStatus('error')
            setErrorMessage('An unexpected error occurred.')
            console.error(err)
        } finally {
            setIsSubmitting(false)
            // Reset Turnstile after every submission attempt (success or failure)
            setTurnstileToken(null)
            if (window.turnstile && turnstileWidgetId.current) {
                window.turnstile.reset(turnstileWidgetId.current)
            }
        }
    }

    const activeCategoryData = skillsData.find(c => c.category === activeCategory)

    // Calculate selection counts
    const getCategoryCount = (catName: string) => {
        if (catName === 'Other') {
            return otherRoleText ? 1 : 0
        }
        const cat = skillsData.find(c => c.category === catName)
        if (!cat) return 0
        return cat.options.filter(opt => selections.has(opt)).length
    }

    const totalSelected = selections.size + (otherRoleText ? 1 : 0)

    return (
        <section
            className="w-full max-w-7xl bg-black px-6 md:px-12 lg:px-24 py-24 border-b border-zinc-800 relative z-10"
            id="volunteer"
        >
            {submissionStatus === 'success' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white text-zinc-900 max-w-md w-full p-8 rounded-lg shadow-2xl flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-6">
                            <Check className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-2">Thank You!</h3>
                        <p className="text-zinc-600 mb-8 leading-relaxed">
                            We can't wait to have you join this movement. You'll hear from us soon about next steps.
                        </p>
                        <button
                            onClick={() => setSubmissionStatus('idle')}
                            className="w-full bg-zinc-900 text-white font-bold uppercase tracking-widest py-4 px-8 hover:bg-zinc-800 transition-colors"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            )}

            <h2 className="scroll-element font-serif font-medium text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-white mb-12">
                Get Involved.
            </h2>
            <div className="mb-16 scroll-element">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h2 className="font-serif font-medium text-4xl md:text-5xl text-white tracking-tight max-w-2xl">
                        What are your skills?
                    </h2>
                    <div className="flex items-center gap-3 bg-zinc-800 px-4 py-2 rounded-full border border-zinc-700">
                        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            Total Selected
                        </span>
                        <span className="bg-white text-zinc-900 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
                            {totalSelected}
                        </span>
                    </div>
                </div>
                <p className="mt-6 text-zinc-400 text-sm max-w-3xl leading-relaxed">
                    We're looking for people to lead and participate in all aspects of
                    this campaign. Your time is valuable and your skills and heart will
                    make a real difference.
                </p>
            </div>

            <div
                className="flex flex-col lg:flex-row gap-12 lg:gap-24 scroll-element"
                style={{ transitionDelay: '100ms' }}
            >
                {/* Category Selection */}
                <div className="w-full lg:w-1/3 flex flex-col gap-1">
                    {skillsData.map((cat, index) => {
                        const isActive = cat.category === activeCategory
                        const count = getCategoryCount(cat.category)

                        return (
                            <button
                                key={cat.category}
                                type="button"
                                className={`group flex items-center justify-between px-5 py-4 w-full text-left transition-all border-l-2 ${isActive
                                    ? 'border-white bg-zinc-800 text-white'
                                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                                    }`}
                                onClick={() => setActiveCategory(cat.category)}
                            >
                                <span className="text-sm font-medium tracking-wide uppercase">
                                    {cat.category}
                                </span>
                                {count > 0 && (
                                    <span className="bg-zinc-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        {count}
                                    </span>
                                )}
                            </button>
                        )
                    })}

                    {/* Other Category */}
                    <button
                        type="button"
                        className={`group flex items-center justify-between px-5 py-4 w-full text-left transition-all border-l-2 ${activeCategory === 'Other'
                            ? 'border-white bg-zinc-800 text-white'
                            : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                            }`}
                        onClick={() => setActiveCategory('Other')}
                    >
                        <span className="text-sm font-medium tracking-wide uppercase">
                            Other
                        </span>
                        {otherRoleText && (
                            <span className="bg-zinc-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                1
                            </span>
                        )}
                    </button>
                </div>

                {/* Skills & Contact Form */}
                <div className="w-full lg:w-2/3">
                    {/* Dynamic Skills Grid */}
                    <div className="min-h-[300px] mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-lg font-semibold text-white uppercase tracking-wide">
                                {activeCategory} Skills
                            </h3>
                            <div className="h-[1px] flex-1 bg-zinc-800"></div>
                        </div>

                        {activeCategory === 'Other' ? (
                            <div className="space-y-4">
                                <label className="block space-y-3">
                                    <span className="text-zinc-400 text-sm">I can also do...</span>
                                    <input
                                        type="text"
                                        value={otherRoleText}
                                        onChange={(e) => setOtherRoleText(e.target.value)}
                                        placeholder="Tell us what else you can do"
                                        className="w-full bg-zinc-800/50 border border-zinc-700 text-white text-lg px-4 py-4 focus:border-white focus:bg-zinc-800 focus:ring-0 outline-none transition-all placeholder-zinc-600"
                                    />
                                </label>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activeCategoryData?.options.map((opt) => {
                                    const isChecked = selections.has(opt)
                                    return (
                                        <div
                                            key={opt}
                                            className={`group cursor-pointer select-none flex items-start gap-3 p-4 border transition-all ${isChecked
                                                ? 'border-white bg-zinc-800/50'
                                                : 'border-zinc-800 hover:border-zinc-600 bg-transparent'
                                                }`}
                                            onClick={() => toggleSelection(opt)}
                                        >
                                            <div
                                                className={`relative flex-shrink-0 w-5 h-5 mt-0.5 border ${isChecked
                                                    ? 'border-white bg-white'
                                                    : 'border-zinc-600 group-hover:border-zinc-400'
                                                    } transition-colors flex items-center justify-center`}
                                            >
                                                <Check
                                                    className={`text-black w-3.5 h-3.5 ${isChecked ? 'opacity-100' : 'opacity-0'
                                                        } transition-opacity stroke-[3]`}
                                                />
                                            </div>
                                            <span
                                                className={`text-sm ${isChecked
                                                    ? 'text-white'
                                                    : 'text-zinc-400 group-hover:text-zinc-200'
                                                    } transition-colors leading-relaxed`}
                                            >
                                                {opt}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Contact Details */}
                    <div className="pt-12 border-t border-zinc-800">
                        <h3 className="text-lg font-semibold text-white uppercase tracking-wide mb-8">
                            Your Details
                        </h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="bg-zinc-800/30 border border-zinc-700 text-white text-base px-4 py-3 focus:border-white focus:bg-zinc-800/50 outline-none transition-all placeholder-zinc-700"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="bg-zinc-800/30 border border-zinc-700 text-white text-base px-4 py-3 focus:border-white focus:bg-zinc-800/50 outline-none transition-all placeholder-zinc-700"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-zinc-800/30 border border-zinc-700 text-white text-base px-4 py-3 focus:border-white focus:bg-zinc-800/50 outline-none transition-all placeholder-zinc-700"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    maxLength={14}
                                    value={phone}
                                    onChange={handlePhoneInput}
                                    className="bg-zinc-800/30 border border-zinc-700 text-white text-base px-4 py-3 focus:border-white focus:bg-zinc-800/50 outline-none transition-all placeholder-zinc-700"
                                    placeholder="(555) 555-5555"
                                />
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                                    Any comments or questions?
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                    className="bg-zinc-800/30 border border-zinc-700 text-white text-base px-4 py-3 focus:border-white focus:bg-zinc-800/50 outline-none transition-all placeholder-zinc-700 resize-none"
                                    placeholder="Let us know if you have any questions or additional information..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <div className={`relative flex-shrink-0 w-5 h-5 mt-0.5 border ${consent ? 'border-white bg-white' : 'border-zinc-600 group-hover:border-zinc-400'
                                        } transition-colors flex items-center justify-center`}>
                                        <Check className={`text-black w-3.5 h-3.5 ${consent ? 'opacity-100' : 'opacity-0'} transition-opacity stroke-[3]`} />
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={consent}
                                        onChange={(e) => setConsent(e.target.checked)}
                                    />
                                    <div className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                                        Agreement for communications by providing your email/phone number and clicking 'Submit Application,' you consent to receive periodic updates via email/text message from the Independence Party regarding progress and events.
                                        <br /><br />
                                        Agreement is not a condition of any purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt-out at any time. Email/phone will not be shared with third parties for marketing purposes.
                                    </div>
                                </label>
                            </div>

                            <div className="md:col-span-2 flex flex-col gap-6 mt-4">
                                <div ref={turnstileContainer} className="cf-turnstile"></div>

                                {errorMessage && (
                                    <div className="p-4 bg-red-900/30 border border-red-800 text-red-200 text-sm">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !turnstileToken}
                                        className="bg-white text-zinc-900 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {isSubmitting ? 'Joining...' : 'Submit Application'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
