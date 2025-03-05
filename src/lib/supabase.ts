
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = 'https://egahpdotgfvajhywxenq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnYWhwZG90Z2Z2YWpoeXd4ZW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjc3MzEsImV4cCI6MjA1Njc0MzczMX0.m37zs_lOygmDawCriBzi904JuSCYJlHt3eUuwRUmygU';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
