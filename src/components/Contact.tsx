import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Youtube, PenTool, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { profile } from '../data/curated';
import { submitContactForm } from '../lib/supabase';

export function Contact() {
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus('SENDING');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    // Client-side quick check
    if (!name || !email || !subject || !message) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('ERROR');
      return;
    }

    try {
      const result = await submitContactForm({ name, email, subject, message });

      if (!result.success) {
        setErrorMessage(result.error || 'Unable to send your message right now. Please try again.');
        setStatus('ERROR');
        return;
      }

      setStatus('SUCCESS');
      setErrorMessage('');
      form.reset();
      
      setTimeout(() => {
        setStatus('IDLE');
      }, 6000);
    } catch (error) {
      console.error('[Diagnostics] Contact submission exception:', error);
      setErrorMessage('Unable to send your message right now. Please try again.');
      setStatus('ERROR');
    }
  };

  return (
    <section id="contact" className="flex flex-col md:flex-row gap-12 scroll-mt-32">
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h2 className="text-sm font-mono tracking-widest text-brand">LET'S CONNECT</h2>
        <h3 className="text-3xl sm:text-4xl font-bold leading-tight text-text-primary">
          Let's Build Together: Open to Full-Time & Internship Roles
        </h3>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          I am actively seeking remote internships and full-time career opportunities. If you are looking for a dedicated developer/engineer to join your distributed team, let's chat!
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <h4 className="text-sm font-mono tracking-widest text-text-muted">FIND ME ONLINE</h4>
          <div className="flex flex-col gap-4">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-text-secondary hover:text-text-primary active:scale-[0.99] transition-all cursor-pointer group">
              <div className="p-2 glass-1 rounded-lg text-text-primary group-hover:bg-surface group-hover:border-brand/40 border border-border-subtle transition-colors"><Send size={18} /></div> {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-text-primary active:scale-[0.99] transition-all cursor-pointer group">
              <div className="p-2 glass-1 rounded-lg text-text-primary group-hover:bg-surface group-hover:border-brand/40 border border-border-subtle transition-colors"><Linkedin size={18} /></div> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-text-primary active:scale-[0.99] transition-all cursor-pointer group">
              <div className="p-2 glass-1 rounded-lg text-text-primary group-hover:bg-surface group-hover:border-brand/40 border border-border-subtle transition-colors"><Github size={18} /></div> GitHub
            </a>
            <a href={profile.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-text-primary active:scale-[0.99] transition-all cursor-pointer group">
              <div className="p-2 glass-1 rounded-lg text-text-primary group-hover:bg-surface group-hover:border-brand/40 border border-border-subtle transition-colors"><Youtube size={18} /></div> YouTube
            </a>
            <a href={profile.medium} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-text-primary active:scale-[0.99] transition-all cursor-pointer group">
              <div className="p-2 glass-1 rounded-lg text-text-primary group-hover:bg-surface group-hover:border-brand/40 border border-border-subtle transition-colors"><PenTool size={18} /></div> Medium
            </a>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="glass-2 rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-mono text-text-secondary">NAME</label>
            <input 
              required
              id="name"
              name="name"
              type="text" 
              className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-mono text-text-secondary">EMAIL</label>
            <input 
              required
              id="email"
              name="email"
              type="email" 
              className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-mono text-text-secondary">SUBJECT</label>
            <input 
              required
              id="subject"
              name="subject"
              type="text" 
              className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-mono text-text-secondary">MESSAGE</label>
            <textarea 
              required
              id="message"
              name="message"
              rows={4}
              className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all resize-none"
            />
          </div>

          <button 
            disabled={status === 'SENDING' || status === 'SUCCESS'}
            type="submit"
            className={cn(
              "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer",
              status === 'IDLE' ? "bg-text-primary text-background hover:scale-[1.01] active:scale-[0.98]" :
              status === 'SENDING' ? "bg-surface-elevated text-text-muted cursor-not-allowed" :
              status === 'SUCCESS' ? "bg-cyber text-background" :
              "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30"
            )}
          >
            {status === 'IDLE' && <><Send size={18} /> SEND MESSAGE</>}
            {status === 'SENDING' && <span className="animate-pulse font-mono">SENDING MESSAGE...</span>}
            {status === 'SUCCESS' && <><CheckCircle size={18} /> MESSAGE SENT</>}
            {status === 'ERROR' && <><AlertCircle size={18} /> TRY AGAIN</>}
          </button>

          {status === 'ERROR' && (
            <div className="text-center font-mono text-xs text-red-400 flex items-center justify-center gap-1.5 animate-fade-in p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage || 'Unable to send your message right now. Please try again.'}</span>
            </div>
          )}

          {status === 'SUCCESS' && (
            <div className="text-center font-mono text-xs text-cyber flex items-center justify-center gap-1.5 animate-fade-in p-2.5 rounded-xl bg-cyber/10 border border-cyber/20">
              <CheckCircle size={14} className="shrink-0" />
              <span>Your message has been sent successfully. Thank you!</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-2 border-t border-border-subtle/50">
            <span className="flex items-center gap-1.5">
              <Database size={12} className="text-brand" />
              <span>DIRECT MESSAGING</span>
            </span>
            <span className="text-cyber">SECURE GATEWAY</span>
          </div>
        </form>
      </div>
    </section>
  );
}
