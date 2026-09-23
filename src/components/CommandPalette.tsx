import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, Home, User, Briefcase, Github, Code, Map as MapIcon, Award, Mail, Moon, Terminal, Database, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profile } from '../data/curated';
import { cn } from '../lib/utils';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { toggleTheme, toggleEngMode, setOwnerDashboardOpen, setResumeModalOpen } = useStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands = [
    { id: 'dashboard', icon: Database, label: 'Owner Dashboard & Supabase Telemetry (Alt+D)', action: () => setOwnerDashboardOpen(true) },
    { id: 'home', icon: Home, label: 'Home', action: () => window.scrollTo({top: 0, behavior: 'smooth'}) },
    { id: 'about', icon: User, label: 'About', action: () => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'projects', icon: Briefcase, label: 'Selected Engineering Projects', action: () => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'repositories', icon: Github, label: 'Live GitHub Repositories & Activity', action: () => document.getElementById('github')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'journey', icon: MapIcon, label: 'Experience & Education Journey', action: () => document.getElementById('journey')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'skills', icon: Code, label: 'Technical Arsenal & Skills', action: () => document.getElementById('skills')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'certifications', icon: Award, label: 'Certifications & Verified Credentials', action: () => document.getElementById('certifications')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'contact', icon: Mail, label: 'Contact Form', action: () => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'resume', icon: FileText, label: 'View & Download Parth\'s Official Resume', action: () => setResumeModalOpen(true) },
    { id: 'open-github', icon: Github, label: 'Open GitHub Profile (External)', action: () => window.open(profile.github, '_blank') },
    { id: 'engmode', icon: Terminal, label: 'Toggle Engineering Mode (ENG MODE)', action: toggleEngMode },
    { id: 'theme', icon: Moon, label: 'Toggle Day/Night Mode', action: toggleTheme },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const runCommand = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] animate-in fade-in" />
        <Dialog.Content className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] bg-background border border-border-subtle rounded-2xl shadow-2xl z-[210] overflow-hidden animate-in fade-in zoom-in-95">
          <div className="flex items-center px-4 border-b border-border-subtle">
            <Search className="text-text-muted" size={20} />
            <input 
              autoFocus
              className="w-full bg-transparent px-4 py-4 text-text-primary outline-none placeholder:text-text-muted"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="text-[10px] font-mono px-2 py-1 bg-surface rounded-md text-text-muted">ESC</div>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1">
            {filteredCommands.length === 0 ? (
              <div className="p-4 text-center text-sm text-text-muted">No commands found.</div>
            ) : (
              filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => runCommand(cmd.action)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-elevated hover:text-brand active:scale-[0.99] transition-all text-left cursor-pointer"
                >
                  <cmd.icon size={18} className="text-text-muted" />
                  <span className="font-medium text-sm">{cmd.label}</span>
                </button>
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
