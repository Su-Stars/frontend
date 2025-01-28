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
  const {
    data: isBookmarked,
    addBookmark,
    deleteBookmark,
  } = useBookmark({
    poolId,
    user: !!user,
  })

  console.log('isBookmarked', isBookmarked)

  const clickBookmark = () => {
    if (!user) {
      toast({
        title: '로그인이 필요합니다',
        description: '북마크는 로그인 후 이용 가능합니다.',
        variant: 'destructive',
      })
      return
    }

    if (isBookmarked) {
      deleteBookmark(poolId)
    } else {
      addBookmark(poolId)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={clickBookmark}
      className={cn(
        'flex rounded-full bg-transparent text-3xl transition-colors hover:bg-accent hover:text-blue-500',
        isBookmarked ? 'text-blue-500' : "text-black' }",
      )}
    >
      {isBookmarked ? <FaBookmark /> : <LuBookmark />}
    </Button>
  )
}
