'use client'

import { opinionEmojis, TIME_TO_SHOW_FEEDBACK_FORM } from '@/core/config/config'
import {
	afterEmojiClick,
	formAnimation,
	showFeedbackMotionConfig,
} from '@/core/config/motion-config'
import useLocalStorage from '@/core/hooks/useLocalStorage'
import { submitFeedbackAction } from '@/core/server/feedback'
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import CoolButton from './CoolButton'
import SparklesText from './effects/SparkleText'
import EmojiButton from './EmojiButton'
import { CloseIcon } from './Icons'
import { BorderBeam } from './shells/BorderEffects'

export function Feedback() {
	const { t } = useTranslation()
	const [feedbackHidden, setFeedbackHidden] = useLocalStorage(
		'feedbackHidden',
		false
	)
	const [storedEmoji, setStoredEmoji] = useLocalStorage('selectedEmoji', null)
	const [selectedOpinion, setSelectedOpinion] = useState(null)
	const [isSubmitted, setSubmissionState] = useState(false)
	const [isTextareaFocused, setIsTextareaFocused] = useState(false)
	const [isTextareaVisible, setIsTextareaVisible] = useState(false)
	const [feedbackText, setFeedbackText] = useState('')
	const [isAnimatingOut, setIsAnimatingOut] = useState(false)
	const formRef = useRef(null)
	const sectionRef = useRef(null)
	const [isPending, startTransition] = useTransition()

	const dragY = useMotionValue(0)
	const opacity = useTransform(dragY, [0, 100], [1, 0])

	const isButtonEnabled = feedbackText.trim().length > 0 && !isPending

	const translatedOpinionEmojis = opinionEmojis.map((emoji) => ({
		...emoji,
		text: t(emoji.text),
	}))

	const selectedEmojiObject = translatedOpinionEmojis.find(
		(item) => item.text === storedEmoji
	)
	const selectedEmoji = selectedEmojiObject ? selectedEmojiObject.emoji : ''

	useEffect(() => {
		if (!feedbackHidden && !storedEmoji) {
			const timer = setTimeout(
				() => setFeedbackHidden(false),
				TIME_TO_SHOW_FEEDBACK_FORM
			)
			return () => clearTimeout(timer)
		}
	}, [feedbackHidden, storedEmoji, setFeedbackHidden])

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				handleClose()
			}
		}

		const handleClickOutside = (e) => {
			if (sectionRef.current && !sectionRef.current.contains(e.target)) {
				handleClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	function handleEmojiSelect(opinion) {
		setSelectedOpinion(opinion)
		setIsTextareaVisible(true)
		setStoredEmoji(opinion)
		setFeedbackHidden(true)
		toast(t('emojiReceived'))
	}

	async function handleSubmit(formData: FormData) {
		startTransition(async () => {
			try {
				const result = await submitFeedbackAction(formData)
				if (result.success) {
					setSubmissionState(true)
					toast.success(t('feedbackSuccess'))
					setTimeout(() => {
						setIsAnimatingOut(true)
						setTimeout(resetForm, 500)
					}, 1250)
				} else {
					toast.error(t('feedbackError'))
				}
			} catch (error) {
				toast.error(t('submitError'))
			}
		})
	}

	function handleClose() {
		// Submit emoji-only feedback when closing without additional text
		if (selectedOpinion || storedEmoji) {
			const formData = new FormData()
			formData.append('opinion', selectedOpinion || storedEmoji)
			formData.append('feedback', '') // Empty feedback

			startTransition(async () => {
				try {
					const result = await submitFeedbackAction(formData)
					if (result.success) {
						toast.success(t('emojiSubmitted'))
					} else {
						toast.error(t('emojiSubmissionError'))
					}
				} catch (error) {
					toast.error(t('submitError'))
				}
			})
		}

		setIsAnimatingOut(true)
		setTimeout(() => {
			resetForm()
			setFeedbackHidden(true)
		}, 500)
	}

	function resetForm() {
		setSelectedOpinion(null)
		setSubmissionState(false)
		setIsTextareaVisible(false)
		setFeedbackText('')
		setStoredEmoji(null)
		setIsAnimatingOut(false)
		if (formRef.current) {
			formRef.current.reset()
		}
	}

	const handleDragEnd = (event, info) => {
		if (info.offset.y > 100) {
			setFeedbackHidden(true)
		}
		dragY.set(0)
	}

	if (feedbackHidden && !storedEmoji) {
		return null
	}

	return (
		<AnimatePresence>
			{(!feedbackHidden || storedEmoji) && (
				<motion.section
					ref={sectionRef}
					aria-label={t('feedbackSectionLabel')}
					className="fixed w-fit bottom-0 left-0 right-0 mx-auto flex justify-center mb-10"
					initial={showFeedbackMotionConfig.initial}
					animate={showFeedbackMotionConfig.animate(isAnimatingOut)}
					exit={showFeedbackMotionConfig.exit}
					transition={showFeedbackMotionConfig.transition}
					drag="y"
					dragConstraints={{ top: 0, bottom: 0 }}
					dragElastic={0.2}
					onDragEnd={handleDragEnd}
					style={{ y: dragY, opacity }}
				>
					<motion.div
						layout
						initial={{ borderRadius: '2rem' }}
						animate={{
							borderRadius:
								selectedOpinion || storedEmoji
									? '0.5rem'
									: '2rem',
						}}
						className="min-w-[300px] pb-4 md:min-w-[400px] h-auto w-fit border py-2 bg-[#0A0A0A] z-50 hover:bg-[#171716] shadow-sm border-border transition-all bezier-ones duration-500 gap-4 relative"
					>
						<button
							onClick={handleClose}
							className="absolute -top-1 -left- text-disabled hover:text-text"
							aria-label={t('closeFeedbackForm')}
						>
							<CloseIcon />
						</button>
						{!isTextareaVisible && !storedEmoji ? (
							<div className="flex flex-wrap items-center justify-between w-full px-7 translate-x-1.5 gap-x-6">
								<h2
									id="feedback-label"
									className="text-sm text-disabled"
								>
									{t('feedbackLabel')}
								</h2>
								<div
									className="flex items-center text-text emojis"
									role="group"
									aria-labelledby="feedback-label"
								>
									{opinionEmojis.map((item) => (
										<EmojiButton
											key={item.text}
											item={item}
											selectedOpinion={selectedOpinion}
											onSelect={handleEmojiSelect}
										/>
									))}
								</div>
							</div>
						) : (
							<AnimatePresence>
								{(selectedOpinion || storedEmoji) &&
									!isSubmitted && (
										<div className="">
											<motion.div
												initial={
													afterEmojiClick.initial
												}
												animate={
													afterEmojiClick.animate
												}
												exit={afterEmojiClick.exit}
												transition={
													afterEmojiClick.transition
												}
												className="mx-auto flex items-center flex-col "
											>
												<motion.form
													initial={
														formAnimation.initial
													}
													animate={
														formAnimation.animate
													}
													transition={
														formAnimation.transition
													}
													exit={formAnimation.exit}
													ref={formRef}
													action={handleSubmit}
													className="flex flex-col mx-auto w-full px-4 gap-4 "
												>
													<input
														type="hidden"
														name="opinion"
														value={
															selectedOpinion ||
															storedEmoji ||
															''
														}
													/>
													<textarea
														name="feedback"
														value={feedbackText}
														onChange={(e) =>
															setFeedbackText(
																e.target.value
															)
														}
														placeholder={t(
															'feedbackPlaceholder'
														)}
														className="min-h-32 x rounded-md bg-body focus:bg-section focus:border-none focus:outline-none transition-all duration-700 border border-border px-4 py-4 mt-2"
														aria-label={t(
															'additionalFeedback'
														)}
														onFocus={() =>
															setIsTextareaFocused(
																true
															)
														}
														onBlur={() =>
															setIsTextareaFocused(
																false
															)
														}
													/>
													{isTextareaFocused && (
														<BorderBeam
															size={250}
															duration={12}
															delay={9}
														/>
													)}
													<div className="flex items-center justify-end w-full">
														<CoolButton
															hasCoolMode={true}
															isNotEmpty={
																isButtonEnabled
															}
															onClick={() =>
																formRef.current?.requestSubmit()
															}
															isLoading={
																isPending
															}
														/>
													</div>
												</motion.form>
											</motion.div>
										</div>
									)}
								{isSubmitted && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="flex flex-col items-center justify-center p-4"
										role="status"
									>
										<span
											aria-hidden="true"
											className="text-2xl"
										>
											{selectedEmoji}
										</span>
										<p className="text-center">
											<SparklesText
												text={t('postSubmitText')}
											/>
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						)}
					</motion.div>
				</motion.section>
			)}
		</AnimatePresence>
	)
}

export default Feedback
