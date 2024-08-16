import { OpinionEmoji } from '../utils/types'

// Environment-based configuration
export const ENABLE_LOCAL_STORAGE: boolean = process.env.ENABLE_LOCAL_STORAGE === 'true'
export const USE_DATABASE: boolean = process.env.USE_DATABASE === 'true'

// The emojis that can be selected for feedback.
export const opinionEmojis: OpinionEmoji[] = [
  { text: 'love it', emoji: '😍' },
  { text: 'DOPE!', emoji: '🔥' },
  { text: 'its shit', emoji: '💩' },
  { text: 'sickening', emoji: '🤮' },
]

// Emoji bar configuration
export const HIDE_AUTOMATICALLY: boolean = true // If set to true, the bar will shift down and lower opacity automatically after a certain time to prevent annoyance.

export type BarPosition = 'top' | 'bottom'
export const BAR_POSITION: BarPosition = 'bottom'

// Time to show the feedback form in milliseconds.
export const TIME_TO_SHOW_FEEDBACK_FORM: number = 5000 // 5 seconds

// The duration between being able to submit feedback, in milliseconds.
export const RATE_LIMIT_INTERVAL: number = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// The amount of reviews shown per page
export const DEFAULT_ITEMS_PER_PAGE: string = '10'

// Types for motion configurations
export interface MotionConfig {
  initial: {
    opacity: number
    y: number
  }
  animate: (isAnimatingOut: boolean) => {
    opacity: number
    y: number
  }
  exit: {
    opacity: number
    y: number
  }
  transition: {
    type: string
    stiffness: number
    damping: number
  }
}

export const showFeedbackMotionConfig: MotionConfig = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (isAnimatingOut: boolean) => ({
    opacity: isAnimatingOut ? 0 : 1,
    y: isAnimatingOut ? 100 : 0,
  }),
  exit: {
    opacity: 0,
    y: 100,
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
}

export interface AnimationConfig {
  initial: {
    opacity: number
    y: number
  }
  animate: {
    opacity: number
    y: number
  }
  exit: {
    opacity: number
    y: number
  }
  transition: {
    duration: number
  }
}

export const afterEmojiClick: AnimationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

export const formAnimation: AnimationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
}