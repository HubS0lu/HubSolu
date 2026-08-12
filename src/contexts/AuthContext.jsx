import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Se a URL do Supabase for a temporária ou não existir, ativamos o modo mock
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const isMockMode = !envUrl || envUrl === 'undefined' || envUrl === 'null' || String(envUrl).includes('temporaria');

  useEffect(() => {
    if (isMockMode) {
      const savedUser = localStorage.getItem('mock_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
      return;
    }

    // 1. Pega a sessão atual ao iniciar o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Escuta mudanças na autenticação (login, logout, refresh de token)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isMockMode]);

  const login = async (email, password) => {
    if (isMockMode) {
      const mockUser = { id: 'mock-id', email, user_metadata: { full_name: 'Usuário Mock' } };
      setUser(mockUser);
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      return mockUser;
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  };

  const loginWithGoogle = async () => {
    if (isMockMode) {
      const mockUser = { id: 'google-mock', email: 'usuario@gmail.com', user_metadata: { full_name: 'Usuário Google' } };
      setUser(mockUser);
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      window.location.href = '/selecao-negocio';
      return { user: mockUser };
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/selecao-negocio'
      }
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    if (isMockMode) {
      setUser(null);
      localStorage.removeItem('mock_user');
      window.location.href = '/';
      return;
    }
    await supabase.auth.signOut();
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
