'use client'

import { postBookmark, deleteBookmark, getBookmark } from '@/actions/bookmark'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useToast } from './use-toast'

interface useBookmarkProps {
  poolId: number
  user: boolean
}

export function useBookmark({ poolId, user }: useBookmarkProps) {
  const queryClient = new QueryClient()
  const [bookmarked, setBookmarked] = useState(false)

  useQuery({
    queryKey: ['bookmark', poolId],
    queryFn: async () => {
      const res = await getBookmark(poolId)
      if (res.status === 'success') {
        setBookmarked(true)
        return true
      } else {
        setBookmarked(false)
        return false
      }
    },
    enabled: user,
  })

  const { mutate: addBookmarkMutation } = useMutation({
    mutationFn: async (poolId: number) => {
      return postBookmark(poolId)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['bookmark', poolId] })
      const previousBookmark = queryClient.getQueryData(['bookmark', poolId])
      setBookmarked(true)
      return { previousBookmark }
    },
    onError: () => {
      queryClient.setQueryData(['bookmark', poolId], false)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', poolId] })
    },
  })

  const { mutate: deleteBookmarkMutation } = useMutation({
    mutationFn: async (poolId: number) => {
      return deleteBookmark(poolId)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['bookmark', poolId] })
      const previousBookmark = queryClient.getQueryData(['bookmark', poolId])
      setBookmarked(false)
      return { previousBookmark }
    },
    onError: () => {
      queryClient.setQueryData(['bookmark', poolId], true)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark', poolId] })
    },
  })

  return { bookmarked, addBookmarkMutation, deleteBookmarkMutation }
}
