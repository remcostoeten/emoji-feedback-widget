'use client'

import React, { useRef, useState, useEffect, useTransition } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import CoolButton from './CoolButton'
import { submitFeedbackAction } from '@/core/server/feedback'
import EmojiButton from './EmojiButton'
import { CloseIcon } from './Icons'
import { useTranslation } from 'react-i18next'

import {
    showFeedbackMotionConfig,
    afterEmojiClick,
    formAnimation,
} from '@/core/config/motion-config'
import useLocalStorage from '@/core/hooks/useLocalStorage'
import SparklesText from './effects/SparkleText'
import { opinionEmojis, TIME_TO_SHOW_FEEDBACK_FORM } from '@/core/config/config'
import { BorderBeam } from './shells/BorderEffects'

export function Feedback() {
    const { t } = useTranslation()
    const [feedbackHidden, setFeedbackHidden] = useLocalStorage('feedbackHidden', false)
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

    const isButtonEnabled = feedbackText.trim().length > 0 && !isPending
    const selectedEmojiObject = opinionEmojis.find((item) => item.text === storedEmoji)
    const selectedEmoji = selectedEmojiObject ? selectedEmojiObject.emoji : ''

    useEffect(() => {
        if (!feedbackHidden && !storedEmoji) {
            const timer = setTimeout(() => setFeedbackHidden(false), TIME_TO_SHOW_FEEDBACK_FORM)
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

    async function handleClose() {
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
        setTimeout(resetForm, 500)
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

    if (feedbackHidden && !storedEmoji) {
        return null
    }

    return (
        <AnimatePresence>
            {(!feedbackHidden || storedEmoji) && (
                <motion.section
                    ref={sectionRef}
                    aria-label={t('feedbackSectionLabel')}
                    className="fixed bottom-0 left-0 right-0 max-w-full mx-auto flex justify-center mb-10"
                    initial={showFeedbackMotionConfig.initial}
                    animate={showFeedbackMotionConfig.animate(isAnimatingOut)}
                    exit={showFeedbackMotionConfig.exit}
                    transition={showFeedbackMotionConfig.transition}
                >
                    <motion.div
                        layout
                        initial={{ borderRadius: '2rem' }}
                        animate={{
                            borderRadius: selectedOpinion || storedEmoji ? '0.5rem' : '2rem',
                        }}
                        className="min-w-[300px] md:min-w-[400px] h-auto w-fit border py-2 bg-section-light hover:bg-[#171716] shadow-sm border-border transition-all bezier-ones duration-500 gap-4 relative"
                    >
                        {!isTextareaVisible && !storedEmoji ? (
                            <div className="flex flex-wrap items-center justify-between w-full px-7 translate-x-1.5 gap-x-6">
                                <h2 id="feedback-label" className="text-sm text-disabled">
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
                                {(selectedOpinion || storedEmoji) && !isSubmitted && (
                                    <div className="">
                                        <button
                                            onClick={handleClose}
                                            className="unset absolute -top-5 z-50 shadow-white/10 shadow-xl -right-2.5"
                                            aria-label={t('closeFeedbackForm')}
                                        >
                                            <CloseIcon />
                                        </button>
                                        <motion.div
                                            initial={afterEmojiClick.initial}
                                            animate={afterEmojiClick.animate}
                                            exit={afterEmojiClick.exit}
                                            transition={afterEmojiClick.transition}
                                            className="mx-auto flex items-center flex-col "
                                        >
                                            <motion.form
                                                initial={formAnimation.initial}
                                                animate={formAnimation.animate}
                                                transition={formAnimation.transition}
                                                exit={formAnimation.exit}
                                                ref={formRef}
                                                action={handleSubmit}
                                                className="flex flex-col mx-auto w-full px-4 gap-4 "
                                            >
                                                <input
                                                    type="hidden"
                                                    name="opinion"
                                                    value={selectedOpinion || storedEmoji || ''}
                                                />
                                                <textarea
                                                    name="feedback"
                                                    value={feedbackText}
                                                    onChange={(e) => setFeedbackText(e.target.value)}
                                                    placeholder={t('feedbackPlaceholder')}
                                                    className="min-h-32 x rounded-md bg-body focus:bg-section focus:border-none focus:outline-none transition-all duration-700 border border-border px-4 py-4 mt-2"
                                                    aria-label={t('additionalFeedback')}
                                                    onFocus={() => setIsTextareaFocused(true)}
                                                    onBlur={() => setIsTextareaFocused(false)}
                                                />
                                                {isTextareaFocused && (
                                                    <BorderBeam size={250} duration={12} delay={9} />
                                                )}
                                                <div className="flex items-center justify-end w-full">
                                                    <CoolButton
                                                        hasCoolMode={true}
                                                        isNotEmpty={isButtonEnabled}
                                                        onClick={() => formRef.current?.requestSubmit()}
                                                        isLoading={isPending}
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
                                        <span aria-hidden="true" className="text-2xl">
                                            {selectedEmoji}
                                        </span>
                                        <p className="text-center">
                                            <SparklesText text={t('postSubmitText')} />
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