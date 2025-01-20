import { IReview } from '@/types/reviews'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LuEllipsisVertical } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import dayjs from '@/lib/dayjs'

interface ReviewItemProps {
  review: IReview
  poolId: string
  deleteReview: (poolId: string, reviewId: number) => void
  onEdit: (review: IReview) => void
}

export default function ReviewItem({
  review,
  poolId,
  deleteReview,
  onEdit,
}: ReviewItemProps) {
  return (
    <div className="flex flex-col space-y-3 p-1">
      <div className="flex flex-wrap">
        {review.keywords.map((keyword) => (
          <span key={keyword} className="mr-2 rounded-md bg-gray-200 p-2">
            {keyword}
          </span>
        ))}
      </div>
      <div>
        <p>{review.content}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-base text-gray-700">
          <span>{review.nickname}</span>
          <span>{dayjs(review.createdAt).fromNow()}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-2 hover:bg-gray-200"
            >
              <LuEllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => {
                onEdit(review)
              }}
            >
              수정하기
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                deleteReview(poolId, review.id)
              }}
            >
              삭제하기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
