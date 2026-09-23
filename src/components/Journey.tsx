import { experience, education } from '../data/curated';

export function Journey() {
  return (
    <section id="journey" className="flex flex-col gap-8 scroll-mt-32">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-mono tracking-widest text-text-muted">ENGINEERING JOURNEY</h2>
        <div className="h-px flex-1 bg-border-subtle" />
      </div>

      <div className="flex flex-col gap-12">
        {/* Experience */}
        <div className="flex flex-col gap-6">
          <h3 className="text-sm font-mono text-text-secondary">EXPERIENCE</h3>
          <div className="flex flex-col gap-8 border-l border-border-subtle ml-2 pl-6">
            {experience.map((exp, i) => (
              <div key={i} className="relative flex flex-col gap-2">
                <div className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-brand ring-4 ring-background" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h4 className="font-bold text-lg text-text-primary">{exp.title}</h4>
                  <span className="text-xs font-mono text-text-muted">{exp.date}</span>
                </div>
                <div className="text-sm text-brand">{exp.company} <span className="text-text-muted">— {exp.location}</span></div>
                <ul className="mt-2 flex flex-col gap-2">
                  {exp.description.map((desc, j) => (
                    <li key={j} className="text-sm text-text-secondary flex gap-2">
                      <span className="text-border-subtle mt-1">-</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="flex flex-col gap-6">
          <h3 className="text-sm font-mono text-text-secondary">EDUCATION</h3>
          <div className="flex flex-col gap-8 border-l border-border-subtle ml-2 pl-6">
            {education.map((edu, i) => (
              <div key={i} className="relative flex flex-col gap-2">
                <div className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-ai ring-4 ring-background" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h4 className="font-bold text-lg text-text-primary">{edu.degree}</h4>
                  <span className="text-xs font-mono text-text-muted">{edu.date}</span>
                </div>
                <div className="text-sm text-text-secondary">{edu.institution}</div>
                <div className="text-sm font-mono text-text-muted">{edu.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
