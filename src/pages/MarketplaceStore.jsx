import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, ChevronLeft, ChevronRight, ArrowLeft, Minus, Plus, Trash2, X, Instagram, SlidersHorizontal } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MarketplaceStore() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const storeCategory = location.state?.storeCategory || 'Hamburgueria';
  const [activeTheme, setActiveTheme] = useState('theme-fashion-minimalist');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(0);
  const [storeInstagram, setStoreInstagram] = useState('@joaoburguers');
  
  // Checkout Form State
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('store_theme');
    const savedInsta = localStorage.getItem('store_instagram');
    
    if (savedInsta) {
      setStoreInstagram(savedInsta);
    }
    
    // Força um tema claro se estiver usando um escuro por acidente, para atender ao pedido
    if (savedTheme === 'theme-food-dark-bbq' || savedTheme === 'theme-beauty-luxury-gold') {
      setActiveTheme('theme-fashion-minimalist');
      localStorage.setItem('store_theme', 'theme-fashion-minimalist');
    } else if (savedTheme) {
      setActiveTheme(savedTheme);
    }
  }, []);

  const [cart, setCart] = useState([
    { id: 1, name: 'Burger Clássico', price: 32.50, quantity: 1, img: '/images/double_smash_burger.jpg' },
    { id: 2, name: 'Batata Rústica', price: 38.90, quantity: 2, img: '/images/batata_rustica_com_cheddar.jpg' }
  ]);

  const handleUpdateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const categories = ['Todos', 'Mais Vendidos', 'Promoções', 'Lançamentos', 'Kits'];

  const getProductsForCategory = (cat) => {
    switch(cat) {
      case 'Sorveteria':
        return [
          { id: 101, name: 'Sorvete de Baunilha', description: 'Sorvete cremoso de baunilha em fava com calda de chocolate.', img: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=200&q=50', price: 15.00, category: 'Mais Vendidos' },
          { id: 102, name: 'Sundae de Chocolate', description: 'Com pedaços de brownie, chantilly e cereja.', img: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=200&q=50', price: 22.50, category: 'Mais Vendidos' },
          { id: 103, name: 'Casquinha Mista', description: 'Metade chocolate, metade baunilha em casquinha crocante.', img: 'https://images.unsplash.com/photo-1558742569-ceca02abbf6b?w=200&q=50', price: 8.00, category: 'Promoções' },
          { id: 104, name: 'Pote 2L Morango', description: 'Pote família de sorvete sabor morango com pedaços de fruta.', img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200&q=50', price: 45.90, category: 'Kits' },
          { id: 105, name: 'Milkshake', description: 'Milkshake cremoso batido na hora, escolha seu sabor.', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&q=50', price: 18.00, category: 'Lançamentos' },
          { id: 106, name: 'Banana Split', description: 'Clássica taça com banana, três bolas de sorvete e coberturas.', img: 'https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?w=200&q=50', price: 28.50, category: 'Mais Vendidos' },
        ];
      case 'Pizzaria':
        return [
          { id: 101, name: 'Pizza Calabresa', description: 'Molho de tomate, mussarela, calabresa fatiada e cebola.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=50', price: 45.00, category: 'Mais Vendidos' },
          { id: 102, name: 'Pizza Margherita', description: 'Molho de tomate, mussarela, tomate fatiado e manjericão fresco.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=50', price: 42.00, category: 'Mais Vendidos' },
          { id: 103, name: 'Pizza 4 Queijos', description: 'Mussarela, provolone, gorgonzola e catupiry.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=50', price: 50.00, category: 'Promoções' },
          { id: 104, name: 'Combo 2 Pizzas', description: 'Escolha duas pizzas grandes tradicionais com desconto.', img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=200&q=50', price: 85.00, category: 'Kits' },
        ];
      case 'Maquiagem':
      case 'Cosméticos':
        return [
          { id: 101, name: 'Batom Vermelho', description: 'Efeito matte duradouro com alta pigmentação.', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&q=50', price: 35.00, category: 'Mais Vendidos' },
          { id: 102, name: 'Base Líquida', description: 'Cobertura média a alta com acabamento natural. FPS 30.', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&q=50', price: 89.90, category: 'Mais Vendidos' },
          { id: 103, name: 'Kit Pincéis', description: 'Kit com 12 pincéis profissionais de cerdas macias.', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&q=50', price: 120.00, category: 'Kits' },
          { id: 104, name: 'Paleta Sombras', description: 'Paleta com 18 cores neutras e cintilantes para o dia a dia.', img: 'https://images.unsplash.com/photo-1596462502278-27bf84033005?w=200&q=50', price: 150.00, category: 'Lançamentos' },
        ];
      case 'Moda Masculina':
      case 'Moda Feminina':
      case 'Roupas':
        return [
          { id: 101, name: 'Camiseta Básica', description: '100% algodão premium, caimento perfeito e confortável.', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=50', price: 49.90, category: 'Mais Vendidos' },
          { id: 102, name: 'Jaqueta Jeans', description: 'Jaqueta jeans com lavagem clássica, unissex.', img: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=200&q=50', price: 199.90, category: 'Lançamentos' },
          { id: 103, name: 'Calça Chino', description: 'Corte reto, tecido de sarja levemente com elastano.', img: 'https://images.unsplash.com/photo-1624378439575-d1ead6bb240e?w=200&q=50', price: 129.90, category: 'Mais Vendidos' },
          { id: 104, name: 'Kit 3 Peças', description: 'Monte seu kit com 3 camisetas básicas lisas.', img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&q=50', price: 120.00, category: 'Kits' },
        ];
      case 'Hamburgueria':
        return [
          { id: 101, name: 'Costela BBQ', description: 'Costela suína desfiada, molho barbecue e queijo cheddar no pão australiano.', img: '/images/costelinha-de-porco-ao-barbecue-1657229553564_v2_4x3.jpg', price: 85.00, category: 'Mais Vendidos' },
          { id: 102, name: 'Burger Clássico', description: 'Pão brioche, blend 160g, queijo prato, alface, tomate e maionese da casa.', img: '/images/double_smash_burger.jpg', price: 32.50, category: 'Mais Vendidos' },
          { id: 103, name: 'Batata Rústica', description: 'Porção de batatas rústicas fritas, acompanhadas de maionese de alho.', img: '/images/batata_rustica_com_cheddar.jpg', price: 28.00, category: 'Promoções' },
          { id: 104, name: 'Combo Família', description: '3 Burgers Clássicos + 2 Porções de Fritas + Refrigerante 2L.', img: '/images/double_smash_burger.jpg', price: 89.90, category: 'Kits' },
        ];
      case 'Bar':
        return [
          { id: 101, name: 'Cerveja Artesanal IPA', description: 'Lata 473ml, amargor médio, notas cítricas e frutadas.', img: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&q=50', price: 25.00, category: 'Mais Vendidos' },
          { id: 102, name: 'Porção de Fritas', description: 'Fritas sequinhas com cheddar derretido e bacon crocante.', img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200&q=50', price: 35.00, category: 'Mais Vendidos' },
          { id: 103, name: 'Caipirinha de Limão', description: 'Limão taiti, cachaça especial, açúcar e gelo.', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&q=50', price: 18.00, category: 'Promoções' },
          { id: 104, name: 'Combo Boteco', description: 'Porção mista (fritas, calabresa, frango a passarinho) + 2 cervejas long neck.', img: 'https://images.unsplash.com/photo-1616489953149-74facafeb81a?w=200&q=50', price: 89.90, category: 'Kits' },
        ];
      case 'Confeitaria':
        return [
          { id: 101, name: 'Bolo de Morango', description: 'Massa branca fofinha, recheio de creme branco com morangos frescos.', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=50', price: 85.00, category: 'Mais Vendidos' },
          { id: 102, name: 'Cupcake de Chocolate', description: 'Massa de cacau com cobertura de ganache e granulados.', img: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=200&q=50', price: 12.50, category: 'Mais Vendidos' },
          { id: 103, name: 'Macarons Sortidos', description: 'Caixa com 6 unidades de macarons de sabores variados.', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=200&q=50', price: 45.00, category: 'Promoções' },
          { id: 104, name: 'Kit Festa Doce', description: 'Bolo pequeno + 25 brigadeiros + 25 beijinhos.', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&q=50', price: 150.00, category: 'Kits' },
        ];
      case 'Padaria':
        return [
          { id: 101, name: 'Pão Francês', description: 'Saindo quentinho do forno a cada hora.', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=50', price: 0.80, category: 'Mais Vendidos' },
          { id: 102, name: 'Pão de Queijo', description: 'Pão de queijo mineiro tradicional, crocante por fora e macio por dentro.', img: 'https://images.unsplash.com/photo-1598142980894-6b9432f831b8?w=200&q=50', price: 3.50, category: 'Mais Vendidos' },
          { id: 103, name: 'Baguete', description: 'Baguete rústica de fermentação natural com casca crocante.', img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=200&q=50', price: 8.90, category: 'Promoções' },
          { id: 104, name: 'Cesta Café da Manhã', description: 'Pães, frios, café, leite, suco, frutas e doces em cesta especial.', img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&q=50', price: 85.00, category: 'Kits' },
        ];
      case 'Galeteria':
        return [
          { id: 101, name: 'Galeto Assado', description: 'Galeto desossado temperado com ervas e assado na brasa.', img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=200&q=50', price: 45.00, category: 'Mais Vendidos' },
          { id: 102, name: 'Frango Frito', description: 'Pedaços de frango empanados super crocantes e suculentos.', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&q=50', price: 38.00, category: 'Mais Vendidos' },
          { id: 103, name: 'Polenta Frita', description: 'Polenta cremosa por dentro e crocante por fora, com parmesão.', img: 'https://images.unsplash.com/photo-1605333398740-410a70f3f2dd?w=200&q=50', price: 22.00, category: 'Promoções' },
          { id: 104, name: 'Combo Família', description: '2 Galetos assados + arroz, feijão tropeiro, farofa e vinagrete.', img: 'https://images.unsplash.com/photo-1598515320509-f6b0f14d9b62?w=200&q=50', price: 110.00, category: 'Kits' },
        ];
      case 'Mercadinho':
        return [
          { id: 101, name: 'Arroz 5kg', description: 'Arroz branco tipo 1, grãos longos e soltinhos.', img: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=200&q=50', price: 25.90, category: 'Mais Vendidos' },
          { id: 102, name: 'Feijão 1kg', description: 'Feijão carioca com caldo encorpado e sabor caseiro.', img: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=200&q=50', price: 8.50, category: 'Mais Vendidos' },
          { id: 103, name: 'Leite Integral 1L', description: 'Caixa de leite UHT integral, rico em cálcio.', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=50', price: 5.90, category: 'Promoções' },
          { id: 104, name: 'Cesta Básica', description: 'Itens essenciais: arroz, feijão, óleo, açúcar, café, macarrão e mais.', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&q=50', price: 150.00, category: 'Kits' },
        ];
      default:
        return [
          { id: 101, name: `Especial 1 - ${cat}`, description: 'Produto especial de qualidade, feito para você.', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&q=50', price: 29.90, category: 'Mais Vendidos' },
          { id: 102, name: `Especial 2 - ${cat}`, description: 'Experimente este lançamento com sabor inigualável.', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&q=50', price: 39.90, category: 'Lançamentos' },
          { id: 103, name: `Especial 3 - ${cat}`, description: 'Aproveite essa promoção por tempo limitado.', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&q=50', price: 49.90, category: 'Promoções' },
          { id: 104, name: `Kit Exclusivo`, description: 'Kit completo com tudo que você precisa.', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&q=50', price: 99.90, category: 'Kits' },
        ];
    }
  };

  const products = getProductsForCategory(storeCategory);

  const getStoreProfileInfo = (cat) => {
    switch(cat) {
      case 'Sorveteria': return { name: 'Gelato & Cia', img: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=200&q=80' };
      case 'Pizzaria': return { name: 'Bella Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80' };
      case 'Hamburgueria': return { name: 'Burger & Co', img: '/images/double_smash_burger.jpg' };
      case 'Bar': return { name: 'Boteco do Zé', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&q=80' };
      case 'Confeitaria': return { name: 'Doce Sonho', img: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=200&q=80' };
      case 'Padaria': return { name: 'Pão Quente', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80' };
      case 'Galeteria': return { name: 'Galeto na Brasa', img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=200&q=80' };
      case 'Mercadinho': return { name: 'Mercadão Central', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&q=80' };
      case 'Maquiagem':
      case 'Cosméticos': return { name: 'Beleza & Cia', img: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=200' };
      case 'Moda Masculina':
      case 'Moda Feminina':
      case 'Roupas': return { name: 'Moda Fashion', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80' };
      default: return { name: `Loja de ${cat}`, img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&q=80' };
    }
  };
  
  const storeInfo = getStoreProfileInfo(storeCategory);

  // Filtragem por Categoria
  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Removida Paginação
  const displayedProducts = filteredProducts;

  const nextPage = () => setCurrentPage(p => Math.min(totalPages - 1, p + 1));
  const prevPage = () => setCurrentPage(p => Math.max(0, p - 1));

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/cadastro', { state: { from: location } });
      return;
    }
    
    if (!address) {
      alert("Por favor, preencha o endereço de entrega.");
      return;
    }

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace('.', ',');
    
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
            <img src={storeInfo.img} alt={storeInfo.name} className="w-full h-full object-cover"/>
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg font-bold leading-tight truncate">{storeInfo.name}</h1>
            <a href={`https://instagram.com/${storeInstagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-store-muted hover:text-store-primary transition-colors mt-0.5 truncate">
              <Instagram size={12} /> {storeInstagram}
            </a>
          </div>
        </div>
        <div className="relative">
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

      <div className="flex-1 w-full px-4 py-6 flex-col overflow-y-auto">
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
                        const exists = cart.find(i => i.id === prod.id);
                        if (exists) {
                          handleUpdateQuantity(prod.id, 1);
                        } else {
                          setCart([...cart, { ...prod, quantity: 1 }]);
                        }
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
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </div>
              <span className="font-semibold text-sm">Ver carrinho</span>
            </div>
            <span className="font-bold">
              R$ {cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace('.', ',')}
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
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="p-1 hover:text-store-primary transition-colors rounded text-store-text"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center text-store-text">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="p-1 hover:text-store-primary transition-colors rounded text-store-text"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
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
                  R$ {cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace('.', ',')}
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
