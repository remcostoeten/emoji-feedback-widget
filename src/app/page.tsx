'use client'

import { useFeedbackStore } from '@/core/stores/feedback-store'
import { useEffect } from 'react'
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
        <div className="container mx-auto py-8 bg-card-light">
            <FeedbackStats />
            <FeedbackControls />
            <FeedbackTable />
            <FeedbackPagination />
        </div>
    )
}
