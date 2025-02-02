import { useInfiniteQuery } from '@tanstack/react-query'
import type { ReviewsResponse } from '@/app/(menu)/pools/[id]/reviews/_types/reviews'

interface userRevidwsParams {
  poolId: number
  page?: number
  limit?: number
  reviewId?: number
}

export const useReviews = ({
  poolId,
  page = 1,
  limit = 10,
  reviewId,
}: userRevidwsParams) => {
  // 리뷰 목록 불러오기 (무한 스크롤)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<ReviewsResponse>({
    queryKey: ['reviews', poolId, page, limit],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://nest-aws.site/api/v1/pools/${poolId}/reviews?page=${page}&limit=${limit}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        )

        const json = await response.json()

        if (!response.ok) {
          throw new Error(`[${response.status}] ${json.message}`)
        }

        return json.data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / limit) // 총 페이지 수
      const currentPage = Number(lastPage.page) // 현재 페이지
      if (currentPage < totalPages) {
        return currentPage + 1
      }
    },
  })

  const total = data ? data.pages[data.pages.length - 1].total : 0
  const reviews = data ? data.pages.flatMap((page) => page.reviews) : []

  return {
    total,
    reviews,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
  }
}
