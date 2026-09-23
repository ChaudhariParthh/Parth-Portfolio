import { exploring } from '../data/curated';

export function CurrentlyBuilding() {
  return (
    <section className="flex flex-col gap-12">
      {/* Exploring */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-mono tracking-widest text-text-muted">CURRENTLY EXPLORING</h2>
          <div className="h-px flex-1 bg-border-subtle" />
        </div>
        <div className="flex flex-wrap gap-3">
          {exploring.map((topic) => (
            <div key={topic} className="px-4 py-3 rounded-xl glass-1 text-sm text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors">
              {topic}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
