import { create } from 'zustand';

interface AuthUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: Boolean(user),
    }),
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
