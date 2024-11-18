import { ViewIcon, ViewOffSlashIcon } from 'hugeicons-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { useFormField } from './form'

type InputProps = React.ComponentProps<'input'> & {
  leftIcon?: React.ReactNode
  righIcon?: React.ReactNode
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, righIcon, label, ...props }, ref) => {
    const { error } = useFormField()
    const [showPassword, setShowPassword] = React.useState(false)

    const isFilled = !!(
      props.value?.toString() && props.value?.toString().length > 0
    )

    return (
      <div className={cn('w-full flex-1', label && 'pt-4')}>
        <div className="relative w-full">
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            className={cn(
              'peer',
              'font-poppins leading-base text-grayscale-400 text-base font-normal md:text-sm',
              'flex h-10 w-full bg-background py-3 ring-offset-background file:border-0',
              'file:bg-transparent file:text-sm file:font-medium file:text-foreground',
              'placeholder:text-grayscale-200',
              'focus-visible:border-grayscale-400 focus-visible:outline-none',
              'border-grayscale-100 border-b',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'caret-orange-base',
              leftIcon && 'pl-8',
              className,
            )}
            ref={ref}
            {...props}
          />
          <label
            htmlFor={props.id}
            className={cn(
              'before:peer-focus-visible:text-orange-base',
              'before:content-[attr(data-placeholder)]',
              'before:font-poppins before:leading-base before:text-grayscale-300 before:text-xs before:uppercase',
              'before:absolute before:-top-4 before:left-0',
            )}
            data-placeholder={label}
          />

          <div
            className={cn(
              'peer-focus:text-orange-base text-grayscale-200 absolute left-0 top-0 mt-2',
              error && 'text-danger',
              isFilled && 'text-orange-base',
            )}
          >
            {leftIcon}
          </div>

          <div className="text-grayscale-200 absolute right-0 top-0 mt-2">
            {righIcon}
            {type === 'password' && (
              <button
                type="button"
                className="focus-visible:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <ViewOffSlashIcon className="h-6 w-6" />
                ) : (
                  <ViewIcon className="h-6 w-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
