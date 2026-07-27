import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, ShoppingCart, Heart, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function MarketplaceCategory() {
  const location = useLocation();
  const categoryName = location.state?.categoryName || 'Categoria';
  const categoryImg = location.state?.categoryImg || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex justify-center bg-[#212529] min-h-screen">
      <div className="w-full max-w-[480px] bg-[#f8f9fa] relative min-h-screen flex flex-col shadow-2xl overflow-hidden font-body pb-20 transition-colors duration-300">
      {/* Header Banner */}
      <div className="relative w-full h-[180px] overflow-hidden shrink-0">
        <img 
          src={categoryImg} 
          alt={categoryName} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#212529]/60 backdrop-blur-[2px]"></div>
        
        {/* Back Button */}
        <Link 
          to="/marketplace" 
          className="absolute top-4 left-4 p-2 rounded-full bg-[#f8f9fa]/20 text-[#f8f9fa] hover:bg-[#f8f9fa]/40 backdrop-blur-md transition-colors z-10"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-[#f8f9fa] tracking-widest uppercase px-4 text-center">{categoryName}</h1>
        </div>
      </div>

      <div className="flex-1 w-full px-6 py-6 flex-col overflow-y-auto">
        {/* Main Content - Store Grid */}
        <div className="grid grid-cols-2 gap-4">
            {Array(10).fill(null).map((_, idx) => (
              <div 
                key={idx} 
                className="bg-[#ffffff] border border-[#ced4da] rounded-xl p-4 flex flex-col items-center justify-center gap-4 group hover:border-[#adb5bd] transition-all duration-300 shadow-sm"
              >
                <div className="w-20 h-20 rounded-full bg-[#e9ecef] flex items-center justify-center overflow-hidden border border-transparent group-hover:border-[#adb5bd] transition-all duration-300">
                  <span className="text-[#6c757d] text-xs font-semibold">Sua Logo</span>
                </div>
                <Link 
                  to="/marketplace/store"
                  state={{ storeCategory: categoryName }}
                  className="w-full py-2.5 rounded-lg bg-[#343a40] text-[#f8f9fa] font-bold text-center text-sm hover:bg-[#212529] transition-colors duration-300 shadow-sm"
                >
                  Entrar
                </Link>
              </div>
            ))}
          </div>
        </div>

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
