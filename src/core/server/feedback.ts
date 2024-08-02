
'use server'
import fs from 'fs/promises'
import path from 'path'
import { ENABLE_LOCAL_STORAGE, USE_DATABASE } from '../config/config'
import { Feedback, FeedbackData } from '../utils/types'
import { opinionEmojis } from '../config/config'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { emojiCounts, feedbacks } from './models/schema'
import db from './database'
import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'

function getEmojiFromOpinion(opinionText: string): string {
	const opinion = opinionEmojis.find((o) => o.text === opinionText)
	return opinion ? opinion.emoji : opinionText
}

export async function submitFeedbackAction(prevState: any, formData: FormData) {
	const opinion = formData.get('opinion') as string
	const feedback = formData.get('feedback') as string
	const city = formData.get('city') as string
	const emoji = getEmojiFromOpinion(opinion)

	// Get user agent string
	const userAgent = headers().get('user-agent') || ''

	// Parse user agent
	const parser = new UAParser(userAgent)
	const browserName = parser.getBrowser().name || 'Unknown'
	const browserVersion = parser.getBrowser().version || 'Unknown'
	const osName = parser.getOS().name || 'Unknown'
	const osVersion = parser.getOS().version || 'Unknown'
	const deviceType = parser.getDevice().type || 'Unknown'

	const newFeedback = {
		opinion: emoji,
		feedback: feedback,
		timestamp: new Date().toISOString(),
		city: city,
		browser: `${browserName} ${browserVersion}`,
		os: `${osName} ${osVersion}`,
		device: deviceType,
	}

	try {
		await db.insert(feedbacks).values(newFeedback)
		const existingCount = await db
			.select()
			.from(emojiCounts)
			.where(eq(emojiCounts.emoji, emoji))
		if (existingCount.length > 0) {
			await db
				.update(emojiCounts)
				.set({ count: existingCount[0].count + 1 })
				.where(eq(emojiCounts.emoji, emoji))
		} else {
			await db.insert(emojiCounts).values({ emoji: emoji, count: 1 })
		}
		revalidatePath('/')
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

			const emojiCountsObject = emojiCountsData.reduce((acc, curr) => {
				acc[curr.emoji] = curr.count
				return acc
			}, {} as Record<string, number>)

			return {
				feedbacks: feedbacksData,
				emojiCounts: emojiCountsObject
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
		return counts.reduce((acc, { emoji, count }) => {
			acc[emoji] = count
			return acc
		}, {} as Record<string, number>)
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