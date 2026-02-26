import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getAutocompleteSuggestions } from '../functions/address'
import { X, MapPin, Loader2 } from 'lucide-react'

interface AddressAutocompleteProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    className?: string
}

export default function AddressAutocomplete({
    value = '',
    onChange,
    placeholder = 'Your Address',
    className = ''
}: AddressAutocompleteProps) {
    const [inputValue, setInputValue] = useState(value)
    const [predictions, setPredictions] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)


    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setInputValue(value)
    }, [value])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const fetchPredictions = useCallback(
        (() => {
            let timeoutId: ReturnType<typeof setTimeout>
            return (searchInput: string) => {
                clearTimeout(timeoutId)

                if (searchInput.trim().length < 3) {
                    setPredictions([])
                    setLoading(false)
                    return
                }

                timeoutId = setTimeout(async () => {
                    setLoading(true)
                    try {
                        const results = await getAutocompleteSuggestions({ data: searchInput })
                        setPredictions(results || [])
                    } catch (error) {
                        console.error('Failed to get predictions:', error)
                        setPredictions([])
                    } finally {
                        setLoading(false)
                    }
                }, 300)
            }
        })(),
        []
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        onChange?.(newValue)

        if (newValue.trim().length >= 3) {
            setShowSuggestions(true)
            fetchPredictions(newValue)
        } else {
            setShowSuggestions(false)
            setPredictions([])
        }
    }

    const handleSelect = (prediction: any) => {
        const description = prediction.description || ''
        setInputValue(description)
        onChange?.(description)
        setShowSuggestions(false)
        setPredictions([])
    }

    const handleClear = () => {
        setInputValue('')
        onChange?.('')
        setPredictions([])
        setShowSuggestions(false)
    }

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="relative">
                <input
                    type="text"
                    name={`loc-search-${Math.random().toString(36).slice(2, 8)}`}
                    autoComplete="nope"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-form-type="other"
                    data-lpignore="true"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => {
                        if (inputValue.trim().length >= 3) {
                            setShowSuggestions(true)
                        }
                    }}
                    placeholder={placeholder}
                    className={`w-full bg-zinc-800/30 border border-zinc-700 text-white text-base px-4 py-3 pr-10 focus:border-white focus:bg-zinc-800/50 outline-none transition-all placeholder-zinc-700 rounded-lg ${className}`}
                />

                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors flex items-center justify-center pt-0.5"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {showSuggestions && (loading || predictions.length > 0) && (
                <div className="absolute z-50 w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl overflow-hidden animate-fade-in-up">
                    <ul className="max-h-60 overflow-auto divide-y divide-zinc-800/50">
                        {loading && (
                            <li className="p-4 text-zinc-400 flex items-center justify-center gap-2 text-sm">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Finding addresses...
                            </li>
                        )}
                        {!loading && predictions.map((prediction) => (
                            <li key={prediction.place_id}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(prediction)}
                                    className="w-full text-left p-4 hover:bg-zinc-800 transition-colors flex items-start gap-3 group"
                                >
                                    <MapPin className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors shrink-0 mt-0.5" />
                                    <span className="text-zinc-300 group-hover:text-white text-sm transition-colors">
                                        {prediction.description}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
