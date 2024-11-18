import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AccessIcon, ArrowRight02Icon, Mail02Icon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export interface SignInProps {}

const schema = z.object({
  email: z
    .string({
      required_error: 'E-mail obrigatório',
    })
    .email({
      message: 'E-mail inválido',
    }),
  password: z
    .string({
      required_error: 'Senha obrigatória',
    })
    .min(1, {
      message: 'Senha inválida',
    }),
})

type SignInForm = z.infer<typeof schema>

export function SignIn() {
  const navigate = useNavigate()

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const form = useForm<SignInForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit } = form

  const handleSignIn = async ({ email, password }: SignInForm) => {
    await authenticate({
      email,
      password,
    })
  }

  const handleNavigateToRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="h-full p-6">
        <div className="bg-shape-white py-18 flex h-full flex-col justify-between rounded-lg px-20">
          <Form {...form}>
            <form className="space-y-12" onSubmit={handleSubmit(handleSignIn)}>
              <div>
                <h1 className="font-dm-sans leading-base mb-2 text-2xl font-bold">
                  Acesse sua conta
                </h1>
                <p className="font-poppins leading-base text-grayscale-300 text-sm font-normal">
                  Informe seu e-mail e senha para entrar
                </p>
              </div>

              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Seu e-mail cadastrado"
                          leftIcon={<Mail02Icon className="h-6 w-6" />}
                          label="E-mail"
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
                          placeholder="Sua senha de acesso"
                          leftIcon={<AccessIcon className="h-6 w-6" />}
                          label="Senha"
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
                Acessar
                <ArrowRight02Icon className="h-6 w-6" />
              </Button>
            </form>
          </Form>

          <div className="space-y-5">
            <p className="font-poppins text-grayscale-300 leading-base text-base font-normal">
              Ainda não tem uma conta?
            </p>
            <Button
              variant="outline"
              className="flex w-full justify-between"
              onClick={handleNavigateToRegister}
            >
              Cadastrar
              <ArrowRight02Icon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
