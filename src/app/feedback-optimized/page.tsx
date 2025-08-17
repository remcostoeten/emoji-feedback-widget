'use client'

import TableSkeleton from '@/components/LoadersOptimized'
import { useFeedbackData } from '@/core/hooks/use-feedback-query'
import FeedbackControls from '@/components/feedback/FeedbackControls'
import FeedbackPagination from '@/components/feedback/FeedbackPagination'
import FeedbackStats from '@/components/feedback/FeedbackStats'
import FeedbackTableOptimized from '@/components/feedback/FeedbackTableOptimized'

export default function FeedbackPageOptimized() {
	const { data, isLoading, error } = useFeedbackData()

	if (error) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<h2 className="text-2xl font-semibold text-red-600 mb-2">Error loading feedback</h2>
					<p className="text-gray-600">{error.message}</p>
				</div>
			</div>
		)
	}

	return (
		<div className="mx-auto py-8 bg-card-light space-y-6">
			{/* Stats section */}
			<div className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
				{isLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
						{Array.from({ length: 3 }).map((_, i) => (
							<TableSkeleton key={i} />
						))}
					</div>
				) : (
					<FeedbackStats />
				)}
			</div>
			
			{/* Controls section */}
			<div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-100">
				<FeedbackControls />
			</div>
			
			{/* Table section */}
			<div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
				{isLoading ? (
					<TableSkeleton />
				) : data ? (
					<FeedbackTableOptimized data={data} />
				) : null}
			</div>
			
			{/* Pagination */}
			<div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
				<FeedbackPagination />
			</div>
		</div>
	)
}
