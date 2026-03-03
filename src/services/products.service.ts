import { api } from '@/lib/api'
import type { Product, PagedResult, CreateProductDTO, UpdateProductDTO } from '@/types/product'

const BASE = '/products'

export const productsService = {
  getAll:   (): Promise<Product[]>  => api.get<PagedResult<Product>>(BASE).then((r) => r.data.items),
  getById:  (id: string)            => api.get<Product>(`${BASE}/${id}`).then((r) => r.data),
  create:   (data: CreateProductDTO)             => api.post<Product>(BASE, data).then((r) => r.data),
  update:   (id: string, data: UpdateProductDTO) => api.put<Product>(`${BASE}/${id}`, data).then((r) => r.data),
  remove:   (id: string)            => api.delete(`${BASE}/${id}`).then(() => undefined),
}
