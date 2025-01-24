import { useQuery } from '@tanstack/react-query'
import { SwimLogsData, SwimLogsResponse } from '@/types/swim-logs'

interface useSwimlogsParams {
  year: number
  month: number
  day?: number
}

type SwimLogsQueryKey = [
  'swimLogs',
  {
    year: number
    month: number
    day?: number
  },
]

export const createSwimLogsQueryKey = (params: {
  year: number
  month: number
  day?: number
}): SwimLogsQueryKey => {
  return ['swimLogs', params]
}

export const useSwimLogs = ({ year, month, day }: useSwimlogsParams) => {
  const { data, isPending, isError, error } = useQuery<SwimLogsData>({
    queryKey: createSwimLogsQueryKey({ year, month, day }),
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://nest-aws.site/api/v1/logs?year=${year}&month=${month}${day ? `&day=${day}` : ''}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const result: SwimLogsResponse = await response.json()
        return result.data
      } catch (error) {
        throw error
      }
    },
    staleTime: 1000 * 60 * 10,
    placeholderData: (prev) => prev ?? undefined,
  })

  return { data, isPending, isError, error }
}
