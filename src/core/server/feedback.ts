'use server'
import fs from 'fs/promises'
import path from 'path'
import { ENABLE_LOCAL_STORAGE, USE_DATABASE } from '../config/config'
import { Feedback, FeedbackData } from '../utils/types'
import { opinionEmojis } from '../config/config'
import { emojiCounts, feedbacks } from './models/schema'
import db from './database'
import { sql } from 'drizzle-orm/sql'

function getEmojiFromOpinion(opinionText: string): string {
	const opinion = opinionEmojis.find((o) => o.text === opinionText)
	return opinion ? opinion.emoji : opinionText
}

export async function submitFeedbackAction(formData: FormData) {
	if (!USE_DATABASE) {
		console.log('Database is disabled. Feedback not saved.')
		return { success: true, message: 'Feedback received (not saved)' }
	}

	let opinion = formData.get('opinion') as string
	const feedback = formData.get('feedback') as string | null

	console.log('Received opinion:', opinion)
	console.log('Received feedback:', feedback)

	// Replace opinion text with emoji
	opinion = getEmojiFromOpinion(opinion)

	try {
		// Update emoji count
		await db
			.insert(emojiCounts)
			.values({ emoji: opinion, count: 1 })
			.onConflictDoUpdate({
				target: emojiCounts.emoji,
				set: { count: sql`${emojiCounts.count} + 1` },
			})

		// If there's feedback text, save it to the feedbacks table
		if (feedback) {
			await db.insert(feedbacks).values({
				opinion: opinion,
				feedback: feedback,
				timestamp: new Date().toISOString(),
			})
		}

		console.log('Emoji count updated for:', opinion)
		return { success: true, message: 'Feedback saved successfully' }
	} catch (error) {
		console.error('Error saving feedback:', error)
		return { success: false, message: 'Error saving feedback' }
	}
}

export async function getFeedbackData(): Promise<FeedbackData> {
	if (USE_DATABASE) {
		try {
			const feedbacksData = await db.select().from(feedbacks)
			const emojiCountsData = await db.select().from(emojiCounts)

			const emojiCountsObject = emojiCountsData.reduce(
				(acc, curr) => {
					acc[curr.emoji] = curr.count
					return acc
				},
				{} as Record<string, number>
			)

			return {
				feedbacks: feedbacksData,
				emojiCounts: emojiCountsObject,
			}
		} catch (error) {
			console.error('Error reading feedback data from database:', error)
			return { feedbacks: [], emojiCounts: {} }
		}
	} else {
		// Your existing JSON reading logic here
		// ...
	}
}

export async function getEmojiCountsAction() {
	try {
		const counts = await db.select().from(emojiCounts)
		return counts.reduce(
			(acc, { emoji, count }) => {
				acc[emoji] = count
				return acc
			},
			{} as Record<string, number>
		)
	} catch (error) {
		console.error('Error fetching emoji counts:', error)
		return {}
	}
}

export async function checkRateLimitAction() {
	// Implement rate limiting logic here
	// This is a placeholder implementation
	return { isRateLimited: false, remainingTime: 0 }
}
