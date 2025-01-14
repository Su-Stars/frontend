import { useQuery } from '@tanstack/react-query'
import { IReview } from '@/types/reviews'

interface userRevidwsProps {
  poolId: string
}

export const useReviews = ({ poolId }: userRevidwsProps) => {
  const { data, isLoading, isError } = useQuery<IReview[]>({
    queryKey: ['reviews', poolId],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/api/pools/${poolId}/reviews`,
        )
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
