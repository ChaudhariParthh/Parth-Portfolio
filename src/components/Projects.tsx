import * as Dialog from '@radix-ui/react-dialog';
import { curatedProjects } from '../data/curated';
import { Github, ExternalLink, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { profile } from '../data/curated';
import { trackEvent } from '../lib/supabase';

export function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-12 scroll-mt-32">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-mono tracking-widest text-text-muted">SELECTED ENGINEERING</h2>
        <div className="h-px flex-1 bg-border-subtle" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {curatedProjects.map((project, i) => (
          <Dialog.Root 
            key={project.name}
            onOpenChange={(open) => {
              if (open) {
                trackEvent('project_inspect', { project: project.name, domain: project.domain });
              }
            }}
          >
            <Dialog.Trigger asChild>
              <button 
                type="button"
                className="group text-left cursor-pointer glass-1 rounded-3xl overflow-hidden flex flex-col hover:glass-2 hover:-translate-y-1 transition-all duration-300 active:scale-[0.99] border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/50"
              >
                <div className="h-48 bg-surface-elevated relative overflow-hidden flex items-center justify-center p-6 w-full">
                  {/* Abstract Visual Representation */}
                  <div className={cn(
                    "absolute inset-0 opacity-20 blur-2xl transition-opacity group-hover:opacity-40",
                    i % 3 === 0 ? "bg-ai" : i % 3 === 1 ? "bg-data" : "bg-cyber"
                  )} />
                  <div className="font-mono text-4xl font-bold opacity-10 text-text-primary z-0 select-none">
                    {project.domain.split(' ')[0]}
                  </div>
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full glass-2 text-[10px] font-mono tracking-widest text-text-primary border border-border-subtle">
                    {project.status.toUpperCase()}
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 px-2.5 py-0.5 rounded-md bg-background/80 text-[10px] font-mono text-text-secondary group-hover:text-brand border border-border-subtle transition-colors flex items-center gap-1">
                    <span>VIEW DETAILS</span>
                    <span>→</span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col gap-4 flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl text-text-primary group-hover:text-brand transition-colors">{project.name}</h3>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-xs font-mono text-text-muted bg-surface px-2 py-0.5 rounded border border-border-subtle/50">{t}</span>
                    ))}
                    {project.tech.length > 3 && <span className="text-xs font-mono text-text-muted bg-surface px-2 py-0.5 rounded border border-border-subtle/50">+{project.tech.length - 3}</span>}
                  </div>
                </div>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] animate-in fade-in" />
              <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] md:w-[600px] bg-background border-l border-border-subtle shadow-2xl z-[110] p-6 sm:p-8 overflow-y-auto animate-in slide-in-from-right">
                <div className="flex justify-between items-center mb-8">
                  <div className="font-mono text-xs tracking-widest text-text-muted">{project.domain}</div>
                  <Dialog.Close 
                    className="p-2 rounded-full hover:bg-surface active:scale-95 transition-all cursor-pointer"
                    aria-label="Close project modal"
                  >
                    <X size={20} />
                  </Dialog.Close>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold">{project.name}</h2>
                    <p className="text-lg text-text-secondary">{project.description}</p>
                  </div>

                  <div className="flex gap-4">
                    <a 
                      href={`${profile.github}/${project.repo}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={() => trackEvent('project_github_click', { project: project.name, repo: project.repo })}
                      className="px-5 py-2.5 rounded-xl bg-text-primary text-background font-medium hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 text-sm shadow-md cursor-pointer"
                    >
                      <Github size={16} /> OPEN REPOSITORY
                    </a>
                  </div>

                  <div className="h-px bg-border-subtle" />

                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-mono tracking-widest text-text-muted">THE PROBLEM</h3>
                    <p className="text-text-primary leading-relaxed">{project.problem}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-mono tracking-widest text-text-muted">THE SOLUTION</h3>
                    <p className="text-text-primary leading-relaxed">{project.solution}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-mono tracking-widest text-brand">HOW IT WORKS</h3>
                    <ul className="flex flex-col gap-3">
                      {project.howItWorks.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="font-mono text-brand mt-1">{idx + 1}.</span>
                          <span className="text-text-secondary">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-mono tracking-widest text-text-muted">TECHNOLOGIES</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1.5 rounded-md bg-surface text-sm text-text-primary border border-border-subtle">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </div>
    </section>
  );
}
