'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useLocalStorage from '@/core/hooks/useLocalStorage'

import { toast } from 'sonner'
import { CookieIcon, SettingsIcon, TrashIcon } from '../Icons'
import { useTranslation } from 'react-i18next'

export default function ActionsMenu() {
	const { t } = useTranslation()
	const [, setStoredValue] = useLocalStorage(
		'feedbackHidden',
		'feedbackHidden'
	)

	const handleClearStorage = () => {
		setStoredValue('')
		window.localStorage.clear()
		toast(t('cacheCleared'))
		window.location.reload()
	}

	const handleClearCache = () => {
		alert(t('clearCache'))
	}

	const handleManageCookies = () => {
		alert(t('manageCookies'))
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<SettingsIcon className="h-5 w-5 text-card-light" />
					<span className="sr-only">{t('actions.utillities')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[220px]">
				<DropdownMenuItem>
					<Button variant="actions" onClick={handleClearStorage}>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<TrashIcon className="h-4 w-4" />
								<span>{t('clearLocalStorage')}</span>
							</div>
						</div>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<Button variant="actions" onClick={handleClearCache}>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<TrashIcon className="h-4 w-4" />
								<span>{t('clearCache')}</span>
							</div>
						</div>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem disabled>
					<Button variant="actions" onClick={handleManageCookies}>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<CookieIcon className="h-4 w-4" />
								<span>{t('manageCookies')}</span>
							</div>
						</div>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
