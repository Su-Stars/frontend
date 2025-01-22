import { useQuery } from '@tanstack/react-query'

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
  longitude: number
  phone?: string
}

interface UseSearchResponse {
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

export const useSearch = ({
  region = 'all',
  keyword = 'all',
  page = 1,
  limit = 10,
}: UseSearchParams) => {
  // useQuery는 항상 호출하되, enabled 옵션으로 실행 조건을 제어
  const {
    data: searchResults = defaultResponse,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useQuery<UseSearchResponse>({
    queryKey: ['search', region, keyword, page, limit],
    queryFn: async () => {
      try {
        const url = new URL('http://localhost:9999/api/v1/pools')
        url.search = new URLSearchParams({
          region,
          keyword,
          page: String(page),
          limit: String(limit),
        }).toString()

        const requestUrl = url.toString()
        const res = await fetch(requestUrl)

        if (!res.ok) {
          throw new Error('네트워크 에러')
        }

        const json = await res.json()

        return json.data
      } catch (error) {
        console.error('Search error:', error)
        throw new Error('검색에 실패했습니다')
      }
    },
    enabled: !(region === 'all' && keyword === 'all'),
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분
  })

  return {
    searchResults,
    isSearchLoading,
    isSearchError,
    searchError,
    total: searchResults.total,
  }
}
