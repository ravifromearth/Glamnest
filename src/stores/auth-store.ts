"use client";

import { create } from "zustand";
import {
  getCurrentUser,
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
  type PublicUser,
} from "@/lib/auth";

interface AuthState {
  user: PublicUser | null;
  hydrated: boolean;
  hydrate: () => void;
  signUp: (input: {
    name: string;
    phone: string;
    email?: string;
    password: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  signIn: (input: {
    phone: string;
    password: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,

  hydrate: () => {
    set({ user: getCurrentUser(), hydrated: true });
  },

  signUp: async (input) => {
    const result = await authSignUp(input);
    if (!result.ok) return result;
    set({ user: result.user, hydrated: true });
    return { ok: true as const };
  },

  signIn: async (input) => {
    const result = await authSignIn(input);
    if (!result.ok) return result;
    set({ user: result.user, hydrated: true });
    return { ok: true as const };
  },

  signOut: () => {
    authSignOut();
    set({ user: null, hydrated: true });
  },
}));
