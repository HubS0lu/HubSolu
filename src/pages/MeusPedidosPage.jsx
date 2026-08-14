import React, { useEffect, useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, ShoppingBag, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';

const STATUS_MAP = {
  0: { label: 'Na Fila', color: 'bg-[#f1f3f5] text-[#495057]', icon: Clock },
  1: { label: 'Preparando', color: 'bg-[#fff4e6] text-[#f59e0b]', icon: Package },
  2: { label: 'Pronto p/ Retirada', color: 'bg-[#ebfbee] text-[#2b8a3e]', icon: ShoppingBag },
  3: { label: 'Entregue / Retirado', color: 'bg-[#e3fafc] text-[#0b7285]', icon: CheckCircle },
};

export default function MeusPedidosPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // In a real scenario, this could be a subscription to get real-time updates
      const orders = getUserOrders(user.id);
      setMyOrders(orders);
    }
  }, [user, getUserOrders]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-body">
      <header className="flex items-center gap-4 p-6 bg-white border-b border-[#e9ecef] sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate('/marketplace')} className="p-2 -ml-2 rounded-full hover:bg-[#f1f3f5] transition-colors text-[#495057]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-[#212529]">Meus Pedidos</h1>
      </header>

      <div className="p-6 space-y-4 flex-1">
        {myOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#adb5bd] gap-4 mt-20">
            <Package size={64} className="opacity-20" />
            <p className="font-medium text-center">Você ainda não fez nenhum pedido.</p>
            <button 
              onClick={() => navigate('/marketplace')}
              className="mt-4 px-6 py-3 bg-[#343a40] text-white rounded-xl font-bold hover:bg-[#212529] transition-colors"
            >
              Explorar Lojas
            </button>
          </div>
        ) : (
          myOrders.map(order => {
            const statusInfo = STATUS_MAP[order.status] || STATUS_MAP[0];
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={order.id} className="bg-white p-5 rounded-2xl border border-[#e9ecef] shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f1f3f5] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-[#dee2e6]">
                      {order.store_logo ? (
                        <img src={order.store_logo} alt={order.store_name} className="w-full h-full object-cover" />
                      ) : (
                        <Store size={20} className="text-[#868e96]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#212529]">{order.store_name || "Loja"}</h3>
                      <p className="text-[10px] text-[#868e96] uppercase tracking-wider">{order.display_id}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${statusInfo.color}`}>
                    <StatusIcon size={14} />
                    {statusInfo.label}
                  </div>
                </div>

                <div className="bg-[#f8f9fa] rounded-xl p-3 border border-[#f1f3f5]">
                  <ul className="space-y-1.5">
                    {order.items?.map((item, idx) => (
                      <li key={idx} className="text-sm text-[#495057] flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                      </li>
                    ))}
                  </ul>
                  {order.notes && (
                    <p className="text-xs text-[#e03131] mt-2 pt-2 border-t border-[#dee2e6] italic">
                      Obs: {order.notes}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#e9ecef]">
                  <span className="text-xs text-[#868e96] font-medium">
                    {new Date(order.created_at || Date.now()).toLocaleDateString('pt-BR')} às {new Date(order.created_at || Date.now()).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  <span className="font-bold text-[#212529]">
                    R$ {(order.total || 0).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
