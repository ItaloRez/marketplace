import { api } from '@/lib/axios'

export interface GetMetricsProductsSoldResponse {
  amount: 0
}

export async function getMetricsProductsSold() {
  return await api.get<GetMetricsProductsSoldResponse>(
    '/sellers/metrics/products/sold',
  )
}
