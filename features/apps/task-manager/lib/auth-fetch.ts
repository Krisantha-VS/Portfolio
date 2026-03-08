import { AUTH_BASE } from '@/shared/config';

const TOKEN_KEY   = 'tm_token';
const REFRESH_KEY = 'tm_refresh';

// ─── Token storage helpers ────────────────────────────────

export function storeTokens(accessToken: string, refreshToken: string) {
  sessionStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function clearTokens() {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// ─── Refresh ──────────────────────────────────────────────

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res  = await fetch(`${AUTH_BASE}/auth/refresh`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ refreshToken }),
    });
    const json = await res.json();
    if (!json.success) return null;

    const { accessToken, refreshToken: newRefresh } = json.data;
    storeTokens(accessToken, newRefresh ?? refreshToken);
    return accessToken;
  } catch {
    return null;
  }
}

// ─── authFetch ────────────────────────────────────────────
// Wraps fetch with Bearer token injection + a single 401 retry after refresh.

export async function authFetch(
  url: string,
  options: RequestInit = {},
  token?: string,
): Promise<Response> {
  const currentToken = token ?? getAccessToken();
  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (currentToken) headers.set('Authorization', `Bearer ${currentToken}`);

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`);
      return fetch(url, { ...options, headers });
    }
    // Refresh failed — clear tokens so the app redirects to login
    clearTokens();
  }

  return res;
}
