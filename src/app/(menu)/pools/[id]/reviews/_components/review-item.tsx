import { IReview } from '@/app/(menu)/pools/[id]/reviews/_types/reviews'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LuEllipsisVertical, LuTrash2, LuNotebookPen } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import dayjs from '@/lib/dayjs'
import { useToast } from '@/hooks/use-toast'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { useState } from 'react'
import ReviewEditForm from '@/app/(menu)/pools/[id]/reviews/_components/review-edit-form'
import { useUserStore } from '@/providers/user-store-provider'
import { useQueryClient } from '@tanstack/react-query'
import IconMenu from '@/components/common/icon-menu'

interface ReviewItemProps {
  review: IReview
  poolId: number
}

export default function ReviewItem({ review, poolId }: ReviewItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { toast } = useToast()
  const { user } = useUserStore((state) => state)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    if (!user) {
      toast({
        title: '로그인 필요',
        description: '리뷰를 삭제하려면 로그인이 필요합니다.',
        variant: 'destructive',
      })
      return
    }

    if (user.id !== review.userId) {
      toast({
        title: '권한 없음',
        description: '본인이 작성한 리뷰만 삭제할 수 있습니다.',
        variant: 'destructive',
      })
      return
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/reviews/${review.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      )

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      // 토스트 메세지
      toast({
        title: '리뷰 삭제 완료',
        description: '리뷰가 삭제되었습니다.',
      })

      // 리뷰 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['reviews', poolId] })
    } catch (error) {
      console.error(error)
      toast({
        title: '리뷰 삭제 실패',
        description: (error as Error).message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-col space-y-2 p-1">
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="리뷰 수정하기"
        description="여러분들의 소중한 리뷰는 다른 사용자들에게 큰 도움이 됩니다."
      >
        <ReviewEditForm
          poolId={poolId}
          setIsOpen={setIsEditOpen}
          review={review}
        />
      </ResponsiveDialog>
      <div className="flex flex-wrap">
        {review.keywords &&
          review.keywords.map((keyword) => (
            <span
              key={keyword}
              className="mr-2 rounded-md bg-gray-200 p-1 text-sm md:p-2 md:text-base"
            >
              {keyword}
            </span>
          ))}
      </div>
      <div>
        <p>{review.content}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <span className="font-semibold">{review.users.nickname}</span>
          <span className="text-gray-500">
            {dayjs(review.createdAt).fromNow()}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 rounded-full p-2 hover:bg-gray-200"
            >
              <LuEllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => {
                if (!user) {
                  toast({
                    title: '로그인 필요',
                    description: '리뷰를 수정하려면 로그인이 필요합니다.',
                    variant: 'destructive',
                  })
                  return
                }

                if (user.id !== review.userId) {
                  toast({
                    title: '권한 없음',
                    description: '본인이 작성한 리뷰만 수정할 수 있습니다.',
                    variant: 'destructive',
                  })
                  return
                }
                setIsEditOpen(true)
              }}
            >
              <IconMenu
                text="수정하기"
                icon={<LuNotebookPen className="h-4 w-4" />}
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                handleDelete()
              }}
            >
              <IconMenu
                text="삭제하기"
                icon={<LuTrash2 className="h-4 w-4" />}
                className="text-red-500 hover:text-red-500"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
