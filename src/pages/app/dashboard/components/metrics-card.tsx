import { ReactNode } from 'react'

export interface MetricsCardProps {
  title: string
  value: number
  icon: ReactNode
}

export function MetricsCard({ title, value, icon }: MetricsCardProps) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-lg bg-white p-3 shadow-md">
      <div className="bg-blue-light flex aspect-square h-full items-center justify-center rounded-md">
        {icon}
      </div>
      <div className="max-w-[103px] space-y-2">
        <p className="font-dm-sans leading-base text-grayscale-400 text-2xl">
          {value}
        </p>
        <p className="font-poppins leading-base text-grayscale-300 text-xs font-normal">
          {title}
        </p>
      </div>
    </div>
  )
}
