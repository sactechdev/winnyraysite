import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * SUPABASE SCHEMA SETUP
 * 
 * For full database schema including tables for bookings, site settings, 
 * properties, and user profiles, please refer to the 'supabase-schema.sql' 
 * file in the project root.
 * 
 * Quick Start for Bookings Table:
 * 
 * CREATE TABLE bookings (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   client_name TEXT NOT NULL,
 *   client_email TEXT,
 *   client_phone TEXT NOT NULL,
 *   service_type TEXT NOT NULL,
 *   address TEXT,
 *   city TEXT DEFAULT 'Kano',
 *   instructions TEXT,
 *   status TEXT DEFAULT 'pending'
 * );
 * 
 * ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Allow public insert" ON bookings FOR INSERT WITH CHECK (true);
 */

export type UserRole = 'admin' | 'customer' | 'agent';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
}
