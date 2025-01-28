import { useMutation, useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

interface useBookmarkProps {
  poolId: number
  user: boolean
}

export function useBookmark({ poolId, user }: useBookmarkProps) {
  const queryClient = useQueryClient()

  // Fetch bookmark status
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['bookmarks', poolId],
    queryFn: async ({ queryKey, signal }) => {
      const [_, poolId] = queryKey
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/bookmark`,
        {
          credentials: 'include',
          method: 'GET',
          signal,
        },
      )
      const json = await response.json()

      if (!response.ok) {
        const status = response.status
        throw new Error(`[${status} 에러] ${json.message}`)
      }

      return json.data.is_bookmarked
    },
    enabled: user,
  })

  const { mutate: addBookmark } = useMutation({
    mutationFn: async (poolId: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/bookmark`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ poolId }),
        },
      )
      const json = await response.json()

      if (!response.ok) {
        const status = response.status
        throw new Error(`[${status} 에러] ${json.message}`)
      }
      return json.data
    },
    onMutate: async (poolId) => {
      // 진행 중인 북마크 요청 취소
      await queryClient.cancelQueries({ queryKey: ['bookmarks', poolId] })

      // 이전 북마크 상태 저장
      const previousBookmarks = queryClient.getQueryData(['bookmarks', poolId])

      // 낙관적으로 캐시 업데이트
      queryClient.setQueryData(['bookmarks', poolId], (old: any) => ({
        is_bookmarked: true,
      }))

      return { previousBookmarks }
    },
    onError: (err, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousBookmarks) {
        queryClient.setQueryData(
          ['bookmarks', poolId],
          context.previousBookmarks,
        )
      }
    },
    onSettled: () => {
      // 쿼리 무효화하여 서버 상태와 동기화
      queryClient.invalidateQueries({ queryKey: ['bookmarks', poolId] })
    },
  })

  const { mutate: deleteBookmark } = useMutation({
    mutationFn: async (poolId: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/bookmark`,
        {
          credentials: 'include',
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const json = await response.json()

      if (!response.ok) {
        const status = response.status
        const message = (await response.json()).message

        throw new Error(`[${status} 에러] ${message}`)
      }
      return json.data
    },
    onMutate: async (poolId) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarks', poolId] })
      const previousBookmarks = queryClient.getQueryData(['bookmarks', poolId])

      queryClient.setQueryData(['bookmarks', poolId], (old: any) => ({
        is_bookmarked: false,
      }))

      return { previousBookmarks }
    },
    onError: (err, variables, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(['bookmarks'], context.previousBookmarks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', poolId] })
    },
  })

  return { data, addBookmark, deleteBookmark }
}
