import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function RegistroPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // In a real app we would register here. For now we use login context mock
    login(email, password);
    
    // Redirect to selecao-negocio
    navigate('/selecao-negocio', { replace: true });
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await loginWithGoogle();
    
    navigate('/selecao-negocio', { replace: true });
  };

  return (
    <div className="flex justify-center bg-[#212529] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f9fa] relative min-h-screen flex flex-col px-6 py-12 overflow-hidden shadow-2xl transition-colors duration-300">
        
        <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold font-headline text-[#212529] mb-2">Crie sua conta</h1>
          <p className="text-[#6c757d] font-body">Comece a gerenciar seu negócio agora.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-[#495057] uppercase tracking-wider mb-1.5">Nome</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#adb5bd]">
                <User size={20} />
              </div>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full bg-[#f1f3f5] border border-[#ced4da] rounded-xl py-3 pl-11 pr-4 text-[#212529] placeholder:text-[#adb5bd] focus:outline-none focus:border-[#adb5bd] focus:bg-[#f8f9fa] transition-colors"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#495057] uppercase tracking-wider mb-1.5">E-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#adb5bd]">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#f1f3f5] border border-[#ced4da] rounded-xl py-3 pl-11 pr-4 text-[#212529] placeholder:text-[#adb5bd] focus:outline-none focus:border-[#adb5bd] focus:bg-[#f8f9fa] transition-colors"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#495057] uppercase tracking-wider mb-1.5">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#adb5bd]">
                <Lock size={20} />
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#f1f3f5] border border-[#ced4da] rounded-xl py-3 pl-11 pr-4 text-[#212529] placeholder:text-[#adb5bd] focus:outline-none focus:border-[#adb5bd] focus:bg-[#f8f9fa] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#343a40] text-[#f8f9fa] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 mt-4 shadow-sm hover:bg-[#212529] active:scale-[0.98] transition-all"
          >
            Cadastrar
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-[#ced4da] flex-1"></div>
          <span className="text-[#6c757d] text-sm font-semibold uppercase tracking-wider">ou continuar com</span>
          <div className="h-px bg-[#ced4da] flex-1"></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          type="button" 
          disabled={isGoogleLoading}
          className="w-full bg-white border border-[#ced4da] text-[#495057] font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 mb-8 shadow-sm hover:bg-[#f8f9fa] hover:text-[#212529] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-[#495057]"></div>
          ) : (
            <GoogleIcon />
          )}
          {isGoogleLoading ? 'Autenticando...' : 'Cadastrar com Google'}
        </button>

        <div className="text-center">
          <p className="text-sm text-[#6c757d]">
            Já tem uma conta? <Link to="/cadastro" className="text-[#212529] font-bold underline">Faça login</Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
