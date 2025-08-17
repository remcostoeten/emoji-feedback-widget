'use client'

import TableSkeleton from '@/components/LoadersOptimized'
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { Suspense, useEffect } from 'react'
import FeedbackControls from '../components/feedback/FeedbackControls'
import FeedbackPagination from '../components/feedback/FeedbackPagination'
import FeedbackStats from '../components/feedback/FeedbackStats'
import FeedbackTable from '../components/feedback/FeedbackTable'

export default function FeedbackPage() {
	const fetchFeedbackData = useFeedbackStore(
		(state) => state.fetchFeedbackData
	)

	useEffect(() => {
		fetchFeedbackData()
	}, [fetchFeedbackData])

	return (
		<div className="mx-auto py-8 bg-card-light">
			<Suspense fallback={<TableSkeleton />}>
				<FeedbackStats />
			</Suspense>
			<FeedbackControls />
			<Suspense fallback={<TableSkeleton />}>
				<FeedbackTable />
			</Suspense>
			<FeedbackPagination />
		</div>
	)
}
