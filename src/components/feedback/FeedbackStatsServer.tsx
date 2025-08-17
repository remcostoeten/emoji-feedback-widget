import HoverCard from '@/components/effects/hover-card'
import NumberTicker from '@/components/effects/NumberTicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { FeedbackData } from '@/core/utils/types'
import { unstable_cache } from 'next/cache'

type TProps = {
	initialData: FeedbackData
}

// Cache the stats calculation for 60 seconds
const calculateStats = unstable_cache(
	async (data: FeedbackData) => {
		const total = data.feedbacks.length
		const positive = data.feedbacks.filter((feedback) =>
			['🔥', '😍'].includes(feedback.opinion)
		).length
		const negative = data.feedbacks.filter((feedback) =>
			['💩', '🤮'].includes(feedback.opinion)
		).length
		
		return {
			totalFeedback: total,
			positiveFeedback: positive,
			negativeFeedback: negative,
		}
	},
	['feedback-stats'],
	{ revalidate: 60 }
)

export default async function FeedbackStatsServer({ initialData }: TProps) {
	const stats = await calculateStats(initialData)
	
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
			<StatCard
				title="Total Feedback"
				value={stats.totalFeedback}
			/>
			<StatCard
				title="Positive Feedback"
				value={stats.positiveFeedback}
			/>
			<StatCard
				title="Negative Feedback"
				value={stats.negativeFeedback}
			/>
		</div>
	)
}

function StatCard({ title, value }: { title: string; value: number }) {
	return (
		<HoverCard gradientOpacity={0.3}>
			<Card className="w-full">
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
