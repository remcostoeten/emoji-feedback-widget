import { FeedbackData } from '@/core/utils/types'
import { create } from 'zustand'
import { getLatestFeedbackAction } from '../server/feedback'

interface FeedbackStore {
	feedbackData: FeedbackData
	loading: boolean
	currentPage: number
	itemsPerPage: number
	searchTerm: string
	filterOption: string
	sortOption: string
	fetchFeedbackData: () => Promise<void>
	setCurrentPage: (page: number) => void
	setItemsPerPage: (items: number) => void
	setSearchTerm: (term: string) => void
	setFilterOption: (option: string) => void
	setSortOption: (option: string) => void
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
	feedbackData: { feedbacks: [], emojiCounts: {} },
	loading: false,
	currentPage: 1,
	itemsPerPage: 10,
	searchTerm: '',
	filterOption: 'all',
	sortOption: 'newest',
	fetchFeedbackData: async () => {
		set({ loading: true })
		const result = await getLatestFeedbackAction()
		if (result.success) {
			set({ feedbackData: result.data, loading: false })
		} else {
			set({ loading: false })
			console.error('Failed to fetch feedback data')
		}
	},
	setCurrentPage: (page) => set({ currentPage: page }),
	setItemsPerPage: (items) => set({ itemsPerPage: items }),
	setSearchTerm: (term) => set({ searchTerm: term }),
	setFilterOption: (option) => set({ filterOption: option }),
	setSortOption: (option) => set({ sortOption: option }),
}))
