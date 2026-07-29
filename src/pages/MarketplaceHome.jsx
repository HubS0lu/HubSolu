import React, { useState } from 'react';
import { User, LogOut, Pizza, Beer, IceCream, Cake, Utensils, Croissant, Drumstick, ShoppingCart, Shirt, Baby, Footprints, Brush, Sparkles, Droplets, Scissors, Store, Heart, Package, Smartphone, Monitor, Headphones, Gamepad2, Pill, Dumbbell, Stethoscope, Glasses, Bone, PawPrint, HeartPulse, Wrench, Truck, Home, BookOpen, Gift, Leaf, ChevronRight, Ticket, Percent } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MarketplaceBottomNav from '../components/MarketplaceBottomNav';

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
      { name: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=50', icon: Utensils },
      { name: 'Padaria', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=50', icon: Croissant },
      { name: 'Galeteria', img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=200&q=50', icon: Drumstick },
      { name: 'Mercado', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&q=50', icon: ShoppingCart }
    ],
    'Roupas': [
      { name: 'Masculino', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&q=50', icon: Shirt },
      { name: 'Feminino', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=50', icon: Shirt },
      { name: 'Infantil', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&q=50', icon: Baby },
      { name: 'Calçados', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&q=50', icon: Footprints },
      { name: 'Acessórios', img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=200&q=50', icon: Package },
      { name: 'Praia', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=50', icon: Droplets },
      { name: 'Esportes', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200&q=50', icon: Dumbbell },
      { name: 'Lingerie', img: 'https://images.unsplash.com/photo-1596727289873-195f00e95cb4?w=200&q=50', icon: Heart }
    ],
    'Cosméticos': [
      { name: 'Maquiagem', img: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500', icon: Brush },
      { name: 'Perfumes', img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&q=50', icon: Sparkles },
      { name: 'Skincare', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=50', icon: Droplets },
      { name: 'Cabelos', img: 'https://images.pexels.com/photos/973401/pexels-photo-973401.jpeg?auto=compress&cs=tinysrgb&w=500', icon: Scissors },
      { name: 'Unhas', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=200&q=50', icon: Sparkles },
      { name: 'Banho', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&q=50', icon: Droplets },
      { name: 'Barbearia', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&q=50', icon: Scissors },
      { name: 'Veganos', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=50', icon: Leaf }
    ],
    'Eletrônicos': [
      { name: 'Celulares', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=50', icon: Smartphone },
      { name: 'PCs', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=50', icon: Monitor },
      { name: 'Acessórios', img: 'https://images.unsplash.com/photo-1572569432755-94576302e1c3?w=200&q=50', icon: Headphones },
      { name: 'Games', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&q=50', icon: Gamepad2 },
      { name: 'TV e Som', img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&q=50', icon: Monitor },
      { name: 'Câmeras', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=50', icon: Monitor },
      { name: 'Automação', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=200&q=50', icon: Home },
      { name: 'Relógios', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&q=50', icon: Smartphone }
    ],
    'Saúde': [
      { name: 'Farmácia', img: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200&q=50', icon: Pill },
      { name: 'Suplemento', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&q=50', icon: Dumbbell },
      { name: 'Médicos', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&q=50', icon: Stethoscope },
      { name: 'Óticas', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=50', icon: Glasses },
      { name: 'Fisio', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&q=50', icon: HeartPulse },
      { name: 'Nutrição', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&q=50', icon: Leaf },
      { name: 'Terapia', img: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?w=200&q=50', icon: Heart },
      { name: 'Dentistas', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=200&q=50', icon: Stethoscope }
    ],
    'Pet Shop': [
      { name: 'Rações', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&q=50', icon: Bone },
      { name: 'Banho', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&q=50', icon: Scissors },
      { name: 'Acessórios', img: 'https://images.unsplash.com/photo-1601758177259-33519d0843cc?w=200&q=50', icon: PawPrint },
      { name: 'Veterinário', img: 'https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=200&q=50', icon: HeartPulse },
      { name: 'Brinquedos', img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=200&q=50', icon: Bone },
      { name: 'Casinhas', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&q=50', icon: Home },
      { name: 'Remédios', img: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200&q=50', icon: Pill },
      { name: 'Aquários', img: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?w=200&q=50', icon: Droplets }
    ],
    'Serviços': [
      { name: 'Consertos', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=50', icon: Wrench },
      { name: 'Fretes', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200&q=50', icon: Truck },
      { name: 'Limpeza', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=50', icon: Sparkles },
      { name: 'Salão', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=50', icon: Scissors },
      { name: 'Costura', img: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=200&q=50', icon: Scissors },
      { name: 'Chaveiro', img: 'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=200&q=50', icon: Wrench },
      { name: 'Gráfica', img: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=200&q=50', icon: BookOpen },
      { name: 'Reformas', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&q=50', icon: Home }
    ],
    'Casa': [
      { name: 'Decoração', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&q=50', icon: Home },
      { name: 'Papelaria', img: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?w=200&q=50', icon: BookOpen },
      { name: 'Presentes', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=200&q=50', icon: Gift },
      { name: 'Flores', img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200&q=50', icon: Leaf },
      { name: 'Cama e Banho', img: 'https://images.unsplash.com/photo-1522771731478-44bf10cb314a?w=200&q=50', icon: Home },
      { name: 'Utilidades', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200&q=50', icon: Package },
      { name: 'Brinquedos', img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&q=50', icon: Gamepad2 },
      { name: 'Festas', img: 'https://images.unsplash.com/photo-1530103862676-de8892bc952f?w=200&q=50', icon: Cake }
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

        {/* Banner: Produto Mais Pedido */}
        <div className="mt-10 mb-8 px-2 relative">
          <div className="bg-[#e9ecef] rounded-2xl p-4 flex items-center shadow-sm border border-[#ced4da] ml-10 relative min-h-[90px]">
            {/* Overlapping Image (Circle on the left) */}
            <div className="absolute -left-10 w-[100px] h-[100px] rounded-full border-4 border-[#f8f9fa] shadow-md overflow-hidden bg-white z-10">
              <img src="/images/double_smash_burger.jpg" alt="Mais Pedido" className="w-full h-full object-cover" />
            </div>
            
            {/* Info */}
            <div className="ml-[68px] flex-1 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-[#e03131] uppercase tracking-wider">Top 1 da Semana</p>
                <h3 className="text-sm font-extrabold text-[#212529] leading-tight mt-0.5">Double Smash</h3>
                <p className="text-xs text-[#6c757d] font-medium mt-0.5">Burger & Co.</p>
              </div>
              <Link to="/marketplace/store" state={{ storeCategory: 'Hamburgueria' }} className="px-3 py-1.5 bg-[#343a40] text-[#f8f9fa] rounded-lg text-xs font-bold shadow-sm hover:bg-[#212529] transition-colors shrink-0">
                Ver
              </Link>
            </div>
          </div>
        </div>

        {/* Sessão: Cupons e Ofertas */}
        <div className="mb-10">
          <h2 className="text-lg font-extrabold text-[#212529] mb-4">Cupons & Ofertas</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 snap-x pr-4">
            
            <div className="snap-start shrink-0 w-[240px] h-[110px] rounded-3xl overflow-hidden shadow-md bg-gradient-to-br from-[#212529] to-[#343a40] border border-[#495057] relative flex flex-col justify-center px-6">
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none transform -rotate-12">
                <Ticket size={110} className="text-white" />
              </div>
              <h3 className="text-white font-extrabold text-xl relative z-10 drop-shadow-sm">Frete Grátis</h3>
              <p className="text-[#ced4da] text-xs font-medium relative z-10 mt-1">Em todas as Pizzarias</p>
            </div>
            
            <div className="snap-start shrink-0 w-[240px] h-[110px] rounded-3xl overflow-hidden shadow-md bg-gradient-to-br from-[#e03131] to-[#c92a2a] border border-[#e03131] relative flex flex-col justify-center px-6">
              <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none transform rotate-12">
                <Percent size={110} className="text-white" />
              </div>
              <h3 className="text-white font-extrabold text-xl relative z-10 drop-shadow-sm">20% OFF</h3>
              <p className="text-[#ffc9c9] text-xs font-medium relative z-10 mt-1">Acima de R$ 50</p>
            </div>

          </div>
        </div>

        {/* Sessão: Chegaram Recentemente */}
        <div className="mb-8">
          <h2 className="text-lg font-extrabold text-[#212529] mb-4">Novidades na sua Área</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x pr-4">
            {[1,2,3,4,5].map((item) => (
              <div key={item} className="snap-start shrink-0 flex flex-col items-center gap-2 w-[76px]">
                <div className="w-[72px] h-[72px] rounded-full border border-[#ced4da] shadow-sm overflow-hidden bg-white p-0.5 group hover:border-[#868e96] transition-colors cursor-pointer">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=150&q=80" alt="Nova Loja" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="text-[11px] font-semibold text-[#495057] text-center leading-tight truncate w-full">Doce Sabor</h3>
              </div>
            ))}
          </div>
        </div>      </main>

      {/* Fixed Bottom Navigation with Modals */}
      <MarketplaceBottomNav />
      </div>
    </div>
  );
}
