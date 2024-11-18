import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Marktplace" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster />
    </HelmetProvider>
  )
}
