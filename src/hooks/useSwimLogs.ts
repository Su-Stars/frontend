import { useQuery } from '@tanstack/react-query'
import { SwimLogsData, SwimLogsResponse } from '@/types/swim-logs'

interface useSwimlogsParams {
  year: number
  month: number
  date?: string
}

export const useSwimLogs = ({ year, month, date }: useSwimlogsParams) => {
  const { data, isPending, isError, error } = useQuery<SwimLogsData>({
    queryKey: ['swimLogs', year, month, ...(date ? [date] : [])],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:9999/api/logs?year=${year}&month=${month}${date ? `&date=${date}` : ''}`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const result: SwimLogsResponse = await response.json()
        return result.data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 10,
    placeholderData: (prev) => prev ?? undefined,
  })

  return { data, isPending, isError, error }
}
