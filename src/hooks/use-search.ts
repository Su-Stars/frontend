import { searchPools } from '@/actions/search'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { PoolSearchData } from '@/types/pools'

interface UseSearchParams {
  region?: string
  keyword?: string
  page?: number
  limit?: number
}

export const useSearch = ({
  region = 'all',
  keyword = 'all',
  limit = 10,
}: UseSearchParams) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<PoolSearchData>({
    queryKey: ['pools', region, keyword, limit],
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
