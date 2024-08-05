// app/components/FeedbackStats.tsx
'use client'

import HoverCard from '@/components/effects/hover-card'
import NumberTicker from '@/components/effects/NumberTicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function FeedbackStats() {
	const { t } = useTranslation()
	const feedbackData = useFeedbackStore((state) => state.feedbackData)
	const [loading, setLoading] = useState(true)

	const { totalFeedback, positiveFeedback, negativeFeedback } =
		useMemo(() => {
			const total = feedbackData.feedbacks.length
			const positive = feedbackData.feedbacks.filter((feedback) =>
				['🔥', '😍'].includes(feedback.opinion)
			).length
			const negative = feedbackData.feedbacks.filter((feedback) =>
				['💩', '🤮'].includes(feedback.opinion)
			).length
			return {
				totalFeedback: total,
				positiveFeedback: positive,
				negativeFeedback: negative,
			}
		}, [feedbackData])

	useEffect(() => {
		if (feedbackData) {
			setLoading(false)
		}
	}, [feedbackData])

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
			<StatCard
				title={t('totalFeedback')}
				value={totalFeedback}
				loading={loading}
			/>
			<StatCard
				title={t('positiveFeedback')}
				value={positiveFeedback}
				loading={loading}
			/>
			<StatCard
				title={t('negativeFeedback')}
				value={negativeFeedback}
				loading={loading}
			/>
		</div>
	)
}

function StatCard({ title, value, loading }) {
	return (
		<HoverCard gradientOpacity={0.3}>
			<Card className="w-full">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-4xl font-bold">
						{loading ? (
							<LoadingIndicator />
						) : (
							<NumberTicker value={value} />
						)}
					</div>
				</CardContent>
			</Card>
		</HoverCard>
	)
}

function LoadingIndicator() {
	return <div>Loading...</div>
}
