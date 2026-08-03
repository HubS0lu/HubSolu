export const storesData = [
  {
    id: 'burger-co',
    name: 'Burger & Co.',
    description: 'Os melhores hambúrgueres artesanais da cidade.',
    rating: 4.8,
    reviews: 124,
    deliveryFee: 5.90,
    deliveryTime: '30-45 min',
    category: 'Alimentação',
    subCategory: 'Burgers',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=50',
    banner: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
    theme: 'theme-food-dark-bbq',
    whatsapp: '5511999999999'
  },
  {
    id: 'bella-pizza',
    name: 'Bella Pizza',
    description: 'Pizzas tradicionais italianas assadas no forno a lenha.',
    rating: 4.9,
    reviews: 312,
    deliveryFee: 0,
    deliveryTime: '40-55 min',
    category: 'Alimentação',
    subCategory: 'Pizzaria',
    logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=50',
    banner: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    theme: 'theme-fashion-minimalist',
    whatsapp: '5511999999999'
  },
  {
    id: 'moda-fashion',
    name: 'Moda Fashion',
    description: 'As últimas tendências da moda feminina.',
    rating: 4.7,
    reviews: 89,
    deliveryFee: 12.00,
    deliveryTime: '1-2 dias',
    category: 'Roupas',
    subCategory: 'Feminino',
    logo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=50',
    banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    theme: 'theme-beauty-luxury-gold',
    whatsapp: '5511999999999'
  }
];

export const productsData = [
  // Burger & Co.
  {
    id: 'p1',
    storeId: 'burger-co',
    name: 'Double Smash',
    description: 'Dois blends de 100g, cheddar duplo, bacon crocante e maionese da casa no pão brioche.',
    price: 38.90,
    category: 'Mais Vendidos',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'
  },
  {
    id: 'p2',
    storeId: 'burger-co',
    name: 'Classic Burger',
    description: 'Blend de 150g, queijo prato, alface, tomate e molho especial.',
    price: 29.90,
    category: 'Mais Vendidos',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80'
  },
  {
    id: 'p3',
    storeId: 'burger-co',
    name: 'Batata Rústica',
    description: 'Porção de batatas rústicas temperadas com alecrim e páprica.',
    price: 18.90,
    category: 'Acompanhamentos',
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80'
  },
  {
    id: 'p3_2',
    storeId: 'burger-co',
    name: 'Refrigerante Lata',
    description: 'Cola, Guaraná ou Laranja.',
    price: 6.90,
    category: 'Bebidas',
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80'
  },
  // Bella Pizza
  {
    id: 'p4',
    storeId: 'bella-pizza',
    name: 'Pizza Margherita',
    description: 'Molho de tomate pelati, muçarela, manjericão fresco e azeite.',
    price: 55.00,
    category: 'Tradicionais',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80'
  },
  {
    id: 'p5',
    storeId: 'bella-pizza',
    name: 'Pizza Calabresa',
    description: 'Calabresa fatiada, cebola, azeitonas e orégano.',
    price: 62.00,
    category: 'Mais Vendidas',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80'
  },
  // Moda Fashion
  {
    id: 'p6',
    storeId: 'moda-fashion',
    name: 'Vestido Floral Verão',
    description: 'Vestido leve estampado, perfeito para os dias quentes.',
    price: 129.90,
    category: 'Lançamentos',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80'
  },
  {
    id: 'p7',
    storeId: 'moda-fashion',
    name: 'Jaqueta Jeans',
    description: 'Jaqueta jeans clássica com lavagem estonada.',
    price: 189.90,
    category: 'Inverno',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80'
  }
];
