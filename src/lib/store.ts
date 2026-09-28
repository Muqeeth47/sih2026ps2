import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role, User, Application } from './types';
import { MOCK_USERS, MOCK_APPLICATIONS as INITIAL_APPS } from './mock-data';

interface AppStore {
  currentRole: Role;
  currentUser: User | null;
  setRole: (role: Role) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Prototype State
  applications: Application[];
  updateAppStatus: (id: string, status: Application['status']) => void;
  addDeficiency: (id: string, reason: string) => void;
  addNotification: (reason: string) => void;
  notifications: string[];
}

const ROLE_TO_USER: Record<Role, User | null> = {
  GUEST: null,
  APPLICANT: MOCK_USERS[0],
  INSTITUTE_NODAL: MOCK_USERS[2],
  SCRUTINY_OFFICER: MOCK_USERS[3],
  MINISTRY_ADMIN: MOCK_USERS[4],
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      currentRole: 'GUEST',
      currentUser: null,
      darkMode: false,
      setRole: (role: Role) =>
        set({ currentRole: role, currentUser: ROLE_TO_USER[role] }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      
      applications: INITIAL_APPS,
      updateAppStatus: (id, status) => set((s) => ({
        applications: s.applications.map(app => app.id === id ? { ...app, status } : app)
      })),
      addDeficiency: (id, reason) => set((s) => ({
        applications: s.applications.map(app => app.id === id ? { 
          ...app, 
          status: 'DEFICIENCY_RAISED', 
          deficiencies: [...app.deficiencies, { id: '1', applicationId: id, documentType: 'CASTE_CERTIFICATE', status: 'OPEN', raisedAt: new Date().toISOString(), reason,  }] 
        } : app)
      })),
      notifications: ['Welcome to the MoTA Scholarship Portal.'],
      addNotification: (reason) => set((s) => ({
        notifications: [reason, ...s.notifications]
      }))
    }),
    { name: 'tribal-scholar-store-v2' }
  )
);
