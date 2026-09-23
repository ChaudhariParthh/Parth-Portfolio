import React, { useState, useRef, useEffect } from 'react';
import { profile } from '../data/curated';
import { assets } from '../data/assets';
import { ArrowRight, Github, FileText, Cpu, Shield, Link, Activity, ArrowUpRight, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { trackEvent } from '../lib/supabase';
import { useStore } from '../store/useStore';

export function Hero() {
  const { setResumeModalOpen } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(assets.profile);

  useEffect(() => {
    setImageSrc(assets.profile);
  }, []);

  const handleImageFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setImageSrc(dataUrl);
        if (imgRef.current) {
          imgRef.current.style.display = 'block';
          imgRef.current.parentElement?.classList.remove('bg-surface-elevated');
        }
        localStorage.setItem('veriqon_profile_image', dataUrl);
        try {
          await fetch('/api/upload-profile-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData: dataUrl }),
          });
        } catch (err) {
          console.error('Failed to sync original profile photo to disk:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };
  return (
    <section className="relative w-full pt-1 sm:pt-2 pb-4 lg:pb-6 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8 xl:gap-12 min-h-0">
      {/* Left Column */}
      <div className="w-full lg:w-[55%] xl:w-[54%] flex flex-col z-10">
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:py-1.5 rounded-full border border-border-subtle bg-surface/50 font-mono text-[11px] sm:text-xs shadow-xs w-fit">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-brand font-bold tracking-wider">CURRENTLY BUILDING</span>
            <span className="text-text-muted">/ Openclaw Project</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.25rem] font-black leading-[0.92] tracking-tight mt-3 sm:mt-4 text-text-primary uppercase"
        >
          PARTH<br/>CHAUDHARI
        </motion.h1>

        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-lg sm:text-xl lg:text-2xl xl:text-[1.75rem] font-bold text-brand mt-2 sm:mt-2.5 tracking-wide"
        >
          AI & DATA SCIENCE ENGINEER
        </motion.h2>

        {/* Domains */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-2 sm:mt-2.5 text-xs sm:text-[13px] font-mono font-bold tracking-wider"
        >
          <span className="text-cyber">CYBERSECURITY</span>
          <span className="text-text-muted">×</span>
          <span className="text-ai">AI</span>
          <span className="text-text-muted">×</span>
          <span className="text-auto">AUTOMATION</span>
          <span className="text-text-muted">×</span>
          <span className="text-data">DATA</span>
        </motion.div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="text-sm sm:text-base text-text-secondary mt-3 sm:mt-4 max-w-[560px] leading-relaxed font-normal"
        >
          I build intelligent systems, data-driven applications, automation workflows and practical engineering projects.
        </motion.p>

        {/* Buttons (Primary + Secondary + Resume Compact Row) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-4 sm:mt-5"
        >
          <a 
            href="#projects" 
            onClick={() => trackEvent('cta_click', { button: 'explore_my_work', location: 'hero' })}
            className="h-10 sm:h-11 px-4 sm:px-5 rounded-lg bg-brand text-background hover:bg-brand/90 transition-all font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand/20 active:scale-[0.98]"
          >
            <span>EXPLORE MY WORK</span>
            <ArrowRight size={15} />
          </a>
          <a 
            href={profile.github} 
            target="_blank" 
            rel="noreferrer" 
            onClick={() => trackEvent('github_click', { location: 'hero' })}
            className="h-10 sm:h-11 px-3.5 sm:px-4 rounded-lg border border-border-subtle bg-surface/40 hover:bg-surface hover:border-brand/40 text-text-primary transition-all font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 group active:scale-[0.98]"
          >
            <Github size={15} className="text-text-muted group-hover:text-text-primary transition-colors" />
            <span>VIEW GITHUB</span>
            <ArrowUpRight size={13} className="text-text-muted group-hover:text-text-primary transition-colors" />
          </a>
          <a 
            href="/resume.pdf" 
            onClick={(e) => {
              e.preventDefault();
              trackEvent('resume_view_click', { location: 'hero' });
              setResumeModalOpen(true);
            }}
            className="h-10 sm:h-11 px-3.5 sm:px-4 rounded-lg border border-border-subtle bg-surface/30 hover:bg-surface hover:border-brand/40 text-text-secondary hover:text-text-primary transition-all font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 group active:scale-[0.98] cursor-pointer"
            title="View and inspect Parth's official Resume"
          >
            <FileText size={15} className="text-brand group-hover:scale-110 transition-transform" />
            <span>VIEW RESUME</span>
          </a>
        </motion.div>

        {/* Bottom Stats (Compact) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="grid grid-cols-3 gap-2 sm:gap-2.5 mt-5 sm:mt-6 pt-3 border-t border-border-subtle/70 w-full max-w-[560px]"
        >
          <div className="p-2 sm:p-2.5 rounded-lg border border-border-subtle bg-surface/30 flex flex-col gap-0.5">
            <div className="text-[9px] font-mono text-text-muted tracking-widest uppercase">GITHUB SYNC</div>
            <div className="text-xs font-bold text-cyber flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber shadow-[0_0_8px_rgba(35,213,163,0.8)]" /> CONNECTED
            </div>
          </div>
          <div className="p-2 sm:p-2.5 rounded-lg border border-border-subtle bg-surface/30 flex flex-col gap-0.5">
            <div className="text-[9px] font-mono text-text-muted tracking-widest uppercase">PUBLIC WORK</div>
            <div className="text-xs font-bold text-text-primary font-mono tracking-wide">
              25 Repositories
            </div>
          </div>
          <div className="p-2 sm:p-2.5 rounded-lg border border-border-subtle bg-surface/30 flex flex-col gap-0.5">
            <div className="text-[9px] font-mono text-text-muted tracking-widest uppercase">BUILD ENGINE</div>
            <div className="text-xs font-bold text-auto font-mono tracking-wide">
              ACTIVE PIPELINE
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column (Standardized Image + Floating Badges) */}
      <div className="w-full lg:w-[45%] xl:w-[46%] relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] aspect-[4/5] max-h-[440px] sm:max-h-[480px] lg:max-h-[500px] xl:max-h-[520px] mx-auto lg:mr-0 z-10"
        >
          {/* Image Container */}
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden border border-border-subtle shadow-xl group bg-surface"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <img 
              ref={imgRef}
              src={imageSrc} 
              alt="Parth Chaudhari" 
              className="w-full h-full object-cover object-[50%_18%]" 
              onLoad={(e) => {
                e.currentTarget.style.display = 'block';
                e.currentTarget.parentElement?.classList.remove('bg-surface-elevated');
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('bg-surface-elevated', 'flex', 'items-center', 'justify-center');
                e.currentTarget.parentElement?.setAttribute('data-content', `Photo (Upload ${assets.profile} to public/)`);
              }}
            />
            {/* Fallback & Ingestion Dropzone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-5 text-center cursor-pointer bg-surface/80 hover:bg-surface border-2 border-dashed border-border-subtle hover:border-brand/50 transition-colors opacity-0 [.bg-surface-elevated_&]:opacity-100 z-20"
            >
              <div className="p-2.5 rounded-full bg-brand/10 text-brand border border-brand/20">
                <Camera size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider">
                  Select or Drop parth.jpg
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  Click here to load your attached photo into the portfolio
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-brand/20 text-brand font-mono text-[9px] font-bold tracking-widest mt-1 border border-brand/30">
                CLICK TO BROWSE
              </span>
            </div>
            {/* Gradient Overlay for bottom text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Quick action to load raw uncompressed original photo */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-md bg-background/90 hover:bg-background text-text-secondary hover:text-text-primary border border-border-subtle backdrop-blur-md font-mono text-[9px] flex items-center gap-1.5 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-md active:scale-95 cursor-pointer"
              title="Select exact original photo"
            >
              <Camera size={12} className="text-brand" />
              <span>PHOTO</span>
            </button>
          </div>

          {/* Top Left Badge */}
          <div className="absolute -top-2.5 -left-2 sm:-left-3 z-20 px-2.5 py-1 rounded-full border border-border-subtle bg-background/95 backdrop-blur-md font-mono text-[9px] sm:text-[10px] flex items-center gap-1.5 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span className="text-brand font-bold tracking-wider">PARTH CHAUDHARI</span>
            <span className="text-text-muted">// 973</span>
          </div>

          {/* Top Right Badge */}
          <div className="absolute top-3 -right-2 sm:-right-3 z-20 px-2.5 py-0.5 rounded-md border border-border-subtle bg-background/95 backdrop-blur-md font-mono text-[9px] sm:text-[10px] text-text-muted shadow-md tracking-wider">
            &gt;_ SOC & AI LAB
          </div>

          {/* Middle Left Badge (Domain) */}
          <div className="absolute top-[36%] -left-2 sm:-left-5 z-20 p-1.5 sm:p-2 pr-3 rounded-xl border border-border-subtle bg-background/95 backdrop-blur-md shadow-lg flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-ai/10 text-ai border border-ai/20"><Cpu size={15} /></div>
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-text-muted tracking-wider">DOMAIN</span>
              <span className="text-[11px] font-bold text-text-primary font-mono tracking-wide">AI & DATA</span>
            </div>
          </div>

          {/* Middle Right Badge (Specialization) */}
          <div className="absolute top-[52%] -right-2 sm:-right-5 z-20 p-1.5 sm:p-2 pr-3 rounded-xl border border-border-subtle bg-background/95 backdrop-blur-md shadow-lg flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyber/10 text-cyber border border-cyber/20"><Shield size={15} /></div>
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-text-muted tracking-wider">SPECIALIZATION</span>
              <span className="text-[11px] font-bold text-text-primary font-mono tracking-wide">DEFENSIVE SEC</span>
            </div>
          </div>

          {/* Bottom Left Badge (Pipeline) */}
          <div className="absolute bottom-11 -left-2 sm:-left-4 z-20 p-1.5 sm:p-2 pr-3 rounded-xl border border-border-subtle bg-background/95 backdrop-blur-md shadow-lg flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-auto/10 text-auto border border-auto/20"><Link size={15} /></div>
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-text-muted tracking-wider">PIPELINE</span>
              <span className="text-[11px] font-bold text-text-primary font-mono tracking-wide">AUTOMATION</span>
            </div>
          </div>

          {/* Bottom Center Bar */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[92%] z-20 p-2 sm:p-2.5 rounded-xl border border-border-subtle bg-background/95 backdrop-blur-md shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-full border border-cyber/30 text-cyber bg-cyber/10 relative shadow-[0_0_10px_rgba(35,213,163,0.2)]">
                 <span className="absolute inset-0 rounded-full border border-cyber animate-ping opacity-30" />
                 <Activity size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-text-muted tracking-widest">ENGINEERING STATUS</span>
                <span className="text-[11px] font-bold font-mono tracking-wider text-brand">
                  GitHub <span className="text-cyber">• CONNECTED</span> <span className="text-text-muted mx-1">♦</span> Projects <span className="text-brand">• LIVE</span>
                </span>
              </div>
            </div>
            <a 
              href="#projects" 
              className="px-2 py-1 rounded-md bg-surface hover:bg-brand/20 text-[10px] font-mono text-brand transition-all flex items-center gap-1 tracking-wider border border-border-subtle active:scale-95 cursor-pointer"
            >
              <span>WORK</span>
              <span>↓</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
