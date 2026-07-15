/** Local browser auth — users & sessions live in localStorage for 30 days. */

export const AUTH_USERS_KEY = "glamnest-users-v1";
export const AUTH_SESSION_KEY = "glamnest-session-v1";
export const AUTH_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  passwordHash: string;
  createdAt: number;
}

export interface AuthSession {
  userId: string;
  expiresAt: number;
}

export type PublicUser = Omit<AuthUser, "passwordHash">;

export async function hashPassword(password: string) {
  const data = new TextEncoder().encode(`glamnest:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readUsers(): AuthUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    return raw ? (JSON.parse(raw) as AuthUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: AuthUser[]) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

export function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    if (!session.expiresAt || Date.now() > session.expiresAt) {
      localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession) {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

function toPublic(user: AuthUser): PublicUser {
  const { passwordHash: _, ...rest } = user;
  return rest;
}

export function getCurrentUser(): PublicUser | null {
  const session = readSession();
  if (!session) return null;
  const user = readUsers().find((u) => u.id === session.userId);
  return user ? toPublic(user) : null;
}

export async function signUp(input: {
  name: string;
  phone: string;
  email?: string;
  password: string;
}): Promise<{ ok: true; user: PublicUser } | { ok: false; error: string }> {
  const name = input.name.trim();
  const phone = input.phone.replace(/\D/g, "").slice(-10);
  const email = (input.email ?? "").trim().toLowerCase();
  const password = input.password;

  if (name.length < 2) return { ok: false, error: "Please enter your full name." };
  if (!/^[6-9]\d{9}$/.test(phone)) return { ok: false, error: "Enter a valid 10-digit mobile number." };
  if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const users = readUsers();
  if (users.some((u) => u.phone === phone)) {
    return { ok: false, error: "An account with this mobile number already exists. Please sign in." };
  }
  if (email && users.some((u) => u.email && u.email === email)) {
    return { ok: false, error: "An account with this email already exists. Please sign in." };
  }

  const user: AuthUser = {
    id: `usr_${Date.now().toString(36)}`,
    name,
    phone,
    email,
    passwordHash: await hashPassword(password),
    createdAt: Date.now(),
  };
  writeUsers([...users, user]);
  writeSession({ userId: user.id, expiresAt: Date.now() + AUTH_TTL_MS });
  return { ok: true, user: toPublic(user) };
}

export async function signIn(input: {
  phone: string;
  password: string;
}): Promise<{ ok: true; user: PublicUser } | { ok: false; error: string }> {
  const phone = input.phone.replace(/\D/g, "").slice(-10);
  if (!/^[6-9]\d{9}$/.test(phone)) return { ok: false, error: "Enter a valid 10-digit mobile number." };

  const user = readUsers().find((u) => u.phone === phone);
  if (!user) return { ok: false, error: "No account found for this number. Please sign up." };

  const hash = await hashPassword(input.password);
  if (hash !== user.passwordHash) return { ok: false, error: "Incorrect password. Try again." };

  writeSession({ userId: user.id, expiresAt: Date.now() + AUTH_TTL_MS });
  return { ok: true, user: toPublic(user) };
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_SESSION_KEY);
}
