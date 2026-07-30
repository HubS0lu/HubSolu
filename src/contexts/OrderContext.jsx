import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext({});

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('hubsolu_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('hubsolu_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `#${Math.floor(Math.random() * 90000) + 10000}`, // ex: #14592
      status: 0, // 0: Recebido, 1: Preparando, 2: Pronto/Em Trânsito, 3: Concluído
      createdAt: new Date().toISOString()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const clearAllOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      clearAllOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};
