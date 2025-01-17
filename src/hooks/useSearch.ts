import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

interface useSearchParams {
  region?: string
  keyword?: string
  page?: number
  limit?: number
}

export const useSearch = ({
  region = '',
  keyword = '',
  page = 1,
  limit = 10,
}: useSearchParams) => {
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', region],
    queryFn: async () => {
      try {
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
      }
    },
  })
  return { searchResults, isLoading }
}
