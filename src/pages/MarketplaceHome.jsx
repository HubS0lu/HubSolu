import React, { useState } from 'react';
import { User, LogOut, Pizza, Beer, IceCream, Cake, Utensils, Croissant, Drumstick, ShoppingCart, Shirt, Baby, Footprints, Brush, Sparkles, Droplets, Scissors, Store, Heart, Package, Smartphone, Monitor, Headphones, Gamepad2, Pill, Dumbbell, Stethoscope, Glasses, Bone, PawPrint, HeartPulse, Wrench, Truck, Home, BookOpen, Gift, Leaf, ChevronRight, Ticket, Percent } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MarketplaceBottomNav from '../components/MarketplaceBottomNav';
import { allCategories } from '../data/categoriesData';

export default function MarketplaceHome() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeMainCategory, setActiveMainCategory] = useState('Alimentação');



  const currentCategories = allCategories[activeMainCategory] || [];

  return (
    <div className="flex justify-center bg-[#212529] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f9fa] relative min-h-screen flex flex-col shadow-2xl overflow-hidden font-body pb-20 transition-colors duration-300">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-[#e9ecef] bg-[#f8f9fa] sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#e9ecef] flex items-center justify-center border border-[#ced4da]">
            <User size={20} className="text-[#495057]" />
          </div>
          <span className="font-semibold text-[#212529] hidden sm:block">
            {isAuthenticated ? `Olá, ${user.name}` : 'Olá, Visitante'}
          </span>
        </div>
        <div className="flex gap-2">
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => navigate('/cadastro', { state: { from: { pathname: '/marketplace' } } })}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#495057] hover:bg-[#e9ecef] transition-colors"
              >
                Entrar
              </button>
              <button 
                onClick={() => navigate('/planos')}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-[#343a40] text-[#f8f9fa] hover:bg-[#212529] transition-colors shadow-sm"
              >
                Contrate
              </button>
            </>
          ) : (
            <button 
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[#e03131] hover:bg-[#fff5f5] transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          )}
        </div>
      </header>

      <main className="w-full px-6 pt-6 flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative w-full h-[260px] rounded-3xl overflow-hidden mb-8 shadow-md group border border-[#ced4da]">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80" 
            alt="Hero Banner" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#212529]/90 via-[#212529]/60 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#f8f9fa] mb-2 tracking-tight">
              CUPOM<br />
              <span className="text-[#adb5bd] text-2xl mt-1 block">15% OFF</span>
            </h1>
            <p className="text-xs md:text-sm text-[#dee2e6] max-w-[220px] leading-relaxed">Aproveite os melhores estabelecimentos da cidade com desconto exclusivo.</p>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="flex justify-center items-center mb-8 w-full relative">
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-[304px] snap-x snap-mandatory scroll-smooth">
            {Object.keys(allCategories).map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveMainCategory(cat)}
                className={`snap-start shrink-0 w-[96px] flex flex-col items-center justify-center px-1 py-2 min-h-[48px] rounded-xl text-[11px] sm:text-xs font-semibold whitespace-normal text-center leading-tight transition-all duration-300 border ${
                  activeMainCategory === cat 
                    ? 'bg-[#343a40] text-[#f8f9fa] border-[#343a40] shadow-sm' 
                    : 'bg-[#f1f3f5] text-[#495057] border-[#ced4da] hover:bg-[#e9ecef]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute right-1 sm:right-4 text-[#adb5bd] flex items-center justify-center animate-pulse pointer-events-none pb-2">
            <ChevronRight size={24} />
          </div>
        </div>

        {/* Grid Categories */}
        <div className="grid grid-cols-4 gap-y-6 gap-x-2 justify-items-center min-h-[210px] content-start">
          {currentCategories.map((cat, idx) => {
            const Icon = cat.icon || Store;
            return (
              <Link 
                to="/marketplace/category"
                state={{ categoryName: cat.name, categoryImg: cat.img }}
                key={idx} 
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-full bg-[#e9ecef] flex items-center justify-center border border-[#ced4da] shadow-sm group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Icon size={24} className="text-[#adb5bd] group-hover:text-[#868e96] transition-colors" />
                </div>
                <h3 className="text-xs font-semibold text-[#495057] text-center leading-tight max-w-[72px] break-words group-hover:text-[#212529] transition-colors">
                  {cat.name}
                </h3>
              </Link>
            );
          })}
        </div>

      </main>

      {/* Fixed Bottom Navigation with Modals */}
      <MarketplaceBottomNav />
      </div>
    </div>
  );
}
