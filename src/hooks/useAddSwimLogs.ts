import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSwimLogsQueryKey } from '@/hooks/useSwimLogs'
import { SwimLogsData } from '@/types/swim-logs'

export interface SwimLogPayload {
  swim_date: string
  start_time?: string
  end_time?: string
  swim_category?: string
  lane_length: number
  swim_length: number
  note?: string
}

export function useAddSwimLog({
  year,
  month,
  day,
}: {
  year: number
  month: number
  day?: number
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newLog: SwimLogPayload) => {
      try {
        const response = await fetch('https://nest-aws.site/api/v1/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(newLog),
        })

        const data = await response.json()

        if (!response.ok) {
          const code = response.status
          const message = data.message || '수영 기록 추가에 실패했습니다.'

          throw new Error(`[${code} 에러] ${message}`)
        }

        return data.data
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    onMutate: async (newLog) => {
      // 현재 날짜의 쿼리키로 취소
      await queryClient.cancelQueries({
        queryKey: createSwimLogsQueryKey({ year, month, day }),
      })

      // 이전 상태 스냅샷
      const previousLogs = queryClient.getQueryData(
        createSwimLogsQueryKey({ year, month, day }),
      )

      // 낙관적 업데이트
      queryClient.setQueryData(
        createSwimLogsQueryKey({ year, month, day }),
        (old: SwimLogsData) => ({
          ...old,
          totalSwimLength: (old.totalSwimLength || 0) + newLog.swim_length,
          records: {
            ...old?.records,
            [newLog.swim_date]: [
              ...(old?.records?.[newLog.swim_date] || []),
              { ...newLog, temp_id: Date.now() },
            ],
          },
        }),
      )

      return { previousLogs }
    },

    onError: (err, newLog, context: any) => {
      queryClient.setQueryData(
        createSwimLogsQueryKey({ year, month, day }),
        context.previousLogs,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: createSwimLogsQueryKey({ year, month, day }),
      })
      queryClient.invalidateQueries({
        queryKey: createSwimLogsQueryKey({ year, month }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bulletin'] })
    },
  })
}
