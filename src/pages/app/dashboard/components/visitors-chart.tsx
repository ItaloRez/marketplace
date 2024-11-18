import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { GetMetricsSellerViewsLast30DaysResponse } from '@/api/get-metrics-seller-views-last-30-days'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'

import { CustomTooltipContent } from './custom-tooltip'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

interface VisitorsChartProps {
  sellerViewsPerDay: GetMetricsSellerViewsLast30DaysResponse['viewsPerDay'] | []
}

export function VisitorsChart({ sellerViewsPerDay }: VisitorsChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className={'font-poppins leading-base h-[226px] w-full text-xs'}
    >
      <LineChart
        accessibilityLayer
        data={sellerViewsPerDay}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="12" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => new Date(value).getDate().toString()}
          interval={0}
        />
        <YAxis width={20} tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={<CustomTooltipContent />}
          labelFormatter={(value) =>
            new Date(value).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
            })
          }
        />
        <Line
          dataKey="amount"
          type="natural"
          stroke="var(--blue-base)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
