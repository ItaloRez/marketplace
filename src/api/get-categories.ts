import { api } from '@/lib/axios'

export interface GetCategoriesResponse {
  categories: [
    {
      id: string
      title: string
      slug: string
    },
  ]
}

export async function getCategories() {
  return await api.get<GetCategoriesResponse>(`/categories`)
}
