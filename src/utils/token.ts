export const TOKENS_KEY = 'tokens';

export function getToken(): string | null {
  const tokenString = localStorage.getItem(TOKENS_KEY);
  if (!tokenString) {
    return null
  }
  return tokenString;
};