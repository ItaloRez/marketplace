import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

export interface MenuButtonProps {
  icon: ReactNode
  label: string
  path: string
}

export function MenuButton({ icon, label, path }: MenuButtonProps) {
  const location = useLocation()

  const isActive = location.pathname === path

  return (
    <Button
      variant={location.pathname === '/' ? 'default' : 'ghost'}
      className={cn({
        'font-poppins leading-base text-sm font-normal': true,
        'bg-shape-base text-orange-base hover:bg-shape-background': isActive,
        'bg-shape-background text-grayscale-300 hover:bg-shape-background hover:text-orange-base':
          !isActive,
      })}
      asChild
    >
      <Link to={path}>
        {icon}

        {label}
      </Link>
    </Button>
  )
}
