import { useQuery } from '@tanstack/react-query'
import { SwimLogsData } from '@/types/swim-logs'

interface useSwimlogsParams {
  year: number
  month: number
  day?: number
  user: boolean
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
  // undefined 값을 제외한 객체 생성
  const queryParams = {
    year: params.year,
    month: params.month,
    ...(params.day && { day: params.day }),
  }

  return ['swimLogs', queryParams]
}

export const useSwimLogs = ({ year, month, day, user }: useSwimlogsParams) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: createSwimLogsQueryKey({ year, month, day }),
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/logs?year=${year}&month=${month}${day ? `&day=${day}` : ''}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        )

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message)
        }

        return data.data as SwimLogsData
      } catch (error) {
        throw error
      }
    },
    staleTime: 1000 * 60 * 10,
    placeholderData: (prev) => prev ?? undefined,
    enabled: user,
  })

  return { data, isPending, isError, error }
}
