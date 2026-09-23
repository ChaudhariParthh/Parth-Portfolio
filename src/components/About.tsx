import { profile } from '../data/curated';

export function About() {
  const steps = ['BUILD', 'EXPERIMENT', 'LEARN', 'IMPROVE'];

  return (
    <section id="about" className="flex flex-col gap-8 scroll-mt-32">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-mono tracking-widest text-brand">01 // PERSONAL INTRODUCTION</h2>
        <div className="h-px flex-1 bg-border-subtle" />
      </div>

      <div className="flex flex-col gap-10 max-w-4xl">
        <p className="text-lg sm:text-2xl text-text-primary leading-relaxed font-light">
          {profile.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <div className="glass-1 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-ai/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-ai/20 transition-colors duration-500" />
            <h3 className="text-sm font-mono tracking-widest text-text-muted">FOCUS AREAS</h3>
            <ul className="flex flex-wrap gap-3">
              {profile.domains.map((domain) => (
                <li key={domain} className="flex items-center gap-2 text-sm text-text-secondary bg-surface px-3 py-1.5 rounded-lg border border-border-subtle">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand/50" />
                  {domain}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-1 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-sm font-mono tracking-widest text-text-muted">ENGINEERING METHODOLOGY</h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center gap-2 sm:gap-3 group cursor-default">
                  <span className="px-3 py-1.5 rounded-md bg-surface text-text-secondary group-hover:text-brand group-hover:border-brand/30 border border-transparent transition-all duration-300">
                    {step}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="text-text-muted group-hover:text-brand transition-colors duration-300">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
