import { api } from '@/lib/axios'

export interface GetMetricsSellerViewsResponse {
  amount: 0
}

export async function getMetricsSellerViews() {
  return await api.get<GetMetricsSellerViewsResponse>('/sellers/metrics/views')
}
