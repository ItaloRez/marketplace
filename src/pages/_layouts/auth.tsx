import { Outlet } from 'react-router-dom'

export interface AuthProps {}

export function AuthLayout() {
  return (
    <div className="bg-shape-background flex h-screen overflow-hidden">
      <div className="flex-1">
        <img
          src="/login-bg.png"
          alt="Caixa com icones em volta exibindo os beneficios do software"
          className="h-full w-full"
        />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
