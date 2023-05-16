import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRneGFvd3NvZGpqbnV5cWFzd2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzMDg5MTEsImV4cCI6MTk5ODg4NDkxMX0.chMR1t2X-F-R2Y4LbNETyvRKSWMqkrjnzpHD5Uu2i1A"
const SUPABASE_URL = "https://tgxaowsodjjnuyqaswdp.supabase.co"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);