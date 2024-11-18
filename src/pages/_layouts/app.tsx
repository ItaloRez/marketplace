import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export interface AppLayoutProps {}

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.data?.statusCode
          const code = error.response?.data?.message

          if (status === 401 && code === 'Unauthorized') {
            navigate('/sign-in', { replace: true })
          }

          throw error
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="bg-shape-background h-screen overflow-hidden">
      <Header />
      <Outlet />
    </div>
  )
}
