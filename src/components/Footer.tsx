import { profile } from '../data/curated';
import { useStore } from '../store/useStore';
import { Database, ShieldCheck } from 'lucide-react';
import { SUPABASE_URL } from '../lib/supabase';

export function Footer() {
  const { setOwnerDashboardOpen } = useStore();

  return (
    <footer className="w-full border-t border-border-subtle py-8 mt-12 bg-surface/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-sm text-text-muted">
          <span className="text-brand opacity-80">//</span>
          <span>{profile.name}</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text-muted font-mono">
          <span>© {new Date().getFullYear()} Parth Chaudhari</span>
          <span className="opacity-40">•</span>
          <button
            onClick={() => setOwnerDashboardOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border-subtle bg-surface hover:bg-surface-elevated hover:border-brand/40 text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer group"
            title="Open Supabase Telemetry & Message Inbox (Alt+D)"
            aria-label="Open Supabase Telemetry and Owner Dashboard"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber animate-pulse" />
            <Database size={12} className="text-brand group-hover:scale-110 transition-transform" />
            <span className="font-bold">SUPABASE TELEMETRY & OWNER DASHBOARD</span>
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-mono">
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-primary active:scale-95 transition-all cursor-pointer">GITHUB</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-primary active:scale-95 transition-all cursor-pointer">LINKEDIN</a>
        </div>
      </div>
    </footer>
  );
}
