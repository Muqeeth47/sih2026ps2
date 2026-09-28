'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role, User } from './types';
import { MOCK_USERS } from './mock-data';

interface AppStore {
  currentRole: Role;
  currentUser: User;
  setRole: (role: Role) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ROLE_TO_USER: Record<Role, User> = {
  APPLICANT: MOCK_USERS[0],
  INSTITUTE_NODAL: MOCK_USERS[2],
  SCRUTINY_OFFICER: MOCK_USERS[3],
  MINISTRY_ADMIN: MOCK_USERS[4],
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      currentRole: 'APPLICANT',
      currentUser: MOCK_USERS[0],
      darkMode: false,
      setRole: (role: Role) =>
        set({ currentRole: role, currentUser: ROLE_TO_USER[role] }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
    }),
    { name: 'tribal-scholar-store' }
  )
);
