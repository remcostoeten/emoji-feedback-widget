import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@core/utils/helpers'

const badgeVariants = cva(
	'inline-flex items-center rounded-md border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300',
	{
		variants: {
			variant: {
				default:
					'text-zinc-950 dark:text-zinc-50 bg-section !border-positive text-white shadow-xl',
				secondary:
					'border-transparent bg-zinc-200 !border-positive text-zinc-50 shadow hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80',
				destructive:
					'border-transparent bg-red-500 text-zinc-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80',
				outline:
					'text-zinc-950 dark:text-zinc-50 bg-section border-[#454545] text-white shadow-xl shadow-red-400/10',
				positive:
					'badge-positive border-transparent text-zinc-50 shadow hover:bg-green-500/80',
				negative:
					'badge-negative border-transparent text-zinc-50 shadow bg-red-500/10 hover:bg-red-500/80  ',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	)
}

export { Badge, badgeVariants }
