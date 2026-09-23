import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  ExternalLink, 
  Printer, 
  FileText, 
  Check, 
  Copy, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Eye, 
  Layers
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { trackEvent } from '../lib/supabase';

export function ResumeModal() {
  const { resumeModalOpen, setResumeModalOpen } = useStore();
  const [viewMode, setViewMode] = useState<'document' | 'pdf'>('document');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setResumeModalOpen(false);
      }
    };
    if (resumeModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [resumeModalOpen, setResumeModalOpen]);

  if (!resumeModalOpen) return null;

  const handleCopyContact = () => {
    navigator.clipboard.writeText('parthchaudhari973@gmail.com | +91-8767896259');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    trackEvent('resume_print_click');
    window.print();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-background/85 backdrop-blur-md"
        onClick={() => setResumeModalOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl glass-2 border border-border-subtle bg-background shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-border-subtle bg-surface/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand/10 text-brand">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
                  <span>PARTH CHAUDHARI</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand/20 text-brand font-semibold">
                    RESUME
                  </span>
                </h3>
                <p className="text-xs text-text-muted">
                  SOC Analyst & AI/Data Science Engineer • 2026
                </p>
              </div>
            </div>

            {/* View Switcher & Action Controls */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg bg-surface p-1 border border-border-subtle text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('document')}
                  className={`px-2.5 py-1 rounded-md font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'document'
                      ? 'bg-brand text-white shadow-xs font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Eye size={13} />
                  <span className="hidden sm:inline">Interactive Sheet</span>
                  <span className="sm:hidden">Sheet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('pdf')}
                  className={`px-2.5 py-1 rounded-md font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'pdf'
                      ? 'bg-brand text-white shadow-xs font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Layers size={13} />
                  <span>PDF View</span>
                </button>
              </div>

              <a
                href="/resume.pdf"
                download="Parth_Chaudhari_Resume.pdf"
                onClick={() => trackEvent('resume_download_click', { location: 'modal_header' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand hover:bg-brand-hover text-white text-xs font-mono font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                title="Download official PDF resume"
              >
                <Download size={14} />
                <span className="hidden sm:inline">DOWNLOAD PDF</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer"
                title="Open PDF in new tab"
                aria-label="Open PDF in new tab"
              >
                <ExternalLink size={16} />
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="p-1.5 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer hidden md:flex"
                title="Print resume"
                aria-label="Print resume"
              >
                <Printer size={16} />
              </button>

              <button
                type="button"
                onClick={() => setResumeModalOpen(false)}
                className="p-1.5 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer"
                title="Close (Esc)"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-surface/30">
            {viewMode === 'pdf' ? (
              <div className="w-full h-[72vh] rounded-xl overflow-hidden border border-border-subtle bg-black/30 flex flex-col">
                <iframe
                  src="/resume.pdf"
                  title="Parth Chaudhari Resume PDF"
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            ) : (
              /* Exact Interactive Resume Sheet matching the provided resume */
              <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-xl shadow-xl p-6 sm:p-10 border border-gray-200 font-serif leading-relaxed text-[13.5px]">
                {/* Header */}
                <div className="text-center pb-4 border-b border-gray-300">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950 font-serif uppercase">
                    PARTH CHAUDHARI
                  </h1>
                  
                  <div className="mt-2 text-xs text-gray-700 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-sans">
                    <a href="mailto:parthchaudhari973@gmail.com" className="hover:text-blue-700 underline font-medium">
                      parthchaudhari973@gmail.com
                    </a>
                    <span>|</span>
                    <a href="tel:+918767896259" className="hover:text-blue-700 font-medium">
                      +91-8767896259
                    </a>
                    <span>|</span>
                    <a href="https://linkedin.com/in/parthchaudhari" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                      linkedin.com/in/parthchaudhari
                    </a>
                    <span>|</span>
                    <a href="https://github.com/ChaudhariParthh" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                      github.com/ChaudhariParthh
                    </a>
                    <span>|</span>
                    <span className="text-gray-900 font-medium">Portfolio</span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 font-sans">
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="mt-2 text-gray-800 text-justify text-xs sm:text-[13px] leading-relaxed">
                    Entry-level Security Operations Center (SOC) Analyst with hands-on experience in threat detection, alert triage, and incident response workflows. Skilled in developing automated alert management systems, threat intelligence integration, and security event correlation. Proficient in SIEM platforms, log analysis, and real-time security monitoring. Focused on reducing alert fatigue, accelerating threat identification, and supporting effective incident investigation processes.
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 font-sans">
                    TECHNICAL SKILLS
                  </h2>
                  <div className="mt-2 flex flex-col gap-1 text-xs sm:text-[13px]">
                    <div>
                      <span className="font-bold text-gray-900">Security Monitoring: </span>
                      <span className="text-gray-800">SIEM (Splunk, Wazuh), Log Analysis, Alert Triage, Incident Response, MITRE ATT&CK.</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Networking: </span>
                      <span className="text-gray-800">TCP/IP, DNS, HTTP/HTTPS, Firewall, Packet Analysis.</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Operating Systems: </span>
                      <span className="text-gray-800">Windows, Ubuntu Server, Kali Linux.</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Security Tools: </span>
                      <span className="text-gray-800">Wireshark, Burp Suite, VirusTotal, AbuseIPDB, Shodan.</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Scripting: </span>
                      <span className="text-gray-800">Python, Bash, PowerShell.</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Workflow Automation: </span>
                      <span className="text-gray-800">n8n, Make.</span>
                    </div>
                  </div>
                </div>

                {/* Professional Experience */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 font-sans">
                    PROFESSIONAL EXPERIENCE
                  </h2>
                  <div className="mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                      <span className="font-bold text-gray-950">
                        Cybersecurity Virtual Intern AICTE | Palo Alto Networks
                      </span>
                      <span className="font-sans text-xs font-semibold text-gray-800">
                        Oct 2024 - Dec 2024
                      </span>
                    </div>
                    <div className="italic text-gray-600 text-xs">Remote</div>
                    <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs sm:text-[13px] text-gray-800">
                      <li>
                        Completed a 10-week cybersecurity virtual internship covering cybersecurity, network security, cloud security, and security operations fundamentals.
                      </li>
                      <li>
                        Built foundational knowledge across security monitoring, network defense, cloud security, and SOC operations through Palo Alto Networks' cybersecurity learning program.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Projects */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 font-sans">
                    PROJECTS
                  </h2>
                  <div className="mt-3 flex flex-col gap-4">
                    {/* Project 1 */}
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-gray-950">
                        <span>TriageForge : SOC Alert Triage & Investigation Automation</span>
                        <a 
                          href="https://github.com/ChaudhariParthh/TriageForge" 
                          target="_blank" 
                          rel="noreferrer"
                          className="ml-1 text-blue-700 hover:underline font-normal font-sans"
                        >
                          - Github
                        </a>
                      </div>
                      <div className="italic text-xs text-gray-700">
                        n8n Orchestration , Threat Intelligence Integration , AI Analysis
                      </div>
                      <ul className="mt-1 list-disc list-outside pl-4 space-y-1 text-xs sm:text-[13px] text-gray-800">
                        <li>
                          Multi-stage threat investigation pipeline — Wazuh agents detect security events that trigger alerts in Wazuh, which are automatically ingested into TriageForge's n8n orchestration
                        </li>
                        <li>
                          IOC extraction, threat enrichment (VirusTotal, AbuseIPDB, AlienVault OTX), behavioral analysis, and AI-driven recommendations within orchestrated workflows
                        </li>
                        <li>
                          Slack-integrated approval workflows — real-time analyst notifications with decision routing; Supabase audit logging tracks all triage decisions and incident lifecycle from detection to closure
                        </li>
                      </ul>
                    </div>

                    {/* Project 2 */}
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-gray-950">
                        <span>Splunk-Security-Monitoring-and-Detection-Lab</span>
                        <a 
                          href="https://github.com/ChaudhariParthh/Splunk-Security-Monitoring-and-Detection-Lab" 
                          target="_blank" 
                          rel="noreferrer"
                          className="ml-1 text-blue-700 hover:underline font-normal font-sans"
                        >
                          - Github
                        </a>
                      </div>
                      <div className="italic text-xs text-gray-700">
                        Splunk Enterprise, Python, SPL, Security Data Analytics
                      </div>
                      <ul className="mt-1 list-disc list-outside pl-4 space-y-1 text-xs sm:text-[13px] text-gray-800">
                        <li>
                          Built a hands-on Splunk SIEM lab to generate and ingest 170 synthetic Apache, authentication, and firewall security events for centralized monitoring and analysis
                        </li>
                        <li>
                          Developed SPL-based security searches and detection rules to identify failed logins, brute-force attacks, suspicious port activity, HTTP anomalies, and privilege escalation
                        </li>
                        <li>
                          Created security dashboards and automated alerts to visualize authentication, firewall, and web activity, investigate suspicious incidents, and document findings with recommended response actions
                        </li>
                      </ul>
                    </div>

                    {/* Project 3 */}
                    <div>
                      <div className="text-xs sm:text-[13px] font-bold text-gray-950">
                        <span>PrakashSetu: IoT-Based Smart Street Light Monitoring & Fault Detection System</span>
                        <a 
                          href="https://github.com/ChaudhariParthh/PrakashSetu" 
                          target="_blank" 
                          rel="noreferrer"
                          className="ml-1 text-blue-700 hover:underline font-normal font-sans"
                        >
                          - Github
                        </a>
                      </div>
                      <div className="italic text-xs text-gray-700">
                        ESP8266, IoT, PIR Sensors, LDR, Telegram Bot
                      </div>
                      <ul className="mt-1 list-disc list-outside pl-4 space-y-1 text-xs sm:text-[13px] text-gray-800">
                        <li>
                          Developed an IoT-based smart street-light system with automated day/night control, motion-based lighting, real-time fault detection, and Telegram notifications for maintenance alerts.
                        </li>
                        <li>
                          Automated fault reporting and adaptive lighting to reduce manual maintenance effort and energy consumption while improving street-light monitoring and public safety.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Certifications & Achievements */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 font-sans">
                    CERTIFICATIONS & ACHIEVEMENTS
                  </h2>
                  <ul className="mt-2 list-disc list-outside pl-4 space-y-1 text-xs sm:text-[13px] text-gray-800">
                    <li>Google AI Professional Certification – Coursera</li>
                    <li>Google AI for App Building – Coursera</li>
                    <li>Security Operation Fundamentals – Palo Alto Networks</li>
                    <li>
                      Elected Vice President of AI&DS Department (3rd Year) — Managed events, coordinated activities, and ensured smooth execution of departmental initiatives.
                    </li>
                  </ul>
                </div>

                {/* Education */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold text-gray-950 uppercase tracking-wider border-b border-gray-300 pb-1 font-sans">
                    EDUCATION
                  </h2>
                  <div className="mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px]">
                      <span className="font-bold text-gray-950">
                        Bachelor of Engineering, Artificial Intelligence and Data Science
                      </span>
                      <span className="font-sans text-xs font-semibold text-gray-800">
                        2022 - 2026
                      </span>
                    </div>
                    <div className="text-gray-800 text-xs sm:text-[13px]">
                      MET's Institute of Engineering, Nashik, Maharashtra | CGPA: 7.3/10
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 border-t border-border-subtle bg-surface/30 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyContact}
                className="px-3 py-1.5 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer font-mono flex items-center gap-1.5"
              >
                {copied ? <Check size={13} className="text-cyber" /> : <Copy size={13} />}
                <span>{copied ? 'Copied Contact Info' : 'Copy Contact Info'}</span>
              </button>
              <span className="text-text-muted hidden sm:inline">•</span>
              <span className="text-text-muted font-mono hidden sm:inline">
                Verified against official document
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Parth_Chaudhari_Resume.pdf"
                className="px-4 py-1.5 rounded-lg bg-brand hover:bg-brand-hover text-white font-mono font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>SAVE PDF</span>
              </a>
              <button
                type="button"
                onClick={() => setResumeModalOpen(false)}
                className="px-4 py-1.5 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-text-primary transition-all active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
