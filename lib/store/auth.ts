// lib/store/auth.ts
import { create } from 'zustand';

interface AuthState {
  user: { id: number; username: string; role: number } | null;
  setUser: (user: { id: number; username: string; role: number } | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));