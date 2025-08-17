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
import { FeedbackData } from '@/core/utils/types'
import { opinionEmojis } from '@/core/config/config'
import { useMemo, useState, useCallback, memo } from 'react'
import { useTranslation } from 'react-i18next'

type TProps = {
	data: FeedbackData
}

// Memoized table row component
const FeedbackRow = memo(function FeedbackRow({ feedback }: { feedback: any }) {
	const { t } = useTranslation()
	
	const opinionType = useMemo(() => {
		const positiveEmojis = ['😍', '🔥']
		const negativeEmojis = ['💩', '🤮']
		
		if (positiveEmojis.includes(feedback.opinion)) return 'positive'
		if (negativeEmojis.includes(feedback.opinion)) return 'negative'
		return 'neutral'
	}, [feedback.opinion])

	return (
		<TableRow className="hover:bg-muted/50 transition-colors">
			<TableCell className="font-medium">{feedback.opinion}</TableCell>
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
					{t(opinionType)}
				</Badge>
			</TableCell>
			<TableCell className="max-w-[300px] truncate">{feedback.feedback}</TableCell>
			<TableCell className="text-sm text-muted-foreground">
				{new Date(feedback.timestamp).toLocaleString()}
			</TableCell>
		</TableRow>
	)
})

export default function FeedbackTableOptimized({ data }: TProps) {
	const { t } = useTranslation()
	const [searchTerm, setSearchTerm] = useState('')
	const [filterOption, setFilterOption] = useState('all')
	const [sortOption, setSortOption] = useState('newest')
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	// Memoized filtering and sorting
	const processedFeedback = useMemo(() => {
		let filtered = data.feedbacks

		// Search filter
		if (searchTerm) {
			const searchLower = searchTerm.toLowerCase()
			filtered = filtered.filter((feedback) =>
				feedback.feedback.toLowerCase().includes(searchLower)
			)
		}

		// Opinion filter
		if (filterOption !== 'all') {
			const positiveEmojis = ['😍', '🔥']
			const negativeEmojis = ['💩', '🤮']
			
			filtered = filtered.filter((feedback) => {
				const { opinion } = feedback
				if (filterOption === 'positive') return positiveEmojis.includes(opinion)
				if (filterOption === 'negative') return negativeEmojis.includes(opinion)
				return ![...positiveEmojis, ...negativeEmojis].includes(opinion)
			})
		}

		// Sorting
		const sorted = [...filtered].sort((a, b) => {
			switch (sortOption) {
				case 'newest':
					return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
				case 'oldest':
					return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
				default:
					return 0
			}
		})

		return sorted
	}, [data.feedbacks, searchTerm, filterOption, sortOption])

	// Pagination
	const paginatedFeedback = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage
		return processedFeedback.slice(startIndex, startIndex + itemsPerPage)
	}, [processedFeedback, currentPage])

	// Handle search with debounce
	const handleSearch = useCallback((value: string) => {
		setSearchTerm(value)
		setCurrentPage(1) // Reset to first page on search
	}, [])

	return (
		<div className="space-y-4">
			{/* Search and filter controls */}
			<div className="flex flex-col sm:flex-row gap-4">
				<input
					type="text"
					placeholder={t('searchFeedback')}
					className="flex-1 px-3 py-2 border rounded-md"
					onChange={(e) => handleSearch(e.target.value)}
				/>
				<select
					className="px-3 py-2 border rounded-md"
					value={filterOption}
					onChange={(e) => setFilterOption(e.target.value)}
				>
					<option value="all">{t('all')}</option>
					<option value="positive">{t('positive')}</option>
					<option value="negative">{t('negative')}</option>
					<option value="neutral">{t('neutral')}</option>
				</select>
				<select
					className="px-3 py-2 border rounded-md"
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
				>
					<option value="newest">{t('newest')}</option>
					<option value="oldest">{t('oldest')}</option>
				</select>
			</div>

			{/* Table */}
			<div className="table-styles overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">{t('emoji')}</TableHead>
							<TableHead className="w-[120px]">{t('opinion')}</TableHead>
							<TableHead>{t('feedback')}</TableHead>
							<TableHead className="w-[180px]">{t('timestamp')}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedFeedback.length > 0 ? (
							paginatedFeedback.map((feedback) => (
								<FeedbackRow key={feedback.id} feedback={feedback} />
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
									{t('noFeedbackFound')}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination info */}
			<div className="flex justify-between items-center text-sm text-muted-foreground">
				<span>
					{t('showing')} {paginatedFeedback.length} {t('of')} {processedFeedback.length} {t('results')}
				</span>
				<div className="flex gap-2">
					<button
						className="px-3 py-1 border rounded-md disabled:opacity-50"
						onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
						disabled={currentPage === 1}
					>
						{t('previous')}
					</button>
					<span className="px-3 py-1">
						{currentPage} / {Math.ceil(processedFeedback.length / itemsPerPage)}
					</span>
					<button
						className="px-3 py-1 border rounded-md disabled:opacity-50"
						onClick={() => setCurrentPage(p => p + 1)}
						disabled={currentPage >= Math.ceil(processedFeedback.length / itemsPerPage)}
					>
						{t('next')}
					</button>
				</div>
			</div>
		</div>
	)
}
