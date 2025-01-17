import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

interface useSearchParams {
  region?: string
  keyword?: string
  page?: number
  limit?: number
}

interface Pool {
  id: 1
  name: string
  address: string
  thumbnail: string
  isBookMarked: boolean
}
interface useSearchResponse {
  data: {
    total: number
    page: number
    limit: number
    pools: Pool[]
  }
}

export const useSearch = ({
  region = '',
  keyword = '',
  page = 1,
  limit = 10,
}: useSearchParams) => {
  const { data: searchResults, isLoading } = useQuery<useSearchResponse>({
    queryKey: ['search', region, keyword],
    queryFn: async () => {
      try {
        if (region === '전국') {
          region = ''
        }
        const params = new URLSearchParams({
          region,
          keyword,
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
        return json()
      } catch (error) {
        console.log(error)
        return []
      }
    },
  })
  return { searchResults, isLoading }
}
