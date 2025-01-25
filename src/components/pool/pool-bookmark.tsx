'use client'

import { FaBookmark } from 'react-icons/fa'
import { LuBookmark } from 'react-icons/lu'
import { Button } from '../ui/button'
import { useBookmark } from '@/hooks/use-bookmark'

interface PoolBookmarkProps {
  poolId: string
}

export default function PoolBookmark({ poolId }: PoolBookmarkProps) {
  const { bookmarked, addBookmarkMutation, deleteBookmarkMutation } =
    useBookmark({ poolId })

  console.log(bookmarked)
  const clickBookmark = () => {
    if (bookmarked) {
      addBookmarkMutation(poolId)
    } else {
      deleteBookmarkMutation(poolId)
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={clickBookmark}
      size="icon"
      className="rounded-md bg-transparent text-black hover:bg-accent"
    >
      {bookmarked ? <FaBookmark /> : <LuBookmark />}
    </Button>
  )
}
