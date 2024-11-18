import { api } from '@/lib/axios'

export async function signOut() {
  return await api.post('/sign-out')
}
