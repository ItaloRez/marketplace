import { api } from '@/lib/axios'

import { Seller } from './types/seller'

interface RegisterSellerBody {
  name: string
  phone: string
  email: string
  avatarId?: string
  password: string
  passwordConfirmation: string
}

interface RegisterSellerResponse {
  seller: Seller
}

export async function registerSeller({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: RegisterSellerBody) {
  return await api.post<RegisterSellerResponse>('/sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation,
  })
}
