import { Link } from 'react-router-dom'

import { ProductStatus } from '@/api/types/product'
import { StatusBadge } from '@/components/status-badge'
import { Badge } from '@/components/ui/badge'

export interface ProductCardProps {
  img: string
  title: string
  price: number
  description: string
  status: ProductStatus
  category: string
  id: string
}

export function ProductCard({
  img,
  title,
  price,
  description,
  status,
  category,
  id,
}: ProductCardProps) {
  const priceString = (price / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <Link
      to={`/edit-product/${id}`}
      className="focus-visible:ring-orange-base rounded-lg focus-visible:outline-none focus-visible:ring"
    >
      <div className="bg-shape-white hover:ring-orange-base rounded-lg p-1 hover:ring">
        <div className="relative h-[144px] overflow-hidden rounded-lg">
          <img src={img} alt="" className="h-full w-full object-cover" />
          <div className="absolute right-2 top-2 flex gap-2">
            <StatusBadge status={status} />
            <Badge className="bg-grayscale-400 hover:bg-grayscale-400 font-poppins leading-base text-shape-white text-[0.625rem] font-normal">
              {category}
            </Badge>
          </div>
        </div>
        <div className="p-3 pb-4">
          <div className="flex justify-between">
            <span className="font-dm-sans leading-base text-grayscale-400 text-base font-semibold">
              {title}
            </span>
            <div className="space-x-1">
              <span className="font-poppins leading-base text-grayscale-500 text-xs">
                R$
              </span>
              <span className="font-dm-sans leading-base text-grayscale-500 text-lg">
                {priceString}
              </span>
            </div>
          </div>
          <p className="font-poppins leading-base text-grayscale-300 mt-2 line-clamp-2 text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
