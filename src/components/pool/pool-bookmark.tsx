'use client'

import { FaBookmark } from 'react-icons/fa'
import { LuBookmark } from 'react-icons/lu'
import { Button } from '../ui/button'
import { useBookmark } from '@/hooks/use-bookmark'
import { useUserStore } from '@/providers/user-store-provider'

interface PoolBookmarkProps {
  poolId: number
}

export default function PoolBookmark({ poolId }: PoolBookmarkProps) {
  const { user } = useUserStore((state) => state)
  const { bookmarked, addBookmarkMutation, deleteBookmarkMutation } =
    useBookmark({
      poolId,
      user: !!user,
    })

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
