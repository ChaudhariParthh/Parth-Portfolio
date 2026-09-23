import { skills } from '../data/curated';

export function Skills() {
  const categories = [
    { key: 'cybersecurity', label: 'CYBERSECURITY', color: 'border-cyber/30 hover:border-cyber/60' },
    { key: 'data_ai', label: 'DATA & AI', color: 'border-data/30 hover:border-data/60' },
    { key: 'tools', label: 'TOOLS & AUTOMATION', color: 'border-auto/30 hover:border-auto/60' },
    { key: 'scripting', label: 'SCRIPTING', color: 'border-brand/30 hover:border-brand/60' },
    { key: 'os', label: 'SYSTEMS', color: 'border-ai/30 hover:border-ai/60' },
  ];

  return (
    <section id="skills" className="flex flex-col gap-8 scroll-mt-32">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-mono tracking-widest text-text-muted">TECHNICAL ARSENAL</h2>
        <div className="h-px flex-1 bg-border-subtle" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.key} className={`glass-1 rounded-2xl p-6 flex flex-col gap-4 border ${cat.color} transition-colors duration-300`}>
            <h3 className="text-sm font-mono tracking-widest text-text-muted">{cat.label}</h3>
            <div className="flex flex-wrap gap-2">
              {(skills as any)[cat.key].map((skill: string) => (
                <span key={skill} className="px-3 py-1.5 rounded-md bg-surface text-sm text-text-primary border border-border-subtle">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
