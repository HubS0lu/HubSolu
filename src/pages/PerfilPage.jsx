import React, { useState, useEffect } from 'react';
import { 
  Camera, User, Store, Settings, LogOut, ChevronRight, Palette, Check, 
  BarChart3, CreditCard, ShoppingBag, Users, Calendar, AlertCircle, ExternalLink, Activity,
  ChefHat, Clock, Plus, Edit2, Trash2, Image, GripVertical, Save, Eye
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import { useStore } from '../contexts/StoreContext';
import { useAuth } from '../contexts/AuthContext';
import ImageCropModal from '../components/ImageCropModal';

const themeCategories = [
  { id: 'food', label: 'Alimentação' },
  { id: 'fashion', label: 'Moda' },
  { id: 'beauty', label: 'Beleza' }
];

const themes = {
  food: [
    { id: 'theme-food-fresh-organic', name: 'Fresh Organic', primary: '#4ade80', secondary: '#fef08a', bg: '#f8fafc', text: '#0f172a' },
    { id: 'theme-food-spicy-bite', name: 'Spicy Bite', primary: '#ef4444', secondary: '#f97316', bg: '#fffbeb', text: '#451a03' },
    { id: 'theme-food-dark-bbq', name: 'Dark BBQ', primary: '#f59e0b', secondary: '#dc2626', bg: '#171717', text: '#fafafa' }
  ],
  fashion: [
    { id: 'theme-fashion-minimalist', name: 'Minimalist Chic', primary: '#171717', secondary: '#e5e5e5', bg: '#ffffff', text: '#000000' },
    { id: 'theme-fashion-pastel-vibe', name: 'Pastel Vibe', primary: '#c084fc', secondary: '#f472b6', bg: '#faf5ff', text: '#4c1d95' },
    { id: 'theme-fashion-streetwear', name: 'Denim & Street', primary: '#2563eb', secondary: '#fbbf24', bg: '#f1f5f9', text: '#0f172a' }
  ],
  beauty: [
    { id: 'theme-beauty-nude-elegance', name: 'Nude Elegance', primary: '#d97757', secondary: '#f3d2c1', bg: '#fffbf9', text: '#2b1b17' },
    { id: 'theme-beauty-luxury-gold', name: 'Luxury Gold', primary: '#d4af37', secondary: '#1a1a1a', bg: '#0a0a0a', text: '#f3f4f6' },
    { id: 'theme-beauty-rose-water', name: 'Rose Water', primary: '#fb7185', secondary: '#fecdd3', bg: '#fff1f2', text: '#881337' }
  ]
};

// Removidos mock data estáticos (metrics, invoices, comandasMock) para integrar com dados reais

// Removed local mock data
const PRODUCT_CATEGORIES = {
  'Alimentação': ['Mais Vendidos', 'Promoções', 'Lanches', 'Pizzas', 'Bebidas', 'Sobremesas', 'Acompanhamentos', 'Combos'],
  'Roupas': ['Lançamentos', 'Promoções', 'Masculino', 'Feminino', 'Infantil', 'Calçados', 'Acessórios'],
  'Mercado': ['Hortifruti', 'Carnes', 'Bebidas', 'Limpeza', 'Higiene', 'Mercearia', 'Promoções'],
  'default': ['Destaques', 'Mais Vendidos', 'Geral', 'Promoções']
};

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState('cozinha');
  const [activeCategory, setActiveCategory] = useState('food');
  const [activeTheme, setActiveTheme] = useState('theme-fashion-minimalist');
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  
  const { orders, updateOrderStatus } = useOrders();
  const { stores, getProductsByStore, addProduct, updateProduct, deleteProduct: removeProductFromStore, updateStore, createStore } = useStore();
  const { user } = useAuth();
  
  const myStore = stores.find(s => s.user_id === user?.id);
  const myProducts = myStore ? getProductsByStore(myStore.id) : [];
  const storeOrders = myStore ? orders.filter(o => o.storeId === myStore.id || o.store_id === myStore.id) : [];

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Lojista';
  const userEmail = user?.email || '';

  // --- Novos Estados ---
  const [userData, setUserData] = useState({
    name: userName,
    email: userEmail,
    phone: myStore?.whatsapp || '',
    instagram: localStorage.getItem('store_instagram') || ''
  });

  const [storeData, setStoreData] = useState({
    name: myStore?.name || "Minha Nova Loja",
    segment: myStore?.category || "Segmento da Loja",
    description: myStore?.description || "",
    address: myStore?.address || "",
    hours: myStore?.hours || ""
  });

  const [logoPreview, setLogoPreview] = useState(myStore?.logo || null);
  const [bannerPreview, setBannerPreview] = useState(myStore?.banner || null);

  // Sincroniza o estado local quando os dados do Supabase chegam (pois o fetch é assíncrono)
  useEffect(() => {
    if (user) {
      setUserData(prev => ({
        ...prev,
        name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Lojista',
        email: user?.email || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    if (myStore) {
      setStoreData({
        name: myStore.name || "",
        segment: myStore.category || "",
        description: myStore.description || "",
        address: myStore.address || "",
        hours: myStore.hours || ""
      });
      setLogoPreview(myStore.logo || null);
      setBannerPreview(myStore.banner || null);
    }
  }, [myStore]);
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Estado do modal de crop
  const [cropData, setCropData] = useState({ src: null, type: null, aspect: 1 });

  // --- Funções ---
  const handleSaveUserData = () => {
    localStorage.setItem('store_instagram', userData.instagram);
    localStorage.setItem('global_whatsapp', userData.phone);
    if (myStore) {
      updateStore({
        ...myStore,
        whatsapp: userData.phone
      });
    }
    alert("Dados pessoais salvos com sucesso!");
  };
  
  const handleSaveStoreData = async () => {
    try {
      if (myStore) {
        await updateStore({
          ...myStore,
          name: storeData.name,
          category: storeData.segment,
          description: storeData.description,
          address: storeData.address,
          hours: storeData.hours,
          logo: logoPreview || myStore.logo,
          banner: bannerPreview || myStore.banner
        });
        alert("Dados da loja atualizados com sucesso!");
      } else {
        await createStore({
          user_id: user?.id,
          name: storeData.name,
          category: storeData.segment,
          description: storeData.description,
          address: storeData.address,
          hours: storeData.hours,
          logo: logoPreview,
          banner: bannerPreview,
          theme: activeTheme
        });
        alert("Loja criada com sucesso!");
      }
    } catch (e) {
      alert("Ocorreu um erro ao salvar a loja.");
    }
  };

  const handleUploadClick = (e, type, aspect) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) return alert("A imagem não pode exceder 2MB para poupar memória.");
      setCropData({ src: URL.createObjectURL(file), type, aspect });
      e.target.value = ''; // Reset
    }
  };

  const handleCropComplete = (croppedImage) => {
    if (cropData.type === 'logo') {
      setLogoPreview(croppedImage);
    } else if (cropData.type === 'banner') {
      setBannerPreview(croppedImage);
    } else if (cropData.type === 'product') {
      setEditingProduct({ ...editingProduct, image: croppedImage });
    }
    setCropData({ src: null, type: null, aspect: 1 });
  };

  const openAddProduct = () => {
    setEditingProduct({ name: '', category: '', description: '', price: '', image: null });
    setIsCustomCategory(false);
    setIsProductModalOpen(true);
  };

  const openEditProduct = (produto) => {
    let displayPrice = produto.price;
    if (typeof produto.price === 'number') {
      displayPrice = `R$ ${produto.price.toFixed(2).replace('.', ',')}`;
    }
    setEditingProduct({ ...produto, price: displayPrice, image: produto.img || produto.image });
    
    // Check if product category is in predefined list
    const availableCategories = PRODUCT_CATEGORIES[storeData.segment] || PRODUCT_CATEGORIES['default'];
    setIsCustomCategory(produto.category && !availableCategories.includes(produto.category));
    
    setIsProductModalOpen(true);
  };

  const saveProduct = () => {
    if (!myStore) {
      alert("Você precisa criar e salvar as informações da sua loja antes de adicionar produtos!");
      setIsProductModalOpen(false);
      return;
    }

    let parsedPrice = 0;
    if (typeof editingProduct.price === 'string') {
      const priceStr = editingProduct.price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
      parsedPrice = parseFloat(priceStr);
    } else {
      parsedPrice = editingProduct.price;
    }
    if (isNaN(parsedPrice)) parsedPrice = 0;

    const productToSave = {
      name: editingProduct.name,
      description: editingProduct.description,
      category: editingProduct.category,
      price: parsedPrice,
      store_id: myStore.id,
      img: editingProduct.image || editingProduct.img
    };

    if (editingProduct.id) {
      updateProduct({ ...productToSave, id: editingProduct.id });
    } else {
      addProduct(productToSave);
    }
    setIsProductModalOpen(false);
  };

  const deleteProduct = (id) => removeProductFromStore(id);

  const navigate = useNavigate();

  const moveComanda = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('store_theme');
    if (savedTheme) {
      setActiveTheme(savedTheme);
      if (savedTheme.includes('food')) setActiveCategory('food');
      if (savedTheme.includes('fashion')) setActiveCategory('fashion');
      if (savedTheme.includes('beauty')) setActiveCategory('beauty');
    }
  }, []);

  const handleSelectTheme = (themeId) => {
    setActiveTheme(themeId);
    localStorage.setItem('store_theme', themeId);
  };

  // Lógica de faturas vazias para novas contas
  const hasOverdue = false;
  const invoicesList = []; // Sem faturas iniciais

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-body transition-colors duration-300">
      {/* Header Minimalista */}
      <header className="px-6 pt-12 pb-6 border-b border-[#e9ecef] bg-[#f8f9fa] sticky top-0 z-30">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[#212529] font-headline font-bold text-2xl tracking-tight">{myStore?.name || "Minha Nova Loja"}</h1>
            <p className="text-[#6c757d] text-sm mt-1">Gerencie sua loja e resultados.</p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[#dee2e6] shadow-sm">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=343a40&color=f8f9fa`}
              alt="Perfil" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Minimalist Tabs */}
        <div className="flex justify-center gap-3">
          {[
            { id: 'cozinha', label: 'Cozinha', icon: ChefHat },
            { id: 'loja', label: 'Loja', icon: Store },
            { id: 'visao_geral', label: 'Visão Geral', icon: BarChart3 },
            { id: 'assinatura', label: 'Assinatura', icon: CreditCard },
            { id: 'dados', label: 'Dados', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id}
                title={tab.label}
                onClick={() => setActiveTab(tab.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-[#343a40] text-[#f8f9fa] scale-105' 
                    : 'bg-[#e9ecef] text-[#6c757d] hover:bg-[#dee2e6] hover:text-[#495057]'
                }`}
              >
                <Icon size={20} />
              </button>
            )
          })}
        </div>
      </header>

      <div className="px-6 py-6 space-y-6 flex-1 overflow-y-auto pb-24">
        
        {/* ABA: VISÃO GERAL (DASHBOARD) */}
        {activeTab === 'visao_geral' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f1f3f5] p-4 rounded-2xl border border-[#e9ecef]">
                <div className="flex items-center gap-2 text-[#495057] mb-2">
                  <Activity size={16} />
                  <h3 className="text-xs font-semibold uppercase tracking-wider">Acessos</h3>
                </div>
                <p className="text-2xl font-bold text-[#212529]">0</p>
                <p className="text-[10px] text-[#6c757d] mt-1">Este mês</p>
              </div>
              
              <div className="bg-[#f1f3f5] p-5 rounded-2xl border border-[#e9ecef] shadow-sm">
                <p className="text-xs font-bold text-[#495057] uppercase tracking-wider mb-2">Total de Pedidos</p>
                <p className="text-2xl font-bold text-[#212529]">{storeOrders.length}</p>
                <p className="text-[10px] text-[#2b8a3e] mt-1 font-bold">Baseado em dados reais</p>
              </div>
            </div>

            <div className="bg-[#f1f3f5] p-5 rounded-2xl border border-[#e9ecef]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#495057]">
                  <Users size={16} />
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Clientes Ativos</h3>
                </div>
                <span className="bg-[#343a40] text-[#f8f9fa] text-xs font-bold px-2.5 py-1 rounded-full">
                  0
                </span>
              </div>
              <p className="text-xs text-[#6c757d]">Clientes que realizaram ao menos 1 pedido nos últimos 30 dias.</p>
            </div>

            {/* Gráfico de Acessos por Dia */}
            <div className="bg-[#f1f3f5] p-5 rounded-2xl border border-[#e9ecef]">
              <div className="flex items-center gap-2 text-[#495057] mb-6">
                <Calendar size={16} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Acessos na Semana</h3>
              </div>
              
              <div className="flex items-end justify-between h-32 gap-2 mt-4">
                {[
                  { day: 'Seg', value: 0 },
                  { day: 'Ter', value: 0 },
                  { day: 'Qua', value: 0 },
                  { day: 'Qui', value: 0 },
                  { day: 'Sex', value: 0 },
                  { day: 'Sáb', value: 0 },
                  { day: 'Dom', value: 0 },
                ].map((day, idx) => {
                  const heightPercent = 0; // Gráfico zerado
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="w-full relative flex justify-center h-full items-end">
                        <div 
                          className="w-full max-w-[24px] bg-[#ced4da] group-hover:bg-[#adb5bd] rounded-t-md transition-all duration-300 relative"
                          style={{ height: `4px` }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#495057] opacity-0 group-hover:opacity-100 transition-opacity">
                            {day.value}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-[#6c757d]">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ABA: ASSINATURA E FINANCEIRO (STRIPE) */}
        {activeTab === 'assinatura' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
            
            {hasOverdue && (
              <div className="bg-[#fff5f5] border border-[#ffc9c9] p-4 rounded-2xl flex items-start gap-3">
                <AlertCircle className="text-[#fa5252] shrink-0" size={20} />
                <div>
                  <h4 className="text-[#fa5252] font-bold text-sm">Assinatura Inadimplente</h4>
                  <p className="text-[#e03131] text-xs mt-1 leading-relaxed">
                    Você possui faturas em atraso. Regularize sua situação para continuar usando a plataforma sem interrupções.
                  </p>
                  <button 
                    onClick={() => setShowStripeModal(true)}
                    className="mt-3 bg-[#fa5252] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-[#e03131] transition-colors"
                  >
                    Regularizar agora
                  </button>
                </div>
              </div>
            )}

            <div className="bg-[#f1f3f5] rounded-2xl border border-[#e9ecef] overflow-hidden">
              <div className="p-5 border-b border-[#e9ecef] flex justify-between items-center bg-[#f8f9fa]">
                <div>
                  <h3 className="text-sm font-semibold text-[#495057] uppercase tracking-wider mb-1">Seu Plano Atual</h3>
                  <p className="text-xl font-bold text-[#212529]">Plano Gratuito (Teste)</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#212529]">R$ 0,00</p>
                  <p className="text-xs text-[#6c757d]">por mês</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-[#495057] mb-4">Você ainda não configurou um método de pagamento.</p>
                <button className="w-full bg-[#e9ecef] text-[#212529] font-semibold py-3 rounded-xl border border-[#ced4da] hover:bg-[#dee2e6] transition-colors flex justify-center items-center gap-2">
                  Gerenciar no Stripe <ExternalLink size={16} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#495057] uppercase tracking-wider mb-4 px-1">Histórico de Faturas</h3>
              <div className="space-y-3">
                {invoicesList.length > 0 ? invoicesList.map((inv) => (
                  <div key={inv.id} className="bg-[#f1f3f5] p-4 rounded-xl border border-[#e9ecef] flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#212529] text-sm">{inv.date}</p>
                      <p className="text-xs text-[#6c757d] mt-0.5">{inv.amount}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                        inv.status === 'Pago' 
                          ? 'bg-[#ebfbee] text-[#2b8a3e]' 
                          : 'bg-[#fff5f5] text-[#e03131]'
                      }`}>
                        {inv.status}
                      </span>
                      <button className="p-1.5 text-[#495057] bg-[#e9ecef] rounded-lg hover:bg-[#ced4da] transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-[#6c757d]">Você ainda não possui faturas.</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ABA: DADOS PESSOAIS */}
        {activeTab === 'dados' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col items-center mb-6">
              <div className="relative group mb-3">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-[#dee2e6] bg-[#e9ecef]">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=343a40&color=f8f9fa`}
                    alt={userName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#f8f9fa] border border-[#ced4da] rounded-full flex items-center justify-center text-[#495057] shadow-sm hover:bg-[#e9ecef]">
                  <Camera size={14} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Nome Completo</label>
              <input type="text" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} className="w-full bg-[#f1f3f5] border border-[#ced4da] rounded-xl px-4 py-3.5 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-[#f8f9fa] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">E-mail</label>
              <input type="email" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="w-full bg-[#f1f3f5] border border-[#ced4da] rounded-xl px-4 py-3.5 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-[#f8f9fa] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Celular / WhatsApp</label>
              <input type="tel" value={userData.phone} onChange={e => setUserData({...userData, phone: e.target.value})} className="w-full bg-[#f1f3f5] border border-[#ced4da] rounded-xl px-4 py-3.5 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-[#f8f9fa] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Instagram da Loja</label>
              <input type="text" value={userData.instagram} onChange={e => setUserData({...userData, instagram: e.target.value})} className="w-full bg-[#f1f3f5] border border-[#ced4da] rounded-xl px-4 py-3.5 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-[#f8f9fa] transition-colors" placeholder="@suamarca" />
            </div>
            
            <button onClick={handleSaveUserData} className="w-full bg-[#343a40] text-[#f8f9fa] font-bold py-4 rounded-xl mt-6 shadow-sm hover:bg-[#212529] transition-colors">
              Salvar Alterações
            </button>
            
            <button className="w-full flex items-center justify-center gap-2 mt-4 py-4 text-[#e03131] hover:bg-[#fff5f5] rounded-xl transition-colors font-medium">
              <LogOut size={18} />
              Sair da Conta
            </button>
          </div>
        )}

        {/* ABA: COZINHA (KANBAN) */}
        {activeTab === 'cozinha' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-6">
              <ChefHat size={24} className="text-[#212529]" />
              <h2 className="text-[#212529] font-bold text-xl">Gestão de Comandas</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
              {[
                { id: 0, label: 'Na Fila', color: 'bg-[#f1f3f5]', borderColor: 'border-[#ced4da]' },
                { id: 1, label: 'Preparando', color: 'bg-[#fff4e6]', borderColor: 'border-[#ffd8a8]' },
                { id: 2, label: 'Pronto', color: 'bg-[#ebfbee]', borderColor: 'border-[#b2f2bb]' }
              ].map(coluna => (
                <div key={coluna.id} className={`flex-none w-[85vw] max-w-sm snap-center snap-always flex flex-col h-[calc(100vh-280px)] min-h-[400px] bg-[#f8f9fa] rounded-2xl border ${coluna.borderColor} overflow-hidden shadow-sm`}>
                  <div className={`px-4 py-3 border-b ${coluna.borderColor} ${coluna.color} font-bold text-[#495057] uppercase text-xs tracking-wider flex justify-between items-center`}>
                    {coluna.label}
                    <span className="bg-white/50 text-[#495057] px-2 py-0.5 rounded-full text-[10px]">
                      {storeOrders.filter(c => c.status === coluna.id).length}
                    </span>
                  </div>
                  
                  <div className="p-3 flex-1 overflow-y-auto space-y-3">
                    {storeOrders.filter(c => c.status === coluna.id).map(comanda => (
                      <div key={comanda.id} className="bg-white p-4 rounded-xl shadow-sm border border-[#e9ecef] flex flex-col gap-3 transition-transform hover:-translate-y-0.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold text-[#adb5bd] uppercase tracking-wider">{comanda.id}</span>
                            <h4 className="font-bold text-[#212529] text-sm leading-tight">Cliente Anônimo</h4>
                          </div>
                          <div className="flex items-center gap-1 text-[#f59e0b] bg-[#fffbeb] px-2 py-1 rounded-md text-[10px] font-bold">
                            <Clock size={12} />
                            {new Date(comanda.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                        
                        <div className="bg-[#f8f9fa] rounded-lg p-2.5 border border-[#f1f3f5]">
                          <ul className="space-y-2">
                            {comanda.items.map((item, idx) => (
                              <li key={idx} className="text-xs text-[#495057]">
                                <div className="font-semibold text-[#343a40] flex items-start gap-1">
                                  <span className="mt-0.5 text-[#adb5bd]">•</span> {item.quantity}x {item.name}
                                </div>
                                {item.obs && (
                                  <p className="pl-2.5 mt-0.5 text-[#e03131] italic font-medium text-[10px]">
                                    Obs: {item.obs}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 mt-1">
                          {coluna.id !== 0 && (
                            <button onClick={() => moveComanda(comanda.id, coluna.id === 2 ? 1 : 0)} className="flex-1 py-1.5 text-[10px] font-bold text-[#495057] bg-[#f1f3f5] hover:bg-[#e9ecef] rounded-lg transition-colors">
                              Voltar
                            </button>
                          )}
                          {coluna.id !== 2 && (
                            <button onClick={() => moveComanda(comanda.id, coluna.id === 0 ? 1 : 2)} className="flex-1 py-1.5 text-[10px] font-bold text-white bg-[#343a40] hover:bg-[#212529] rounded-lg transition-colors shadow-sm">
                              Avançar
                            </button>
                          )}
                          {coluna.id === 2 && (
                            <button onClick={() => moveComanda(comanda.id, 3)} className="flex-1 py-1.5 text-[10px] font-bold text-[#2b8a3e] bg-[#ebfbee] hover:bg-[#d3f9d8] rounded-lg transition-colors">
                              Entregue
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {storeOrders.filter(c => c.status === coluna.id).length === 0 && (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-xs text-[#adb5bd] font-medium text-center">Nenhuma comanda</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA: LOJA (EDIÇÃO E TEMA) */}
        {activeTab === 'loja' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
            
            {/* Informações Básicas */}
            <div className="bg-[#f1f3f5] p-5 rounded-2xl border border-[#e9ecef] space-y-4">
              <h3 className="text-sm font-semibold text-[#495057] uppercase tracking-wider flex items-center gap-2 border-b border-[#dee2e6] pb-3">
                <Store size={16} />
                Informações da Loja
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 col-span-1 md:col-span-2">
                  <div className="flex gap-4 items-center">
                    <label className="w-20 h-20 bg-[#e9ecef] rounded-2xl border border-[#ced4da] flex flex-col items-center justify-center text-[#868e96] cursor-pointer hover:bg-[#dee2e6] transition-colors shrink-0 overflow-hidden relative">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera size={24} />
                          <span className="text-[10px] font-bold mt-1">Logo</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={(e) => handleUploadClick(e, 'logo', 1)} className="hidden" />
                    </label>
                    <label className="flex-1 h-20 bg-[#e9ecef] rounded-2xl border border-[#ced4da] flex flex-col items-center justify-center text-[#868e96] cursor-pointer hover:bg-[#dee2e6] transition-colors overflow-hidden relative">
                      {bannerPreview ? (
                        <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Image size={24} />
                          <span className="text-[10px] font-bold mt-1">Banner de Capa</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={(e) => handleUploadClick(e, 'banner', 16/9)} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Nome da Loja</label>
                  <input type="text" value={storeData.name} onChange={e => setStoreData({...storeData, name: e.target.value})} className="w-full bg-[#f8f9fa] border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Segmento</label>
                  <input type="text" value={storeData.segment} onChange={e => setStoreData({...storeData, segment: e.target.value})} className="w-full bg-[#f8f9fa] border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-white transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Descrição (Bio)</label>
                  <textarea rows="3" value={storeData.description} onChange={e => setStoreData({...storeData, description: e.target.value})} className="w-full bg-[#f8f9fa] border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-white transition-colors resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Endereço de Entrega/Retirada</label>
                  <input type="text" value={storeData.address} onChange={e => setStoreData({...storeData, address: e.target.value})} className="w-full bg-[#f8f9fa] border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-white transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Horário de Funcionamento</label>
                  <input type="text" value={storeData.hours} onChange={e => setStoreData({...storeData, hours: e.target.value})} className="w-full bg-[#f8f9fa] border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] focus:bg-white transition-colors" />
                </div>
              </div>
            </div>

            {/* Gerenciamento de Produtos */}
            <div className="bg-[#f1f3f5] p-5 rounded-2xl border border-[#e9ecef] space-y-4">
              <div className="flex items-center justify-between border-b border-[#dee2e6] pb-3">
                <h3 className="text-sm font-semibold text-[#495057] uppercase tracking-wider flex items-center gap-2">
                  <ShoppingBag size={16} />
                  Catálogo de Produtos
                </h3>
                <button onClick={openAddProduct} className="bg-[#343a40] text-white p-1.5 rounded-lg hover:bg-[#212529] transition-colors shadow-sm">
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-2">
                {myProducts.map(produto => (
                  <div key={produto.id} className="bg-white p-3 rounded-xl border border-[#e9ecef] shadow-sm flex items-center gap-3">
                    <div className="text-[#adb5bd] cursor-grab active:cursor-grabbing">
                      <GripVertical size={16} />
                    </div>
                    <div className="w-10 h-10 bg-[#f1f3f5] rounded-lg border border-[#e9ecef] flex items-center justify-center shrink-0 overflow-hidden">
                      {(produto.image || produto.img) ? (
                        <img src={produto.image || produto.img} alt={produto.name} className="w-full h-full object-cover" />
                      ) : (
                        <Image size={16} className="text-[#adb5bd]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#212529] leading-none">{produto.name}</h4>
                      <p className="text-[10px] text-[#6c757d] mt-1">{produto.category} • {typeof produto.price === 'number' ? `R$ ${produto.price.toFixed(2).replace('.', ',')}` : produto.price}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEditProduct(produto)} className="p-1.5 text-[#495057] hover:bg-[#e9ecef] rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteProduct(produto.id)} className="p-1.5 text-[#e03131] hover:bg-[#fff5f5] rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tema e Cores (Aproveitando o existente) */}
            <div className="bg-[#f1f3f5] p-5 rounded-2xl border border-[#e9ecef]">
              <h3 className="text-sm font-semibold text-[#495057] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Palette size={16} />
                Cores da sua Loja
              </h3>
              
              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-2">
                {themeCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-[#343a40] text-[#f8f9fa]'
                        : 'bg-[#e9ecef] text-[#495057] hover:bg-[#dee2e6]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Swatches */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {themes[activeCategory].map(theme => (
                  <div 
                    key={theme.id}
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                      activeTheme === theme.id ? 'border-[#343a40] bg-[#f8f9fa] shadow-sm' : 'border-transparent hover:bg-[#e9ecef]'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-center leading-tight text-[#495057]">{theme.name}</span>
                    <div className="relative w-12 h-12 rounded-full shadow-sm border-2 border-[#dee2e6] shrink-0" style={{ backgroundColor: theme.bg }}>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border border-white" style={{ backgroundColor: theme.secondary }}></div>
                      {activeTheme === theme.id && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#343a40]/50 backdrop-blur-[1px]">
                          <Check size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-6 mt-8 justify-start">
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={handleSaveStoreData}
                    className="w-14 h-14 bg-[#343a40] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#212529] transition-all hover:scale-105"
                  >
                    <Save size={24} />
                  </button>
                  <span className="text-[10px] font-bold text-[#495057] uppercase tracking-wide">Salvar</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={() => navigate(`/loja/${myStore?.id}`)}
                    className="w-14 h-14 bg-[#f8f9fa] text-[#212529] border border-[#ced4da] rounded-full flex items-center justify-center shadow-sm hover:bg-[#e9ecef] transition-all hover:scale-105"
                  >
                    <Eye size={24} />
                  </button>
                  <span className="text-[10px] font-bold text-[#495057] uppercase tracking-wide">Visualizar</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* STRIPE CHECKOUT MODAL MOCK */}
      {showStripeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#212529]/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowStripeModal(false)}
          ></div>
          <div className="bg-[#f8f9fa] w-full max-w-sm rounded-2xl shadow-xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-[#635BFF] p-6 text-white text-center">
              <CreditCard size={32} className="mx-auto mb-3" />
              <h2 className="text-lg font-bold">Stripe Checkout</h2>
              <p className="text-white/80 text-sm">Regularização de Fatura</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#495057]">Fatura ref. 15/07</span>
                <span className="font-bold text-[#212529]">R$ 149,90</span>
              </div>
              <div className="h-px w-full bg-[#e9ecef]"></div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-[#212529]">Total</span>
                <span className="text-[#212529]">R$ 149,90</span>
              </div>
              
              <button 
                onClick={() => {
                  alert("Pagamento simulado com sucesso!");
                  setShowStripeModal(false);
                }}
                className="w-full bg-[#635BFF] text-white font-bold py-3.5 rounded-xl mt-4 hover:bg-[#534be8] transition-colors"
              >
                Pagar com Cartão
              </button>
              <button 
                onClick={() => setShowStripeModal(false)}
                className="w-full py-3 text-[#6c757d] font-semibold text-sm hover:text-[#495057] transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#212529]/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsProductModalOpen(false)}
          ></div>
          <div className="bg-[#f8f9fa] w-full max-w-sm rounded-2xl shadow-xl relative z-10 p-6 animate-in zoom-in-95 duration-300 space-y-4">
            <h2 className="text-lg font-bold text-[#212529] mb-4">
              {editingProduct?.id ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            
            <div className="flex justify-center mb-2">
              <label className="w-20 h-20 bg-[#e9ecef] rounded-2xl border border-[#ced4da] flex flex-col items-center justify-center text-[#868e96] cursor-pointer hover:bg-[#dee2e6] transition-colors shrink-0 overflow-hidden relative">
                {editingProduct?.image ? (
                  <img src={editingProduct.image} alt="Produto" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera size={24} />
                    <span className="text-[10px] font-bold mt-1">Foto</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleUploadClick(e, 'product', 1)} className="hidden" />
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Nome do Produto</label>
              <input 
                type="text" 
                value={editingProduct?.name || ''} 
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                className="w-full bg-white border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd]" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Categoria</label>
              <div className="relative">
                <select 
                  value={isCustomCategory ? 'Outra...' : (editingProduct?.category || '')} 
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'Outra...') {
                      setIsCustomCategory(true);
                      setEditingProduct({...editingProduct, category: ''});
                    } else {
                      setIsCustomCategory(false);
                      setEditingProduct({...editingProduct, category: val});
                    }
                  }}
                  className="w-full bg-white border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] appearance-none" 
                >
                  <option value="" disabled>Selecione uma categoria</option>
                  {(PRODUCT_CATEGORIES[storeData.segment] || PRODUCT_CATEGORIES['default']).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="Outra...">Outra...</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#adb5bd]">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
              
              {isCustomCategory && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-300">
                  <input 
                    type="text" 
                    placeholder="Digite a categoria personalizada"
                    value={editingProduct?.category || ''} 
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full bg-[#f8f9fa] border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd]" 
                    autoFocus
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Preço (ex: R$ 20,00)</label>
              <input 
                type="text" 
                value={editingProduct?.price || ''} 
                onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                className="w-full bg-white border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd]" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#495057] uppercase tracking-wider mb-2">Descrição (Opcional)</label>
              <textarea 
                value={editingProduct?.description || ''} 
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                placeholder="Detalhes sobre o produto (ingredientes, tamanho, etc.)"
                className="w-full bg-white border border-[#ced4da] rounded-xl px-4 py-3 text-[#212529] text-sm focus:outline-none focus:border-[#adb5bd] resize-none h-24" 
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="flex-1 py-3 text-[#495057] bg-[#e9ecef] font-bold text-sm rounded-xl hover:bg-[#dee2e6] transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={saveProduct}
                className="flex-1 py-3 bg-[#343a40] text-white font-bold text-sm rounded-xl hover:bg-[#212529] transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CROP MODAL */}
      {cropData.src && (
        <ImageCropModal 
          imageSrc={cropData.src} 
          aspect={cropData.aspect}
          onCropComplete={handleCropComplete} 
          onClose={() => setCropData({ src: null, type: null, aspect: 1 })}
        />
      )}
    </div>
  );
}
