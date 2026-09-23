import { createClient } from '@supabase/supabase-js';

// Supabase configuration using publishable key
export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || 'https://tjlustmzdjykstqsnevw.supabase.co').trim();
export const SUPABASE_PUBLISHABLE_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_hJTZ1Yaw-ilzbMyS70agZA_LK2NsWZ5').trim();

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Candidate table names to support existing schemas without collision
const CONTACT_TABLE_CANDIDATES = ['contact_messages', 'contact_submissions', 'contacts', 'messages'];
const EVENT_TABLE_CANDIDATES = ['portfolio_events', 'analytics_events', 'events'];

// Session generator for anonymous analytics
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let sid = sessionStorage.getItem('portfolio_session_id');
  if (!sid) {
    sid = 'sid_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    sessionStorage.setItem('portfolio_session_id', sid);
  }
  return sid;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TrackEventPayload {
  eventType: string;
  eventData?: Record<string, any>;
  path?: string;
}

export interface OwnerDashboardStats {
  connected: boolean;
  url: string;
  contactCount: number;
  recentContacts: Array<{
    id?: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    created_at?: string;
    source?: string;
  }>;
  totalEvents: number;
  recentEvents: Array<{
    id?: string;
    event_type: string;
    event_data?: any;
    created_at?: string;
    path?: string;
  }>;
  eventTypeCounts: Record<string, number>;
  tableStatus: {
    contactTable: string | null;
    eventsTable: string | null;
  };
}

/**
 * Submit contact form directly to public.contact_messages in Supabase.
 * Awaits the database response and never returns fake success.
 */
export async function submitContactForm(payload: ContactSubmissionPayload): Promise<{
  success: boolean;
  error?: string;
}> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const subject = payload.subject.trim();
  const message = payload.message.trim();

  // Validate fields before insert
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      error: 'Please fill in all required fields.',
    };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: 'Please provide a valid email address.',
    };
  }

  try {
    // Insert into public.contact_messages and await the Supabase response
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        subject,
        message,
      });

    // Explicit error check
    if (error) {
      console.error('[Supabase Diagnostics] Failed to insert into contact_messages:', error);
      return {
        success: false,
        error: 'Unable to send your message right now. Please try again.',
      };
    }

    // Success confirmed by Supabase
    return { success: true };
  } catch (err: any) {
    console.error('[Supabase Diagnostics] Unexpected submission error:', err);
    return {
      success: false,
      error: 'Unable to send your message right now. Please try again.',
    };
  }
}

/**
 * Track user engagement and portfolio analytics safely.
 */
export async function trackEvent(
  eventType: string,
  eventData: Record<string, any> = {},
  path?: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  const payload = {
    event_type: eventType,
    event_data: eventData,
    path: path || window.location.pathname + window.location.hash,
    session_id: getSessionId(),
    user_agent: navigator.userAgent?.substring(0, 200),
    referrer: document.referrer?.substring(0, 200) || 'direct',
  };

  for (const tableName of EVENT_TABLE_CANDIDATES) {
    try {
      const { error } = await supabase.from(tableName).insert([payload]);
      if (!error) return; // logged successfully
      if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
        continue;
      }
    } catch {
      // Non-blocking telemetry
    }
  }

  // Also log to console in dev mode or engineering mode for telemetry visibility
  if (import.meta.env.DEV) {
    console.debug('[Supabase Analytics]', eventType, eventData);
  }
}

/**
 * Fetch owner dashboard data for analytics and message inbox.
 */
export async function fetchOwnerDashboardData(): Promise<OwnerDashboardStats> {
  const result: OwnerDashboardStats = {
    connected: false,
    url: SUPABASE_URL,
    contactCount: 0,
    recentContacts: [],
    totalEvents: 0,
    recentEvents: [],
    eventTypeCounts: {},
    tableStatus: {
      contactTable: null,
      eventsTable: null,
    },
  };

  // Test connection & read contacts
  for (const table of CONTACT_TABLE_CANDIDATES) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(25);

      if (!error && data) {
        result.connected = true;
        result.tableStatus.contactTable = table;
        result.contactCount = count || data.length;
        result.recentContacts = data;
        break;
      }
    } catch {
      // continue to next candidate
    }
  }

  // Read analytics / events
  for (const table of EVENT_TABLE_CANDIDATES) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        result.connected = true;
        result.tableStatus.eventsTable = table;
        result.totalEvents = count || data.length;
        result.recentEvents = data;

        const counts: Record<string, number> = {};
        for (const item of data) {
          const type = item.event_type || 'unknown';
          counts[type] = (counts[type] || 0) + 1;
        }
        result.eventTypeCounts = counts;
        break;
      }
    } catch {
      // continue
    }
  }

  // If both tables were missing or empty, ping the health or auth settings to verify connection
  if (!result.connected) {
    try {
      // Check if project URL responds
      const ping = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
        },
      });
      if (ping.ok || ping.status === 400 || ping.status === 401 || ping.status === 200) {
        result.connected = true;
      }
    } catch {
      result.connected = false;
    }
  }

  return result;
}

/**
 * SQL migration script for Supabase SQL Editor if tables need initial setup with RLS.
 */
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor) to create tables with RLS:

-- 1. Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'portfolio_web'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow visitors (anonymous and authenticated) to submit contact forms
CREATE POLICY "Allow public insert to contact_submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow reading for owner dashboard
CREATE POLICY "Allow select on contact_submissions" 
ON public.contact_submissions 
FOR SELECT 
TO anon, authenticated 
USING (true);


-- 2. Portfolio Engagement & Analytics Events Table
CREATE TABLE IF NOT EXISTS public.portfolio_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  path TEXT,
  session_id TEXT,
  user_agent TEXT,
  referrer TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_events ENABLE ROW LEVEL SECURITY;

-- Allow public logging of portfolio engagement events
CREATE POLICY "Allow public insert to portfolio_events" 
ON public.portfolio_events 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow reading analytics for dashboard
CREATE POLICY "Allow select on portfolio_events" 
ON public.portfolio_events 
FOR SELECT 
TO anon, authenticated 
USING (true);
`;
