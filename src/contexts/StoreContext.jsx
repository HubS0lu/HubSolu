import React, { createContext, useContext, useState, useEffect } from 'react';
import { storesData, productsData } from '../data/mockData';

const StoreContext = createContext({});

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState(() => {
    const saved = localStorage.getItem('hubsolu_stores');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('hubsolu_products');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (stores.length === 0) {
      setStores(storesData);
      localStorage.setItem('hubsolu_stores', JSON.stringify(storesData));
    }
    if (products.length === 0) {
      setProducts(productsData);
      localStorage.setItem('hubsolu_products', JSON.stringify(productsData));
    }
  }, []);

  useEffect(() => {
    if (stores.length > 0) {
      localStorage.setItem('hubsolu_stores', JSON.stringify(stores));
    }
  }, [stores]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('hubsolu_products', JSON.stringify(products));
    }
  }, [products]);

  const getStoreById = (id) => stores.find(s => s.id === id);
  const getProductsByStore = (storeId) => products.filter(p => p.storeId === storeId);
  const getStoresByCategory = (category) => stores.filter(s => s.category === category || s.subCategory === category);
  
  const searchStoresAndProducts = (query) => {
    if (!query) return { stores: [], products: [] };
    const q = query.toLowerCase();
    
    const matchedStores = stores.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
    
    const matchedProducts = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
    
    return { stores: matchedStores, products: matchedProducts };
  };

  const addProduct = (product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStore = (updatedStore) => {
    setStores(prev => prev.map(s => s.id === updatedStore.id ? updatedStore : s));
  };

  return (
    <StoreContext.Provider value={{
      stores,
      products,
      getStoreById,
      getProductsByStore,
      getStoresByCategory,
      searchStoresAndProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      updateStore
    }}>
      {children}
    </StoreContext.Provider>
  );
};
