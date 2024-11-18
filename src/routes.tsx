import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { EditProduct } from './pages/app/edit-product'
import { NewProduct } from './pages/app/new-product'
import { Products } from './pages/app/products'
import { Register } from './pages/auth/register'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/products', element: <Products /> },
      { path: '/new-product', element: <NewProduct /> },
      { path: '/edit-product/:id', element: <EditProduct /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/register', element: <Register /> },
    ],
  },
])
