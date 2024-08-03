'use client'
import { useEffect, useState } from 'react'
import { getFeedbackData } from '@/core/server/feedback'
import { FeedbackData } from '@/core/utils/types'

export default function FeedbackDataPage() {
	const [data, setData] = useState<FeedbackData | null>(null)

	useEffect(() => {
		async function fetchData() {
			const feedbackData = await getFeedbackData()
			setData(feedbackData)
		}
		fetchData()
	}, [])

	if (!data) {
		return <div>Loading...</div>
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Feedback Data</h1>

			<h2 className="text-xl font-semibold mb-2">Emoji Counts</h2>
			<ul className="mb-4">
				{Object.entries(data.emojiCounts).map(([emoji, count]) => (
					<li key={emoji}>
						{emoji}: {count}
					</li>
				))}
			</ul>

			<h2 className="text-xl font-semibold mb-2">Feedback Entries</h2>
			<ul>
				{data.feedbacks.map((feedback) => (
					<li key={feedback.id} className="mb-2 p-2 border rounded">
						<p>Opinion: {feedback.opinion}</p>
						<p>Feedback: {feedback.feedback}</p>
						<p>
							Timestamp:{' '}
							{new Date(feedback.timestamp).toLocaleString()}
						</p>
					</li>
				))}
			</ul>

			<pre className="mt-4 p-2 bg-gray-100 rounded text-sm overflow-auto">
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	)
}
