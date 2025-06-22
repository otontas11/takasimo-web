export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}

export interface Category {
  id: number
  name: string
  code: string
  parent_code?: string | null
  sequence: number
  is_deleted: boolean
  slug?: string
  description?: string
  image_url?: string
  icon?: string
  created_at: string
  updated_at: string
  images?: CategoryImage[]
}

export interface CategoryImage {
  id: number
  category_id: number
  image_url: string
  alt_text?: string
  is_primary: boolean
}

export interface CategoriesResponse extends ApiResponse<Category[]> {
  data: Category[]
} 