import { ChartHistogramIcon, PackageIcon, PlusSignIcon } from 'hugeicons-react'
import { Link } from 'react-router-dom'

import { AvatarButton } from './avatar-button'
import { MenuButton } from './menu-button'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="border-shape-base bottom-1 flex w-full items-center justify-between border px-5 py-4">
      <Link to="/">
        <img src="/logo-icon.svg" alt="" className="h-10 w-14" />
      </Link>
      <nav>
        <ul className="flex gap-2">
          <li>
            <MenuButton
              icon={<ChartHistogramIcon className="h-4 w-4" />}
              label="Dashboard"
              path="/"
            />
          </li>
          <li>
            <MenuButton
              icon={<PackageIcon className="h-4 w-4" />}
              label="Produtos"
              path="/products"
            />
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <Button className="px-4 py-[10px]" asChild>
          <Link to="/new-product">
            <PlusSignIcon className="h-5 w-5 text-white" />
            Novo produto
          </Link>
        </Button>
        <AvatarButton />
      </div>
    </header>
  )
}
