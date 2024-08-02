import { OpinionEmoji } from '../utils/types'

export const opinionEmojis: OpinionEmoji[] = [
  { text: 'love it', emoji: '😍' },
  { text: 'DOPE!', emoji: '🔥' },
  { text: "its shit", emoji: '💩' },
  { text: 'sickening', emoji: '🤮' },
]

// If disabled results won't be logged to .json locally.
export const ENABLE_LOCAL_STORAGE = true

export const TIME_TO_SHOW_FEEDBACK_FORM = 5000 // 5s

// The duration between being able to submit.
export const RATE_LIMIT_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
// Not fool proof since it's stored in localstorage.
