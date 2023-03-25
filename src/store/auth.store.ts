import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { TUser } from '../types';

type AuthPage = 'login' | 'register';
type AuthState = {
  user: TUser | null;
  authPage: AuthPage;
};

type AuthActions = {
  setAuthPage: (page: AuthPage) => void;
  setUserCredentials: (credentials: TUser) => void;
  logout: () => void;
};

type AuthStore = AuthState & AuthActions;

const key = 'auth_store';
const { state } =
  (JSON.parse(localStorage.getItem(key) as string) as StorageValue<AuthState>) ?? {};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: state?.user ?? null,
      authPage: 'login',
      setAuthPage: page => set({ authPage: page }),
      setUserCredentials: credentials => set({ user: credentials }),
      logout: () => set({ user: null }),
    }),
    { name: key },
  ),
);
