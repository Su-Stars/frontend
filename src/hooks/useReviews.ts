import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import type { IReview, IReviewForm, ReviewsResponse } from '@/types/reviews'
import { useQueryClient } from '@tanstack/react-query'
import { useUserStore } from '@/providers/user-store-provider'
import { useToast } from './use-toast'

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
  // 쿼리 클라이언트 생성
  const queryClient = useQueryClient()
  const { user } = useUserStore((state) => state)
  const { toast } = useToast()

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

  // 리뷰 수정 (낙관적 업데이트)
  const { mutate: updateReview } = useMutation({
    mutationFn: async (reviewForm: IReviewForm) => {
      const response = await fetch(
        `https://nest-aws.site/api/v1/pools/${poolId}/reviews/${reviewId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reviewForm),
        },
      )

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      return json.data
    },
    onMutate: async (newReview) => {
      // 진행 중인 리뷰 요청 취소
      await queryClient.cancelQueries({
        queryKey: ['reviews', poolId, page, limit],
      })

      // 이전 상태 저장
      const previousReviews = queryClient.getQueryData([
        'reviews',
        poolId,
        page,
        limit,
      ])

      // 낙관적 업데이트
      queryClient.setQueryData(['reviews', poolId], (old: any) => {
        const newReviewWithTempId = {
          id: Date.now(), // 임시 ID
          ...newReview,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          users: {
            nickname: user?.nickname || '익명',
          },
        }

        return {
          pages: old.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                reviews: [newReviewWithTempId, ...page.reviews],
                total: page.total + 1,
              }
            }
            return page
          }),
          pageParams: old.pageParams,
        }
      })

      return { previousReviews }
    },
    onError: (err, newReview, context: any) => {
      // 에러 시 이전 상태로 롤백
      queryClient.setQueryData(['reviews', poolId], context.previousReviews)
    },
    onSettled: () => {
      // 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['reviews', poolId],
      })
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
