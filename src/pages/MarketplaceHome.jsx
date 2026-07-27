import React, { useState } from 'react';
import { User, LogOut, Pizza, Beer, IceCream, Cake, Utensils, Croissant, Drumstick, ShoppingCart, Shirt, Baby, Footprints, Brush, Sparkles, Droplets, Scissors, Store, Heart, Package, Smartphone, Monitor, Headphones, Gamepad2, Pill, Dumbbell, Stethoscope, Glasses, Bone, PawPrint, HeartPulse, Wrench, Truck, Home, BookOpen, Gift, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MarketplaceHome() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeMainCategory, setActiveMainCategory] = useState('Alimentação');

  const allCategories = {
    'Alimentação': [
      { name: 'Pizzaria', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=50', icon: Pizza },
      { name: 'Bar', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&q=50', icon: Beer },
      { name: 'Sorveteria', img: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=200&q=50', icon: IceCream },
      { name: 'Confeitaria', img: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=200&q=50', icon: Cake },
      { name: 'Hamburgueria', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=50', icon: Utensils },
      { name: 'Padaria', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=50', icon: Croissant },
      { name: 'Galeteria', img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=200&q=50', icon: Drumstick },
      { name: 'Mercadinho', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&q=50', icon: ShoppingCart }
    ],
    'Roupas': [
      { name: 'Moda Masculina', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&q=50', icon: Shirt },
      { name: 'Moda Feminina', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=50', icon: Shirt },
      { name: 'Infantil', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&q=50', icon: Baby },
      { name: 'Calçados', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&q=50', icon: Footprints },
    ],
    'Cosméticos': [
      { name: 'Maquiagem', img: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500', icon: Brush },
      { name: 'Perfumaria', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&q=50', icon: Sparkles },
      { name: 'Skincare', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=50', icon: Droplets },
      { name: 'Cabelos', img: 'https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=500', icon: Scissors },
    ],
    'Eletrônicos': [
      { name: 'Celulares', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=50', icon: Smartphone },
      { name: 'Informática', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=50', icon: Monitor },
      { name: 'Acessórios', img: 'https://images.unsplash.com/photo-1572569432755-94576302e1c3?w=200&q=50', icon: Headphones },
      { name: 'Games', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&q=50', icon: Gamepad2 }
    ],
    'Saúde e Bem-estar': [
      { name: 'Farmácia', img: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200&q=50', icon: Pill },
      { name: 'Suplementos', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&q=50', icon: Dumbbell },
      { name: 'Consultórios', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&q=50', icon: Stethoscope },
      { name: 'Óticas', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=50', icon: Glasses }
    ],
    'Pet Shop': [
      { name: 'Rações', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&q=50', icon: Bone },
      { name: 'Banho & Tosa', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&q=50', icon: Scissors },
      { name: 'Acessórios Pet', img: 'https://images.unsplash.com/photo-1601758177259-33519d0843cc?w=200&q=50', icon: PawPrint },
      { name: 'Clínica Vet', img: 'https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=200&q=50', icon: HeartPulse }
    ],
    'Serviços': [
      { name: 'Manutenção', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=50', icon: Wrench },
      { name: 'Fretes', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200&q=50', icon: Truck },
      { name: 'Limpeza', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=50', icon: Sparkles },
      { name: 'Salão', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=50', icon: Scissors }
    ],
    'Casa e Lazer': [
      { name: 'Decoração', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&q=50', icon: Home },
      { name: 'Papelaria', img: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=200&q=50', icon: BookOpen },
      { name: 'Presentes', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=200&q=50', icon: Gift },
      { name: 'Floricultura', img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200&q=50', icon: Leaf }
    ]
  };

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
        <div className="flex justify-center mb-8 w-full">
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
        </div>

        {/* Grid Categories */}
        <div className="grid grid-cols-4 gap-y-6 gap-x-2 justify-items-center">
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

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 z-50 pointer-events-none">
        <div className="bg-[#f8f9fa]/90 backdrop-blur-md border border-[#ced4da] rounded-full px-8 py-3 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-auto">
          <button className="group w-12 h-12 rounded-full bg-[#ffffff] text-[#495057] flex items-center justify-center hover:bg-[#343a40] hover:text-[#f8f9fa] transition-all duration-300 shadow-sm hover:scale-105 border border-[#e9ecef]">
            <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
          </button>
          <button className="group w-12 h-12 rounded-full bg-[#ffffff] text-[#495057] flex items-center justify-center hover:bg-[#343a40] hover:text-[#f8f9fa] transition-all duration-300 shadow-sm hover:scale-105 border border-[#e9ecef]">
            <Heart size={22} className="group-hover:scale-110 transition-transform" />
          </button>
          <button className="group w-12 h-12 rounded-full bg-[#ffffff] text-[#495057] flex items-center justify-center hover:bg-[#343a40] hover:text-[#f8f9fa] transition-all duration-300 shadow-sm hover:scale-105 border border-[#e9ecef]">
            <Package size={22} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
