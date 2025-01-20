import { IReview } from '@/types/reviews'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import ReviewUpdateButton from '@/components/reviews/review-update-button'

interface ReviewItemProps {
  review: IReview
  poolId: string
  deleteReview: (poolId: string, reviewId: number) => void
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
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <ReviewUpdateButton
                poolId={poolId}
                updateReview={updateReview}
                defaultValues={review}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={() => deleteReview(poolId, review.id)}>
                삭제
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
