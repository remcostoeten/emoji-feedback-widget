import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
	ConfirmContext,
	ConfirmDialogProps,
	ConfirmOptions,
} from './ui/confirm-dialog'
import { ConfirmDialogProviderProps } from './ui/confirm-dialog/types'

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	isOpen,
	onOpenChange,
	config: {
		title,
		description,
		cancelButton,
		confirmButton,
		confirmText = 'confirm',
		cancelText = 'cancel',
		icon,
		customActions,
		alertDialog,
		alertDialogContent,
		alertDialogHeader,
		alertDialogTitle,
		alertDialogDescription,
		alertDialogFooter,
	},
	onConfirm,
	onCancel,
}) => {
	const { t } = useTranslation()

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange} {...alertDialog}>
			<AlertDialogContent {...alertDialogContent}>
				<AlertDialogHeader {...alertDialogHeader}>
					<AlertDialogTitle {...alertDialogTitle}>
						{icon && icon}
						{t(String(title))}
					</AlertDialogTitle>

					<AlertDialogDescription {...alertDialogDescription}>
						{description && t(String(description))}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter {...alertDialogFooter}>
					{customActions ? (
						customActions(onConfirm, onCancel)
					) : (
						<>
							<AlertDialogCancel asChild>
								<Button
									className="text-black"
									onClick={onCancel}
									{...cancelButton}
								>
									{t(cancelText)}
								</Button>
							</AlertDialogCancel>
							<AlertDialogAction asChild>
								<Button onClick={onConfirm} {...confirmButton}>
									{t(confirmText)}
								</Button>
							</AlertDialogAction>
						</>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({
	defaultOptions = {},
	children,
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [options, setOptions] =
		React.useState<Partial<ConfirmOptions>>(defaultOptions)
	const [resolver, setResolver] = React.useState<(value: boolean) => void>(
		() => {}
	)

	const confirm = React.useCallback(
		(options: ConfirmOptions) => {
			setOptions({ ...defaultOptions, ...options })
			setIsOpen(true)
			return new Promise<boolean>((resolve) => {
				setResolver(() => resolve)
			})
		},
		[defaultOptions]
	)

	const handleConfirm = React.useCallback(() => {
		setIsOpen(false)
		resolver(true)
	}, [resolver])

	const handleCancel = React.useCallback(() => {
		setIsOpen(false)
		resolver(false)
	}, [resolver])

	const contextValue = React.useMemo(() => ({ confirm }), [confirm])

	return (
		<ConfirmContext.Provider value={contextValue}>
			{children}

			<ConfirmDialog
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				config={options}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</ConfirmContext.Provider>
	)
}
