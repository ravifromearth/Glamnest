/** Admin session stored in localStorage (mandatory for /admin). */

export const ADMIN_SESSION_KEY = "glamnest-admin-session-v1";
export const ADMIN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** Demo admin credentials — change in production. */
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "glamnest@admin",
  name: "Admin",
} as const;

export interface AdminSession {
  username: string;
  name: string;
  expiresAt: number;
}

export function readAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (!session.expiresAt || Date.now() > session.expiresAt) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function adminSignIn(
  username: string,
  password: string
): { ok: true; session: AdminSession } | { ok: false; error: string } {
  const u = username.trim().toLowerCase();
  const p = password;
  if (u !== ADMIN_CREDENTIALS.username || p !== ADMIN_CREDENTIALS.password) {
    return { ok: false, error: "Invalid admin username or password." };
  }
  const session: AdminSession = {
    username: ADMIN_CREDENTIALS.username,
    name: ADMIN_CREDENTIALS.name,
    expiresAt: Date.now() + ADMIN_TTL_MS,
  };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  return { ok: true, session };
}

export function adminSignOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
