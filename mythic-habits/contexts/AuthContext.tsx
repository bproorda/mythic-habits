import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  email?: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (creds: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

const STORAGE_KEY = '@mythic_habits:auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // restore user from AsyncStorage
    const restore = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const parsed = JSON.parse(json) as User;
          setUser(parsed);
        }
      } catch (e) {
        // ignore restore errors for now
        console.warn('Failed to restore auth', e);
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    setLoading(true);
    try {
      // Replace this with a real API call. This is a minimal mock.
      await new Promise((r) => setTimeout(r, 700));

      const fakeUser: User = {
        id: '1',
        name: email.split('@')[0] ?? 'User',
        email,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
      setUser(fakeUser);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export default AuthContext;
