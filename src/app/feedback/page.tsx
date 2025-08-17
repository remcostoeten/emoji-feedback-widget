import { Suspense } from 'react'
import TableSkeleton, { StatCardSkeleton } from '@/components/LoadersOptimized'
import FeedbackControls from '@/components/feedback/FeedbackControls'
import FeedbackPagination from '@/components/feedback/FeedbackPagination'
import FeedbackTableServer from '@/components/feedback/FeedbackTableServer'
import FeedbackStatsServer from '@/components/feedback/FeedbackStatsServer'
import { getFeedbackData } from '@/core/server/feedback'

// This is a Server Component - data fetching happens on the server
export default async function FeedbackPageServer() {
	// Fetch initial data on the server
	const initialData = await getFeedbackData()
	
	return (
		<div className="mx-auto py-8 bg-card-light space-y-6">
			{/* Stats section with streaming */}
			<Suspense 
				fallback={
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full">
						{Array.from({ length: 3 }).map((_, i) => (
							<StatCardSkeleton key={i} />
						))}
					</div>
				}
			>
				<FeedbackStatsServer initialData={initialData} />
			</Suspense>
			
			{/* Controls section - client component for interactivity */}
			<FeedbackControls />
			
			{/* Table section with streaming */}
			<Suspense fallback={<TableSkeleton />}>
				<FeedbackTableServer initialData={initialData} />
			</Suspense>
			
			{/* Pagination - client component for interactivity */}
			<FeedbackPagination />
		</div>
	)
}
