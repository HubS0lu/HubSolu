import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { storesData as mockStores, productsData as mockProducts } from '../data/mockData';

const StoreContext = createContext({});

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingData(true);
      
      // Busca todas as lojas
      const { data: storesData, error: storesError } = await supabase.from('stores').select('*');
      if (storesError) {
        console.error("Erro ao buscar lojas:", storesError);
        setStores(mockStores);
      } else if (storesData && storesData.length > 0) {
        setStores(storesData);
      } else {
        setStores(mockStores);
      }

      // Busca todos os produtos
      const { data: productsData, error: productsError } = await supabase.from('products').select('*');
      if (productsError) {
        console.error("Erro ao buscar produtos:", productsError);
        setProducts(mockProducts);
      } else if (productsData && productsData.length > 0) {
        setProducts(productsData);
      } else {
        setProducts(mockProducts);
      }

      setLoadingData(false);
    };

    fetchInitialData();
  }, []);

  const getStoreById = (id) => stores.find(s => s.id === id);
  const getProductsByStore = (storeId) => products.filter(p => p.store_id === storeId || p.storeId === storeId);
  const getStoresByCategory = (category) => stores.filter(s => s.category === category || s.subCategory === category);
  
  const searchStoresAndProducts = (query) => {
    if (!query) return { stores: [], products: [] };
    const q = query.toLowerCase();
    
    const matchedStores = stores.filter(s => 
      s.name.toLowerCase().includes(q) || 
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.category && s.category.toLowerCase().includes(q))
    );
    
    const matchedProducts = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      (p.description && p.description.toLowerCase().includes(q))
    );
    
    return { stores: matchedStores, products: matchedProducts };
  };

  const addProduct = async (product) => {
    const { data, error } = await supabase.from('products').insert([product]).select();
    if (error) {
      console.error("Erro ao adicionar produto", error);
      throw error;
    }
    if (data) {
      setProducts(prev => [...prev, data[0]]);
    }
  };

  const updateProduct = async (product) => {
    const { data, error } = await supabase.from('products').update(product).eq('id', product.id).select();
    if (error) {
      console.error("Erro ao atualizar produto", error);
      throw error;
    }
    if (data) {
      setProducts(prev => prev.map(p => p.id === product.id ? data[0] : p));
    }
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error("Erro ao deletar produto", error);
      throw error;
    }
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStore = async (updatedStore) => {
    const { data, error } = await supabase.from('stores').update(updatedStore).eq('id', updatedStore.id).select();
    if (error) {
      console.error("Erro ao atualizar loja", error);
      throw error;
    }
    if (data) {
      setStores(prev => prev.map(s => s.id === updatedStore.id ? data[0] : s));
    }
  };

  const createStore = async (storeData) => {
    const { data, error } = await supabase.from('stores').insert([storeData]).select();
    if (error) {
      console.error("Erro ao criar loja", error);
      throw error;
    }
    if (data) {
      setStores(prev => [...prev, data[0]]);
      return data[0];
    }
  };

  return (
    <StoreContext.Provider value={{
      stores,
      products,
      loadingData,
      getStoreById,
      getProductsByStore,
      getStoresByCategory,
      searchStoresAndProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      updateStore,
      createStore
    }}>
      {children}
    </StoreContext.Provider>
  );
};
