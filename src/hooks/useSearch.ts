import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

interface useSearchParams {
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
interface useSearchResponse {
  total: number
  page: number
  limit: number
  pools: Pool[]
}

const defaultResponse: useSearchResponse = {
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
}: useSearchParams) => {
  if (region === 'all' && keyword === 'all') {
    return { total: 0 }
  }

  const { data: searchResults, isLoading } = useQuery<useSearchResponse>({
    queryKey: ['search', region, keyword],
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          keyword: keyword,
          region: region,
          page: page.toString(),
          limit: limit.toString(),
        })

        const res = await fetch(
          `http://localhost:9999/api/v1/pools?${params.toString()}`,
        )

        if (!res.ok) {
          throw new Error('네트워크 에러')
        }

        const json = await res.json()
        return json.data
      } catch (error) {
        console.log(error)
        return defaultResponse
      }
    },
  })
  return { searchResults, isLoading }
}
