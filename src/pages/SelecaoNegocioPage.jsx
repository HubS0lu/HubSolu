import React, { useState } from 'react';
import { Truck, Utensils, Wine, Coffee, Store, MoreHorizontal, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const businessTypes = [
  { id: 'food_truck', label: 'Food Truck', icon: Truck },
  { id: 'restaurante', label: 'Restaurante', icon: Utensils },
  { id: 'bebidas', label: 'Depósito de Bebidas', icon: Wine },
  { id: 'cafe', label: 'Café', icon: Coffee },
  { id: 'comercio', label: 'Comércio Informal', icon: Store },
  { id: 'outro', label: 'Outro', icon: MoreHorizontal },
];

export default function SelecaoNegocioPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-[#212529] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f9fa] relative min-h-screen flex flex-col shadow-2xl overflow-hidden transition-colors duration-300">
        {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-[#e9ecef]">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#495057] hover:text-[#212529]">
          <ArrowLeft size={20} />
          <span className="text-sm font-semibold uppercase tracking-wider">Voltar</span>
        </button>
      </header>

      <div className="flex-1 px-6 flex flex-col pt-8">
        {/* Progress Bar */}
        <div className="relative mb-10 flex w-full max-w-sm mx-auto items-center justify-between">
          <div className="absolute left-0 top-1/2 z-0 h-1 w-full -translate-y-1/2 bg-[#e9ecef] rounded-full"></div>
          <div className="absolute left-0 top-1/2 z-0 h-1 w-1/2 -translate-y-1/2 bg-[#343a40] rounded-full"></div>
          
          <div className="relative z-10 w-8 h-8 rounded-full bg-[#343a40] flex items-center justify-center text-[#f8f9fa] shadow-sm">
            <span className="text-sm font-bold">1</span>
          </div>
          <div className="relative z-10 w-8 h-8 rounded-full bg-[#343a40] text-[#f8f9fa] ring-4 ring-[#f8f9fa] flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold">2</span>
          </div>
          <div className="relative z-10 w-8 h-8 rounded-full bg-[#e9ecef] text-[#6c757d] flex items-center justify-center border border-[#ced4da]">
            <span className="text-sm font-bold">3</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-headline font-bold text-[#212529] mb-2">Qual é seu negócio?</h1>
          <p className="text-[#6c757d] text-sm">Isso nos ajuda a personalizar sua experiência.</p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {businessTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selected === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${
                  isSelected 
                    ? 'border-[#343a40] bg-[#343a40] text-[#f8f9fa] shadow-md' 
                    : 'border-[#ced4da] bg-[#f1f3f5] hover:bg-[#e9ecef] text-[#495057]'
                }`}
              >
                <Icon size={32} className={`${isSelected ? 'text-[#f8f9fa]' : 'text-[#495057]'}`} />
                <span className={`text-sm font-semibold ${isSelected ? 'text-[#f8f9fa]' : 'text-[#212529]'}`}>
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-auto pb-10">
          <button
            disabled={!selected}
            onClick={() => navigate('/planos', { state: { businessType: selected } })}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
              selected 
                ? 'bg-[#343a40] text-[#f8f9fa] shadow-sm hover:bg-[#212529] active:scale-[0.98]' 
                : 'bg-[#e9ecef] text-[#adb5bd] cursor-not-allowed'
            }`}
          >
            Continuar
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
