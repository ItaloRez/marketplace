import { cva } from 'class-variance-authority'

import { ProductStatus } from '@/api/types/product'

import { Badge } from './ui/badge'

export interface StatusBadgeProps {
  status: ProductStatus
}

const statusBadgeVariants = cva(
  'font-poppins leading-base text-shape-white text-[0.625rem] font-normal',
  {
    variants: {
      variant: {
        available: 'bg-blue-dark hover:bg-blue-dark',
        sold: 'bg-success hover:bg-success',
        cancelled: 'bg-grayscale-300 hover:bg-grayscale-300',
      },
    },
    defaultVariants: {
      variant: 'available',
    },
  },
)

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusMap = {
    available: 'Anunciado',
    sold: 'Vendido',
    cancelled: 'Desativado',
  }

  return (
    <Badge className={statusBadgeVariants({ variant: status })}>
      {statusMap[status]}
    </Badge>
  )
}
