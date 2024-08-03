import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const feedbacks = sqliteTable('feedbacks', {
	id: integer('id').primaryKey(),
	opinion: text('opinion'),
	feedback: text('feedback'),
	timestamp: text('timestamp'),
	browser: text('browser'),
	os: text('os'),
	device: text('device'),
	ip: text('ip'),
	country: text('country'),
	region: text('region'),
	city: text('city'),
})

export const emojiCounts = sqliteTable('emoji_counts', {
	emoji: text('emoji').primaryKey(),
	count: integer('count').notNull(),
})
