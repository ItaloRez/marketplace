import * as React from 'react'

import { cn } from '@/lib/utils'

type TextareaProps = React.ComponentProps<'textarea'> & {
  label?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className={cn('w-full flex-1', label && 'pt-4')}>
        <div className="relative w-full">
          <textarea
            className={cn(
              'flex min-h-[80px] w-full border-input bg-background ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
              'peer',
              'font-poppins leading-base text-grayscale-400 text-base font-normal md:text-sm',
              'flex h-10 w-full bg-background py-3 ring-offset-background file:border-0',
              'placeholder:text-grayscale-200',
              'focus-visible:border-grayscale-400 focus-visible:outline-none',
              'border-grayscale-100 border-b',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'caret-orange-base',
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
        </div>
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
