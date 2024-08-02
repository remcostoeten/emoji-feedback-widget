'use client'

import React, { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import CoolButton from './CoolButton'
import { submitFeedbackAction, checkRateLimitAction, getEmojiCountsAction } from '@/core/server/feedback'
import EmojiButton from './EmojiButton'
import { CloseIcon } from './Icons'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

import {
  showFeedbackMotionConfig,
  afterEmojiClick,
  formAnimation,
} from '@/core/config/motion-config'
import SparklesText from './effects/SparkleText'
import {
  opinionEmojis,
  TIME_TO_SHOW_FEEDBACK_FORM,
  RATE_LIMIT_INTERVAL,
} from '@/core/config/config'
import { BorderBeam } from './shells/BorderEffects'
import { useFormState } from 'react-dom'

const initialState = {
  message: null,
}

export function Feedback() {
  const { t } = useTranslation()
  const router = useRouter()
  const [feedbackHidden, setFeedbackHidden] = useState(true)
  const [selectedOpinion, setSelectedOpinion] = useState(null)
  const [isSubmitted, setSubmissionState] = useState(false)
  const [isTextareaFocused, setIsTextareaFocused] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [emojiCounts, setEmojiCounts] = useState({})
  const formRef = useRef(null)
  const sectionRef = useRef(null)

  const [state, formAction] = useFormState(submitFeedbackAction, initialState)

  const isButtonEnabled = feedbackText.trim().length > 0 && !isRateLimited

  useEffect(() => {
    const hasGivenFeedback = localStorage.getItem('hasGivenFeedback')
    if (!hasGivenFeedback) {
      const timer = setTimeout(() => {
        setFeedbackHidden(false)
      }, TIME_TO_SHOW_FEEDBACK_FORM)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    async function checkRateLimit() {
      const result = await checkRateLimitAction()
      setIsRateLimited(result.isRateLimited)
      if (result.isRateLimited) {
        setTimeout(() => setIsRateLimited(false), result.remainingTime)
      }
    }
    checkRateLimit()
  }, [])

  useEffect(() => {
    async function fetchEmojiCounts() {
      const counts = await getEmojiCountsAction()
      setEmojiCounts(counts)
    }
    fetchEmojiCounts()
  }, [])

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

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(t('feedbackSuccess'))
        setSubmissionState(true)
        localStorage.setItem('hasGivenFeedback', 'true')
        setTimeout(() => {
          setIsAnimatingOut(true)
          setTimeout(resetForm, 500)
        }, 1250)
        router.refresh() // Revalidate the frontend
      } else {
        toast.error(state.message)
      }
    }
  }, [state, t, router])

  async function handleEmojiSelect(opinion) {
    setSelectedOpinion(opinion)
  }

  async function submitFeedback(opinion, feedback = '') {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('opinion', opinion)
      formData.append('feedback', feedback)
      const result = await submitFeedbackAction(initialState, formData)
      if (result.success) {
        toast.success(feedback ? t('feedbackSuccess') : t('emojiReceived'))
        localStorage.setItem('hasGivenFeedback', 'true')
        setSubmissionState(true)
        setTimeout(() => {
          setIsAnimatingOut(true)
          setTimeout(resetForm, 500)
        }, 1250)
        router.refresh() // Revalidate the frontend
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(t('submitError'))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmitFeedback(event) {
    event.preventDefault()
    if (selectedOpinion) {
      await submitFeedback(selectedOpinion, feedbackText)
    }
  }

  function handleClose() {
    if (selectedOpinion && !feedbackText) {
      submitFeedback(selectedOpinion)
    } else {
      setIsAnimatingOut(true)
      setTimeout(resetForm, 500)
    }
  }

  function resetForm() {
    setSelectedOpinion(null)
    setSubmissionState(false)
    setFeedbackText('')
    setFeedbackHidden(true)
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  const hasGivenFeedback = localStorage.getItem('hasGivenFeedback') === 'true'

  if (hasGivenFeedback) {
    return null
  }

  return (
    <AnimatePresence>
      {!feedbackHidden && (
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
              borderRadius: selectedOpinion ? '0.5rem' : '2rem',
            }}
            className="min-w-[300px] md:min-w-[400px] h-auto w-fit border py-2 bg-section-light hover:bg-[#171716] shadow-sm border-border transition-all bezier-ones duration-500 gap-4 relative"
          >
            {!selectedOpinion ? (
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
                      count={emojiCounts[item.emoji] || 0}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {!isSubmitted ? (
                  <motion.div
                    initial={afterEmojiClick.initial}
                    animate={afterEmojiClick.animate}
                    exit={afterEmojiClick.exit}
                    transition={afterEmojiClick.transition}
                    className="mx-auto flex items-center flex-col"
                  >
                    <button
                      onClick={handleClose}
                      className="unset absolute -top-5 z-50 shadow-white/10 shadow-xl -right-2.5"
                      aria-label={t('closeFeedbackForm')}
                    >
                      <CloseIcon />
                    </button>
                    <motion.form
                      ref={formRef}
                      onSubmit={handleSubmitFeedback}
                      className="flex flex-col mx-auto w-full px-4 gap-4"
                      initial={formAnimation.initial}
                      animate={formAnimation.animate}
                      transition={formAnimation.transition}
                      exit={formAnimation.exit}
                    >
                      <input
                        type="hidden"
                        name="opinion"
                        value={selectedOpinion}
                      />
                      <textarea
                        name="feedback"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder={t('additionalFeedbackPlaceholder')}
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
                          isLoading={isLoading}
                        />
                      </div>
                    </motion.form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center p-4"
                    role="status"
                  >
                    <span aria-hidden="true" className="text-2xl">
                      {opinionEmojis.find((e) => e.text === selectedOpinion)?.emoji}
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