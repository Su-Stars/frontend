import { searchPools } from '@/actions/search'
import { Pool } from '@/types/pool'
import { useInfiniteQuery } from '@tanstack/react-query'

interface UseSearchParams {
  region?: string
  keyword?: string
  page?: number
  limit?: number
}

export interface UseSearchResponse {
  total: number
  page: number
  limit: number
  pools: Pool[]
}

export const useSearch = ({
  region = 'all',
  keyword = 'all',
  limit = 10,
}: UseSearchParams) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<UseSearchResponse>({
      queryKey: ['search', region, keyword, limit],
      queryFn: async ({ pageParam }) =>
        searchPools({ region, keyword, page: pageParam as number, limit }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const totalPages = Math.ceil(lastPage.total / limit) // 총 페이지 수
        const currentPage = Number(lastPage.page) // 현재 페이지
        if (currentPage < totalPages) {
          return currentPage + 1
        }
      },
      retry: 0,
    })

  const searchResults = data ? data.pages.flatMap((page) => page.pools) : []
  const total =
    data && data.pages.length > 0 ? data.pages[data.pages.length - 1].total : 0

  return {
    total,
    searchResults,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  }
}
