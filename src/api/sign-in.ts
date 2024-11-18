import { api } from '@/lib/axios'

interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody) {
  return await api.post('/sellers/sessions', { email, password })
}
