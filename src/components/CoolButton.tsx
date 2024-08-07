import { CoolButtonProps } from '@/core/utils/types'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatedSubscribeButton } from './SubmitBtn'
import { CoolMode } from './effects/CoolMode'

export default function CoolButton({
	onClick,
	isLoading,
	hasCoolMode,
	children,
	isNotEmpty,
}: CoolButtonProps) {
	const { t } = useTranslation()
	const [isClicked, setIsClicked] = useState(false)

	useEffect(() => {
		if (isClicked) {
			const timer = setTimeout(() => {
				onClick()
				setIsClicked(false)
			}, 1500)
			return () => clearTimeout(timer)
		}
	}, [isClicked, onClick])

	const handleClick = () => {
		setIsClicked(true)
	}

	return (
		<>
			<CoolMode>
				<AnimatedSubscribeButton
					buttonColor="#fff"
					buttonTextColor="#000000"
					disabled={!isNotEmpty || isLoading}
					subscribeStatus={false}
					initialText={
						<span className="group inline-flex items-center">
							{t('submitFeedback')}
							<ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</span>
					}
					changeText={
						<div className="flex items-center gap-4">
							<p className="translate-x-12">
								{t('feedbackSent')}
							</p>
							<Image
								src="/rocket.webp"
								alt="rocket"
								className="translate-x-28 absolute"
								width={48}
								height={48}
							/>
						</div>
					}
				/>
			</CoolMode>
		</>
	)
}
