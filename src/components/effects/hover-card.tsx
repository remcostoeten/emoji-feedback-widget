// @ts-nocheck
'use client'

import React, { useCallback, useEffect } from 'react'
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	animate,
} from 'framer-motion'

import { cn } from '@/core/utils/helpers'

export interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
	gradientSize?: number
	gradientColor?: string
	gradientOpacity?: number
}

export default function HoverCard({
	children,
	className,
	gradientSize = 200,
	gradientColor = '#262626',
	gradientOpacity = 0.8,
}: HoverCardProps) {
	const mouseX = useMotionValue(-gradientSize)
	const mouseY = useMotionValue(-gradientSize)

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const { left, top } = e.currentTarget.getBoundingClientRect()
			mouseX.set(e.clientX - left)
			mouseY.set(e.clientY - top)
		},
		[mouseX, mouseY]
	)

	const handleMouseLeave = useCallback(() => {
		mouseX.set(-gradientSize)
		mouseY.set(-gradientSize)
	}, [mouseX, mouseY, gradientSize])

	useEffect(() => {
		mouseX.set(-gradientSize)
		mouseY.set(-gradientSize)
	}, [mouseX, mouseY, gradientSize])

	return (
		<div
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={cn('vercel-card relative', className)}
		>
			<div className="relative z-10">{children}</div>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-0"
				style={{
					background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
					opacity: gradientOpacity,
				}}
			/>
		</div>
	)
}
