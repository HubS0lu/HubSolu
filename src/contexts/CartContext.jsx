import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('hubsolu_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('hubsolu_cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart or increment quantity
  const addToCart = (product, quantity = 1, storeId = null) => {
    // Definir qual é o storeId deste produto
    const productStoreId = storeId || product.storeId;
    
    // Verificar se já tem itens de outra loja no carrinho
    if (cart.length > 0 && productStoreId) {
      const existingStoreId = cart[0].storeId;
      if (existingStoreId && existingStoreId !== productStoreId) {
        if (window.confirm('Você só pode adicionar itens de uma loja por vez. Deseja limpar o carrinho atual e adicionar este produto da nova loja?')) {
          setCart([{ ...product, quantity, storeId: productStoreId }]);
        }
        return;
      }
    }

    setCart(prev => {
      // Find if item already exists
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Add new item
      return [...prev, { ...product, quantity, storeId: productStoreId }];
    });
  };

  // Update item quantity
  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Remove item entirely
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Derived values
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalValue
    }}>
      {children}
    </CartContext.Provider>
  );
};
