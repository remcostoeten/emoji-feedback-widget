'use client'

import {
	BAR_POSITION,
	HIDE_AUTOMATICALLY,
	opinionEmojis,
	TIME_TO_SHOW_FEEDBACK_FORM,
} from '@/core/config/config'
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
import { usePathname, useRouter } from 'next/navigation'
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
	const router = useRouter()
	const currentPath = usePathname()
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
	const [isHovered, setIsHovered] = useState(false)
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

	const [refreshTrigger, setRefreshTrigger] = useState(0)

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
		const handleKeyDown = (e: { key: string }) => {
			if (e.key === 'Escape') {
				handleClose()
			}
		}

		const handleClickOutside = (e: { target: any }) => {
			if (sectionRef.current && !sectionRef.current.contains(e.target)) {
				animateOut()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		const refreshData = async () => {
			// Implement data refresh logic here
		}

		refreshData()
	}, [refreshTrigger])

	function handleEmojiSelect(opinion: any) {
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
			} finally {
				setTimeout(() => {
					setRefreshTrigger((prev) => prev + 1)
					router.refresh()
				}, 20000)
			}
		})
	}

	function handleClose() {
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
				} finally {
					setRefreshTrigger((prev) => prev + 1)
					if (router.refresh) {
						setTimeout(() => {
							router.refresh()
						}, 1500)
					} else {
						setTimeout(() => {
							router.push(currentPath)
						}, 1500)
					}
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

	function animateOut() {
		if (sectionRef.current) {
			const translateY = BAR_POSITION === 'top' ? '-65px' : '56px'
			sectionRef.current.style.transition =
				'transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1.5s cubic-bezier(0.775, 0.885, 0.32, 1.275)'
			sectionRef.current.style.transform = `translateY(${translateY}) scale(0.8)`
			sectionRef.current.style.opacity = '0.4'
		}
	}

	function resetTransform() {
		if (sectionRef.current) {
			sectionRef.current.style.transition =
				'transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
			sectionRef.current.style.transform = 'translateY(0) scale(1)'
			sectionRef.current.style.opacity = '1'
		}
	}

	const handleDragEnd = (event: any, info: { offset: { y: number } }) => {
		const threshold = BAR_POSITION === 'top' ? -100 : 100
		if (
			(BAR_POSITION === 'top'
				? info.offset.y < threshold
				: info.offset.y > threshold) &&
			!isHovered
		) {
			animateOut()
		}
		dragY.set(0)
	}

	let lastScrollTop = 0

	useEffect(() => {
		if (HIDE_AUTOMATICALLY) {
			const handleScroll = () => {
				const scrollTop =
					window.pageYOffset || document.documentElement.scrollTop
				if (
					BAR_POSITION === 'top'
						? scrollTop > lastScrollTop
						: scrollTop < lastScrollTop
				) {
					// Scrolling down for bottom bar or up for top bar
					animateOut()
				} else {
					// Scrolling up for bottom bar or down for top bar
					resetTransform()
				}
				lastScrollTop = scrollTop <= 0 ? 0 : scrollTop // For Mobile or negative scrolling
			}

			window.addEventListener('scroll', handleScroll)

			return () => {
				window.removeEventListener('scroll', handleScroll)
			}
		}
	}, [])

	if (feedbackHidden && !storedEmoji) {
		return null
	}

	const barPositionClass =
		BAR_POSITION === 'top' ? 'top-0 mt-10' : 'bottom-0 mb-10'

	// Modify the showFeedbackMotionConfig to account for bar position
	const positionAwareShowFeedbackMotionConfig = {
		...showFeedbackMotionConfig,
		initial: {
			...showFeedbackMotionConfig.initial,
			y: BAR_POSITION === 'top' ? -100 : 100,
		},
		animate: (isAnimatingOut: boolean) => ({
			...showFeedbackMotionConfig.animate(isAnimatingOut),
			y: isAnimatingOut ? (BAR_POSITION === 'top' ? -100 : 100) : 0,
		}),
		exit: {
			...showFeedbackMotionConfig.exit,
			y: BAR_POSITION === 'top' ? -100 : 100,
		},
	}

	return (
		<AnimatePresence>
			{(!feedbackHidden || storedEmoji) && (
				<motion.section
					ref={sectionRef}
					aria-label={t('feedbackSectionLabel')}
					className={`fixed w-fit left-0 right-0 mx-auto flex justify-center z-50 ${barPositionClass}`}
					initial={positionAwareShowFeedbackMotionConfig.initial}
					animate={positionAwareShowFeedbackMotionConfig.animate(
						isAnimatingOut
					)}
					exit={positionAwareShowFeedbackMotionConfig.exit}
					transition={
						positionAwareShowFeedbackMotionConfig.transition
					}
					drag="y"
					dragConstraints={{ top: 0, bottom: 0 }}
					dragElastic={0.2}
					onDragEnd={handleDragEnd}
					onHoverStart={() => setIsHovered(true)}
					onHoverEnd={() => setIsHovered(false)}
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
															onClick={() => {
																formRef.current?.requestSubmit()
															}}
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
