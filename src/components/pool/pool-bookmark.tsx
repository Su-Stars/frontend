'use client'

import { FaBookmark } from 'react-icons/fa'
import { LuBookmark } from 'react-icons/lu'
import { Button } from '../ui/button'
import { useBookmark } from '@/hooks/use-bookmark'

interface PoolBookmarkProps {
  poolId: number
}

export default function PoolBookmark({ poolId }: PoolBookmarkProps) {
  const { bookmarked, addBookmarkMutation, deleteBookmarkMutation } =
    useBookmark({ poolId })

  const clickBookmark = () => {
    if (bookmarked) {
      deleteBookmarkMutation(poolId)
    } else {
      addBookmarkMutation(poolId)
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={clickBookmark}
      className="rounded-md bg-transparent text-black hover:bg-accent"
    >
      {bookmarked ? <FaBookmark /> : <LuBookmark />}
    </Button>
  )
}
