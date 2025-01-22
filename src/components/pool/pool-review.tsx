import { useReviews } from '@/hooks/useReviews'
import { Button } from '../ui/button'
import { LuHeart, LuPencil } from 'react-icons/lu'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Skeleton } from '../ui/skeleton'

interface PoolReviewProps {
  poolId: string
}

export default function PoolReview({ poolId }: PoolReviewProps) {
  const { data: poolReviews, isLoading } = useReviews({
    poolId,
  })

  if (isLoading) {
    return (
      <section>
        <header className="flex items-center justify-between border-b border-gray-300 pb-4 text-lg font-semibold">
          <span>리뷰 </span>
        </header>
        <main>
          <div className="flex flex-col border-b border-gray-300 py-4">
            <div className="flex items-center justify-between">
              <div className="grid w-fit grid-cols-2 gap-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>

              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-[250px]" />
            <div className="flex items-center gap-2 font-semibold">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </main>
      </section>
    )
  }

  return (
    <section>
      <header className="flex items-center justify-between border-b border-gray-300 pb-4 text-lg font-semibold">
        <span>리뷰 {poolReviews ? poolReviews.total : 0}</span>
        <Button
          className="w-fit cursor-pointer font-semibold text-black hover:bg-gray-400"
          variant="outline"
          asChild
        >
          <Link href={`/temp/${poolId}`}>
            <LuPencil />
            <span>리뷰 작성</span>
          </Link>
        </Button>
      </header>
      <main>
        {poolReviews?.reviews.slice(0, 2).map((review, idx) => (
          <div
            className="flex flex-col border-b border-gray-300 py-4"
            key={idx}
          >
            <div className="flex items-center justify-between">
              <div className="grid w-fit grid-cols-2 gap-2">
                {review.keywords.map((keyword, idx) => (
                  <Button variant="secondary" key={idx} className="cursor-text">
                    {keyword}
                  </Button>
                ))}
              </div>
              {/* 좋아요 버튼 */}
              <Button className="bg-transparent text-black hover:bg-gray-400">
                <LuHeart />
              </Button>
            </div>
            <p className="mb-2 mt-9 font-semibold">{review.content}</p>
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-gray-400">{review.nickname}</span>
              <span className="text-sm text-gray-400">
                {dayjs(review.createdAt).format('YYYY-DD-MM')}
              </span>
            </div>
          </div>
        ))}
      </main>
      <footer className="flex items-center justify-center">
        <Button
          variant="link"
          size="lg"
          asChild
          className="w-full text-base font-semibold text-gray-700 hover:text-blue-500"
        >
          <Link href={`/temp/${poolId}`}>
            <span>리뷰 더보기</span>
          </Link>
        </Button>
      </footer>
    </section>
  )
}
