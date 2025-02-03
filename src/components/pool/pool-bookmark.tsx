'use client'

import { Button } from '../ui/button'
import { useBookmark } from '@/hooks/use-bookmark'
import { useUserStore } from '@/providers/user-store-provider'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { FaBookmark } from 'react-icons/fa'
import { LuBookmark } from 'react-icons/lu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={clickBookmark}
            role="button"
            aria-label={isBookmarked ? '북마크 해제하기' : '북마크 추가하기'}
            className={cn(
              'h-8 w-8 rounded-full bg-transparent p-1 transition-colors hover:bg-accent hover:text-blue-500',
              isBookmarked ? 'text-blue-500' : 'text-black',
            )}
          >
            {isBookmarked ? (
              <FaBookmark className="h-14 w-14" />
            ) : (
              <LuBookmark className="h-14 w-14" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>{isBookmarked ? '북마크 해제하기' : '북마크 추가하기'}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
