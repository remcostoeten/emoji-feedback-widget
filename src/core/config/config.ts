import { OpinionEmoji } from '../utils/types'

// Environment-based configuration
export const ENABLE_LOCAL_STORAGE = process.env.ENABLE_LOCAL_STORAGE === 'true'
export const USE_DATABASE = process.env.USE_DATABASE === 'true'

// The emojis that can be selected for feedback.
export const opinionEmojis: OpinionEmoji[] = [
	{ text: 'love it', emoji: '😍' },
	{ text: 'DOPE!', emoji: '🔥' },
	{ text: 'its shit', emoji: '💩' },
	{ text: 'sickening', emoji: '🤮' },
]
// Emoji bar configuration
export const HIDE_AUTOMATICALLY = true // If set to true, the bar will shift down and loweer opacityy automatically after a certain time to prevent annoyance.
export const BAR_POSITION = 'top' // Set to 'top' to position the bar at the top.

// Time to show the feedback form in milliseconds.
export const TIME_TO_SHOW_FEEDBACK_FORM = 5000 // 5 seconds

// The duration between being able to submit feedback, in milliseconds.
export const RATE_LIMIT_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// The amount of reviews shown per page
export const DEFAULT_ITEMS_PER_PAGE = '10'
