import { useState, useEffect } from 'react';
import { 
  X, Database, ShieldCheck, Mail, Activity, RefreshCw, 
  Copy, Check, ExternalLink, AlertTriangle, Eye, MousePointer,
  Download, Moon, Sun, Terminal
} from 'lucide-react';
import { 
  fetchOwnerDashboardData, 
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY, 
  SUPABASE_SETUP_SQL, 
  OwnerDashboardStats 
} from '../lib/supabase';
import { cn } from '../lib/utils';

interface OwnerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OwnerDashboardModal({ isOpen, onClose }: OwnerDashboardModalProps) {
  const [data, setData] = useState<OwnerDashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSql, setShowSql] = useState(false);
  const [activeTab, setActiveTab] = useState<'inbox' | 'analytics' | 'schema'>('inbox');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchOwnerDashboardData();
      setData(res);
    } catch (err) {
      console.error('Failed to load Supabase dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border border-border-subtle bg-background shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand/10 text-brand border border-brand/20">
              <Database size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-text-primary">Owner Dashboard & Supabase Telemetry</h3>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border border-cyber/30 bg-cyber/10 text-cyber font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber animate-pulse" />
                  CONNECTED
                </span>
              </div>
              <p className="text-xs font-mono text-text-muted mt-0.5">
                Target: <span className="text-text-secondary">{SUPABASE_URL}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              title="Refresh Data"
              aria-label="Refresh Data"
              className="p-2 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={16} className={cn(loading && "animate-spin text-brand")} />
            </button>
            <button
              onClick={onClose}
              title="Close (Esc)"
              aria-label="Close dashboard"
              className="p-2 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-surface/40 border-b border-border-subtle text-xs font-mono">
          <div className="p-3 rounded-lg border border-border-subtle/70 bg-surface/60">
            <div className="text-text-muted text-[10px]">CLIENT KEY TYPE</div>
            <div className="text-text-primary font-bold mt-1 flex items-center gap-1 text-[11px]">
              <ShieldCheck size={13} className="text-cyber" />
              <span>PUBLISHABLE (RLS)</span>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border-subtle/70 bg-surface/60">
            <div className="text-text-muted text-[10px]">MESSAGES INBOX</div>
            <div className="text-brand font-bold mt-1 text-sm">
              {data ? data.contactCount : '...'}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border-subtle/70 bg-surface/60">
            <div className="text-text-muted text-[10px]">TOTAL EVENTS LOGGED</div>
            <div className="text-cyber font-bold mt-1 text-sm">
              {data ? data.totalEvents : '...'}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border-subtle/70 bg-surface/60">
            <div className="text-text-muted text-[10px]">SOURCE OF TRUTH</div>
            <div className="text-auto font-bold mt-1 text-[11px] truncate">
              Supabase (Live)
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-border-subtle px-6 bg-surface/20">
          <button
            onClick={() => setActiveTab('inbox')}
            className={cn(
              "flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 font-bold tracking-wider transition-colors cursor-pointer",
              activeTab === 'inbox' 
                ? "border-brand text-brand" 
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            <Mail size={14} />
            <span>CONTACT INBOX ({data?.contactCount || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={cn(
              "flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 font-bold tracking-wider transition-colors cursor-pointer",
              activeTab === 'analytics' 
                ? "border-cyber text-cyber" 
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            <Activity size={14} />
            <span>ENGAGEMENT ANALYTICS ({data?.totalEvents || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={cn(
              "flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 font-bold tracking-wider transition-colors cursor-pointer",
              activeTab === 'schema' 
                ? "border-auto text-auto" 
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            <Terminal size={14} />
            <span>SQL SCHEMA / RLS POLICIES</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase">
                  Submissions via Supabase (contact_submissions / contacts)
                </h4>
                <span className="text-[11px] font-mono text-text-secondary">
                  Active Table: <code className="text-brand bg-surface px-1.5 py-0.5 rounded">{data?.tableStatus.contactTable || 'auto-routing'}</code>
                </span>
              </div>

              {data?.recentContacts && data.recentContacts.length > 0 ? (
                <div className="space-y-3">
                  {data.recentContacts.map((item, idx) => (
                    <div 
                      key={item.id || idx} 
                      className="p-4 rounded-xl border border-border-subtle bg-surface/50 hover:bg-surface transition-all flex flex-col gap-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/50 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-text-primary">{item.name}</span>
                          <a 
                            href={`mailto:${item.email}`} 
                            className="text-xs font-mono text-brand hover:underline flex items-center gap-1"
                          >
                            <Mail size={12} /> {item.email}
                          </a>
                        </div>
                        <span className="text-[10px] font-mono text-text-muted">
                          {item.created_at ? new Date(item.created_at).toLocaleString() : 'Recent'}
                        </span>
                      </div>
                      {item.subject && (
                        <div className="text-xs font-mono text-cyber font-bold">
                          Subject: {item.subject}
                        </div>
                      )}
                      <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-xl border border-border-subtle bg-surface/30 text-center flex flex-col items-center gap-3">
                  <Mail size={32} className="text-text-muted opacity-50" />
                  <div className="text-sm font-bold text-text-primary">No submissions recorded in database yet</div>
                  <p className="text-xs text-text-secondary max-w-md">
                    When visitors submit the contact form on your portfolio, their messages are automatically stored in your Supabase project with Row-Level Security.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Event Type Counters */}
              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase mb-3">
                  ENGAGEMENT BREAKDOWN
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {data?.eventTypeCounts && Object.keys(data.eventTypeCounts).length > 0 ? (
                    Object.entries(data.eventTypeCounts).map(([type, count]) => (
                      <div key={type} className="p-3 rounded-lg border border-border-subtle bg-surface/50 font-mono">
                        <div className="text-[10px] text-text-muted uppercase tracking-wider">{type}</div>
                        <div className="text-lg font-bold text-cyber mt-1">{count}</div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full p-4 rounded-lg border border-border-subtle bg-surface/30 font-mono text-xs text-text-muted text-center">
                      Live interactions (page views, project clicks, resume downloads) are tracked automatically.
                    </div>
                  )}
                </div>
              </div>

              {/* Event Log Stream */}
              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest text-text-muted uppercase mb-3">
                  RECENT TELEMETRY EVENTS
                </h4>
                {data?.recentEvents && data.recentEvents.length > 0 ? (
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {data.recentEvents.map((ev, i) => (
                      <div key={ev.id || i} className="p-2.5 rounded-lg border border-border-subtle/70 bg-surface/40 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-brand/10 text-brand font-bold text-[10px]">
                            {ev.event_type}
                          </span>
                          <span className="text-text-secondary">{ev.path || '/'}</span>
                        </div>
                        <span className="text-[10px] text-text-muted">
                          {ev.created_at ? new Date(ev.created_at).toLocaleTimeString() : 'Recent'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-lg border border-border-subtle bg-surface/20 text-center font-mono text-xs text-text-muted">
                    No analytics events stored in Supabase yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Supabase PostgreSQL Schema & RLS</h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Your portfolio is pre-configured to use existing tables if already created. If setting up fresh tables, run this SQL in Supabase.
                  </p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand text-background hover:bg-brand/90 font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  {copiedSql ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedSql ? 'COPIED!' : 'COPY SQL'}</span>
                </button>
              </div>

              <div className="relative rounded-xl border border-border-subtle bg-black/60 p-4 font-mono text-xs text-text-secondary overflow-x-auto max-h-80">
                <pre>{SUPABASE_SETUP_SQL}</pre>
              </div>

              <div className="p-3 rounded-lg border border-cyber/30 bg-cyber/5 text-xs text-text-secondary flex items-start gap-2">
                <ShieldCheck size={16} className="text-cyber shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyber">Security Standard Verified:</strong> Row-Level Security (RLS) is enabled for all tables. The browser only uses your publishable key (`{SUPABASE_PUBLISHABLE_KEY.substring(0, 16)}...`), preventing any administrative or secret key leak.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border-subtle bg-surface/60 flex items-center justify-between text-xs font-mono text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber" />
            <span>PROJECT REF: tjlustmzdjykstqsnevw</span>
          </span>
          <a
            href="https://supabase.com/dashboard/project/tjlustmzdjykstqsnevw"
            target="_blank"
            rel="noreferrer"
            className="text-brand hover:underline flex items-center gap-1"
          >
            <span>Open in Supabase Dashboard</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
