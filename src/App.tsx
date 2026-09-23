/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { CurrentlyBuilding } from './components/CurrentlyBuilding';
import { LiveGitHub } from './components/LiveGitHub';
import { Journey } from './components/Journey';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { OwnerDashboardModal } from './components/OwnerDashboardModal';
import { ResumeModal } from './components/ResumeModal';
import { trackEvent } from './lib/supabase';

export default function App() {
  const { theme, ownerDashboardOpen, setOwnerDashboardOpen } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Track initial page view in Supabase
  useEffect(() => {
    trackEvent('page_view', {
      title: document.title,
      screen: `${window.innerWidth}x${window.innerHeight}`,
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut to open Owner Dashboard: Alt+D or Ctrl+Shift+D
      if ((e.altKey && e.key.toLowerCase() === 'd') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd')) {
        e.preventDefault();
        setOwnerDashboardOpen(!ownerDashboardOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ownerDashboardOpen, setOwnerDashboardOpen]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-text-primary transition-colors duration-500">
      <CommandPalette />
      <ResumeModal />
      <OwnerDashboardModal 
        isOpen={ownerDashboardOpen} 
        onClose={() => setOwnerDashboardOpen(false)} 
      />
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />
      
      {/* Ambient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-ai/20 dark:bg-ai/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-brand/20 dark:bg-brand/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full">
        <Navbar />
        
        <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-20 sm:pt-22 lg:pt-24 pb-20 flex flex-col gap-20 lg:gap-28">
          <Hero />
          <About />
          <Projects />
          <CurrentlyBuilding />
          <LiveGitHub />
          <Journey />
          <Skills />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
