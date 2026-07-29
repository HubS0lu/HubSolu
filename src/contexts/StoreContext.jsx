import React, { createContext, useContext, useState, useEffect } from 'react';
import { storesData, productsData } from '../data/mockData';

const StoreContext = createContext({});

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setStores(storesData);
    setProducts(productsData);
  }, []);

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

  return (
    <StoreContext.Provider value={{
      stores,
      products,
      getStoreById,
      getProductsByStore,
      getStoresByCategory,
      searchStoresAndProducts
    }}>
      {children}
    </StoreContext.Provider>
  );
};
