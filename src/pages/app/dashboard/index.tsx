import { useQuery } from '@tanstack/react-query'
import {
  Calendar04Icon,
  SaleTag02Icon,
  Store04Icon,
  UserMultipleIcon,
} from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'

import { getMetricsProductsAvailable } from '@/api/get-metrics-products-available'
import { getMetricsProductsSold } from '@/api/get-metrics-products-sold'
import { getMetricsSellerViews } from '@/api/get-metrics-seller-views'
import { getMetricsSellerViewsLast30Days } from '@/api/get-metrics-seller-views-last-30-days'

import { MetricsCard } from './components/metrics-card'
import { VisitorsChart } from './components/visitors-chart'

export interface DashboardProps {}

export function Dashboard() {
  const { data: productsSold } = useQuery({
    queryKey: ['metrics', 'sold'],
    queryFn: getMetricsProductsSold,
  })

  const { data: productsAvailabe } = useQuery({
    queryKey: ['metrics', 'available'],
    queryFn: getMetricsProductsAvailable,
  })

  const { data: sellerViews } = useQuery({
    queryKey: ['metrics', 'seller-views'],
    queryFn: getMetricsSellerViews,
  })

  const { data: sellerViewsPerDay } = useQuery({
    queryKey: ['metrics', 'seller-views-per-day'],
    queryFn: getMetricsSellerViewsLast30Days,
  })

  const firstDay = sellerViewsPerDay?.data.viewsPerDay[0]?.date || new Date()
  const lastDay =
    sellerViewsPerDay?.data.viewsPerDay[
      sellerViewsPerDay?.data.viewsPerDay.length - 1
    ]?.date || new Date()

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="mx-auto max-w-[1120px] space-y-10 py-16">
        <div className="space-y-2">
          <h1 className="font-dm-sans text-grayscale-500 leading-base text-2xl font-bold">
            Últimos 30 dias
          </h1>
          <p className="font-poppins text-grayscale-300 leading-base text-sm font-normal">
            Confira as estatísticas da sua loja no último mês
          </p>
        </div>

        <div className="grid grid-cols-[1fr_3fr] gap-6">
          <div className="flex flex-col gap-4">
            <MetricsCard
              icon={<SaleTag02Icon className="text-blue-dark h-10 w-10" />}
              title="Produtos vendidos"
              value={productsSold?.data.amount || 0}
            />

            <MetricsCard
              icon={<Store04Icon className="text-blue-dark h-10 w-10" />}
              title="Produtos anunciados"
              value={productsAvailabe?.data.amount || 0}
            />

            <MetricsCard
              icon={<UserMultipleIcon className="text-blue-dark h-10 w-10" />}
              title="Pessoas visitantes"
              value={sellerViews?.data.amount || 0}
            />
          </div>
          <div className="space-y-7 rounded-lg bg-white p-6 shadow-md">
            <div className="flex w-full items-center justify-between">
              <p className="font-dm-sans leading-base text-grayscale-500 text-lg">
                Visitantes
              </p>
              <div className="flex items-center gap-2">
                <Calendar04Icon className="text-blue-dark h-4 w-4" />
                <span className="font-poppins leading-base text-grayscale-300 text-[0.625rem] font-normal">
                  {new Date(firstDay).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                  })}{' '}
                  -{' '}
                  {new Date(lastDay).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
            </div>
            <VisitorsChart
              sellerViewsPerDay={sellerViewsPerDay?.data.viewsPerDay || []}
            />
          </div>
        </div>
      </div>
    </>
  )
}
