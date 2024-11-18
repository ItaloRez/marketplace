import { api } from '@/lib/axios'

export interface GetMetricsSellerViewsLast30DaysResponse {
  viewsPerDay: [
    {
      date: string
      amount: number
    },
  ]
}
export async function getMetricsSellerViewsLast30Days() {
  return await api.get<GetMetricsSellerViewsLast30DaysResponse>(
    '/sellers/metrics/views/days',
  )
}
