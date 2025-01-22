import { useQuery } from '@tanstack/react-query'
import { SwimLogsResponse, SwimLogsData } from '@/types/swim-logs'

interface useSwimlogsParams {
  year: number
  month: number
  date?: string
}

export const useSwimLogs = ({ year, month, date }: useSwimlogsParams) => {
  const { data, isPending, isError, error } = useQuery<SwimLogsData, Error>({
    queryKey: ['swimLogs', year, month, date],
    queryFn: async (): Promise<SwimLogsData> => {
      try {
        const response = await fetch(
          `http://localhost:9999/api/logs?year=${year}&month=${month}${date ? `&date=${date}` : ''}`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data: SwimLogsResponse = await response.json()
        return data.data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    placeholderData: (prev) => prev ?? undefined,
  })

  return { data, isPending, isError, error }
}
