import { api } from '@/lib/axios'

import { Seller } from './types/seller'

interface GetSellerProfileResponse {
  seller: Seller
}
export async function getSellerProfile() {
  return await api.get<GetSellerProfileResponse>('/sellers/me')
}
