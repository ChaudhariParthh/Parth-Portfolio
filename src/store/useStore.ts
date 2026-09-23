import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { trackEvent } from '../lib/supabase';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  engMode: boolean;
  toggleEngMode: () => void;
  ownerDashboardOpen: boolean;
  setOwnerDashboardOpen: (open: boolean) => void;
  resumeModalOpen: boolean;
  setResumeModalOpen: (open: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        trackEvent('theme_toggled', { theme: nextTheme });
        return { theme: nextTheme };
      }),
      engMode: false,
      toggleEngMode: () => set((state) => {
        const nextMode = !state.engMode;
        trackEvent('eng_mode_toggled', { engMode: nextMode });
        return { engMode: nextMode };
      }),
      ownerDashboardOpen: false,
      setOwnerDashboardOpen: (open: boolean) => {
        if (open) {
          trackEvent('owner_dashboard_opened');
        }
        set({ ownerDashboardOpen: open });
      },
      resumeModalOpen: false,
      setResumeModalOpen: (open: boolean) => {
        if (open) {
          trackEvent('resume_modal_opened');
        }
        set({ resumeModalOpen: open });
      },
    }),
    {
      name: 'parth-portfolio-storage',
      partialize: (state) => ({ theme: state.theme, engMode: state.engMode }),
    }
  )
);
