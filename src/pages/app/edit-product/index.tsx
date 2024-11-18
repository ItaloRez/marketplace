import { useQuery } from '@tanstack/react-query'
import { ArrowLeft02Icon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'

import { getProductById } from '@/api/get-product-by-id'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { ChangeProductStatusButtons } from './components/change-product-status-buttons'
import { EditProductForm } from './components/edit-product-form'

export interface ProductsProps {}

export function EditProduct() {
  const { id } = useParams()

  const { data: productData } = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductById({ id: id! }),
    enabled: !!id,
  })

  return (
    <>
      <Helmet title="Editar Produto" />
      <ScrollArea className="flex h-full">
        <div className="mx-auto max-w-[1120px] flex-1 flex-col space-y-10 py-16 pb-36">
          <div className="space-y-2">
            <Button asChild variant="ghost" className="p-0">
              <Link to="/products">
                <ArrowLeft02Icon className="h-6 w-6" />
                Voltar
              </Link>
            </Button>

            <div className="flex justify-between">
              <div className="space-y-2">
                <h1 className="leading-base font-dm-sans text-grayscale-500 text-2xl font-bold">
                  Editar produto
                </h1>
                <p className="font-poppins leading-base text-grayscale-300 text-sm font-normal">
                  Gerencie as informações do produto cadastrado
                </p>
              </div>

              {productData?.data.product && (
                <ChangeProductStatusButtons
                  id={id!}
                  status={productData!.data.product.status}
                />
              )}
            </div>
          </div>

          {productData?.data.product && (
            <EditProductForm product={productData.data.product} />
          )}
        </div>
      </ScrollArea>
    </>
  )
}
