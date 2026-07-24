import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Read endpoints and keys from environment variables with safe defaults for development.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://lxdchlxdcuacvcdjtpwn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL) {
  throw new Error("Missing VITE_SUPABASE_URL environment variable.");
}
if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_SUPABASE_ANON_KEY environment variable. Copy .env.example to .env to set it up.");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);