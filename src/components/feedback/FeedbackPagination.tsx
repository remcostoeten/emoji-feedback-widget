'use client'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui'
import { useFeedbackStore } from '@/core/stores/feedback-store'
import { useMemo } from 'react'

export default function FeedbackPagination() {
	const { feedbackData, currentPage, itemsPerPage, setCurrentPage } =
		useFeedbackStore()

	const totalPages = useMemo(() => {
		return Math.ceil(feedbackData.feedbacks.length / itemsPerPage)
	}, [feedbackData, itemsPerPage])

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page)
		}
	}

	return (
		<footer className="mt-8">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
						/>
					</PaginationItem>
					{[...Array(totalPages)].map((_, index) => (
						<PaginationItem key={index}>
							<PaginationLink
								onClick={() => handlePageChange(index + 1)}
								isActive={currentPage === index + 1}
								className={
									currentPage === index + 1
										? 'text-black'
										: ''
								}
							>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationItem>
						<PaginationNext
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</footer>
	)
}
