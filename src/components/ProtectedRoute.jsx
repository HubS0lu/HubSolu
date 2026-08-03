import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Renderiza uma tela de carregamento enquanto o AuthContext verifica o localStorage
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#212529]">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-[#f8f9fa]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redireciona para o login e salva o caminho para redirecionar de volta após login
    return <Navigate to="/cadastro" state={{ from: location }} replace />;
  }

  return children;
}
