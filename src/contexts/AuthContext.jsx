import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there is a logged in user in localStorage on mount
    const storedUser = localStorage.getItem('hubsolu_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login - in a real app this would be an API call
    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
    };
    
    setUser(mockUser);
    localStorage.setItem('hubsolu_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const loginWithGoogle = () => {
    // Simulate Google login
    const mockUser = {
      id: 'google_' + Math.random().toString(36).substr(2, 9),
      name: 'Google User',
      email: 'user@gmail.com',
    };
    
    setUser(mockUser);
    localStorage.setItem('hubsolu_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hubsolu_user');
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
