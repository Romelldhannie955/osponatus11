import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company: string;
  status: string;
  tags: string[];
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: string;
  scheduled_for: string | null;
  sent_at: string | null;
  target_tags: string[];
  ai_personalized: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerInteraction {
  id: string;
  customer_id: string;
  interaction_type: string;
  description: string;
  metadata: Record<string, any>;
  created_at: string;
}
