import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ImageUploadIcon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createProduct } from '@/api/create-product'
import { getCategories } from '@/api/get-categories'
import { GetProductsResponse } from '@/api/get-products'
import { uploadAttachment } from '@/api/upload-attachment'
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
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/react-query'
import { cn } from '@/lib/utils'

export interface ProductsProps {}

const formSchema = z
  .object({
    title: z
      .string({
        required_error: 'O título é obrigatório',
      })
      .min(1, 'O título é obrigatório'),
    categoryId: z
      .string({
        required_error: 'A categoria é obrigatória',
      })
      .min(1, 'A categoria é obrigatória'),
    description: z
      .string({
        required_error: 'A descrição é obrigatória',
      })
      .min(1, 'A descrição é obrigatória'),
    price: z.coerce.number({
      invalid_type_error: 'O preço é obrigatório',
      required_error: 'O preço é obrigatório',
    }),
    attachments: z.array(z.instanceof(File)).min(1, {
      message: 'A imagem é obrigatória',
    }),
  })
  .transform((data) => ({
    ...data,
    priceInCents: data.price * 100,
  }))

type FormValues = z.infer<typeof formSchema>

export function NewProduct() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      categoryId: '',
      description: '',
      price: undefined,
      attachments: [],
    },
  })

  const { handleSubmit, watch } = form

  const handleCreateProduct = async ({
    attachments,
    categoryId,
    description,
    priceInCents,
    title,
  }: FormValues) => {
    let attachmentsIds: string[] = []
    if (attachments?.length && attachments.length > 0) {
      const files = new FormData()
      files.append('files', attachments[0])
      const { data } = await uploadAttachmentRequest({ files })
      attachmentsIds = data.attachments.map((attachment) => attachment.id)
    }

    createProductRequest({
      title,
      categoryId,
      description,
      priceInCents,
      attachmentsIds,
    })
  }

  const { mutateAsync: createProductRequest, isPending: isCreating } =
    useMutation({
      mutationFn: createProduct,
      onSuccess: (data) => {
        toast.success('Produto criado com sucesso')

        const products = queryClient.getQueryData<{
          data: GetProductsResponse
        }>(['products', {}])

        queryClient.setQueryData(['products', {}], {
          data: {
            products: [data.data.product, ...(products?.data.products || [])],
          },
        })

        return { previousProducts: products?.data.products }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const { mutateAsync: uploadAttachmentRequest, isPending: isUploading } =
    useMutation({
      mutationFn: uploadAttachment,

      onError: (error) => {
        toast.error(error.message)
      },
    })

  const watchFile = watch('attachments')
  const selectedImage =
    watchFile?.length &&
    watchFile.length > 0 &&
    URL.createObjectURL(watchFile[0])

  const { data: categoriesResponse } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const categoriesOptions = categoriesResponse?.data.categories || []

  return (
    <>
      <Helmet title="Novo Produto" />
      <ScrollArea className="flex h-full">
        <div className="mx-auto max-w-[1120px] flex-1 flex-col space-y-10 py-16 pb-36">
          <div className="space-y-2">
            <h1 className="leading-base font-dm-sans text-grayscale-500 text-2xl font-bold">
              Novo produto
            </h1>
            <p className="font-poppins leading-base text-grayscale-300 text-sm font-normal">
              Cadastre um produto para venda no marketplace
            </p>
          </div>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(handleCreateProduct)}>
              <div className="grid grid-cols-[1.5fr_3fr] gap-6">
                <div>
                  <FormField
                    control={form.control}
                    name="attachments"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="file">
                          <div
                            className={cn(
                              'text-orange-base bg-shape-base hover:text-shape-white hover:bg-grayscale-500 group relative cursor-pointer overflow-hidden rounded-lg',
                              'flex flex-col items-center justify-center gap-4',
                              !selectedImage && 'py-32 hover:opacity-20',
                            )}
                          >
                            {selectedImage ? (
                              <>
                                <img
                                  src={selectedImage}
                                  alt="Imagem de perfil"
                                  className="h-full object-cover"
                                />
                                <div className="absolute inset-0 group-hover:bg-black group-hover:opacity-50" />
                                <div className="absolute inset-0 hidden items-center justify-center group-hover:flex">
                                  <ImageUploadIcon className="h-8 w-8" />
                                </div>
                              </>
                            ) : (
                              <>
                                <ImageUploadIcon className="h-8 w-8" />
                                <span className="text-grayscale-300 font-poppins leading-base group-hover:text-shape-white max-w-[160px] text-center text-sm font-normal">
                                  Selecione a imagem do produto
                                </span>
                              </>
                            )}
                          </div>
                        </label>
                        <FormControl>
                          <Input
                            id="file"
                            placeholder="shadcn"
                            type="file"
                            onChange={(e) => {
                              const filesArray = Array.from(
                                e.target.files || [],
                              )
                              field.onChange(filesArray)
                            }}
                            className="hidden"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                  <p className="leading-base font-dm-sans text-grayscale-500 text-lg">
                    Dados do produto
                  </p>

                  <div className="mt-8 space-y-5">
                    <div className="flex w-full gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                label="Título"
                                placeholder="Nome do produto"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                label="Valor"
                                placeholder="0,00"
                                leftIcon={
                                  <p className="font-poppins leading-base">
                                    R$
                                  </p>
                                }
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              label="Descrição"
                              placeholder="Escreva detalhes sobre o produto, tamanho, características"
                              className="h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                isFilled={!!field.value}
                                clearInput={() => field.onChange(null)}
                                label="Categoria"
                              >
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoriesOptions.map((option) => (
                                <SelectItem
                                  key={option.id}
                                  value={option.id}
                                  className={cn(
                                    'font-poppins leading-base text-grayscale-300 cursor-pointer text-sm font-normal',
                                    option.id === field.value &&
                                      'text-orange-base',
                                  )}
                                >
                                  {option.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-10 flex gap-3">
                    <Button
                      className="w-full"
                      type="button"
                      variant="outline"
                      asChild
                    >
                      <Link to="/products">Cancelar</Link>
                    </Button>
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isCreating || isUploading}
                    >
                      Salvar e publicar
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </ScrollArea>
    </>
  )
}
