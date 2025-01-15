import { IReview } from '@/types/reviews'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ReviewItemProps {
  review: IReview
  poolId: string
  deleteReview: (poolId: string, reviewId: string) => void
  updateReview: (poolId: string, reviewId: string) => void
}

export default function ReviewItem({
  review,
  poolId,
  deleteReview,
  updateReview,
}: ReviewItemProps) {
  return (
    <div className="flex flex-col space-y-4 p-1">
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
      <div>
        <span>{review.nickname}</span>
        <span>{review.createdAt}</span>
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>수정하기</DropdownMenuItem>
            <DropdownMenuItem>삭제하기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
