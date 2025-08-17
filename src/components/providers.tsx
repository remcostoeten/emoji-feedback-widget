'use client'

import { TooltipProvider } from '@/components/ui'
import i18n from '@/core/i18n'
import { queryClient } from '@/core/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from 'sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
	if (typeof window !== 'undefined') {
		if (
			!process.env.NEXT_PUBLIC_POSTHOG_KEY ||
			!process.env.NEXT_PUBLIC_POSTHOG_HOST
		) {
			console.error(
				'Environment variables NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST are not defined'
			)
		} else {
			posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
				api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
			})
		}
	}

	return (
		<QueryClientProvider client={queryClient}>
			<PostHogProvider client={posthog}>
				<I18nextProvider i18n={i18n}>
					<TooltipProvider>
						{children}
						<Toaster position="top-right" />
					</TooltipProvider>
				</I18nextProvider>
			</PostHogProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
