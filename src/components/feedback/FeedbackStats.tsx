// app/components/FeedbackStats.tsx
'use client'

import HoverCard from '@/components/effects/hover-card'
import NumberTicker from '@/components/effects/NumberTicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function FeedbackStats() {
	const { t } = useTranslation()
	const feedbackData = useFeedbackStore((state) => state.feedbackData)

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

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
			<StatCard title={t('totalFeedback')} value={totalFeedback} />
			<StatCard title={t('positiveFeedback')} value={positiveFeedback} />
			<StatCard title={t('negativeFeedback')} value={negativeFeedback} />
		</div>
	)
}

function StatCard({ title, value }) {
	return (
		<HoverCard gradientOpacity={0.3}>
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-4xl font-bold">
						<NumberTicker value={value} />
					</div>
				</CardContent>
			</Card>
		</HoverCard>
	)
}
