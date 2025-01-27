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
    data: searchResults = defaultResponse,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useQuery<UseSearchResponse>({
    queryKey: ['search', region, keyword, page, limit],
    queryFn: async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/pools`)
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
        console.log(json)

        return json.data
      } catch (error) {
        console.error('Search error:', error)
        throw new Error('검색에 실패했습니다')
      }
    },

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
