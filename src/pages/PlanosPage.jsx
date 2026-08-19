import React, { useState } from 'react';
import { CheckCircle2, Star, ArrowRight, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';

export default function PlanosPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { createStore } = useStore();
  const businessType = location.state?.businessType || 'outro';

  const handleContinue = async () => {
    if (user && !isCreating) {
      setIsCreating(true);
      try {
        const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário';
        const storeName = `Loja de ${userName}`;
        await createStore({
          user_id: user.id,
          name: storeName,
          category: businessType,
        });
      } catch (error) {
        console.error("Erro ao criar a loja:", error);
      }
    }
    navigate('/perfil');
  };

  return (
    <div className="flex justify-center bg-[#212529] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f9fa] relative min-h-screen flex flex-col shadow-2xl overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 bg-[#f8f9fa] border-b border-[#e9ecef] relative">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-12 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-[#e9ecef] text-[#495057] hover:text-[#212529] transition-colors"
        >
          <X size={18} />
        </button>
        <h1 className="text-[#212529] font-headline font-bold text-2xl pr-10">Escolha seu plano</h1>
        <p className="text-[#6c757d] text-sm mt-1">Faça upgrade e libere todo o potencial.</p>
      </header>

      <div className="px-6 py-6 space-y-4 flex-1">
        
        {/* Pro Plan (Featured) */}
        <div 
          onClick={() => setSelectedPlan('pro')}
          className={`relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
            selectedPlan === 'pro' 
              ? 'border-[#343a40] bg-[#ffffff] shadow-md' 
              : 'border-[#ced4da] bg-[#f1f3f5]'
          }`}
        >
          {/* Accent corner */}
          <div className={`absolute right-0 top-0 h-16 w-16 -translate-y-1/2 translate-x-1/2 rounded-full transition-colors ${selectedPlan === 'pro' ? 'bg-[#343a40]/10 blur-xl' : 'bg-transparent'}`}></div>
          
          <div className={`absolute right-4 top-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${selectedPlan === 'pro' ? 'bg-[#343a40] text-[#f8f9fa]' : 'bg-[#ced4da] text-[#495057]'}`}>
            Popular
          </div>

          <div className="p-5">
            <h3 className="flex items-center gap-2 font-headline text-lg font-bold text-[#212529] mb-1">
              Pro
              <Star size={14} className={`${selectedPlan === 'pro' ? 'text-[#343a40] fill-[#343a40]' : 'text-[#adb5bd]'}`} />
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-headline text-3xl font-black text-[#212529]">R$ 29</span>
              <span className="font-body text-xs text-[#6c757d]">/mês</span>
            </div>
            
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${selectedPlan === 'pro' ? 'text-[#343a40]' : 'text-[#adb5bd]'}`} />
                <span className="font-body text-sm font-semibold text-[#212529]">Produtos ilimitados</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${selectedPlan === 'pro' ? 'text-[#343a40]' : 'text-[#adb5bd]'}`} />
                <span className="font-body text-sm font-semibold text-[#212529]">Assistente com IA</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${selectedPlan === 'pro' ? 'text-[#343a40]' : 'text-[#adb5bd]'}`} />
                <span className="font-body text-sm font-semibold text-[#212529]">Relatórios avançados</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${selectedPlan === 'pro' ? 'text-[#343a40]' : 'text-[#adb5bd]'}`} />
                <span className="font-body text-sm font-semibold text-[#212529]">Suporte prioritário</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Free Plan */}
        <div 
          onClick={() => setSelectedPlan('gratuito')}
          className={`relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
            selectedPlan === 'gratuito' 
              ? 'border-[#343a40] bg-[#ffffff] shadow-md' 
              : 'border-[#ced4da] bg-[#f1f3f5]'
          }`}
        >
          <div className="p-5">
            <h3 className="font-headline text-lg font-bold text-[#212529] mb-1">Gratuito</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-headline text-3xl font-black text-[#212529]">R$ 0</span>
              <span className="font-body text-xs text-[#6c757d]">/para sempre</span>
            </div>
            
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${selectedPlan === 'gratuito' ? 'text-[#343a40]' : 'text-[#adb5bd]'}`} />
                <span className={`font-body text-sm ${selectedPlan === 'gratuito' ? 'text-[#212529] font-semibold' : 'text-[#6c757d]'}`}>Até 20 produtos</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${selectedPlan === 'gratuito' ? 'text-[#343a40]' : 'text-[#adb5bd]'}`} />
                <span className={`font-body text-sm ${selectedPlan === 'gratuito' ? 'text-[#212529] font-semibold' : 'text-[#6c757d]'}`}>Controle básico</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${selectedPlan === 'gratuito' ? 'text-[#343a40]' : 'text-[#adb5bd]'}`} />
                <span className={`font-body text-sm ${selectedPlan === 'gratuito' ? 'text-[#212529] font-semibold' : 'text-[#6c757d]'}`}>Acesso mobile</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Bottom */}
      <div className="p-6 border-t border-[#e9ecef] bg-[#f8f9fa] pb-10">
        <button 
          onClick={handleContinue}
          disabled={isCreating}
          className="w-full bg-[#343a40] text-[#f8f9fa] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-[#212529] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Finalizando...' : (selectedPlan === 'pro' ? 'Assinar Plano Pro' : 'Continuar com Gratuito')}
          <ArrowRight size={18} />
        </button>
        <p className="text-center font-body text-[10px] text-[#6c757d] mt-3">
          Cancele quando quiser. Sem taxas escondidas.
        </p>
      </div>
      </div>
    </div>
  );
}
