import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  ImageUploadIcon,
  Mail02Icon,
  UserIcon,
} from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerSeller } from '@/api/register-seller'
import { uploadAttachment } from '@/api/upload-attachment'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const schema = z
  .object({
    name: z
      .string({
        required_error: 'Nome é obrigatório',
      })
      .min(1, {
        message: 'Nome inválido',
      }),
    phone: z
      .string({
        required_error: 'Telefone é obrigatório',
      })
      .min(1, {
        message: 'Telefone inválido',
      }),
    email: z
      .string({
        required_error: 'E-mail é obrigatório',
      })
      .email({
        message: 'E-mail inválido',
      }),
    password: z
      .string({
        required_error: 'Senha é obrigatória',
      })
      .min(1, {
        message: 'Senha inválida',
      }),
    passwordConfirmation: z
      .string({
        required_error: 'Confirmação de senha é obrigatória',
      })
      .min(1, {
        message: 'Confirmação de senha inválida',
      }),
    avatarId: z.string().optional(),
    file: z
      .array(z.instanceof(File))
      .max(1, {
        message: 'Selecione apenas uma imagem',
      })
      .optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['passwordConfirmation'],
  })

type RegisterForm = z.infer<typeof schema>

export function Register() {
  const navigate = useNavigate()

  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: registerSeller,
    onSuccess: () => {
      navigate('/sign-in')
      toast.success('Cadastro realizado com sucesso')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutateAsync: uploadAttachmentRequest } = useMutation({
    mutationFn: uploadAttachment,
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const form = useForm<RegisterForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      avatarId: '',
    },
  })

  const { handleSubmit, watch } = form

  const handleRegisterSeller = async ({
    name,
    phone,
    email,
    password,
    passwordConfirmation,
    avatarId,
    file,
  }: RegisterForm) => {
    if (file?.length && file.length > 0) {
      const files = new FormData()
      files.append('files', file[0])
      const { data } = await uploadAttachmentRequest({ files })
      avatarId = data.attachments[0].id
    }

    await register({
      name,
      phone,
      email,
      password,
      passwordConfirmation,
      avatarId,
    })
  }

  const handleNavigateToSignIn = () => {
    navigate('/sign-in')
  }

  const watchFile = watch('file')
  const selectedImage =
    watchFile?.length &&
    watchFile.length > 0 &&
    URL.createObjectURL(watchFile[0])

  return (
    <>
      <Helmet title="Login" />
      <div className="h-full p-6">
        <ScrollArea className="h-full">
          <div className="bg-shape-white py-18 h-full rounded-lg px-20">
            <Form {...form}>
              <form
                className="space-y-12"
                onSubmit={handleSubmit(handleRegisterSeller)}
              >
                <div>
                  <h1 className="leading-base font-dm-sans mb-2 text-2xl font-bold">
                    Crie sua conta
                  </h1>
                  <p className="font-poppins leading-base text-grayscale-300 text-sm font-normal">
                    Informe os seus dados pessoais e de acesso
                  </p>
                </div>

                <div className="space-y-12">
                  <div className="space-y-5">
                    <p className="font-dm-sans leading-base text-grayscale-500 text-lg font-bold">
                      Perfil
                    </p>
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <label htmlFor="file">
                            <div
                              className={cn(
                                'text-orange-base bg-shape-base hover:text-shape-white hover:bg-grayscale-500 group relative inline-block cursor-pointer overflow-hidden rounded-lg',
                                !selectedImage && 'p-11 hover:opacity-20',
                              )}
                            >
                              {selectedImage ? (
                                <>
                                  <img
                                    src={selectedImage}
                                    alt="Imagem de perfil"
                                    className="h-[120px] w-[120px] object-cover"
                                  />
                                  <div className="absolute inset-0 group-hover:bg-black group-hover:opacity-50" />
                                  <div className="absolute inset-0 hidden items-center justify-center group-hover:flex">
                                    <ImageUploadIcon className="h-8 w-8" />
                                  </div>
                                </>
                              ) : (
                                <ImageUploadIcon className="h-8 w-8" />
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
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Seu nome completo"
                              leftIcon={<UserIcon className="h-6 w-6" />}
                              label="Nome"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="(00) 00000-0000"
                              label="Telefone"
                              leftIcon={<CallIcon className="h-6 w-6" />}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-5">
                    <p className="font-dm-sans leading-base text-grayscale-500 text-lg font-bold">
                      Acesso
                    </p>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Seu e-mail de acesso"
                              label="E-mail"
                              leftIcon={<Mail02Icon className="h-6 w-6" />}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Senha de acesso"
                              label="Senha"
                              leftIcon={<AccessIcon className="h-6 w-6" />}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="passwordConfirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              label="Confirmação de senha"
                              placeholder="Confirme a senha"
                              leftIcon={<AccessIcon className="h-6 w-6" />}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    className="flex w-full justify-between"
                    type="submit"
                    disabled={isPending}
                  >
                    Cadastrar
                    <ArrowRight02Icon className="h-6 w-6" />
                  </Button>
                </div>
              </form>
            </Form>

            <div className="mt-20 space-y-5">
              <p className="font-poppins leading-base text-grayscale-300 text-base font-normal">
                Já tem uma conta?
              </p>
              <Button
                variant="outline"
                className="flex w-full justify-between"
                onClick={handleNavigateToSignIn}
              >
                Acessar
                <ArrowRight02Icon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
