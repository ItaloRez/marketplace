import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ImageUploadIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getCategories } from '@/api/get-categories'
import { Product } from '@/api/types/product'
import { updateProduct } from '@/api/update-product'
import { uploadAttachment } from '@/api/upload-attachment'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { queryClient } from '@/lib/react-query'
import { cn } from '@/lib/utils'

export interface EditProductFormProps {
  product: Product
}

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
    attachments: z.array(z.instanceof(File)),
  })
  .transform((data) => ({
    ...data,
    priceInCents: data.price * 100,
  }))

type FormValues = z.infer<typeof formSchema>

export function EditProductForm({ product }: EditProductFormProps) {
  const { id } = useParams()

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

  const { handleSubmit, watch, reset, setValue } = form

  const handleEditProduct = async ({
    attachments,
    categoryId,
    description,
    title,
    priceInCents,
  }: FormValues) => {
    let attachmentsIds: string[] = []
    if (attachments?.length && attachments.length > 0) {
      const files = new FormData()
      files.append('files', attachments[0])
      const { data } = await uploadAttachmentRequest({ files })
      attachmentsIds = data.attachments.map((attachment) => attachment.id)
    } else {
      attachmentsIds = product.attachments.map((attachment) => attachment.id)
    }

    await updateProductRequest({
      id: id!,
      title,
      categoryId,
      description,
      priceInCents,
      attachmentsIds,
    })
  }

  const watchFile = watch('attachments')
  const selectedImage =
    product.attachments[0]?.url ||
    (watchFile?.length &&
      watchFile.length > 0 &&
      URL.createObjectURL(watchFile[0]))

  const { mutateAsync: updateProductRequest, isPending: isUpdating } =
    useMutation({
      mutationFn: updateProduct,
      onSuccess: (data, variables) => {
        toast.success('Produto atualizado com sucesso')
        queryClient.setQueryData(['product', { id }], {
          data: {
            product: {
              ...product,
              title: variables.title,
              categoryId: variables.categoryId,
              description: variables.description,
              priceInCents: variables.priceInCents,
              attachments: data.data.product.attachments,
              category: data.data.product.category,
            },
          },
        })
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

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        categoryId: product.category.id,
        description: product.description,
        price: product.priceInCents / 100,
      })
    }
  }, [product, reset])

  const { data: categoriesResponse } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const categoriesOptions = categoriesResponse?.data.categories || []

  useEffect(() => {
    if (categoriesResponse?.data.categories.length) {
      setValue('categoryId', product.category.id)
    }
  }, [categoriesResponse, product.category.id, setValue])

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleEditProduct)}>
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
                            className="h-[360px] w-full object-cover"
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
                        const filesArray = Array.from(e.target.files || [])
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
            <div className="flex justify-between">
              <p className="leading-base font-dm-sans text-grayscale-500 text-lg">
                Dados do produto
              </p>

              <StatusBadge status={product.status} />
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex w-full gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  disabled={product.status !== 'available'}
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
                  disabled={product.status !== 'available'}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label="Valor"
                          placeholder="0,00"
                          leftIcon={
                            <p className="font-poppins leading-base">R$</p>
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
                disabled={product.status !== 'available'}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
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
                disabled={product.status !== 'available'}
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
                          disabled={field.disabled}
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
                              option.id === field.value && 'text-orange-base',
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
                disabled={
                  product.status !== 'available' || isUpdating || isUploading
                }
              >
                Salvar e atualizar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
