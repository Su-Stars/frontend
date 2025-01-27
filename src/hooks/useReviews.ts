import { useQuery } from '@tanstack/react-query'
import { IReview, IReviewForm } from '@/types/reviews'

export interface ReviewsResponse {
  total: number
  page: number
  limit: number
  summary: Record<string, number>
  reviews: IReview[]
}

interface userRevidwsParams {
  poolId: number
  page?: number
  limit?: number
}

export const useReviews = ({
  poolId,
  page = 1,
  limit = 10,
}: userRevidwsParams) => {
  //TODO : userInfiniteQuery 사용으로 리팩토링 합니다.
  const { data, isLoading, isError } = useQuery<ReviewsResponse>({
    queryKey: ['reviews', poolId, page, limit],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/api/pools/${poolId}/reviews?page=${page}&limit=${limit}`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        return data.data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },
  })

  const createReview = async (poolId: number, reviewForm: IReviewForm) => {
    console.log(poolId, reviewForm)
  }

  const updateReview = async (
    poolId: number,
    reviewId: string,
    reviewForm: IReviewForm,
  ) => {
    console.log(poolId, reviewId)
  }

  const deleteReview = async (poolId: number, reviewId: number) => {
    console.log(poolId, reviewId)
  }

  return { data, isLoading, isError, createReview, updateReview, deleteReview }
}
