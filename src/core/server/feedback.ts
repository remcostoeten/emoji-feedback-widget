
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

function getEmojiFromOpinion(opinionText: string): string {
    const opinion = opinionEmojis.find((o) => o.text === opinionText)
    return opinion ? opinion.emoji : opinionText
}

export async function submitFeedbackAction(formData: FormData) {
    const opinion = formData.get('opinion') as string
    const feedback = formData.get('feedback') as string

    const emoji = getEmojiFromOpinion(opinion)

    const newFeedback = {
        id: Date.now(),
        opinion: emoji,
        feedback: feedback,
        timestamp: new Date().toISOString(),
    }

    try {
        await db.insert(feedbacks).values(newFeedback)

        const existingCount = await db.select().from(emojiCounts).where(eq(emojiCounts.emoji, emoji))
        if (existingCount.length > 0) {
            await db.update(emojiCounts)
                .set({ count: existingCount[0].count + 1 })
                .where(eq(emojiCounts.emoji, emoji))
        } else {
            await db.insert(emojiCounts).values({ emoji: emoji, count: 1 })
        }

        revalidatePath('/')
        return { success: true, message: 'Feedback saved successfully to database' }
    } catch (error) {
        console.error('Error saving feedback to database:', error)
        return { success: false, message: 'Error saving feedback to database' }
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