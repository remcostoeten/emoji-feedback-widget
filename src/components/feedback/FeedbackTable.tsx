// app/components/FeedbackTable.tsx
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
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

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
					return ['🔥', '😍'].includes(opinion)
				if (filterOption === 'negative')
					return ['💩', '🤮'].includes(opinion)
				return !['🔥', '😍', '💩', '🤮'].includes(opinion)
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
					return ['🔥', '😍'].includes(b.opinion) ? 1 : -1
				case 'lowest':
					return ['💩', '🤮'].includes(b.opinion) ? 1 : -1
				default:
					return 0
			}
		})
	}, [feedbackData, searchTerm, filterOption, sortOption])

	const paginatedFeedback = filteredFeedback.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>{t('emoji')}</TableHead>
						<TableHead>{t('opinion')}</TableHead>
						<TableHead>{t('feedback')}</TableHead>
						<TableHead>{t('timestamp')}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center py-8">
								{t('loading')}
							</TableCell>
						</TableRow>
					) : paginatedFeedback.length > 0 ? (
						paginatedFeedback.map((feedback) => (
							<FeedbackRow
								key={feedback.id}
								feedback={feedback}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={4} className="text-center py-8">
								{t('noFeedback')}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}

function FeedbackRow({ feedback }) {
	const { t } = useTranslation()

	const getOpinionType = (opinion) => {
		if (['🔥', '😍'].includes(opinion)) return 'positive'
		if (['💩', '🤮'].includes(opinion)) return 'negative'
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
		</TableRow>
	)
}
