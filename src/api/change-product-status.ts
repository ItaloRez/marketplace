import { api } from '@/lib/axios'

import { Product, ProductStatus } from './types/product'

interface ChangeProductStatusBody {
  id: string
  status: ProductStatus
}

export interface ChangeProductStatusResponse {
  product: Product
}

export async function changeProductStatus({
  id,
  status,
}: ChangeProductStatusBody) {
  return await api.patch<ChangeProductStatusResponse>(
    `/products/${id}/${status}`,
  )
}
