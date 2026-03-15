import { DemoSession } from '../../types/session';

const SESSION_KEY = 'idea2one_demo_session';

const defaultSession: DemoSession = {
  hasSeenWelcome: false,
  newPetUnseen: false,
};

export function getSession(): DemoSession {
  if (typeof window === 'undefined') return defaultSession;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return defaultSession;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return defaultSession;
  }
}

export function saveSession(session: DemoSession): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save session', e);
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}
