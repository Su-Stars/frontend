import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSwimLogsQueryKey } from '@/hooks/useSwimLogs'
import { SwimLogsData } from '@/types/swim-logs'

interface DeleteSwimLogsParams {
  year: number
  month: number
  day?: number
}

export function useDeleteSwimLog({ year, month, day }: DeleteSwimLogsParams) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (logId: number) => {
      const response = await fetch(
        `https://nest-aws.site/api/v1/logs/${logId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      )

      const data = await response.json()

      if (!response.ok) {
        const code = response.status
        const message = data.message || '로그 삭제에 실패했습니다.'

        throw new Error(`[${code} 에러] ${message}`)
      }

      return data
    },

    onMutate: async (deletedLogId) => {
      await queryClient.cancelQueries({
        queryKey: createSwimLogsQueryKey({ year, month, day }),
      })

      const previousLogs = queryClient.getQueryData(
        createSwimLogsQueryKey({ year, month, day }),
      )

      if (previousLogs) {
        const dateKey = `${year}-${month.toString().padStart(2, '0')}-${day?.toString().padStart(2, '0')}`

        queryClient.setQueryData(
          createSwimLogsQueryKey({ year, month, day }),
          (old: SwimLogsData) => ({
            ...old,
            totalSwimLength:
              (old.totalSwimLength || 0) -
              (old.records[dateKey]?.find((log) => log.logId === deletedLogId)
                ?.swimLength || 0),
            records: {
              ...old.records,
              [dateKey]:
                old.records[dateKey]?.filter(
                  (log) => log.logId !== deletedLogId,
                ) || [],
            },
          }),
        )
      }

      return { previousLogs }
    },

    onError: (err, logId, context: any) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bulletin'] })
    },
  })
}
