// API Response Types
export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  error?: string
}

// Category Types
export interface Category {
  id: number
  name: string
  code: string
  slug?: string
  parent_id?: number
  parent_code?: string
  sequence?: number
  is_deleted: boolean
  is_active: boolean
  image_url?: string
  created_at: string
  updated_at: string
}

// Product Types
export interface Product {
  id: number
  title: string
  description: string
  price: number
  category_id: number
  category_code: string
  user_id: number
  product_code: string
  showcase_image?: string
  city?: string
  district?: string
  is_active: boolean
  is_deleted: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  // Relations
  category?: Category
  user?: User
  images?: ProductImage[]
}

// User Types
export interface User {
  id: number
  name: string
  email: string
  phone?: string
  avatar?: string
  city?: string
  district?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Product Image Types
export interface ProductImage {
  id: number
  product_id: number
  image_url: string
  is_primary: boolean
  sequence: number
  created_at: string
}

// Filter Types
export interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  city?: string
  district?: string
  search?: string
  limit?: number
  page?: number
}

// Pagination Types
export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

// Store State Types
export interface LoadingState {
  loading: boolean
  error: string | null
}

// Navigation Types
export interface NavItem {
  title: string
  to: string
  icon?: string
  children?: NavItem[]
}

// SEO Types
export interface SEOData {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
}
