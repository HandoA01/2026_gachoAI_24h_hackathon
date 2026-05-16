import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState } from '../types/auth';

// 인증 상태 (uidx) — localStorage에 영속화
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      uidx: null,
      isAuthenticated: false,
      setAuth: (uidx) => set({ uidx, isAuthenticated: true }),
      clearAuth: () => set({ uidx: null, isAuthenticated: false }),
    }),
    {
      name: 'gachon-auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
