import { useMutation, useQuery } from '@tanstack/react-query'
import { Logout01Icon } from 'hugeicons-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getSellerProfile } from '@/api/get-seller-profile'
import { signOut } from '@/api/sign-out'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Separator } from './ui/separator'

export function AvatarButton() {
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: getSellerProfile,
  })

  const { mutateAsync: signOutRequest } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="focus-visible:outline-orange-base rounded-lg">
          <Avatar className="border-shape-base h-12 w-12 border-2">
            <AvatarImage src={data?.data.seller?.avatar?.url} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[168px]" side="bottom" align="end">
        <div className="space-y-5 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="border-shape-base border-2">
              <AvatarImage src={data?.data.seller.avatar?.url} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="font-poppins leading-base text-grayscale-300 max-w-[92px] text-sm font-normal">
              {data?.data.seller.name}
            </span>
          </div>
          <Separator />
          <Button
            variant="ghost"
            className="focus-visible:outline-orange-base flex w-full justify-between p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => signOutRequest()}
          >
            Sair
            <Logout01Icon className="h-5 w-5" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
