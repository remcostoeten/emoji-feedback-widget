'use client'

import { formAnimation } from '@/core/config/motion-config'
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { motion } from 'framer-motion'
import { useRef, useTransition } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import CoolButton from '../CoolButton'
import { BorderBeam } from '../shells/BorderEffects'

export function FeedbackForm(): JSX.Element {
	const { t } = useTranslation()
	const {
		selectedOpinion,
		storedEmoji,
		feedbackText,
		isTextareaFocused,
		setFeedbackText,
		setTextareaFocus,
		submitFeedback,
		setAnimatingOut,
		resetForm,
	} = useFeedbackStore()
	const [isPending, startTransition] = useTransition()
	const formRef = useRef<HTMLFormElement>(null)

	const isButtonEnabled = feedbackText.trim().length > 0 && !isPending

	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			const success = await submitFeedback(formData)
			if (success) {
				toast.success(t('feedbackSuccess'))
				setTimeout(() => {
					setAnimatingOut(true)
					setTimeout(resetForm, 500)
				}, 1250)
			} else {
				toast.error(t('feedbackError'))
			}
		})
	}

	return (
		<motion.form
			initial={formAnimation.initial}
			animate={formAnimation.animate}
			transition={formAnimation.transition}
			exit={formAnimation.exit}
			ref={formRef}
			action={handleSubmit}
			className="flex flex-col mx-auto w-full px-4 gap-4"
		>
			<input
				type="hidden"
				name="opinion"
				value={selectedOpinion || storedEmoji || ''}
			/>
			<div className="relative">
				<textarea
					name="feedback"
					value={feedbackText}
					onChange={(e) => setFeedbackText(e.target.value)}
					placeholder={t('feedbackPlaceholder')}
					className="min-h-32 w-full rounded-md bg-body focus:bg-section focus:border-none focus:outline-none transition-all duration-700 border border-border px-4 py-4 mt-2"
					aria-label={t('additionalFeedback')}
					onFocus={() => setTextareaFocus(true)}
					onBlur={() => setTextareaFocus(false)}
				/>
				{isTextareaFocused && (
					<BorderBeam size={250} duration={12} delay={9} />
				)}
			</div>
			<div className="flex items-center justify-end w-full">
				<CoolButton
					hasCoolMode={true}
					isNotEmpty={isButtonEnabled}
					onClick={() => formRef.current?.requestSubmit()}
					isLoading={isPending}
				>
					Submit
				</CoolButton>
			</div>
		</motion.form>
	)
}
