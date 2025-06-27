import { createClient } from '@supabase/supabase-js';
 
const supabaseUrl = 'https://lpggmldmggcfagascant.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZ2dtbGRtZ2djZmFnYXNjYW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Nzc0NTMsImV4cCI6MjA2NjQ1MzQ1M30.vJh4HOv7OhAOHFWQrUaYoXE-iU729a4k5J4WXFL51u0';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 
 