'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import React from 'react'
import { Toaster } from 'sonner'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/core/i18n'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<I18nextProvider i18n={i18n}>
			{children}
			<SpeedInsights />
			<Toaster position="top-right" />
			<Analytics />
		</I18nextProvider>
	)
}
