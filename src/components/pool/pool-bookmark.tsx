'use client'

import { Button } from '../ui/button'
import { useBookmark } from '@/hooks/use-bookmark'
import { useUserStore } from '@/providers/user-store-provider'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { FaBookmark } from 'react-icons/fa'
import { LuBookmark } from 'react-icons/lu'

interface PoolBookmarkProps {
  poolId: number
}

export default function PoolBookmark({ poolId }: PoolBookmarkProps) {
  const { user } = useUserStore((state) => state)
  const { toast } = useToast()
  const { bookmarked, addBookmarkMutation, deleteBookmarkMutation } =
    useBookmark({
      poolId,
      user: !!user,
    })

  const clickBookmark = () => {
    if (!user) {
      toast({
        title: '로그인이 필요합니다',
        description: '북마크는 로그인 후 이용 가능합니다.',
        variant: 'destructive',
      })
      return
    }

    if (bookmarked) {
      deleteBookmarkMutation()
    } else {
      addBookmarkMutation(poolId)
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={clickBookmark}
      className={cn(
        'h-10 w-10 rounded-full bg-transparent hover:bg-accent hover:text-blue-500',
        bookmarked ? 'text-black' : 'text-blue-500',
      )}
    >
      {bookmarked ? <LuBookmark /> : <FaBookmark />}
    </Button>
  )
}
