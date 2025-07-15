export const useSampleData = () => {
  const generateSampleProducts = () => {
    return [
      {
        id: 1,
        title: 'iPhone 16 Pro',
        price: 1800,
        image: '/images/products/iphone-16-pro.jpg',
        featured: true,
        isFavorite: false,
        installment: '12',
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date()
      },
      {
        id: 2,
        title: 'TEMİZ İPHONE 8 PLUS',
        price: 5900,
        image: '/images/products/iphone-8-plus.jpg',
        featured: false,
        isFavorite: true,
        installment: null,
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date()
      },
      {
        id: 3,
        title: 'nostalji tuşlu telefon',
        price: 10000,
        image: '/images/products/nostalgic-phones.jpg',
        featured: true,
        isFavorite: false,
        installment: '12',
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 gün önce
      },
      {
        id: 4,
        title: 'Yurtiçi iPhone 14 Pro Max 256 GB',
        price: 39500,
        image: '/images/products/iphone-14-pro-max.jpg',
        featured: false,
        isFavorite: false,
        installment: null,
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 gün önce
      },
      {
        id: 5,
        title: 'Acil 13 Garantili',
        price: 22500,
        image: '/images/products/iphone-13.jpg',
        featured: false,
        isFavorite: false,
        installment: null,
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 gün önce
      },
      {
        id: 6,
        title: 'Sennheiser Momentum TW4 - Siyah',
        price: 16700,
        image: '/images/products/sennheiser-tw4.jpg',
        featured: true,
        isFavorite: false,
        installment: '12',
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date()
      },
      {
        id: 7,
        title: 'DJI Osmo Mobile 6 Siyah Gimbal',
        price: 5250,
        image: '/images/products/dji-osmo.jpg',
        featured: false,
        isFavorite: false,
        installment: '12',
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 gün önce
      },
      {
        id: 8,
        title: 'İPHONE 11 128 GB',
        price: 13000,
        image: '/images/products/iphone-11.jpg',
        featured: false,
        isFavorite: false,
        installment: null,
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date()
      },
      {
        id: 9,
        title: 'Samsung Galaxy S23 ultra',
        price: 39000,
        image: '/images/products/samsung-s23-ultra.jpg',
        featured: false,
        isFavorite: false,
        installment: null,
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date()
      },
      {
        id: 10,
        title: 'Samsung Galaxy S24 Plus 12|256',
        price: 34000,
        image: '/images/products/samsung-s24-plus.jpg',
        featured: false,
        isFavorite: false,
        installment: null,
        secureWallet: true,
        freeShipping: true,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date()
      },
      {
        id: 11,
        title: 'İPHONE 11 TR cihazı Garantili Fatura',
        price: 13000,
        image: '/images/products/iphone-11-tr.jpg',
        featured: false,
        isFavorite: false,
        installment: null,
        secureWallet: true,
        freeShipping: true,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date()
      },
      {
        id: 12,
        title: 'airpords pro - Sıfır - Jiletinli',
        price: 2750,
        image: '/images/products/airpods-pro.jpg',
        featured: false,
        isFavorite: false,
        installment: '12',
        secureWallet: true,
        freeShipping: false,
        location: 'İstanbul, Beyoğlu',
        createdAt: new Date()
      }
    ]
  }

  const generateSampleCategories = () => {
    return [
      { id: '1', name: 'Telefon', count: 109728 },
      { id: '2', name: 'iPhone iOS Telefon', count: 109728 },
      { id: '3', name: 'Android Telefon', count: 103933 },
      { id: '4', name: 'Telefon Aksesuarları', count: 47221 },
      { id: '5', name: 'Diğer Cep Telefonları', count: 13551 },
      { id: '6', name: 'Telefon Yedek Parçaları', count: 13332 },
      { id: '7', name: 'Telsiz & Masaüstü Telefon', count: 6071 }
    ]
  }

  return {
    generateSampleProducts,
    generateSampleCategories
  }
} 