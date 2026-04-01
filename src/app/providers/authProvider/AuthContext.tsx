import { createContext, useState, useEffect, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export type AuthContextType = {
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const token = localStorage.getItem('token');

    setIsAuth(!!token || !!accessToken);
  }, [accessToken]);

  const value: AuthContextType = {
    isAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
