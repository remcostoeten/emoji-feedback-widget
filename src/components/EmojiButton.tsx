import React from 'react'
import { cn } from '@/core/utils/helpers'
import { EmojiButtonProps } from '@/core/utils/types'
import { it } from 'node:test'

export default function EmojiButton({
	item,
	selectedOpinion,
	onSelect,
}: EmojiButtonProps) {
	return (
		<button
			onClick={() => onSelect(item.text)}
			className={cn(
				'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 emoji',
				selectedOpinion === item.text
					? 'bg-section-light stroke-body-500 dark:bg-body-4900 dark:stroke-body-500 !animate-pulse'
					: 'stroke-body-500 dark:stroke-red-400 hover:bg-card-light hover:stroke-body-500 hover:dark:bg-body-900 hover:dark:stroke-body-500'
			)}
			aria-label={`Select ${item.text} feedback`}
			aria-pressed={selectedOpinion === item.text}
		>
			{item.emoji}{item.c}
		</button>
	)
}
