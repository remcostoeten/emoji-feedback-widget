'use client'

import { TooltipProvider } from '@/components/ui'
import i18n from '@/core/i18n'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from 'sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<I18nextProvider i18n={i18n}>
			<TooltipProvider>
				{children}
				<Toaster position="top-right" />
			</TooltipProvider>
		</I18nextProvider>
	)
}
