import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { Tick02Icon, UnavailableIcon } from 'hugeicons-react'
import { toast } from 'sonner'

import { changeProductStatus } from '@/api/change-product-status'
import { GetProductResponse } from '@/api/get-product-by-id'
import { ProductStatus } from '@/api/types/product'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/react-query'

export interface ChangeProductStatusButtonsProps {
  id: string
  status: ProductStatus
}

export function ChangeProductStatusButtons({
  id,
  status,
}: ChangeProductStatusButtonsProps) {
  const handleStatusChange = (status: ProductStatus) => {
    handleStatusChangeFn({ id, status })
  }

  const updateStatusQuery = (status: ProductStatus) => {
    const cached = queryClient.getQueryData<{ data: GetProductResponse }>([
      'product',
      { id },
    ])

    if (cached) {
      queryClient.setQueryData(['product', { id }], {
        data: {
          product: {
            ...cached.data.product,
            status,
          },
        },
      })
    }

    return { cached }
  }

  const { mutate: handleStatusChangeFn, isPending } = useMutation({
    mutationFn: changeProductStatus,
    onMutate: (variables) => {
      const { cached } = updateStatusQuery(variables.status)

      return { previousStatus: cached?.data.product.status }
    },
    onSuccess: () => {
      toast.success('Status do produto alterado com sucesso')
    },
    onError: async (error, _, context) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      }
      if (context?.previousStatus) {
        updateStatusQuery(context.previousStatus)
      }
    },
  })

  return (
    <div className="flex items-center gap-4">
      {status === 'available' && (
        <>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => handleStatusChange('sold')}
            disabled={isPending}
          >
            <Tick02Icon className="h-6 w-6" />
            Marcar como vendido
          </Button>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => handleStatusChange('cancelled')}
            disabled={isPending}
          >
            <UnavailableIcon className="h-6 w-6" />
            Desativar o anúncio
          </Button>
        </>
      )}

      {status === 'sold' && (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => handleStatusChange('available')}
          disabled={isPending}
        >
          <UnavailableIcon className="h-6 w-6" />
          Desmarcar como vendido
        </Button>
      )}

      {status === 'cancelled' && (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => handleStatusChange('available')}
          disabled={isPending}
        >
          <UnavailableIcon className="h-6 w-6" />
          Desmarcar como desativado
        </Button>
      )}
    </div>
  )
}
