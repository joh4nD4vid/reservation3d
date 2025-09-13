import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clwhjmzqhcujqfqqhlax.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsd2hqbXpxaGN1anFmcXFobGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NzYzODgsImV4cCI6MjA2OTQ1MjM4OH0.OAkNzTgPY4ldi0qZ35IX1XZZNe1iMwRTqKdImZTznJM'

export const supabase = createClient(supabaseUrl, supabaseKey)

