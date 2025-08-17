import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { getLatestFeedbackAction, submitFeedbackAction, getEmojiCountsAction } from '@/core/server/feedback'
import { FeedbackData } from '@/core/utils/types'

// Query keys
export const feedbackQueryKeys = {
  all: ['feedback'] as const,
  data: () => [...feedbackQueryKeys.all, 'data'] as const,
  emojiCounts: () => [...feedbackQueryKeys.all, 'emoji-counts'] as const,
}

// Fetch feedback data with React Query
export function useFeedbackData() {
  return useQuery({
    queryKey: feedbackQueryKeys.data(),
    queryFn: async () => {
      const result = await getLatestFeedbackAction()
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch feedback data')
      }
      return result.data as FeedbackData
    },
    // Poll for new data every 30 seconds
    refetchInterval: 30 * 1000,
    // Keep data fresh for 1 minute
    staleTime: 60 * 1000,
  })
}

// Fetch emoji counts
export function useEmojiCounts() {
  return useQuery({
    queryKey: feedbackQueryKeys.emojiCounts(),
    queryFn: getEmojiCountsAction,
    // Poll more frequently for counts
    refetchInterval: 15 * 1000,
    staleTime: 30 * 1000,
  })
}

// Submit feedback mutation
export function useSubmitFeedback() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await submitFeedbackAction(formData)
      if (!result.success) {
        throw new Error(result.message || 'Failed to submit feedback')
      }
      return result
    },
    onSuccess: () => {
      // Invalidate and refetch feedback data
      queryClient.invalidateQueries({ queryKey: feedbackQueryKeys.all })
    },
    // Optimistic update
    onMutate: async (formData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: feedbackQueryKeys.data() })
      
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<FeedbackData>(feedbackQueryKeys.data())
      
      // Optimistically update to the new value
      if (previousData) {
        const newFeedback = {
          id: Date.now(), // Temporary ID
          opinion: formData.get('opinion') as string,
          feedback: formData.get('feedback') as string || '',
          timestamp: new Date().toISOString(),
          city: 'Loading...',
          country: 'Loading...',
        }
        
        queryClient.setQueryData<FeedbackData>(feedbackQueryKeys.data(), {
          ...previousData,
          feedbacks: [newFeedback, ...previousData.feedbacks],
        })
      }
      
      // Return a context object with the snapshotted value
      return { previousData }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, formData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(feedbackQueryKeys.data(), context.previousData)
      }
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: feedbackQueryKeys.data() })
    },
  })
}

// Prefetch feedback data (useful for server components)
export async function prefetchFeedbackData(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: feedbackQueryKeys.data(),
    queryFn: async () => {
      const result = await getLatestFeedbackAction()
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch feedback data')
      }
      return result.data as FeedbackData
    },
  })
}
