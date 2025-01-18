import { useQuery } from '@tanstack/react-query'

interface UseSearchParams {
  region?: string
  keyword?: string
  page?: number
  limit?: number
}

export interface Pool {
  id: 1
  name: string
  address: string
  thumbnail: string
  isBookMarked: boolean
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
    isLoading,
    isError,
  } = useQuery<UseSearchResponse>({
    queryKey: ['search', region, keyword, page, limit],
    queryFn: async () => {
      try {
        const params = new URLSearchParams()
        params.append('keyword', encodeURIComponent(keyword))
        params.append('region', encodeURI(encodeURIComponent(region)))
        params.append('page', String(page))
        params.append('limit', String(limit))
        console.log(params)
        const url = `http://localhost:9999/api/v1/pools?${params}`

        const res = await fetch(url)
        console.log('Fetching:', url)

        if (!res.ok) {
          throw new Error('네트워크 에러')
        }

        const json = await res.json()
        return json.data
      } catch (error) {
        console.error('Search error:', error)
        return defaultResponse
      }
    },
    enabled: !(region === 'all' && keyword === 'all'),
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분
  })

  return {
    searchResults,
    isLoading,
    isError,
    total: searchResults.total,
  }
}
