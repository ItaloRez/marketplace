import { api } from '@/lib/axios'

import { Product } from './types/product'

interface UpdateProductBody {
  id: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

interface UpdateProductResponse {
  product: Product
}

export async function updateProduct({
  id,
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: UpdateProductBody) {
  return await api.put<UpdateProductResponse>(`/products/${id}`, {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  })
}
