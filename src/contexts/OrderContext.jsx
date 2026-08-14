import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const OrderContext = createContext({});

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) {
        setOrders(data);
      } else if (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };
    fetchOrders();
  }, []);

  const addOrder = async (orderData) => {
    const displayId = `#${Math.floor(Math.random() * 90000) + 10000}`;
    const newOrder = {
      store_id: orderData.storeId,
      customer_name: orderData.customerName || 'Cliente Anônimo',
      items: orderData.items || [],
      status: 0,
      display_id: displayId,
      user_id: orderData.userId || null,
      payment_method: orderData.paymentMethod || 'Não informado',
      total: orderData.total || 0,
      notes: orderData.notes || '',
      change_for: orderData.changeFor || '',
      delivery_type: orderData.deliveryType || 'Retirada'
    };
    
    const { data, error } = await supabase.from('orders').insert([newOrder]).select();
    if (error) {
      console.error("Erro ao criar pedido:", error);
      throw error;
    }
    if (data) {
      setOrders(prev => [data[0], ...prev]);
      return data[0];
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    const { data, error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id).select();
    if (error) {
      console.error("Erro ao atualizar pedido:", error);
    }
    if (data) {
      setOrders(prev => prev.map(order => order.id === id ? data[0] : order));
    }
  };

  const deleteOrder = async (id) => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) {
      console.error("Erro ao deletar pedido:", error);
    } else {
      setOrders(prev => prev.filter(order => order.id !== id));
    }
  };

  const clearAllOrders = () => {
    setOrders([]);
  };

  const getUserOrders = (userId) => {
    return orders.filter(order => order.user_id === userId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      clearAllOrders,
      getUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};
