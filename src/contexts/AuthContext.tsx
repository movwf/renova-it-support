/*
  For visual authentication.
  Don't use it for production.
  Local storage is not fun for sekewritty :S

  Movwf - 2021
  github.com/movwf
*/
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { IAuth, IAuthProvider, UserObject } from './types/AuthContext.types';

export const AuthContext = React.createContext<IAuth>({
  login: () => {},
  logout: () => {},
  isAuth: false,
  user: {},
});

export function AuthProvider({ children }: IAuthProvider) {
  const [isAuth, setIsAuth] = useLocalStorage('isAuthenticated', false);
  const [user, setUser] = useLocalStorage('client-user', {});

  const login = (userObject: UserObject) => {
    setUser(userObject); // Store user to localStorage

    setIsAuth(true); // Enable isAuth @localStorage
  };

  const logout = async () => {
    setUser({}); // Reset user store

    await setIsAuth(false); // Disable isAuth @localStorage
  };

  const value = { login, logout, isAuth, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
