import { Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { submitPetition } from '../functions/petition'
import AddressAutocomplete from './AddressAutocomplete'

declare global {
    interface Window {
        turnstile: any
    }
}

export default function PetitionForm() {
    // Form data
    const [gatherSignatures, setGatherSignatures] = useState<string>('Yes')
    const [notary, setNotary] = useState<string>('')
    const [hostPickup, setHostPickup] = useState('')

    // Accordion States
    const [isGatherOpen, setIsGatherOpen] = useState(false)
    const [isNotaryOpen, setIsNotaryOpen] = useState(false)
    const [isHostOpen, setIsHostOpen] = useState(false)

    // Step Data
    const [deliveryMethod, setDeliveryMethod] = useState('')
    const [address, setAddress] = useState('')
    const [step, setStep] = useState<1 | 2>(1)

    // Contact Details
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    // Status
    const [isSubmitting, setIsSubmitting] = useState(false)
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


    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const digits = value.replace(/\D/g, '').slice(0, 10)
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
            return
        }

        if (!email.trim() && !getRawPhone()) {
            setErrorMessage('Please provide either an email address or a phone number.')
            return
        }

        setIsSubmitting(true)
        setErrorMessage('')

        if (deliveryMethod === 'I need it mailed' && !address.trim()) {
            setErrorMessage('Please provide your mailing address.')
            setIsSubmitting(false)
            return
        }

        // Construct payload
        const selectedRoles = []
        if (gatherSignatures === 'Yes') selectedRoles.push({ role: 'Gather Signatures', category: 'Petition' })


        if (notary === 'Yes') selectedRoles.push({ role: 'Notary', category: 'Petition' })
        if (notary === 'Tell me more!') selectedRoles.push({ role: 'Interested in Notary', category: 'Petition' })

        if (deliveryMethod) {
            selectedRoles.push({ role: `Delivery: ${deliveryMethod}`, category: 'Petition' })
        }

        const notes = hostPickup ? `Hosting Pickup Location: ${hostPickup}` : ''

        const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone: getRawPhone(),
            address: deliveryMethod === 'I need it mailed' && address ? address : '',
            webSource: 'STANDWITHGARY.COM/petition',
            turnstileToken,
            volunteer_roles: {
                selected: selectedRoles,
                other: null
            },
            notes
        }

        try {
            const result = await submitPetition({ data: payload })
            if (result.success) {
                setStep(2)
                window.scrollTo({ top: 0, behavior: 'smooth' })
                // Reset form fields except delivery choices so we can show address logic in step 2 if needed
                setFirstName('')
                setLastName('')
                setEmail('')
                setPhone('')
                setGatherSignatures('')
                setNotary('')
                setHostPickup('')
            } else {
                setErrorMessage(result.message || 'An error occurred.')
            }
        } catch (err) {
            setErrorMessage('An unexpected error occurred.')
            console.error(err)
        } finally {
            setIsSubmitting(false)
            setTurnstileToken(null)
            if (window.turnstile && turnstileWidgetId.current) {
                window.turnstile.reset(turnstileWidgetId.current)
            }
        }
    }

    return (
        <section className="w-full max-w-7xl mx-auto bg-black border border-zinc-800 rounded-xl overflow-visible shadow-2xl relative z-10 mb-24">
            {step === 2 ? (
                <div className="p-8 md:p-12 text-left animate-fade-in-up">
                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">Get Your Materials</h3>
                    <p className="text-zinc-400 mb-10 text-lg">
                        Thank you for standing with Gary. Here is everything you need to start gathering signatures.
                    </p>

                    <div className="w-full max-w-3xl mx-auto aspect-video mb-10 rounded-xl overflow-hidden border border-zinc-800 shadow-lg">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/wpabGtp7ios"
                            title="Petition Instructions Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
                        <a href="https://drive.google.com/file/d/12Om33PB0oRT68KJfBxn44evSgXK4ch1_/view?usp=sharing" target="_blank" className="flex-1 bg-white text-zinc-900 font-bold uppercase tracking-widest py-4 px-8 hover:bg-zinc-200 transition-colors flex items-center justify-center rounded">
                            Print/Download Petition
                        </a>
                        <a href="/2026_petitioning_guide.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 border border-white text-white font-bold uppercase tracking-widest py-4 px-8 hover:bg-white/10 transition-colors flex items-center justify-center rounded" download>
                            Instructions Download
                        </a>
                    </div>

                    <p className="text-zinc-400 text-center text-lg">
                        Now, please help us fund this effort:{' '}
                        <a href="https://secure.anedot.com/gary-pierce-for-governor/donate" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">
                            Please Donate Now
                        </a>
                    </p>

                    <p className="text-zinc-400 text-center text-lg mt-6">
                        Get started <strong className="text-white">right now</strong> by joining our{' '}
                        <a href="https://join.slack.com/t/independenceparty/shared_invite/zt-3pf8dtr5v-ks0WGBk3ic7NHQmn1erxBQ" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 transition-colors">
                            Slack channel
                        </a>!
                    </p>
                    <div className="flex justify-center mt-4">
                        <a href="https://join.slack.com/t/independenceparty/shared_invite/zt-3pf8dtr5v-ks0WGBk3ic7NHQmn1erxBQ" target="_blank" rel="noopener noreferrer" className="border border-white text-white font-bold uppercase tracking-widest py-3 px-8 hover:bg-white/10 transition-colors rounded">
                            Join Slack
                        </a>
                    </div>

                    {deliveryMethod === 'I need it mailed' && address && (
                        <div className="mt-8 p-6 bg-zinc-800/50 rounded-lg border border-zinc-700 text-left">
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-400" />
                                Mail Request Received
                            </h4>
                            <p className="text-zinc-400">
                                We'll be mailing your petition materials to:<br />
                                <span className="text-white mt-2 block">{address}</span>
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-8 md:p-12">
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">Petition for Gary</h3>
                    <p className="text-zinc-400 mb-4 leading-relaxed">
                        Help Gary get on the ballot. Download the petition file and instructions to start gathering signatures.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Gather Signatures Accordion */}
                        <div className="border border-zinc-800 rounded-lg overflow-visible bg-zinc-900/20">
                            <button
                                type="button"
                                onClick={() => setIsGatherOpen(!isGatherOpen)}
                                className="w-full flex items-center justify-between  py-2 px-4  bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-left"
                            >
                                <div>
                                    <h4 className="text-white font-medium text-lg uppercase tracking-wide">Will you help gather petition signatures?</h4>
                                    <p className="text-zinc-400 text-sm mt-1">{gatherSignatures || 'Select your preference'}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {gatherSignatures && (
                                        <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">
                                            <Check className="w-3.5 h-3.5" />
                                        </span>
                                    )}
                                    {isGatherOpen ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                </div>
                            </button>

                            {isGatherOpen && (
                                <div className="p-6  bg-black">
                                    <div className="grid gap-3">
                                        {['Yes', 'No', "No, but I'll help in other ways"].map((option) => (
                                            <label key={option} className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${gatherSignatures === option ? 'bg-zinc-800 border-white' : 'border-zinc-800 hover:border-zinc-600'}`}>
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${gatherSignatures === option ? 'border-white' : 'border-zinc-600'}`}>
                                                    {gatherSignatures === option && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="gatherSignatures"
                                                    value={option}
                                                    checked={gatherSignatures === option}
                                                    onChange={(e) => setGatherSignatures(e.target.value)}
                                                    className="hidden"
                                                />
                                                <span className={gatherSignatures === option ? 'text-white' : 'text-zinc-400'}>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Delivery Method */}
                        <div className="space-y-4 pt-4 /50">
                            <label className="block text-white font-medium text-lg">
                                How would you like to receive your petition materials?
                            </label>
                            <div className="grid gap-3 md:grid-cols-2">
                                {['I will print myself', 'I need it mailed'].map((option) => (
                                    <label key={option} className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${deliveryMethod === option ? 'bg-zinc-800 border-white' : 'border-zinc-800 hover:border-zinc-600'}`}>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${deliveryMethod === option ? 'border-white' : 'border-zinc-600'}`}>
                                            {deliveryMethod === option && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="deliveryMethod"
                                            value={option}
                                            checked={deliveryMethod === option}
                                            onChange={(e) => setDeliveryMethod(e.target.value)}
                                            className="hidden"
                                        />
                                        <span className={deliveryMethod === option ? 'text-white' : 'text-zinc-400'}>{option}</span>
                                    </label>
                                ))}
                            </div>

                            {deliveryMethod === 'I need it mailed' && (
                                <div className="space-y-4 animate-fade-in-up mt-6">
                                    <label className="block text-white font-medium text-lg">
                                        What is your mailing address?
                                    </label>
                                    <AddressAutocomplete
                                        value={address}
                                        onChange={setAddress}
                                        placeholder="Enter your address"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Contact Details */}
                        <div className="pt-2 ">
                            {/* <h4 className="text-lg font-semibold text-white uppercase tracking-wide mb-6">Your Details</h4> */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium uppercase tracking-widesttext-zinc-300">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-zinc-800/30 border border-zinc-700 text-white px-4 py-3 mt-2 focus:border-white outline-none transition-all rounded"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium uppercase tracking-widesttext-zinc-300">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full bg-zinc-800/30 border border-zinc-700 text-white px-4 py-3 mt-2 focus:border-white outline-none transition-all rounded"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium uppercase tracking-widesttext-zinc-300">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-zinc-800/30 border border-zinc-700 text-white px-4 py-3 mt-2 focus:border-white outline-none transition-all rounded"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium uppercase tracking-widesttext-zinc-300">Phone</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneInput}
                                        className="w-full bg-zinc-800/30 border border-zinc-700 text-white px-4 py-3 mt-2 focus:border-white outline-none transition-all rounded"
                                        placeholder="(555) 555-5555"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notary Accordion (optional) */}
                        <div className="border border-zinc-800 rounded-lg overflow-visible bg-zinc-900/20">
                            <button
                                type="button"
                                onClick={() => setIsNotaryOpen(!isNotaryOpen)}
                                className="w-full flex items-center justify-between py-2 px-6 bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-left"
                            >
                                <div>
                                    <h4 className="text-white font-medium text-lg uppercase tracking-wide">Will you train as a Notary?</h4>
                                    <p className="text-zinc-400 text-sm mt-1">Optional</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {notary && (
                                        <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">
                                            <Check className="w-3.5 h-3.5" />
                                        </span>
                                    )}
                                    {isNotaryOpen ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                </div>
                            </button>

                            {isNotaryOpen && (
                                <div className="p-6 bg-black">
                                    <div className="grid gap-3 md:grid-cols-3">
                                        {['Yes', 'No', 'Tell me more!'].map((option) => (
                                            <label key={option} className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${notary === option ? 'bg-zinc-800 border-white' : 'border-zinc-800 hover:border-zinc-600'}`}>
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${notary === option ? 'border-white' : 'border-zinc-600'}`}>
                                                    {notary === option && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="notary"
                                                    value={option}
                                                    checked={notary === option}
                                                    onChange={(e) => setNotary(e.target.value)}
                                                    className="hidden"
                                                />
                                                <span className={notary === option ? 'text-white' : 'text-zinc-400'}>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Host Pickup Accordion (optional) */}
                        <div className="border border-zinc-800 rounded-lg overflow-visible bg-zinc-900/20">
                            <button
                                type="button"
                                onClick={() => setIsHostOpen(!isHostOpen)}
                                className="w-full flex items-center justify-between  py-2 px-6  bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-left"
                            >
                                <div>
                                    <h4 className="text-white font-medium text-lg uppercase tracking-wide">Will you host a petition pickup location?</h4>
                                    <p className="text-zinc-400 text-sm mt-1">Optional</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {hostPickup && (
                                        <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">
                                            <Check className="w-3.5 h-3.5" />
                                        </span>
                                    )}
                                    {isHostOpen ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                                </div>
                            </button>

                            {isHostOpen && (
                                <div className="p-6  bg-black">
                                    <label className="block text-white font-medium mb-4">
                                        Where will you host it?
                                    </label>
                                    <AddressAutocomplete
                                        value={hostPickup}
                                        onChange={setHostPickup}
                                        placeholder="Enter your address"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-start">
                            <div ref={turnstileContainer} className="cf-turnstile"></div>
                        </div>
                        {/* Submit & Turnstile */}
                        <div className="pt-6">
                            {errorMessage && (
                                <div className="p-4 bg-red-900/30 border border-red-800 text-red-200 text-sm mb-6 rounded">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !turnstileToken}
                                    className="ml-auto bg-white text-zinc-900 font-bold uppercase tracking-widest py-4 px-8 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded border border-white"
                                >
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isSubmitting ? 'Submitting...' : 'Get Petitions'}
                                </button>
                            </div>

                        </div>

                    </form>
                </div>
            )}
        </section>
    )
}
