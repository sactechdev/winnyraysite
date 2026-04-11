import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * SQL for creating the bookings table in Supabase:
 * 
 * create table bookings (
 *   id uuid default uuid_generate_v4() primary key,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
 *   client_name text not null,
 *   client_email text,
 *   client_phone text not null,
 *   service_type text not null,
 *   address text not null,
 *   city text not null,
 *   instructions text,
 *   status text default 'pending'
 * );
 * 
 * -- Enable RLS
 * alter table bookings enable row level security;
 * 
 * -- Create policy to allow anyone to insert (for the quote form)
 * create policy "Allow public insert" on bookings for insert with check (true);
 * 
 * -- Create policy to allow authenticated users to select (for admin dashboard)
 * create policy "Allow auth select" on bookings for select using (auth.role() = 'authenticated');
 */

export type UserRole = 'admin' | 'customer' | 'agent';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
}
