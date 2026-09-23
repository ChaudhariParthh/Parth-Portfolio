import { useState, useMemo, useEffect } from 'react';
import { certifications } from '../data/curated';
import { Certification, CertificateCategory } from '../types';
import { CertificateModal } from './CertificateModal';
import { 
  Award, 
  Search, 
  X, 
  ExternalLink, 
  Eye, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpDown,
  FileCheck
} from 'lucide-react';

const CATEGORIES: CertificateCategory[] = ['All', 'Cybersecurity', 'Cloud', 'AI & Data', 'Leadership'];

export function Certifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    certifications.forEach((cert) => {
      if (cert.fileName) {
        const url = `/certificates/${cert.fileName}`;
        fetch(url, { method: 'HEAD' })
          .then((res) => {
            if (res.ok) {
              setLoadedImages((prev) => ({ ...prev, [cert.id]: true }));
            }
          })
          .catch(() => {});
      }
    });
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: false }));
  };

  const filteredCertificates = useMemo(() => {
    return certifications
      .filter((cert) => {
        const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
        const query = searchQuery.trim().toLowerCase();
        if (!query) return matchesCategory;

        const matchesQuery = 
          cert.name.toLowerCase().includes(query) ||
          cert.issuer.toLowerCase().includes(query) ||
          cert.skills.some((s) => s.toLowerCase().includes(query)) ||
          (cert.description && cert.description.toLowerCase().includes(query));

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'alphabetical') {
          return a.name.localeCompare(b.name);
        }
        // Extract 4-digit years for chronological sorting
        const yearA = parseInt((a.date.match(/\d{4}/) || ['0'])[0], 10);
        const yearB = parseInt((b.date.match(/\d{4}/) || ['0'])[0], 10);
        return sortBy === 'newest' ? yearB - yearA : yearA - yearB;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: certifications.length };
    certifications.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section id="certifications" className="flex flex-col gap-8 scroll-mt-32">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-sm font-mono tracking-widest text-text-muted">
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
          <div className="h-px flex-1 bg-border-subtle" />
        </div>
        
        {/* Verified Credentials Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-1 border border-border-subtle text-xs font-mono text-text-muted">
          <ShieldCheck size={14} className="text-brand" />
          <span className="text-text-primary font-semibold">Verified Credentials:</span>
          <span className="text-brand font-bold">{certifications.length}</span>
        </div>
      </div>

      {/* Information Strip */}
      <div className="p-4 rounded-xl glass-1 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-muted">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-surface text-brand">
            <FileCheck size={16} />
          </div>
          <span>
            Accredited certifications and verified credentials across Cybersecurity, Cloud Computing, and Artificial Intelligence.
          </span>
        </div>
        <div className="font-mono text-text-secondary whitespace-nowrap">
          {certifications.length} Registered Credentials
        </div>
      </div>

      {/* Controls Bar: Search, Category Filters, Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer active:scale-95 touch-manipulation ${
                  isSelected
                    ? 'bg-brand/10 border-brand/40 text-brand font-bold'
                    : 'glass-1 border-border-subtle text-text-muted hover:text-text-primary hover:bg-surface'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-brand/20 text-brand font-bold' : 'bg-surface text-text-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right side: Search & Sort */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search credentials, skills..."
              className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary active:scale-90 transition-all cursor-pointer rounded"
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-7 pr-8 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs text-text-secondary hover:text-text-primary cursor-pointer focus:outline-none focus:border-brand transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Title (A-Z)</option>
            </select>
            <ArrowUpDown size={12} className="absolute left-2.5 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid of Certificates */}
      {filteredCertificates.length === 0 ? (
        <div className="p-12 rounded-2xl glass-1 border border-border-subtle flex flex-col items-center justify-center text-center gap-3">
          <Award size={32} className="text-text-muted opacity-40" />
          <p className="text-sm font-medium text-text-secondary">No certifications match your query.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs text-brand hover:underline font-mono"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCertificates.map((cert) => {
            const hasVerifiedFile = !!(cert.fileName && loadedImages[cert.id]);
            const fileUrl = cert.fileName ? `/certificates/${cert.fileName}` : undefined;

            return (
              <div
                key={cert.id}
                className="glass-1 p-6 rounded-2xl flex flex-col justify-between gap-5 hover:bg-surface-elevated transition-all duration-300 relative group border border-border-subtle hover:border-brand/30"
              >
                {/* Hidden image element to detect real existence of file in /public/certificates/ */}
                {fileUrl && (
                  <img
                    src={fileUrl}
                    alt={cert.name}
                    className="hidden"
                    onLoad={() => handleImageLoad(cert.id)}
                    onError={() => handleImageError(cert.id)}
                  />
                )}

                <div className="flex flex-col gap-3">
                  {/* Top metadata row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-surface text-brand">
                        <Award size={18} />
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
                        {cert.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasVerifiedFile ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyber/10 text-cyber border border-cyber/20">
                          <ShieldCheck size={12} />
                          Verified File
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-surface text-text-muted border border-border-subtle">
                          <ShieldCheck size={12} />
                          Official Credential
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-text-primary group-hover:text-brand transition-colors leading-snug">
                      {cert.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary mt-1">
                      <span className="font-medium text-text-primary">{cert.issuer}</span>
                      <span className="text-border-subtle">•</span>
                      <span className="flex items-center gap-1 font-mono text-xs text-text-muted">
                        <Calendar size={12} />
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {cert.description && (
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  {/* Competency tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface text-text-secondary border border-border-subtle"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Bottom / Actions */}
                <div className="pt-3 border-t border-border-subtle/60 flex items-center justify-between text-xs">
                  <div className="text-[11px] font-mono text-text-muted flex items-center gap-1.5 truncate max-w-[200px]">
                    <ShieldCheck size={13} className="text-brand shrink-0" />
                    <span className="truncate">{cert.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveCert(cert)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated text-text-primary border border-border-subtle hover:border-brand/40 transition-all font-medium text-xs active:scale-95 cursor-pointer touch-manipulation shadow-xs"
                    >
                      <Eye size={13} className="text-brand" />
                      <span>View Certificate</span>
                    </button>

                    {hasVerifiedFile && fileUrl && (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-surface text-text-muted hover:text-text-primary transition-all border border-border-subtle active:scale-95 cursor-pointer"
                        title="Open document in new tab"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal / Lightbox */}
      <CertificateModal
        cert={activeCert}
        onClose={() => setActiveCert(null)}
        hasVerifiedFile={activeCert ? !!(activeCert.fileName && loadedImages[activeCert.id]) : false}
      />
    </section>
  );
}
