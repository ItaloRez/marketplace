import { api } from '@/lib/axios'

import { Product, ProductStatus } from './types/product'

interface GetProductsQuery {
  page?: number
  status?: ProductStatus
  search?: string
}

export interface GetProductsResponse {
  products: Product[]
}

export async function getProducts({ page, status, search }: GetProductsQuery) {
  return await api.get<GetProductsResponse>('/products/me', {
    params: {
      page,
      status,
      search,
    },
  })
}
