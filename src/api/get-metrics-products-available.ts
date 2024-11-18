import { api } from '@/lib/axios'

export interface GetMetricsProductsAvailableResponse {
  amount: 0
}

export async function getMetricsProductsAvailable() {
  return await api.get<GetMetricsProductsAvailableResponse>(
    '/sellers/metrics/products/available',
  )
}
