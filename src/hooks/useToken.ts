import { useState } from 'react';
import { TOKENS_KEY } from 'utils/token';

export type UserTokens = {
  token: {
    token: string;
    expires: number;
    expires_in: number;
  };
  refresh_token: {
    token: string;
    expires: number;
    expires_in: number;
  };
}

export default function useToken() {

  const getToken = () => {
    const tokenString = localStorage.getItem(TOKENS_KEY);
    if (!tokenString) {
      return null
    }
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token: string) => {
    localStorage.setItem(TOKENS_KEY, token);
    setToken(token);
  };

  const clearToken = () => localStorage.removeItem(TOKENS_KEY);

  return {
    setToken: saveToken,
    clearToken,
    token
  }
}