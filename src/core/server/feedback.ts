'use server'

import { opinionEmojis, USE_DATABASE } from '@/core/config/config'
import db from '@/core/server/database'
import { emojiCounts, feedbacks } from '@/core/server/models/schema'
import { FeedbackData } from '@/core/utils/types'
import console from 'console'
import { sql } from 'drizzle-orm/sql'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

function getEmojiFromOpinion(opinionText: string): string {
	const opinion = opinionEmojis.find((o) => o.text === opinionText)
	return opinion ? opinion.emoji : opinionText
}

export const getLocation = cache(async () => {
	try {
		const response = await fetch('https://ipapi.co/json')
		if (!response.ok) {
			throw new Error('Failed to fetch location data')
		}
		const data = await response.json()
		console.log(data)
		return {
			city: data.city || 'Unknown City',
			country: data.country_name || 'Unknown Country',
		}
	} catch (error) {
		console.error(error)
		return { city: 'Unknown City', country: 'Unknown Country' }
	}
})

export async function submitFeedbackAction(formData: FormData) {
	if (!USE_DATABASE) {
		console.log('Database is disabled. Feedback not saved.')
		return { success: true, message: 'Feedback received (not saved)' }
	}

	let opinion = formData.get('opinion') as string
	const feedback = formData.get('feedback') as string | null
	console.log('Received opinion:', opinion)
	console.log('Received feedback:', feedback)

	// Get the location
	const { city, country } = await getLocation()
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

		await db.insert(feedbacks).values({
			opinion: opinion,
			feedback: feedback || '',
			timestamp: new Date().toISOString(),
			city: city,
			country: country, // Save the country name
		})

		console.log('Feedback saved for:', opinion)
		revalidatePath('/feedback')
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
		return { feedbacks: [], emojiCounts: {} }
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

export async function getLatestFeedbackAction() {
	try {
		const data = await getFeedbackData()
		return { success: true, data }
	} catch (error) {
		console.error('Error fetching latest feedback:', error)
		return { success: false, error: 'Failed to fetch latest feedback' }
	}
}
