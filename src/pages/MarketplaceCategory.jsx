import React, { useEffect, useState } from 'react';
import { ChevronLeft, ArrowLeft, Search, Heart, Star, Clock, MapPin, SlidersHorizontal, Pizza, Store, Dumbbell, Smartphone, Shirt, HeartPulse, Bone, Wrench, Utensils, Beer, IceCream, Cake, ShoppingCart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MarketplaceBottomNav from '../components/MarketplaceBottomNav';

export default function MarketplaceCategory() {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryName = location.state?.categoryName || 'Categoria';
  const categoryImg = location.state?.categoryImg || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80';

  const [favorites, setFavorites] = useState([2]); // Mock ID 2 is favorited by default
  const [activeFilter, setActiveFilter] = useState('Todos');

  const getCategoryIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('pizza') || n.includes('pizzaria')) return Pizza;
    if (n.includes('hamburguer') || n.includes('lanche')) return Utensils;
    if (n.includes('suplemento')) return Dumbbell;
    if (n.includes('eletrônico')) return Smartphone;
    if (n.includes('roupa') || n.includes('moda')) return Shirt;
    if (n.includes('saúde') || n.includes('farmácia')) return HeartPulse;
    if (n.includes('pet')) return Bone;
    if (n.includes('serviço')) return Wrench;
    if (n.includes('bebida') || n.includes('bar')) return Beer;
    if (n.includes('sorvete')) return IceCream;
    if (n.includes('doce') || n.includes('confeitaria') || n.includes('padaria')) return Cake;
    if (n.includes('mercado')) return ShoppingCart;
    return Store;
  };

  const CategoryIcon = getCategoryIcon(categoryName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filters = ['Todos', 'Entrega Grátis', 'Mais Rápidos', 'Melhor Avaliados'];

  const mockStores = Array(8).fill(null).map((_, idx) => ({
    id: idx + 1,
    name: `${categoryName} ${idx + 1}`,
    rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
    time: `${Math.floor(Math.random() * 15) + 20}-${Math.floor(Math.random() * 15) + 40} min`,
    fee: idx % 3 === 0 ? 'Grátis' : `R$ ${(Math.random() * 8 + 3).toFixed(2).replace('.', ',')}`,
    img: categoryImg
  }));

  return (
    <div className="flex justify-center bg-[#212529] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f9fa] relative min-h-screen flex flex-col shadow-2xl overflow-hidden font-body pb-24 transition-colors duration-300">
        
        {/* Floating Rounded Header Banner */}
        <div className="w-full px-4 pt-6 pb-2 shrink-0">
          <div className="relative w-full h-[150px] rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-[#212529] to-[#343a40] border border-[#495057] flex flex-col items-center justify-center">
            
            {/* Category Icon Background (Right side, transparent) */}
            <div className="absolute -right-6 -bottom-6 opacity-[0.08] pointer-events-none transform -rotate-12">
              <CategoryIcon size={180} className="text-white" />
            </div>

            {/* Back Button */}
            <Link 
              to="/marketplace" 
              className="absolute top-4 left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors z-10"
            >
              <ArrowLeft size={20} />
            </Link>

            {/* Centered Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 w-full mt-2">
              <h1 className="text-3xl font-extrabold text-[#f8f9fa] tracking-wide drop-shadow-md w-full truncate">{categoryName}</h1>
              <p className="text-[#ced4da] text-xs mt-1.5 font-medium uppercase tracking-widest">{mockStores.length} opções</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-[#adb5bd]" size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar lojas..." 
              className="w-full bg-white border border-[#e9ecef] rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#adb5bd] focus:ring-1 focus:ring-[#adb5bd] transition-all shadow-sm text-[#495057] placeholder-[#adb5bd] text-sm font-medium"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button className="p-1.5 bg-[#f1f3f5] rounded-xl text-[#495057]">
                <SlidersHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 snap-x">
            {filters.map((filter, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(filter)}
                className={`snap-start shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-colors shadow-sm ${
                  activeFilter === filter 
                    ? 'bg-[#343a40] text-white border-[#343a40]' 
                    : 'bg-white text-[#495057] border-[#ced4da] hover:bg-[#f1f3f5]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Vertical Store List */}
        <div className="flex-1 w-full px-4 py-2 flex flex-col gap-4 overflow-y-auto pb-6">
          {mockStores.map((store) => {
            const isFav = favorites.includes(store.id);
            return (
              <div 
                key={store.id} 
                onClick={() => navigate('/marketplace/store', { state: { storeCategory: categoryName } })}
                className="bg-white border border-[#e9ecef] rounded-2xl p-3 flex items-center gap-4 group hover:border-[#ced4da] transition-all duration-300 shadow-sm cursor-pointer relative"
              >
                {/* Store Avatar */}
                <div className="w-[72px] h-[72px] rounded-full bg-[#f8f9fa] flex items-center justify-center overflow-hidden border-2 border-[#e9ecef] shrink-0">
                  <img src={store.img} alt={store.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Store Info */}
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-[#212529] truncate pr-8">{store.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] font-semibold text-[#6c757d]">
                    <span className="flex items-center gap-0.5 text-[#f59f00]"><Star size={12} className="fill-[#f59f00]"/> {store.rating}</span>
                    <span className="w-1 h-1 rounded-full bg-[#ced4da]"></span>
                    <span>{categoryName}</span>
                    <span className="w-1 h-1 rounded-full bg-[#ced4da]"></span>
                    <span>1.2 km</span>
                  </div>

                  <div className="flex items-center gap-3 mt-1.5 text-[11px] font-medium text-[#868e96]">
                    <span className="flex items-center gap-1"><Clock size={12}/> {store.time}</span>
                    <span className={`flex items-center gap-1 ${store.fee === 'Grátis' ? 'text-[#2b8a3e] font-bold' : ''}`}>
                      • Entrega {store.fee}
                    </span>
                  </div>
                </div>

                {/* Favorite Heart Button */}
                <button 
                  onClick={(e) => toggleFavorite(e, store.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-[#f1f3f5] transition-colors"
                >
                  <Heart 
                    size={20} 
                    className={`transition-all duration-300 ${isFav ? 'text-[#e03131] fill-[#e03131] scale-110' : 'text-[#adb5bd]'}`} 
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Fixed Bottom Navigation with Modals */}
        <MarketplaceBottomNav />
      </div>
    </div>
  );
}
