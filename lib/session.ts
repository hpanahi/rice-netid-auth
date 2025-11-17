/**
 * Simple session management using HTTP-only cookies
 */

import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'rice-netid-session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionData {
  netId: string;
  affiliation?: string;
  authenticated: boolean;
}

/**
 * Create a session for an authenticated user
 */
export async function createSession(netId: string, affiliation?: string): Promise<void> {
  const sessionData: SessionData = {
    netId,
    affiliation,
    authenticated: true,
  };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

/**
 * Get the current session
 */
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }

  try {
    const sessionData = JSON.parse(sessionCookie.value) as SessionData;
    return sessionData.authenticated ? sessionData : null;
  } catch {
    return null;
  }
}

/**
 * Destroy the current session
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
