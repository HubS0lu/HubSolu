import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, ChevronLeft, ChevronRight, ArrowLeft, Minus, Plus, Trash2, X, Instagram, SlidersHorizontal, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { useOrders } from '../contexts/OrderContext';
import { useFavorites } from '../contexts/FavoritesContext';

export default function MarketplaceStore() {
  const location = useLocation();
  const navigate = useNavigate();
  const storeId = location.state?.storeId || 'burger-co';
  const { getStoreById, getProductsByStore } = useStore();
  
  const storeInfo = getStoreById(storeId) || {
    name: 'Loja Desconhecida',
    description: 'Informações não disponíveis.',
    rating: 0,
    banner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&q=80',
    theme: 'theme-fashion-minimalist',
    deliveryTime: '0 min',
    deliveryFee: 0,
    category: ''
  };

  const products = getProductsByStore(storeId);
  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('store_theme') || storeInfo.theme;
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [storeInstagram, setStoreInstagram] = useState('@loja.oficial');
  
  // Checkout Form State
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('store_theme');
    setActiveTheme(savedTheme || storeInfo.theme);
  }, [storeInfo.theme]);

  const { cart, addToCart, updateQuantity, removeFromCart, totalItems, totalValue, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user, isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = isFavorite(storeInfo.id);

  // Filtragem por Categoria
  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Removida Paginação
  const displayedProducts = filteredProducts;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/cadastro', { state: { from: location } });
      return;
    }
    
    if (!address) {
      alert("Por favor, preencha o endereço de entrega.");
      return;
    }

    const total = totalValue.toFixed(2).replace('.', ',');
    
    // Registrar pedido no histórico
    addOrder({
      storeId: storeInfo.id,
      storeName: storeInfo.name,
      storeLogo: storeInfo.logo,
      items: cart,
      total: totalValue,
      address,
      paymentMethod,
    });
    
    // Limpar o carrinho e mostrar msg localmente opcional
    clearCart();
    setIsCartOpen(false);

    let message = `*NOVO PEDIDO - ${storeInfo.name}*\n`;
    message += `Cliente: ${user.name}\n`;
    message += `Endereço: ${address}\n`;
    message += `Pagamento: ${paymentMethod}\n\n`;
    message += `*Itens:*\n`;
    
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')})\n`;
    });
    
    message += `\n*Total: R$ ${total}*`;

    const encodedMessage = encodeURIComponent(message);
    const mockWhatsAppNumber = "5511999999999"; 
    window.open(`https://wa.me/${mockWhatsAppNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={`flex justify-center bg-[#212529] min-h-screen ${activeTheme}`}>
      <div className="w-full max-w-[480px] bg-store-bg relative min-h-screen flex flex-col shadow-2xl overflow-hidden font-body pb-20 text-store-text transition-colors duration-500">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-store-secondary/30 bg-store-bg/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/marketplace/category" className="p-2 -ml-2 rounded-full hover:bg-store-primary/10 transition-colors text-store-text">
            <ArrowLeft size={24} />
          </Link>
          <div className="w-10 h-10 rounded-full border border-store-secondary/30 flex items-center justify-center overflow-hidden bg-store-secondary/20 shrink-0">
            <img src={storeInfo.logo} alt={storeInfo.name} className="w-full h-full object-cover"/>
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg font-bold leading-tight truncate">{storeInfo.name}</h1>
            <a href={`https://instagram.com/${storeInstagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-store-muted hover:text-store-primary transition-colors mt-0.5 truncate">
              <Instagram size={12} /> {storeInstagram}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <button 
            onClick={() => toggleFavorite(storeInfo.id)}
            className="p-3 rounded-full hover:bg-store-primary/10 transition-colors relative"
          >
            <Heart 
              size={24} 
              className={`transition-all duration-300 ${isFav ? 'text-[#e03131] fill-[#e03131] scale-110' : 'text-store-text'}`} 
            />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-3 rounded-full hover:bg-store-primary/10 transition-colors relative text-store-text"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-store-primary text-store-bg text-xs font-bold rounded-full flex items-center justify-center translate-x-1 -translate-y-1 shadow-md">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Store Banner & Info Section */}
      {storeInfo.banner && (
        <div className="w-full h-48 md:h-56 relative overflow-hidden shrink-0">
          <img 
            src={storeInfo.banner} 
            alt={`Banner ${storeInfo.name}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-store-bg to-transparent pointer-events-none"></div>
        </div>
      )}

      <div className="px-5 pt-3 pb-5 flex flex-col gap-2 shrink-0 border-b border-store-secondary/10">
        <p className="text-sm text-store-text/80 leading-relaxed">{storeInfo.description}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-1 text-xs font-bold text-store-muted">
          <span className="flex items-center gap-1 bg-store-secondary/20 px-2 py-1 rounded-md text-store-primary">
            ★ {storeInfo.rating}
          </span>
          <span className="opacity-50">•</span>
          <span>{storeInfo.category} - {storeInfo.subCategory || storeInfo.segment}</span>
          <span className="opacity-50">•</span>
          <span>{storeInfo.deliveryTime || '30-45 min'}</span>
          <span className="opacity-50">•</span>
          <span>{storeInfo.deliveryFee === 0 ? 'Entrega Grátis' : `Entrega R$ ${storeInfo.deliveryFee?.toFixed(2).replace('.', ',') || '5,90'}`}</span>
        </div>
      </div>

      <div className="flex-1 w-full px-4 py-6 flex flex-col overflow-y-auto">
        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-8 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-store-primary text-store-muted">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder={`Buscar em ${storeInfo.name}...`}
              className="w-full bg-store-secondary/5 border border-store-secondary/20 rounded-2xl py-4 pl-14 pr-14 focus:outline-none focus:bg-store-bg focus:border-store-primary focus:ring-4 focus:ring-store-primary/10 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-md text-store-text placeholder-store-muted/70 text-sm font-medium"
            />
            <button className="absolute inset-y-0 right-2 my-auto h-10 w-10 flex items-center justify-center rounded-xl bg-store-bg border border-store-secondary/20 text-store-text shadow-sm hover:bg-store-primary hover:text-store-bg hover:border-store-primary transition-all duration-300">
              <SlidersHorizontal size={18} />
            </button>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="mb-6 sticky top-[88px] z-30 bg-store-bg/95 backdrop-blur-sm -mx-4 px-4 pt-2 flex items-center relative">
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-full snap-x snap-mandatory scroll-smooth pr-10">
              {categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveCategory(cat)}
                  className={`snap-start shrink-0 min-w-[96px] flex flex-col items-center justify-center px-2 py-2 min-h-[40px] rounded-xl text-xs font-semibold whitespace-normal text-center leading-tight transition-all duration-300 border ${
                    activeCategory === cat 
                      ? 'bg-store-primary text-store-bg border-store-primary shadow-sm' 
                      : 'bg-store-secondary/10 text-store-text border-store-secondary/30 hover:border-store-primary/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Scroll Indicator */}
            <div className="absolute right-0 top-2 bottom-4 w-12 text-store-muted flex items-center justify-end pr-4 animate-pulse pointer-events-none bg-gradient-to-l from-store-bg via-store-bg/80 to-transparent">
              <ChevronRight size={20} />
            </div>
          </div>

          {/* Products List */}
          <div className="flex flex-col gap-4 min-h-[400px]">
            {displayedProducts.map((prod) => (
              <div key={prod.id} className="group bg-store-bg border border-store-secondary/30 rounded-xl p-3 flex gap-4 hover:border-store-primary/50 transition-all duration-300 hover:shadow-md shadow-sm">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-store-secondary/10 relative">
                  <img 
                    src={prod.img} 
                    alt={prod.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0 justify-between py-1">
                  <div>
                    <h3 className="text-body-2 font-bold text-store-text truncate mb-1">{prod.name}</h3>
                    <p className="text-xs text-store-muted line-clamp-2 leading-tight">
                      {prod.description || "Delicioso produto selecionado com qualidade especial para você."}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-store-primary font-bold text-body-1">R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                    <button 
                      onClick={() => {
                        addToCart({ ...prod, storeName: storeInfo.name }, 1, storeInfo.id);
                        setIsCartOpen(true);
                      }}
                      className="bg-store-primary/10 text-store-primary hover:bg-store-primary hover:text-store-bg w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {displayedProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-store-muted gap-4">
                <Search size={48} className="opacity-20" />
                <p>Nenhum produto encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[448px] z-40">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-store-primary text-store-bg px-6 py-4 rounded-full flex items-center justify-between shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-store-bg/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {totalItems}
              </div>
              <span className="font-semibold text-sm">Ver carrinho</span>
            </div>
            <span className="font-bold">
              R$ {totalValue.toFixed(2).replace('.', ',')}
            </span>
          </button>
        </div>
      )}

      {/* Cart Drawer / Pop-up */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          <div className="w-full max-w-[440px] max-h-[85vh] bg-store-bg rounded-2xl shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-6 border-b border-store-secondary/30 bg-store-secondary/10 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2 text-store-text">
                <ShoppingCart className="text-store-primary" />
                Seu Carrinho
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-2 rounded-full hover:bg-store-secondary/20 transition-colors text-store-text"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-store-muted gap-4">
                  <ShoppingCart size={48} className="opacity-20" />
                  <p>Seu carrinho está vazio</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate text-sm text-store-text">{item.name}</h4>
                      <p className="text-store-primary font-bold text-sm mt-1">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2 bg-store-bg rounded-lg p-1 border border-store-secondary/50">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-store-primary transition-colors rounded text-store-text"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center text-store-text">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-store-primary transition-colors rounded text-store-text"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-store-muted hover:text-red-500 transition-colors rounded-lg opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-store-secondary/30 bg-store-secondary/5 mt-auto">
              {cart.length > 0 && (
                <div className="mb-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-store-text mb-1">Endereço de Entrega</label>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, Número, Bairro, Cidade"
                      className="w-full bg-store-bg border border-store-secondary/50 rounded-lg p-3 focus:outline-none focus:border-store-primary focus:ring-1 focus:ring-store-primary text-store-text placeholder-store-muted"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-store-text mb-1">Forma de Pagamento</label>
                    <select 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-store-bg border border-store-secondary/50 rounded-lg p-3 focus:outline-none focus:border-store-primary focus:ring-1 focus:ring-store-primary text-store-text appearance-none"
                    >
                      <option value="PIX">PIX</option>
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                      <option value="Cartão de Débito">Cartão de Débito</option>
                      <option value="Dinheiro">Dinheiro</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <span className="text-store-muted font-medium">Total</span>
                <span className="text-2xl font-bold text-store-text">
                  R$ {totalValue.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl bg-store-primary text-store-bg font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {isAuthenticated ? 'Finalizar Compra no WhatsApp' : 'Fazer Login para Finalizar'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
