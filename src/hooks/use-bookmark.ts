import { useMutation, useQuery } from '@tanstack/react-query'
import { postBookmark, deleteBookmark, getBookmark } from '@/actions/bookmark'
import { useState } from 'react'

interface useBookmarkProps {
  poolId: number
  user: boolean
}

export function useBookmark({ poolId, user }: useBookmarkProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [bookmarkId, setBookmarkId] = useState<number | null>(null)

  // Fetch bookmark status
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
  })

  const { mutate: deleteBookmarkMutation } = useMutation({
    mutationFn: async () => {
      if (!bookmarkId) throw new Error('북마크 ID가 없습니다')
      return deleteBookmark(bookmarkId)
    },
    onSettled: () => {
      setBookmarkId(null)
    },
  })

  return { bookmarked, addBookmarkMutation, deleteBookmarkMutation }
}
