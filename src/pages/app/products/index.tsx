import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { SaleTag02Icon, Search01Icon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getProducts } from '@/api/get-products'
import { ProductStatus } from '@/api/types/product'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

import { ProductCard } from './components/product-card'

export interface ProductsProps {}

const formSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['available', 'sold', 'cancelled', '']).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const status = (searchParams.get('status') as ProductStatus) || undefined

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search,
      status,
    },
  })

  const { handleSubmit } = form

  const { data: productsData } = useQuery({
    queryKey: [
      'products',
      {
        search,
        status,
      },
    ],
    queryFn: () =>
      getProducts({
        search,
        status,
      }),
  })

  const onSearch = ({ search, status }: FormValues) => {
    setSearchParams((state) => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      return state
    })
  }

  const productsArray = productsData?.data.products || []

  const statusOptions: Array<{
    value: ProductStatus
    label: string
  }> = [
    {
      value: 'available',
      label: 'Anunciado',
    },
    {
      value: 'sold',
      label: 'Vendido',
    },
    {
      value: 'cancelled',
      label: 'Desativado',
    },
  ]

  return (
    <>
      <Helmet title="Produtos" />
      <ScrollArea className="flex h-full">
        <div className="mx-auto max-w-[1120px] flex-1 flex-col space-y-10 py-16 pb-36">
          <div className="space-y-2">
            <h1 className="leading-base font-dm-sans text-grayscale-500 text-2xl font-bold">
              Seus produtos
            </h1>
            <p className="font-poppins leading-base text-grayscale-300 text-sm font-normal">
              Acesse gerencie a sua lista de produtos à venda
            </p>
          </div>

          <div className="grid grid-cols-[1.2fr_3fr] gap-6">
            <div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <p className="leading-base font-dm-sans text-grayscale-500 text-lg">
                  Filtrar
                </p>
                <FormProvider {...form}>
                  <form onSubmit={handleSubmit(onSearch)}>
                    <div className="mt-5 space-y-5">
                      <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Pesquisar"
                                leftIcon={<Search01Icon className="h-6 w-6" />}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  leftIcon={
                                    <SaleTag02Icon className="h-6 w-6" />
                                  }
                                  isFilled={!!field.value}
                                  clearInput={() => field.onChange(null)}
                                >
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statusOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className={cn(
                                      'font-poppins leading-base text-grayscale-300 cursor-pointer text-sm font-normal',
                                      option.value === field.value &&
                                        'text-orange-base',
                                    )}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button className="mt-10 w-full" type="submit">
                      Aplicar filtro
                    </Button>
                  </form>
                </FormProvider>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {productsArray.map((product) => (
                <ProductCard
                  img={product.attachments[0]?.url}
                  category={product.category.title}
                  description={product.description}
                  price={product.priceInCents}
                  status={product.status}
                  title={product.title}
                  id={product.id}
                  key={product.id}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}
