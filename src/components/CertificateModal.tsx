import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Download, ZoomIn, ZoomOut, Award, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Certification } from '../types';

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
  hasVerifiedFile: boolean;
}

export function CertificateModal({ cert, onClose, hasVerifiedFile }: CertificateModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (cert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [cert, onClose]);

  if (!cert) return null;

  const fileUrl = cert.fileName ? `/certificates/${cert.fileName}` : undefined;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl glass-2 border border-border-subtle bg-background shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-surface text-brand">
                <Award size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-text-primary truncate">
                  {cert.name}
                </h3>
                <p className="text-xs text-text-secondary truncate">
                  {cert.issuer} • <span className="font-mono">{cert.date}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasVerifiedFile && fileUrl && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer"
                    title={isZoomed ? "Fit to view" : "Zoom in"}
                    aria-label={isZoomed ? "Fit to view" : "Zoom in"}
                  >
                    {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  </button>
                  <a
                    href={fileUrl}
                    download
                    className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer"
                    title="Download certificate"
                    aria-label="Download certificate"
                  >
                    <Download size={18} />
                  </a>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer"
                    title="Open in new window"
                    aria-label="Open in new window"
                  >
                    <ExternalLink size={18} />
                  </a>
                </>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer"
                title="Close (Esc)"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {hasVerifiedFile && fileUrl ? (
              <div className="relative rounded-xl overflow-hidden bg-black/40 border border-border-subtle flex items-center justify-center min-h-[340px] p-2">
                {fileUrl.toLowerCase().endsWith('.pdf') ? (
                  <iframe
                    src={fileUrl}
                    title={cert.name}
                    className="w-full h-[65vh] rounded-lg border-0 bg-white"
                  />
                ) : (
                  <img
                    src={fileUrl}
                    alt={cert.name}
                    className={`max-w-full rounded-lg transition-transform duration-300 ${
                      isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in max-h-[60vh] object-contain'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-border-subtle bg-surface/50 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand">
                    <ShieldCheck size={16} />
                    <span>VERIFIED CREDENTIAL RECORD</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface text-text-secondary border border-border-subtle">
                    {cert.category}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold text-text-primary">{cert.name}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">{cert.issuer}</span>
                    <span className="text-border-subtle">•</span>
                    <span className="flex items-center gap-1 font-mono text-xs">
                      <Calendar size={13} />
                      {cert.date}
                    </span>
                  </div>
                  {cert.description && (
                    <p className="text-sm text-text-secondary leading-relaxed mt-2">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Official Verification Status */}
                <div className="mt-4 p-4 rounded-xl glass-1 border border-border-subtle flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-2 text-text-primary font-medium">
                    <ShieldCheck size={16} className="text-cyber" />
                    <span className="font-mono uppercase tracking-wider text-cyber">Credential Record Verified</span>
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    Official credential issued by {cert.issuer} documenting mastery in {cert.skills.slice(0, 3).join(', ')}.
                  </p>
                </div>
              </div>
            )}

            {/* Credential Metadata Footer */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-xs font-mono text-text-muted tracking-wider uppercase">
                Acquired Competencies & Topics
              </span>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-md text-xs font-medium bg-surface text-text-primary border border-border-subtle flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={12} className="text-brand" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Bottom Bar */}
          <div className="px-6 py-3 border-t border-border-subtle bg-surface/30 flex items-center justify-between text-xs text-text-muted">
            <span className="font-mono flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-brand" />
              <span>{cert.issuer} • Verified Portfolio Credential</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated text-text-primary border border-border-subtle transition-all active:scale-95 cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
