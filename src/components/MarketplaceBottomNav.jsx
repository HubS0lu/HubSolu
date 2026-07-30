import React, { useState } from 'react';
import { ShoppingCart, Heart, Package, X, Store, Minus, Plus, ChevronRight, Clock, Truck, Store as StoreIcon, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useStore } from '../contexts/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MarketplaceBottomNav() {
  const [activeModal, setActiveModal] = useState(null); // 'cart', 'favorites', 'tracking', or null
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  const { cart, updateQuantity, totalValue, totalItems, clearCart } = useCart();
  const { orders, addOrder, deleteOrder, clearAllOrders } = useOrders();
  const { user, isAuthenticated } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { getStoreById } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const favoriteStores = favorites.map(id => getStoreById(id)).filter(Boolean);

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/cadastro', { state: { from: location } });
      return;
    }
    
    if (!address) {
      alert("Por favor, preencha o endereço de entrega.");
      return;
    }

    if (cart.length === 0) return;

    const total = totalValue.toFixed(2).replace('.', ',');
    
    // Pegar os dados reais da loja do primeiro item (o carrinho agora é restrito a uma loja)
    const storeId = cart[0].storeId;
    const storeName = cart[0].storeName || 'Loja Parceira';
    const store = getStoreById(storeId);
    const storeLogo = store ? store.logo : 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&q=80';
    
    addOrder({
      storeId,
      storeName,
      storeLogo,
      items: cart,
      total: totalValue,
      address,
      paymentMethod,
    });
    
    clearCart();
    setActiveModal(null);

    let message = `*NOVO PEDIDO - ${storeName}*\n`;
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

  const handleTalkToSeller = (order) => {
    const customerName = user?.name || 'Cliente';
    const message = `Olá! Sou ${customerName}. Gostaria de falar sobre o meu pedido *${order.id}* na sua loja.\n\nVocê pode me ajudar?`;
    const encodedMessage = encodeURIComponent(message);
    const mockWhatsAppNumber = "5511999999999"; 
    window.open(`https://wa.me/${mockWhatsAppNumber}?text=${encodedMessage}`, '_blank');
  };

  // --- RENDER HELPERS ---
  const renderTimeline = (order) => {
    // Alinhado exatamente com o status do painel da cozinha
    const steps = ['Na Fila', 'Preparando', 'Pronto', 'Entregue'];

    return (
      <div className="flex justify-between items-center w-full mt-4 relative before:absolute before:inset-0 before:top-[11px] before:-translate-y-1/2 before:h-0.5 before:bg-[#e9ecef] before:z-0">
        <div className="absolute top-[11px] -translate-y-1/2 h-0.5 bg-[#343a40] z-0 transition-all duration-500" style={{ width: `${(order.status / (steps.length - 1)) * 100}%` }}></div>
        {steps.map((step, idx) => {
          const isActive = idx <= order.status;
          const isCurrent = idx === order.status;
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5 w-1/4">
              <div className={`w-5 h-5 rounded-full border-[3px] transition-colors duration-300 flex-shrink-0 bg-white ${isActive ? 'border-[#343a40]' : 'border-[#ced4da]'} ${isCurrent ? 'ring-4 ring-[#343a40]/20 animate-pulse bg-[#343a40]' : (isActive ? 'bg-[#343a40]' : 'bg-white')}`}></div>
              <span className={`text-[9px] sm:text-[10px] font-semibold text-center leading-tight ${isActive ? 'text-[#343a40]' : 'text-[#adb5bd]'}`}>{step}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* OVERLAY BACKDROP */}
      {activeModal && (
        <div 
          className="fixed inset-0 bg-[#212529]/60 z-[60] transition-opacity duration-300"
          onClick={() => setActiveModal(null)}
        />
      )}

      {/* BOTTOM SHEET: CARRINHO */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#f8f9fa] rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)] z-[70] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col max-h-[85vh] ${activeModal === 'cart' ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={() => setActiveModal(null)}>
          <div className="w-12 h-1.5 bg-[#ced4da] rounded-full"></div>
        </div>
        <div className="px-6 pb-4 flex justify-between items-center border-b border-[#e9ecef]">
          <h2 className="text-xl font-bold text-[#212529] flex items-center gap-2"><ShoppingCart size={24} className="text-[#495057]" /> Seu Carrinho</h2>
          <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-[#f1f3f5] text-[#495057] hover:bg-[#e9ecef] transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-10 text-[#adb5bd]">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-[#e9ecef] shadow-sm">
                <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#212529] leading-tight">{item.name}</h3>
                    {item.store && <p className="text-[11px] font-semibold text-[#868e96] mt-0.5 bg-[#f1f3f5] inline-block px-1.5 py-0.5 rounded">{item.store}</p>}
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-bold text-[#343a40]">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                    <div className="flex items-center gap-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-lg px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-[#495057]"><Minus size={14} /></button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-[#495057]"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-6 bg-white border-t border-[#e9ecef] rounded-t-3xl shadow-[0_-4px_20px_rgb(0,0,0,0.05)] mt-auto">
          {cart.length > 0 && (
            <div className="mb-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#495057] mb-1">Endereço de Entrega</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, Número, Bairro, Cidade"
                  className="w-full bg-[#f8f9fa] border border-[#ced4da] rounded-xl p-2.5 focus:outline-none focus:border-[#343a40] focus:ring-1 focus:ring-[#343a40] text-sm text-[#212529] placeholder-[#adb5bd]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#495057] mb-1">Forma de Pagamento</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-[#ced4da] rounded-xl p-2.5 focus:outline-none focus:border-[#343a40] focus:ring-1 focus:ring-[#343a40] text-sm text-[#212529] appearance-none"
                >
                  <option value="PIX">PIX</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>
            </div>
          )}
          <div className="flex justify-between mb-2 text-[#495057] text-sm">
            <span>Subtotal</span>
            <span className="font-semibold">R$ {totalValue.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between mb-4 text-[#495057] text-sm">
            <span>Taxa de Entrega</span>
            <span className="font-semibold">A calcular</span>
          </div>
          <div className="flex justify-between mb-6 text-lg font-bold text-[#212529]">
            <span>Total</span>
            <span>R$ {totalValue.toFixed(2).replace('.', ',')}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="w-full py-4 rounded-xl bg-[#343a40] text-white font-bold text-[15px] hover:bg-[#212529] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAuthenticated ? 'Finalizar Compra no WhatsApp' : 'Fazer Login para Finalizar'}
          </button>
        </div>
      </div>

      {/* BOTTOM SHEET: FAVORITOS */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#f8f9fa] rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)] z-[70] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col max-h-[85vh] ${activeModal === 'favorites' ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={() => setActiveModal(null)}>
          <div className="w-12 h-1.5 bg-[#ced4da] rounded-full"></div>
        </div>
        <div className="px-6 pb-4 flex justify-between items-center border-b border-[#e9ecef]">
          <h2 className="text-xl font-bold text-[#212529] flex items-center gap-2"><Heart size={24} className="text-[#e03131] fill-[#e03131]" /> Seus Favoritos</h2>
          <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-[#f1f3f5] text-[#495057] hover:bg-[#e9ecef] transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <h3 className="text-xs font-bold text-[#adb5bd] uppercase tracking-wider mb-2">Lojas Curtidas</h3>
          {favoriteStores.length === 0 ? (
            <div className="text-center py-10 text-[#adb5bd]">
              <Heart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhuma loja favorita ainda.</p>
            </div>
          ) : (
            favoriteStores.map(store => (
              <div key={store.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-[#e9ecef] shadow-sm">
                <img src={store.logo} alt={store.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#f8f9fa] shadow-sm" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#212529] truncate">{store.name}</h4>
                  <p className="text-xs text-[#6c757d] truncate">{store.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleFavorite(store.id)}
                    className="p-2 rounded-full text-[#e03131] hover:bg-[#ffe3e3] transition-colors"
                  >
                    <Heart size={18} className="fill-[#e03131]" />
                  </button>
                  <button 
                    onClick={() => {
                      setActiveModal(null);
                      navigate('/marketplace/store', { state: { storeId: store.id } });
                    }}
                    className="px-4 py-2 bg-[#f1f3f5] text-[#495057] text-xs font-bold rounded-lg hover:bg-[#e9ecef] transition-colors"
                  >
                    Visitar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* BOTTOM SHEET: STATUS DO PEDIDO */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#f8f9fa] rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)] z-[70] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col max-h-[85vh] ${activeModal === 'tracking' ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={() => setActiveModal(null)}>
          <div className="w-12 h-1.5 bg-[#ced4da] rounded-full"></div>
        </div>
        <div className="px-6 pb-4 flex justify-between items-center border-b border-[#e9ecef]">
          <h2 className="text-xl font-bold text-[#212529] flex items-center gap-2"><Package size={24} className="text-[#495057]" /> Meus Pedidos</h2>
          <div className="flex gap-2">
            {orders.length > 0 && (
              <button onClick={() => clearAllOrders()} className="p-2 rounded-full bg-[#fff5f5] text-[#e03131] hover:bg-[#ffe3e3] transition-colors" title="Limpar Histórico">
                <Trash2 size={20} />
              </button>
            )}
            <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-[#f1f3f5] text-[#495057] hover:bg-[#e9ecef] transition-colors"><X size={20} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-10 text-[#adb5bd]">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum pedido feito ainda.</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-[#e9ecef] shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#f1f3f5] flex items-center justify-center text-[#495057] overflow-hidden">
                      {order.storeLogo ? (
                        <img src={order.storeLogo} alt={order.storeName} className="w-full h-full object-cover" />
                      ) : (
                        <StoreIcon size={20} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#212529]">{order.storeName}</h4>
                      <span className="text-[11px] font-semibold text-[#868e96] bg-[#f8f9fa] border border-[#e9ecef] px-2 py-0.5 rounded-md mt-1 inline-block">Pedido {order.id}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#adb5bd] flex items-center gap-1"><Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                
                {renderTimeline({ ...order, type: 'food_delivery' })}

                {/* Botão de ver detalhes do pedido */}
                <button 
                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                  className="w-full py-1.5 flex items-center justify-center gap-1 text-[11px] font-bold text-[#adb5bd] hover:text-[#495057] transition-colors"
                >
                  {expandedOrderId === order.id ? 'Ocultar Detalhes' : 'Ver Detalhes do Pedido'}
                  <ChevronRight size={14} className={`transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-90' : ''}`} />
                </button>

                {/* Detalhes Expandidos */}
                {expandedOrderId === order.id && (
                  <div className="bg-[#f8f9fa] rounded-xl p-3 border border-[#f1f3f5] animate-in fade-in slide-in-from-top-2 duration-300">
                    <ul className="space-y-2 mb-3">
                      {order.items?.map((item, idx) => (
                        <li key={idx} className="text-xs text-[#495057] flex justify-between">
                          <div className="font-medium">
                            <span className="text-[#adb5bd] mr-1">{item.quantity}x</span> {item.name}
                          </div>
                          <span className="font-semibold text-[#343a40]">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-[#e9ecef] pt-2 flex justify-between items-center text-sm font-bold text-[#212529]">
                      <span>Total pago:</span>
                      <span>R$ {order.total?.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => handleTalkToSeller(order)}
                    className="flex-1 py-2.5 rounded-xl border-2 border-[#e9ecef] text-[#495057] text-xs font-bold hover:bg-[#f8f9fa] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    Falar com o Vendedor
                  </button>
                  <button 
                    onClick={() => deleteOrder(order.id)}
                    className="py-2.5 px-4 rounded-xl border-2 border-[#ffc9c9] text-[#e03131] text-xs font-bold hover:bg-[#fff5f5] transition-colors flex items-center justify-center shadow-sm"
                  >
                    {order.status === 3 ? 'Excluir' : 'Cancelar'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* BOTTOM NAV BAR (FIXED) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 z-50 pointer-events-none">
        <div className="bg-[#f8f9fa]/90 backdrop-blur-md border border-[#ced4da] rounded-full px-8 py-3 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-auto">
          <button onClick={() => setActiveModal('cart')} className={`group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-[#e9ecef] relative ${activeModal === 'cart' ? 'bg-[#343a40] text-[#f8f9fa] scale-110' : 'bg-[#ffffff] text-[#495057] hover:bg-[#343a40] hover:text-[#f8f9fa] hover:scale-105'}`}>
            <ShoppingCart size={22} className={activeModal === 'cart' ? '' : 'group-hover:scale-110 transition-transform'} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#f8f9fa] shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setActiveModal('favorites')} className={`group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-[#e9ecef] ${activeModal === 'favorites' ? 'bg-[#343a40] text-[#f8f9fa] scale-110' : 'bg-[#ffffff] text-[#495057] hover:bg-[#343a40] hover:text-[#f8f9fa] hover:scale-105'}`}>
            <Heart size={22} className={activeModal === 'favorites' ? '' : 'group-hover:scale-110 transition-transform'} />
          </button>
          <button onClick={() => setActiveModal('tracking')} className={`group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-[#e9ecef] ${activeModal === 'tracking' ? 'bg-[#343a40] text-[#f8f9fa] scale-110' : 'bg-[#ffffff] text-[#495057] hover:bg-[#343a40] hover:text-[#f8f9fa] hover:scale-105'}`}>
            <Package size={22} className={activeModal === 'tracking' ? '' : 'group-hover:scale-110 transition-transform'} />
          </button>
        </div>
      </div>
    </>
  );
}
