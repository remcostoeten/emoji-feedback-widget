'use client'

import {
	Badge,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui'
import { opinionEmojis } from '@/core/config/config'
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { Suspense, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import TableSkeleton from '../Loaders'

export default function FeedbackTable() {
	const { t } = useTranslation()
	const {
		feedbackData,
		loading,
		currentPage,
		itemsPerPage,
		searchTerm,
		filterOption,
		sortOption,
	} = useFeedbackStore()

	const positiveEmojis = opinionEmojis
		.filter((e) => ['😍', '🔥'].includes(e.emoji))
		.map((e) => e.emoji)
	const negativeEmojis = opinionEmojis
		.filter((e) => ['💩', '🤮'].includes(e.emoji))
		.map((e) => e.emoji)

	const filteredFeedback = useMemo(() => {
		let filtered = feedbackData.feedbacks
		if (searchTerm) {
			filtered = filtered.filter((feedback) =>
				feedback.feedback
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			)
		}
		if (filterOption !== 'all') {
			filtered = filtered.filter((feedback) => {
				const { opinion } = feedback
				if (filterOption === 'positive')
					return positiveEmojis.includes(opinion)
				if (filterOption === 'negative')
					return negativeEmojis.includes(opinion)
				return ![...positiveEmojis, ...negativeEmojis].includes(opinion)
			})
		}
		return filtered.sort((a, b) => {
			switch (sortOption) {
				case 'newest':
					return (
						new Date(b.timestamp).getTime() -
						new Date(a.timestamp).getTime()
					)
				case 'oldest':
					return (
						new Date(a.timestamp).getTime() -
						new Date(b.timestamp).getTime()
					)
				case 'highest':
					return positiveEmojis.includes(b.opinion) ? 1 : -1
				case 'lowest':
					return negativeEmojis.includes(b.opinion) ? 1 : -1
				default:
					return 0
			}
		})
	}, [
		feedbackData,
		searchTerm,
		filterOption,
		sortOption,
		positiveEmojis,
		negativeEmojis,
	])

	const paginatedFeedback = filteredFeedback.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	return (
		<div className="table-styles">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>{t('emoji')}</TableHead>
						<TableHead>{t('opinion')}</TableHead>
						<TableHead>{t('feedback')}</TableHead>
						<TableHead>{t('timestamp')}</TableHead>
						<TableHead>{t('city')}</TableHead>
						<TableHead>{t('country')}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<Suspense fallback={<TableSkeleton />}>
						{loading ? (
							<TableSkeleton />
						) : paginatedFeedback.length > 0 ? (
							paginatedFeedback.map((feedback) => (
								<FeedbackRow
									key={feedback.id}
									feedback={feedback}
								/>
							))
						) : (
							<TableSkeleton />
						)}
					</Suspense>
				</TableBody>
			</Table>
		</div>
	)
}

function FeedbackRow({ feedback }) {
	const { t } = useTranslation()
	const getOpinionType = (opinion) => {
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
								? 'secondary'
								: 'outline'
					}
				>
					{t(opinionType)}
				</Badge>
			</TableCell>
			<TableCell>{feedback.feedback}</TableCell>
			<TableCell>
				{new Date(feedback.timestamp).toLocaleString()}
			</TableCell>
			<TableCell>{feedback.city || t('unknownCity')}</TableCell>
			<TableCell>{feedback.country || t('unknownCountry')}</TableCell>
		</TableRow>
	)
}
