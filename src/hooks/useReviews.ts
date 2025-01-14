import { useQuery } from '@tanstack/react-query'
import { IReview } from '@/types/reviews'

export const useReviews = () => {
  const { data, isLoading, isError } = useQuery<IReview[]>({
    queryKey: ['reviews'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:9999/api/reviews')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },
  })

  return { data, isLoading, isError }
}
