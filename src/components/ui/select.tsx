import * as SelectPrimitive from '@radix-ui/react-select'
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
  Tick02Icon,
} from 'hugeicons-react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Button } from './button'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> & {
  clearInput: () => void
  label?: string
  leftIcon?: React.ReactNode
  isFilled?: boolean
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    { className, children, leftIcon, label, clearInput, isFilled, ...props },
    ref,
  ) => {
    return (
      <div className={cn('w-full flex-1', label && 'pt-4')}>
        <div className="relative w-full">
          <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
              'group',
              'bg-shape-white flex h-10 w-full items-center justify-between py-3.5 [&>span]:line-clamp-1',
              'font-poppins leading-base text-grayscale-400 text-base font-normal md:text-sm',
              'border-grayscale-100 border-b',
              'data-[placeholder]:text-grayscale-200',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'focus:border-grayscale-400 focus:outline-none',
              leftIcon && 'pl-8',
              className,
            )}
            {...props}
          >
            {children}

            <div
              className={cn(
                'group-focus:text-orange-base text-grayscale-200 absolute left-0 top-0 mt-2',
                'group-data-[state=open]:text-orange-base',
                isFilled && 'text-orange-base',
              )}
            >
              {leftIcon}
            </div>

            <label
              htmlFor={props.id}
              className={cn(
                'before:group-focus:text-orange-base',
                'before:content-[attr(data-placeholder)]',
                'before:group-data-[state=open]:text-orange-base',
                'before:font-poppins before:leading-base before:text-grayscale-300 before:text-xs before:uppercase',
                'before:absolute before:-top-4 before:left-0',
              )}
              data-placeholder={label}
            />

            <SelectPrimitive.Icon asChild>
              <>
                <ArrowDown01Icon className="text-grayscale-300 h-6 w-6 opacity-50 group-data-[state=open]:hidden" />
                <ArrowUp01Icon className="text-grayscale-300 hidden h-6 w-6 opacity-50 group-data-[state=open]:block" />
              </>
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          {isFilled && (
            <Button
              variant="ghost"
              className="text-grayscale-300 bg-shape-base hover:bg-grayscale-200 hover:text-shape-white absolute right-6 top-0 mt-2 rounded-full p-1"
              onClick={clearInput}
              disabled={props.disabled}
            >
              <Cancel01Icon className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    )
  },
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    {/* TODO: trocar icone */}
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

// TODO: Trocar estile e icone
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'group',
      'relative flex w-full cursor-default select-none items-center rounded-sm p-4 text-sm outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'justify-between',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

    <span className="flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Tick02Icon className="text-orange-base h-6 w-6" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
