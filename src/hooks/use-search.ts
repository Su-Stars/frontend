import { searchPools } from '@/actions/search'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

interface UseSearchParams {
  region?: string
  keyword?: string
  page?: number
  limit?: number
}

export interface Pool {
  id: number
  name: string
  address: string
  thumbnail: string
  distance?: number
  isBookMarked: boolean
  website?: string
  freeSwimLink?: string
  swimLessonLink?: string
  images?: string[]
  laneInfo?: string
  latitude: number
  longtitude: number
  phone?: string
  isDivingAllowed?: boolean
  isFinsAllowed?: boolean
  isKickboardAllowed?: boolean
  isKickboardRental?: boolean
  isPhotoAllowed?: boolean
  isSoapProvided?: boolean
  isTowelProvided?: boolean
}

export interface UseSearchResponse {
  total: number
  page: number
  limit: number
  pools: Pool[]
}

const defaultResponse: UseSearchResponse = {
  total: 0,
  page: 1,
  limit: 10,
  pools: [],
}

{
  /*무한 스크롤 */
}
export const useSearch = ({
  region = 'all',
  keyword = 'all',
  page = 1,
  limit = 10,
}: UseSearchParams) => {
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery<UseSearchResponse>({
    queryKey: ['search', region, keyword, page, limit],
    queryFn: async ({ pageParam }) =>
      searchPools({ region, keyword, page: pageParam as number, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage): number | null => {
      const isLastPage = Math.ceil(lastPage.total / limit) === lastPage.page
      return isLastPage ? null : lastPage.page + 1
    },
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
