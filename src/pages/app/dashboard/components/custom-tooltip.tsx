import { UserMultipleIcon } from 'hugeicons-react'
import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { getPayloadConfigFromPayload, useChart } from '@/components/ui/chart'
import { cn } from '@/lib/utils'

const CustomTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: 'line' | 'dot' | 'dashed'
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      label,
      labelFormatter,
      labelClassName,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || 'value'}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn('font-medium', labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn('font-medium', labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot'

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background p-3 text-xs shadow-xl',
          className,
        )}
      >
        <span className="font-poppins leading-base text-grayscale-400 text-[0.625rem] font-normal">
          {!nestLabel ? tooltipLabel : null}
        </span>
        <div className="grid gap-1.5">
          {payload.map((item) => {
            return (
              <div
                key={item.dataKey}
                className={'flex w-full flex-wrap items-stretch gap-2'}
              >
                <UserMultipleIcon className="text-grayscale-300 h-4 w-4" />

                <span className="font-poppins leading-base text-grayscale-300 text-xs">
                  {item.value!.toLocaleString()} visitantes
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
CustomTooltipContent.displayName = 'CustomTooltipContent'

export { CustomTooltipContent }
