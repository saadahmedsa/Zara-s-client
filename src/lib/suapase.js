import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gxsrukksygzccakfgrca.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4c3J1a2tzeWd6Y2Nha2ZncmNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMzk2NzQsImV4cCI6MjA1MzcxNTY3NH0.E1VrOM8w4X-MYUthSUY5F-i3xkYaIM2xzHg9EGzXukY"; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
