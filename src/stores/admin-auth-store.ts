"use client";

import { create } from "zustand";
import {
  adminSignIn,
  adminSignOut,
  readAdminSession,
  type AdminSession,
} from "@/lib/admin-auth";

interface AdminAuthState {
  session: AdminSession | null;
  hydrated: boolean;
  hydrate: () => void;
  signIn: (
    username: string,
    password: string
  ) => { ok: true } | { ok: false; error: string };
  signOut: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  session: null,
  hydrated: false,

  hydrate: () => {
    set({ session: readAdminSession(), hydrated: true });
  },

  signIn: (username, password) => {
    const result = adminSignIn(username, password);
    if (!result.ok) return result;
    set({ session: result.session, hydrated: true });
    return { ok: true as const };
  },

  signOut: () => {
    adminSignOut();
    set({ session: null, hydrated: true });
  },
}));
