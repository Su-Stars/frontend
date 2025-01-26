'use client'

import { addBookmark, getBookmark } from '@/actions/get-bookmark'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface useBookmarkProps {
  poolId: string
}

export function useBookmark({ poolId }: useBookmarkProps) {
  const queryClient = useQueryClient()

  // 초기 북마크 상태
  const { data: bookmarked = false } = useQuery({
    queryKey: ['bookmark', poolId],
    queryFn: async () => getBookmark(poolId),
  })

  // 낙관적 업데이트 적용
  const { mutate: addBookmarkMutation } = useMutation({
    mutationFn: async (poolId: string) => {
      return addBookmark(poolId)
    },
    onMutate: async (poolId: string) => {
      await queryClient.cancelQueries({ queryKey: ['bookmark', poolId] })
      const previousBookmark = queryClient.getQueryData(['bookmark', poolId])
      queryClient.setQueryData(['bookmark', poolId], true) // 일단 true로 만들고 본다
      return { previousBookmark }
    },
    onError: () => {
      queryClient.setQueryData(['bookmark', poolId], false)
    },
    onSettled: (poolId) => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', poolId] })
    },
  })

  // 낙관적 업데이트 적용
  const { mutate: deleteBookmarkMutation } = useMutation({
    mutationFn: async (poolId: string) => {
      return addBookmark(poolId)
    },
    onMutate: async (poolId: string) => {
      await queryClient.cancelQueries({ queryKey: ['bookmark', poolId] })
      const previousBookmark = queryClient.getQueryData(['bookmark', poolId])
      queryClient.setQueryData(['bookmark', poolId], false) // 일단 false로 만들고 본다
      return { previousBookmark }
    },
    onError: () => {
      queryClient.setQueryData(['bookmark', poolId], true)
    },
    onSettled: (poolId) => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', poolId] })
    },
  })

  return { bookmarked, addBookmarkMutation, deleteBookmarkMutation }
}
