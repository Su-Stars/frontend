'use client'

import { postBookmark, deleteBookmark, getBookmark } from '@/actions/bookmark'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { set } from 'date-fns'
import { useState } from 'react'

interface useBookmarkProps {
  poolId: number
  user: boolean
}

export function useBookmark({ poolId, user }: useBookmarkProps) {
  const queryClient = new QueryClient()

  //TODO : 중복된 북마크 상태를 제거하고 bookmarkId를 사용하도록 수정
  const [bookmarked, setBookmarked] = useState(false)
  const [bookmarkId, setBookmarkId] = useState<number | null>(null)

  //TODO : 북마크 상태를 가져오는 로직을 useQuery로 변경
  // 현재는 useQuery의 리턴값을 사용하지 않고 개별 상태로 관리하고 있음
  useQuery({
    queryKey: ['bookmark', poolId],
    queryFn: async () => {
      const res = await getBookmark(poolId)
      if (res.status === 'success') {
        setBookmarkId(res.data.bookId)
        return true
      } else {
        setBookmarkId(null)
        return false
      }
    },
    enabled: user,
  })

  const { mutate: addBookmarkMutation } = useMutation({
    mutationFn: async (poolId: number) => {
      const res = await postBookmark(poolId)
      if (res.status === 'success') {
        const id = res.data.id
        setBookmarkId(id)
        return true
      } else {
        return false
      }
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
    mutationFn: async () => {
      if (!bookmarkId) throw new Error('북마크 ID가 없습니다')
      return deleteBookmark(bookmarkId)
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
      setBookmarkId(null)
    },
  })

  return { bookmarked, addBookmarkMutation, deleteBookmarkMutation }
}
