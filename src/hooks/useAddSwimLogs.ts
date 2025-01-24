import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSwimLogsQueryKey } from '@/hooks/useSwimLogs'
import { SwimLogsData } from '@/types/swim-logs'

export interface SwimLogPayload {
  swim_date: string
  start_time?: string
  end_time?: string
  swim_category?: string
  lane_length?: number
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
      const response = await fetch('https://nest-aws.site/api/v1/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newLog),
      })
      if (!response.ok) {
        const errorMessages: Record<number, string> = {
          400: '잘못된 요청입니다.',
          401: '인증이 필요합니다.',
          500: '서버 오류가 발생했습니다.',
        }

        const message =
          errorMessages[response.status] || '로그인에 실패했습니다.'
        throw new Error(message)
      }
      return response.json()
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
    },
  })
}
