import { api } from '@/lib/axios'

import { Product } from './types/product'

interface CreateProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

interface CreateProductResponse {
  product: Product
}

export async function createProduct({
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: CreateProductBody) {
  return await api.post<CreateProductResponse>('/products', {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  })
}
