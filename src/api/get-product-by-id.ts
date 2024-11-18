import { api } from '@/lib/axios'

import { Product } from './types/product'

interface GetProductByIdParams {
  id: string
}

export interface GetProductResponse {
  product: Product
}

export async function getProductById({ id }: GetProductByIdParams) {
  return await api.get<GetProductResponse>(`/products/${id}`)
}
