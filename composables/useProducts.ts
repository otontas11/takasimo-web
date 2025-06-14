export const useProducts = () => {
  const products = ref([
    {
      id: 1,
      title: 'iPhone 12',
      description: 'Mükemmel durumda iPhone 12',
      image: '/images/iphone12.jpg',
      category: 'Elektronik',
      condition: 'Yeni Gibi'
    },
    {
      id: 2,
      title: 'MacBook Pro',
      description: '2020 Model MacBook Pro',
      image: '/images/macbook.jpg',
      category: 'Elektronik',
      condition: 'İyi'
    }
  ])

  const getProduct = (id: number) => {
    return products.value.find(product => product.id === id)
  }

  const addProduct = (product: any) => {
    products.value.push(product)
  }

  return {
    products,
    getProduct,
    addProduct
  }
} 