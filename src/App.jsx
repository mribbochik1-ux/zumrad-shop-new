import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, Menu, X, ChevronRight, Filter, 
  MapPin, Phone, Clock, Send, Lock, Plus, Copy, Edit3, 
  Sparkles, Building2, ShieldCheck, LogOut, ArrowRight, CheckCircle2,
  SlidersHorizontal, Check, RefreshCw
} from 'lucide-react';

// --- STYLES & GOOGLE FONTS ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@500;600;700&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #FFFFFF;
      color: #000000;
    }
    .font-oswald {
      font-family: 'Oswald', sans-serif;
      letter-spacing: -0.02em;
    }
    .accent-orange-bg {
      background-color: #FF8A00;
    }
    .accent-orange-text {
      color: #FF8A00;
    }
    .accent-orange-border {
      border-color: #FF8A00;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

// --- BRAND LOGO COMPONENT ---
const ZumradLogo = ({ className = "h-10 w-10" }) => (
  <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="48" fill="#FF8A00" />
      <polygon points="50,15 82,32 82,68 50,85 18,68 18,32" fill="#FFFFFF" />
      <path 
        d="M32 35 H68 L42 65 H68" 
        stroke="#FF8A00" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  </div>
);

// --- INITIAL DATA & DEMO STATE ---
const INITIAL_CATEGORIES = [
  { id: 'tuflilar', name: 'Tuflilar', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600' },
  { id: 'krossovkalar', name: 'Krossovkalar', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600' },
  { id: 'etiklar', name: 'Etik va botinkalar', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600' },
  { id: 'sandallar', name: 'Sandal va shippaklar', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=600' },
  { id: 'uy-poyabzali', name: 'Shippak/uy poyabzali', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600' },
  { id: 'sumkalar', name: 'Sumkalar', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600' },
  { id: 'hamyonlar', name: 'Hamyonlar', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600' }
];

const INITIAL_BRANCHES = {
  '1': {
    id: '1',
    name: '1-filial (Chorsu)',
    telegramUsername: 'zumrad_shop_filial1',
    address: 'Toshkent sh., Chorsu bozori, 3-paviljon 14-do\'kon',
    phone: '+998 90 123 45 67',
    hours: '09:00 - 20:00 (Hamma kunlar)'
  },
  '2': {
    id: '2',
    name: '2-filial (Chilonzor)',
    telegramUsername: 'zumrad_shop_filial2',
    address: 'Toshkent sh., Chilonzor 9-kvartal, Integro SM 2-qavat',
    phone: '+998 90 987 65 43',
    hours: '10:00 - 21:00 (Hamma kunlar)'
  }
};

const INITIAL_PRODUCTS = [
  // 1-FILIAL PRODUCTS
  {
    id: 'p1',
    branch_id: '1',
    name: 'Klassik Teri Tufli Zumrad Royal',
    brand: 'Zumrad Exclusive',
    category: 'tuflilar',
    price: 450000,
    sizes: ['36', '37', '38', '39'],
    colors: ['Qora', 'Jigarrang'],
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'],
    material: '100% Tabiiy teri',
    country: 'Turkiya',
    description: 'Yuqori sifatli tabiiy teridan tayyorlangan premium tufli. Kun bo\'yi qulaylik va bejirim ko\'rinish bag\'ishlaydi.',
    status: 'mavjud',
    isNew: true,
    isPopular: true,
    createdAt: '2026-03-01'
  },
  {
    id: 'p2',
    branch_id: '1',
    name: 'Sportiv Premium Krossovka Urban',
    brand: 'Zumrad Active',
    category: 'krossovkalar',
    price: 380000,
    sizes: ['35', '36', '37', '38', '39'],
    colors: ['Oq', 'Pushti'],
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'],
    material: 'Ekologik toza tekstil & ortopedik taglik',
    country: 'Vyetnam',
    description: 'Eng so\'nggi uslubdagi yengil va havo o\'tkazuvchan krossovka.',
    status: 'mavjud',
    isNew: true,
    isPopular: true,
    createdAt: '2026-03-02'
  },
  {
    id: 'p3',
    branch_id: '1',
    name: 'Ayollar Uchun Elegans Sumka',
    brand: 'Zumrad Luxury',
    category: 'sumkalar',
    price: 520000,
    sizes: [],
    colors: ['Qora', 'Krem'],
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'],
    material: 'Premium Eko teri',
    country: 'Italiya',
    description: 'Har qanday kiyim bilan mukammal mos tushadigan zamonaviy ayollar sumkasi.',
    status: 'mavjud',
    isNew: true,
    isPopular: false,
    createdAt: '2026-03-03'
  },
  {
    id: 'p4',
    branch_id: '1',
    name: 'Kuzgi Baland Zamsh Etik',
    brand: 'Zumrad Premium',
    category: 'etiklar',
    price: 680000,
    sizes: ['37', '38', '39'],
    colors: ['Qora'],
    images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800'],
    material: 'Tabiiy zamsh',
    country: 'Turkiya',
    description: 'Issiq tutuvchi zamonaviy baland etik.',
    status: 'mavjud',
    isNew: false,
    isPopular: true,
    createdAt: '2026-02-20'
  },

  // 2-FILIAL PRODUCTS
  {
    id: 'p5',
    branch_id: '2',
    name: 'Yozgi Shaffof Sandal Glamour',
    brand: 'Zumrad Fashion',
    category: 'sandallar',
    price: 290000,
    sizes: ['36', '37', '38'],
    colors: ['Oltin', 'Kumush'],
    images: ['https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800'],
    material: 'Yumshoq silikon va charm',
    country: 'Turkiya',
    description: 'Yozgi issiq kunlar va bayramlar uchun nafis va qulay sandal.',
    status: 'mavjud',
    isNew: true,
    isPopular: true,
    createdAt: '2026-03-04'
  },
  {
    id: 'p6',
    branch_id: '2',
    name: 'Qulay Uy Shippagi Soft Cloud',
    brand: 'Zumrad Home',
    category: 'uy-poyabzali',
    price: 120000,
    sizes: ['36-37', '38-39'],
    colors: ['Pushti', 'Moviy'],
    images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800'],
    material: 'Yumshoq junli tekstil',
    country: 'O\'zbekiston',
    description: 'Uyda kiyish uchun favqulodda yumshoq va issiq shippaklar.',
    status: 'mavjud',
    isNew: true,
    isPopular: true,
    createdAt: '2026-03-05'
  },
  {
    id: 'p7',
    branch_id: '2',
    name: 'Katta Hajmli Sayohat Sumkasi Voyager',
    brand: 'Zumrad Travel',
    category: 'sumkalar',
    price: 590000,
    sizes: [],
    colors: ['Jigarrang', 'Qora'],
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'],
    material: 'Mustahkam teri substitute',
    country: 'Turkiya',
    description: 'Keng va sig\'imli har kunlik hamda sayohat sumkasi.',
    status: 'sotilgan',
    isNew: false,
    isPopular: false,
    createdAt: '2026-03-06'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-8801',
    branch_id: '1',
    customerName: 'Shahlo Azimova',
    phone: '+998 90 555 11 22',
    items: [
      { id: 'p1', name: 'Klassik Teri Tufli Zumrad Royal', size: '37', color: 'Qora', price: 450000, qty: 1 }
    ],
    total: 450000,
    status: 'yangi',
    date: '2026-03-07 16:30'
  }
];

export default function App() {
  // --- STATE ---
  const [selectedBranchId, setSelectedBranchId] = useState(() => {
    return localStorage.getItem('zumrad_branch_id') || '';
  });
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'catalog', 'about', 'admin'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data Store
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('zumrad_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal / Detail views
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState(1000000);
  const [sortBy, setSortBy] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(6);

  // Checkout inputs
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');

  // Admin state
  const [adminUser, setAdminUser] = useState(null); // { role: 'owner'|'staff', branch_id: '1'|'2'|'all', name: string }
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductData, setEditingProductData] = useState({
    id: '',
    name: '',
    brand: 'Zumrad',
    category: 'tuflilar',
    price: '',
    sizes: ['36', '37', '38'],
    colors: ['Qora'],
    material: '',
    country: 'Turkiya',
    description: '',
    status: 'mavjud',
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'],
    branch_id: '1'
  });

  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    if (!selectedBranchId) {
      setShowBranchModal(true);
    }
  }, [selectedBranchId]);

  useEffect(() => {
    localStorage.setItem('zumrad_cart', JSON.stringify(cart));
  }, [cart]);

  const handleSelectBranch = (id) => {
    setSelectedBranchId(id);
    localStorage.setItem('zumrad_branch_id', id);
    setShowBranchModal(false);
    triggerToast(`${branches[id]?.name} tanlandi!`);
  };

  // Branch Specific Products
  const activeBranchProducts = useMemo(() => {
    if (!selectedBranchId) return [];
    return products.filter(p => p.branch_id === selectedBranchId);
  }, [products, selectedBranchId]);

  // Catalog Filters
  const filteredProducts = useMemo(() => {
    let result = activeBranchProducts.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSize = selectedSize === 'all' || (item.sizes && item.sizes.includes(selectedSize));
      const matchesColor = selectedColor === 'all' || (item.colors && item.colors.includes(selectedColor));
      const matchesPrice = item.price <= priceRange;
      
      return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
    });

    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeBranchProducts, searchQuery, selectedCategory, selectedSize, selectedColor, priceRange, sortBy]);

  // Branch Cart
  const branchCart = useMemo(() => {
    return cart.filter(item => item.branch_id === selectedBranchId);
  }, [cart, selectedBranchId]);

  const cartTotal = useMemo(() => {
    return branchCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [branchCart]);

  const addToCart = (product, size, color) => {
    if (product.status === 'sotilgan') return;

    const chosenSize = size || (product.sizes?.[0] || 'Standart');
    const chosenColor = color || (product.colors?.[0] || 'Asosiy');

    const existingIdx = cart.findIndex(
      i => i.id === product.id && i.selectedSize === chosenSize && i.selectedColor === chosenColor && i.branch_id === selectedBranchId
    );

    if (existingIdx > -1) {
      const updated = [...cart];
      updated[existingIdx].quantity += 1;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: 1
        }
      ]);
    }
    triggerToast("Mahsulot savatga qo'shildi!");
  };

  const updateCartQuantity = (cartIndex, delta) => {
    const targetItem = branchCart[cartIndex];
    const realIndex = cart.findIndex(i => i === targetItem);
    if (realIndex > -1) {
      const updated = [...cart];
      updated[realIndex].quantity += delta;
      if (updated[realIndex].quantity <= 0) {
        updated.splice(realIndex, 1);
      }
      setCart(updated);
    }
  };

  // Telegram Checkout Redirect
  const handleTelegramCheckout = (e) => {
    e.preventDefault();
    if (!checkoutName || !checkoutPhone) {
      alert("Iltimos, ismingiz va telefon raqamingizni kiriting!");
      return;
    }
    if (branchCart.length === 0) return;

    const currentBranch = branches[selectedBranchId];

    // Save order record
    const newOrd = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      branch_id: selectedBranchId,
      customerName: checkoutName,
      phone: checkoutPhone,
      items: branchCart.map(i => ({
        id: i.id,
        name: i.name,
        size: i.selectedSize,
        color: i.selectedColor,
        price: i.price,
        qty: i.quantity
      })),
      total: cartTotal,
      status: 'yangi',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setOrders([newOrd, ...orders]);

    // Build Telegram Text
    let text = `✨ *Zumrad Shop - ${currentBranch.name}*\n\n`;
    text += `👤 *Mijoz:* ${checkoutName}\n`;
    text += `📞 *Tel:* ${checkoutPhone}\n\n`;
    text += `🛒 *BUYURTMA TAFSILOTLARI:*\n`;

    branchCart.forEach((item, i) => {
      text += `${i + 1}. *${item.name}*\n   • O'lcham: ${item.selectedSize}\n   • Rang: ${item.selectedColor}\n   • Soni: ${item.quantity} dona x ${item.price.toLocaleString()} so'm\n`;
    });

    text += `\n💰 *Jami summa:* ${cartTotal.toLocaleString()} so'm`;

    const url = `https://t.me/${currentBranch.telegramUsername}?text=${encodeURIComponent(text)}`;

    // Clear cart & close drawer
    setCart(cart.filter(i => i.branch_id !== selectedBranchId));
    setIsCartOpen(false);
    setCheckoutName('');
    setCheckoutPhone('');

    window.open(url, '_blank');
  };

  // Admin Auth Logic
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'owner@zumrad.uz' && loginPassword === 'admin123') {
      setAdminUser({ role: 'owner', branch_id: 'all', name: 'Bosh Egalik (Owner)' });
      setLoginError('');
    } else if (loginEmail === 'staff1@zumrad.uz' && loginPassword === 'staff123') {
      setAdminUser({ role: 'staff', branch_id: '1', name: '1-Filial Xodimi' });
      setLoginError('');
    } else if (loginEmail === 'staff2@zumrad.uz' && loginPassword === 'staff123') {
      setAdminUser({ role: 'staff', branch_id: '2', name: '2-Filial Xodimi' });
      setLoginError('');
    } else {
      setLoginError("Login yoki parol noto'g'ri!");
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!editingProductData.name || !editingProductData.price) return;

    if (editingProductData.id) {
      setProducts(products.map(p => p.id === editingProductData.id ? { ...editingProductData, price: Number(editingProductData.price) } : p));
      triggerToast("Mahsulot yangilandi!");
    } else {
      const newP = {
        ...editingProductData,
        id: `p_${Date.now()}`,
        price: Number(editingProductData.price),
        createdAt: new Date().toISOString().split('T')[0],
        isNew: true
      };
      setProducts([newP, ...products]);
      triggerToast("Yangi mahsulot qo'shildi!");
    }
    setIsEditingProduct(false);
  };

  const handleDuplicateProduct = (p) => {
    const dup = {
      ...p,
      id: `p_${Date.now()}`,
      name: `${p.name} (Nusxa)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([dup, ...products]);
    triggerToast("Mahsulot nusxalandi!");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <GlobalStyles />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-full shadow-2xl flex items-center space-x-3 text-xs font-semibold animate-bounce border border-orange-500">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* BRANCH SELECTION MODAL */}
      {showBranchModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 text-center shadow-2xl border border-gray-100">
            <ZumradLogo className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-oswald uppercase text-black mb-2">
              QAYSI FILIALGA BUYURTMA BERMOQCHISIZ?
            </h2>
            <p className="text-gray-500 text-xs mb-6">
              Har bir filialimizning mahsulot assortimenti va narxlari alohida boshqariladi.
            </p>
            <div className="space-y-3">
              {Object.values(branches).map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleSelectBranch(b.id)}
                  className="w-full flex items-center justify-between p-4 border-2 border-gray-100 rounded-2xl hover:border-orange-500 hover:bg-orange-50/50 transition-all text-left group"
                >
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-orange-600 text-sm">{b.name}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{b.address}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="bg-black text-white text-[11px] py-1.5 px-4 text-center font-semibold tracking-wide flex items-center justify-center space-x-2">
          <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">10 YIL</span>
          <span>10 yildan beri sizning uslubingiz va qulayligingiz xizmatida!</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-800 hover:text-orange-500"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth'}); }}
                className="flex items-center space-x-3 group"
              >
                <ZumradLogo className="h-10 w-10 transition-transform group-hover:scale-105" />
                <div className="text-left">
                  <span className="text-2xl font-bold font-oswald tracking-tight block leading-none text-black">
                    ZUMRAD <span className="accent-orange-text">SHOP</span>
                  </span>
                  <span className="text-[9px] tracking-widest text-gray-400 uppercase font-semibold">Ayollar poyabzali</span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 font-bold text-xs uppercase tracking-wider text-gray-700">
              <button 
                onClick={() => setActiveTab('home')} 
                className={`hover:text-orange-500 ${activeTab === 'home' ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : ''}`}
              >
                Bosh sahifa
              </button>
              <button 
                onClick={() => setActiveTab('catalog')} 
                className={`hover:text-orange-500 ${activeTab === 'catalog' ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : ''}`}
              >
                Katalog
              </button>
              <button 
                onClick={() => setActiveTab('about')} 
                className={`hover:text-orange-500 ${activeTab === 'about' ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : ''}`}
              >
                Biz haqimizda
              </button>
              <button 
                onClick={() => setActiveTab('admin')} 
                className={`hover:text-orange-500 flex items-center space-x-1 ${activeTab === 'admin' ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : ''}`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </nav>

            {/* Branch Switcher & Cart Button */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowBranchModal(true)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-gray-900 px-3 py-2 rounded-full text-xs font-bold transition-all"
              >
                <Building2 className="w-3.5 h-3.5 text-orange-500" />
                <span>{selectedBranchId ? branches[selectedBranchId]?.name.split(' ')[0] : 'Filial'}</span>
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-black text-white rounded-full hover:bg-orange-500 transition-colors shadow-md"
              >
                <ShoppingBag className="w-5 h-5" />
                {branchCart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {branchCart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3 font-bold text-xs uppercase tracking-wider text-gray-800">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2">Bosh sahifa</button>
            <button onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }} className="block w-full text-left py-2">Katalog</button>
            <button onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2">Biz haqimizda & Filiallar</button>
            <button onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-orange-500 flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Admin Panel</span>
            </button>
          </div>
        )}
      </header>

      {/* MAIN VIEWS */}
      <main className="flex-grow">
        
        {/* ==================== HOME VIEW ==================== */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative bg-black text-white py-20 sm:py-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6 text-center lg:text-left">
                    <span className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                      {selectedBranchId ? branches[selectedBranchId]?.name : 'Zumrad Shop'}
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-bold font-oswald uppercase leading-tight">
                      NAFISLIK VA <br /><span className="text-orange-500">QULAYLIK</span> UYG'UNLIGI
                    </h1>
                    <p className="text-gray-300 text-sm max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                      10 yildan beri O'zbekiston ayollarining eng sevimli poyabzal va sumkalar do'koni. Mukammal sifat va eng zamonaviy modellarni biz bilan kashf eting.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <button 
                        onClick={() => setActiveTab('catalog')}
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center space-x-2"
                      >
                        <span>Katalogni Ko'rish</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000" 
                      alt="Hero Showcase" 
                      className="w-full h-96 sm:h-[420px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Categories Grid */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold font-oswald uppercase text-gray-900">KATEGORIYALAR</h2>
                  <p className="text-gray-500 text-xs mt-1">O'zingizga mos bo'limni tanlang</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {categories.map((cat) => (
                    <div 
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setActiveTab('catalog'); }}
                      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="relative h-44 overflow-hidden bg-gray-200">
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-bold font-oswald text-base uppercase text-gray-900 group-hover:text-orange-500 transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Yangi Kelganlar */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-orange-500 text-[11px] font-bold uppercase tracking-widest block">Eng so'nggi kolleksiya</span>
                    <h2 className="text-3xl font-bold font-oswald uppercase text-gray-900">YANGI KELGANLAR</h2>
                  </div>
                  <button 
                    onClick={() => setActiveTab('catalog')}
                    className="text-xs font-bold text-gray-800 hover:text-orange-500 uppercase tracking-wider flex items-center space-x-1"
                  >
                    <span>Barchasi</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar snap-x">
                  {activeBranchProducts.filter(p => p.isNew).map((prod) => (
                    <div 
                      key={prod.id}
                      className="snap-start shrink-0 w-64 sm:w-72 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-64 w-full bg-gray-100 rounded-t-2xl overflow-hidden">
                          <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                          {prod.status === 'sotilgan' && (
                            <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                              Sotilgan
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">{prod.brand}</span>
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{prod.name}</h4>
                          <div className="mt-3 text-base font-extrabold text-black">
                            {prod.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">so'm</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 pt-0">
                        <button 
                          onClick={() => setSelectedProduct(prod)}
                          className="w-full py-2.5 bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-900 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                        >
                          Tafsilotlar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== CATALOG VIEW ==================== */}
        {activeTab === 'catalog' && (
          <div className="py-10 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-8">
                <h1 className="text-3xl font-bold font-oswald uppercase text-gray-900">MAHSULOTLAR KATALOGI</h1>
                <p className="text-xs text-gray-500 mt-1">{branches[selectedBranchId]?.name} mahsulotlari</p>
              </div>

              {/* Filter Panel */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 space-y-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Categories */}
                <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${selectedCategory === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Barchasi
                  </button>
                  {categories.map((cat) => (
                    <button 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${selectedCategory === cat.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.slice(0, visibleCount).map((prod) => (
                  <div key={prod.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="relative h-72 w-full bg-gray-100">
                        <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                        {prod.status === 'sotilgan' && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-red-600 text-white font-bold text-xs uppercase px-4 py-1.5 rounded-full">Sotilgan</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-bold text-orange-500 uppercase">{prod.brand}</span>
                        <h3 className="font-bold text-gray-900 text-base line-clamp-1">{prod.name}</h3>
                        <div className="mt-3 font-extrabold text-lg text-black">{prod.price.toLocaleString()} so'm</div>
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <button 
                        onClick={() => setSelectedProduct(prod)}
                        className="w-full py-3 bg-black hover:bg-orange-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                      >
                        Batafsil
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ==================== ABOUT & CONTACTS VIEW ==================== */}
        {activeTab === 'about' && (
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Biz haqimizda</span>
                <h1 className="text-4xl font-bold font-oswald uppercase text-gray-900 mt-2">FILIALLARIMIZ VA ALOQA</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.values(branches).map((b) => (
                  <div key={b.id} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <span className="bg-orange-500 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full">{b.name}</span>
                    <h3 className="text-2xl font-bold font-oswald text-gray-900 mt-4 mb-6">{b.name}</h3>
                    <div className="space-y-4 text-xs text-gray-700 font-medium">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{b.address}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                        <span>{b.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                        <span>{b.hours}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Send className="w-5 h-5 text-orange-500 shrink-0" />
                        <span>Telegram: @{b.telegramUsername}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== ADMIN PANEL VIEW ==================== */}
        {activeTab === 'admin' && (
          <div className="py-10 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {!adminUser ? (
                /* LOGIN FORM */
                <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mt-6">
                  <div className="text-center mb-6">
                    <ZumradLogo className="h-14 w-14 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold font-oswald uppercase text-gray-900">ADMIN PANEL</h2>
                    <p className="text-xs text-gray-500 mt-1">Boshqaruv tizimiga kirish</p>
                  </div>

                  {loginError && (
                    <div className="mb-4 bg-red-50 text-red-600 text-xs p-3 rounded-xl text-center font-bold">
                      {loginError}
                    </div>
                  )}

                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="owner@zumrad.uz yoki staff1@zumrad.uz"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Parol</label>
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
                    >
                      KIRISH
                    </button>
                  </form>
                </div>
              ) : (
                /* ADMIN DASHBOARD */
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                        {adminUser.role === 'owner' ? 'Owner' : `Staff (${adminUser.branch_id}-filial)`}
                      </span>
                      <h2 className="text-2xl font-bold font-oswald text-gray-900 mt-1">{adminUser.name}</h2>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => {
                          setEditingProductData({
                            id: '',
                            name: '',
                            brand: 'Zumrad',
                            category: 'tuflilar',
                            price: '',
                            sizes: ['36', '37', '38'],
                            colors: ['Qora'],
                            material: '',
                            country: 'Turkiya',
                            description: '',
                            status: 'mavjud',
                            images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800'],
                            branch_id: adminUser.role === 'staff' ? adminUser.branch_id : '1'
                          });
                          setIsEditingProduct(true);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Yangi Mahsulot</span>
                      </button>

                      <button 
                        onClick={() => setAdminUser(null)}
                        className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Chiqish</span>
                      </button>
                    </div>
                  </div>

                  {/* PRODUCTS LIST */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold font-oswald text-gray-900 uppercase mb-4">MAHSULOTLAR TIZIMI</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products
                        .filter(p => adminUser.role === 'owner' || p.branch_id === adminUser.branch_id)
                        .map((prod) => (
                          <div key={prod.id} className="p-4 border border-gray-100 rounded-xl flex space-x-3 bg-gray-50">
                            <img src={prod.images[0]} alt={prod.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                            <div className="flex-grow flex flex-col justify-between text-xs">
                              <div>
                                <span className="text-[9px] font-bold text-orange-600 uppercase">{branches[prod.branch_id]?.name}</span>
                                <h4 className="font-bold text-gray-900 line-clamp-1">{prod.name}</h4>
                                <div className="font-extrabold text-black mt-1">{prod.price.toLocaleString()} so'm</div>
                              </div>
                              <div className="flex items-center space-x-2 pt-2">
                                <button 
                                  onClick={() => handleDuplicateProduct(prod)}
                                  className="p-1 text-gray-500 hover:text-black"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-100">
                <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-500 uppercase">{selectedProduct.brand}</span>
                  <h2 className="text-xl font-bold font-oswald text-gray-900 uppercase mt-1">{selectedProduct.name}</h2>
                  <div className="text-2xl font-extrabold text-black mt-3">
                    {selectedProduct.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">so'm</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">{selectedProduct.description}</p>
                </div>
                <button 
                  disabled={selectedProduct.status === 'sotilgan'}
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
                >
                  Savatga qo'shish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold font-oswald text-gray-900 uppercase">SAVATCHA</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="divide-y divide-gray-100 mt-4">
                {branchCart.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center space-x-4">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-grow text-xs">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <div className="font-extrabold text-black mt-1">{item.price.toLocaleString()} so'm</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {branchCart.length > 0 && (
              <div className="border-t border-gray-100 pt-4 space-y-4">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="font-bold text-gray-700 uppercase">Jami:</span>
                  <span className="text-xl font-extrabold text-orange-500">{cartTotal.toLocaleString()} so'm</span>
                </div>
                <form onSubmit={handleTelegramCheckout} className="space-y-3">
                  <input 
                    type="text" 
                    required 
                    placeholder="Ismingiz" 
                    value={checkoutName} 
                    onChange={(e) => setCheckoutName(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                  />
                  <input 
                    type="tel" 
                    required 
                    placeholder="Telefon raqamingiz" 
                    value={checkoutPhone} 
                    onChange={(e) => setCheckoutPhone(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                  />
                  <button type="submit" className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl text-xs uppercase">
                    Telegram orqali buyurtma berish
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-black text-white pt-12 pb-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          <ZumradLogo className="h-10 w-10 mx-auto mb-3" />
          <p>© 2026 Zumrad Shop. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>

    </div>
  );
}