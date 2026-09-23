import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Menu, X, Sun, Moon, Github, FileText, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { profile } from '../data/curated';
import { trackEvent } from '../lib/supabase';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Repositories', href: '#github' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' }
];

export function Navbar() {
  const { theme, toggleTheme, engMode, toggleEngMode, setOwnerDashboardOpen, setResumeModalOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 transition-all duration-300",
        isScrolled ? "py-1.5 sm:py-2" : "py-2 sm:py-3"
      )}>
        <nav className={cn(
          "w-full max-w-[1440px] mx-auto h-13 sm:h-14 lg:h-15 flex items-center justify-between rounded-xl transition-all duration-300 px-3.5 sm:px-5",
          isScrolled 
            ? "bg-background/90 backdrop-blur-xl border border-border-subtle shadow-lg" 
            : "bg-background/60 backdrop-blur-md border border-border-subtle/70"
        )}>
          {/* Left: Brand */}
          <a href="#" className="flex items-center gap-2 font-black text-lg sm:text-xl tracking-wider uppercase hover:opacity-90 transition-opacity">
            <span className="text-brand opacity-80">//</span>
            <span>{profile.name.split(' ')[0]}</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-[13px] font-mono tracking-wider">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="text-text-secondary hover:text-text-primary transition-colors py-1">
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Day / Night Mode Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode`}
              className="relative flex items-center p-0.5 rounded-full border border-border-subtle bg-surface/80 hover:bg-surface text-text-secondary hover:text-text-primary transition-all duration-300 font-mono text-[10px] tracking-wider cursor-pointer select-none active:scale-95"
            >
              <span className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-300",
                theme === 'light' 
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold shadow-xs" 
                  : "text-text-muted hover:text-text-secondary"
              )}>
                <Sun size={13} className={cn("transition-transform duration-300", theme === 'light' ? "rotate-0 text-amber-500" : "-rotate-90 opacity-40")} />
                <span>DAY</span>
              </span>
              <span className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-300",
                theme === 'dark' 
                  ? "bg-brand/20 text-brand font-bold shadow-xs" 
                  : "text-text-muted hover:text-text-secondary"
              )}>
                <Moon size={13} className={cn("transition-transform duration-300", theme === 'dark' ? "rotate-0 text-brand" : "rotate-90 opacity-40")} />
                <span>NIGHT</span>
              </span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
            {/* Day / Night Mode Toggle (Mobile) */}
            <button 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'day' : 'night'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode`}
              className="h-9 px-2.5 rounded-lg border border-border-subtle bg-surface/60 text-text-secondary hover:text-text-primary transition-all cursor-pointer flex items-center gap-1 font-mono text-xs active:scale-95 touch-manipulation"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={14} className="text-amber-400" />
                  <span className="text-[10px] tracking-wider">DAY</span>
                </>
              ) : (
                <>
                  <Moon size={14} className="text-brand" />
                  <span className="text-[10px] tracking-wider">NIGHT</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border-subtle bg-surface/60 text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer touch-manipulation"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden flex flex-col",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="flex justify-between items-center p-6 border-b border-border-subtle">
          <div className="font-black text-xl tracking-wide uppercase"><span className="text-brand">//</span> MENU</div>
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="p-2 text-text-secondary hover:text-text-primary rounded-lg active:scale-95 transition-all cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-6 gap-6 overflow-y-auto">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-mono tracking-widest text-text-secondary hover:text-text-primary active:text-brand transition-colors py-1 cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="h-px bg-border-subtle my-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-mono text-text-secondary tracking-widest">ENGINEERING MODE</span>
            <button
              onClick={toggleEngMode}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg border font-mono text-xs transition-all active:scale-95 cursor-pointer touch-manipulation",
                engMode
                  ? "border-cyber/50 bg-cyber/15 text-cyber font-bold"
                  : "border-border-subtle bg-surface text-text-muted"
              )}
            >
              <span className={cn("w-2 h-2 rounded-full", engMode ? "bg-cyber animate-pulse" : "bg-text-muted/60")} />
              <span>{engMode ? "ACTIVE (ON)" : "STANDBY (OFF)"}</span>
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-mono text-text-secondary tracking-widest">THEME</span>
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-3 p-2.5 rounded-full glass-1 active:scale-95 transition-all cursor-pointer touch-manipulation"
              aria-label="Toggle theme"
            >
              <Sun size={18} className={theme === 'light' ? 'text-amber-500' : 'opacity-40'} />
              <Moon size={18} className={theme === 'dark' ? 'text-brand' : 'opacity-40'} />
            </button>
          </div>
          <div className="flex gap-3 pt-2">
            <a 
              href={profile.github} 
              target="_blank" 
              rel="noreferrer"
              onClick={() => trackEvent('github_click', { location: 'mobile_nav' })}
              className="flex-1 py-2.5 px-3 rounded-lg border border-border-subtle bg-surface/50 font-mono text-xs text-center flex items-center justify-center gap-2 text-text-primary hover:bg-surface active:scale-95 transition-all cursor-pointer"
            >
              <Github size={15} />
              <span>GITHUB</span>
            </a>
            <a 
              href="/resume.pdf" 
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                trackEvent('resume_view_click', { location: 'mobile_nav' });
                setResumeModalOpen(true);
              }}
              className="flex-1 py-2.5 px-3 rounded-lg border border-border-subtle bg-surface/50 font-mono text-xs text-center flex items-center justify-center gap-2 text-text-primary hover:bg-surface active:scale-95 transition-all cursor-pointer"
            >
              <FileText size={15} className="text-brand" />
              <span>RESUME</span>
            </a>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setOwnerDashboardOpen(true);
            }}
            className="w-full py-3 px-3 rounded-lg border border-border-subtle bg-surface/70 font-mono text-xs text-center flex items-center justify-center gap-2 text-text-primary hover:border-brand/50 active:scale-95 transition-all cursor-pointer touch-manipulation"
          >
            <Database size={15} className="text-brand" />
            <span>SUPABASE OWNER DASHBOARD</span>
          </button>
        </div>
      </div>
    </>
  );
}
