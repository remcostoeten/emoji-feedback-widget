import {
	Badge,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui'
import { FeedbackData } from '@/core/utils/types'
import { opinionEmojis } from '@/core/config/config'

type TProps = {
	initialData: FeedbackData
}

export default function FeedbackTableServer({ initialData }: TProps) {
	// Server-side initial render with first page of data
	const itemsPerPage = 10
	const paginatedFeedback = initialData.feedbacks.slice(0, itemsPerPage)
	
	return (
		<div className="table-styles">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Emoji</TableHead>
						<TableHead>Opinion</TableHead>
						<TableHead>Feedback</TableHead>
						<TableHead>Timestamp</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{paginatedFeedback.map((feedback) => (
						<FeedbackRow
							key={feedback.id}
							feedback={feedback}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

function FeedbackRow({ feedback }: { feedback: any }) {
	function getOpinionType(opinion: string) {
		const positiveEmojis = opinionEmojis
			.filter((e) => ['😍', '🔥'].includes(e.emoji))
			.map((e) => e.emoji)
		const negativeEmojis = opinionEmojis
			.filter((e) => ['💩', '🤮'].includes(e.emoji))
			.map((e) => e.emoji)

		if (positiveEmojis.includes(opinion)) return 'positive'
		if (negativeEmojis.includes(opinion)) return 'negative'
		return 'neutral'
	}
	
	const opinionType = getOpinionType(feedback.opinion)

	return (
		<TableRow>
			<TableCell>{feedback.opinion}</TableCell>
			<TableCell>
				<Badge
					variant={
						opinionType === 'neutral'
							? 'secondary'
							: opinionType === 'positive'
								? 'positive'
								: 'negative'
					}
				>
					{opinionType}
				</Badge>
			</TableCell>
			<TableCell>{feedback.feedback}</TableCell>
			<TableCell>
				{new Date(feedback.timestamp).toLocaleString()}
			</TableCell>
		</TableRow>
	)
}
