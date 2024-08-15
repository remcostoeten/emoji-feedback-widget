'use server'

import { opinionEmojis, USE_DATABASE } from '@/core/config/config'
import db from '@/core/server/database'
import { emojiCounts, feedbacks } from '@/core/server/models/schema'
import { FeedbackData } from '@/core/utils/types'
import { sql } from 'drizzle-orm/sql'
import { revalidatePath } from 'next/cache'
import NodeCache from 'node-cache'

function getEmojiFromOpinion(opinionText: string): string {
	const opinion = opinionEmojis.find((o) => o.text === opinionText)
	return opinion ? opinion.emoji : opinionText
}

const locationCache = new NodeCache({ stdTTL: 3600 }) // Cache for 1 hour

async function getLocation(): Promise<{ city: string; country: string }> {
	try {
		const cachedLocation = locationCache.get<{
			city: string
			country: string
		}>('location')
		if (cachedLocation) return cachedLocation

		const response = await fetch('https://ipapi.co/json')
		if (!response.ok) {
			throw new Error(`Failed to fetch location data: ${response.status}`)
		}

		const location = await response.json()
		locationCache.set('location', location)
		return location
	} catch (error) {
		// Log the error in production environment (e.g., to a monitoring service)
		return { city: 'Unknown', country: 'Unknown' }
	}
}

export async function submitFeedbackAction(formData: FormData) {
	if (!USE_DATABASE) {
		return { success: true, message: 'Feedback received (not saved)' }
	}

	const opinion = getEmojiFromOpinion(formData.get('opinion') as string)
	const feedback = formData.get('feedback') as string | null
	const { city, country } = await getLocation()

	try {
		await db.transaction(async (tx) => {
			await tx
				.insert(emojiCounts)
				.values({ emoji: opinion, count: 1 })
				.onConflictDoUpdate({
					target: emojiCounts.emoji,
					set: { count: sql`${emojiCounts.count} + 1` },
				})

			await tx.insert(feedbacks).values({
				opinion,
				feedback: feedback || '',
				timestamp: new Date().toISOString(),
				city,
				country,
			})
		})

		revalidatePath('/feedback')
		return { success: true, message: 'Feedback saved successfully' }
	} catch (error) {
		// Log the error in production environment
		return { success: false, message: 'Error saving feedback' }
	}
}

export async function getFeedbackData(): Promise<FeedbackData> {
	if (!USE_DATABASE) {
		return { feedbacks: [], emojiCounts: {} }
	}

	try {
		const [feedbacksData, emojiCountsData] = await Promise.all([
			db.select().from(feedbacks),
			db.select().from(emojiCounts),
		])

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
		// Log the error in production environment
		return { feedbacks: [], emojiCounts: {} }
	}
}

export async function getEmojiCountsAction(): Promise<Record<string, number>> {
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
		// Log the error in production environment
		return {}
	}
}

export async function checkRateLimitAction() {
	// Implement proper rate limiting logic here
	return { isRateLimited: false, remainingTime: 0 }
}

export async function getLatestFeedbackAction() {
	try {
		const data = await getFeedbackData()
		return { success: true, data }
	} catch (error) {
		// Log the error in production environment
		return { success: false, error: 'Failed to fetch latest feedback' }
	}
}
