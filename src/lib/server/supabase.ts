import { createClient } from '@supabase/supabase-js'

const getEnv = (key: string) => {
    // Check process.env first (server-side standard)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
        return process.env[key]
    }
    // Check import.meta.env (client-side/Vite standard)
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
        return (import.meta as any).env[key]
    }
    return undefined
}

const supabaseUrl = getEnv('SUPABASE_URL') || getEnv('VITE_SUPABASE_URL') || getEnv('VITE_PUBLIC_SUPABASE_URL')
const supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('PRIVATE_SUPABASE_KEY') || getEnv('SUPABASE_KEY') || getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('VITE_PUBLIC_SUPABASE_ANON_KEY')

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
