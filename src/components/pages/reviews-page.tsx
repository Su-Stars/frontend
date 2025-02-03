'use client'

import Link from 'next/link'
import { useReviews } from '@/app/(menu)/pools/[id]/reviews/_hooks/useReviews'
import ReviewItem from '@/app/(menu)/pools/[id]/reviews/_components/review-item'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { useState } from 'react'
import ReviewForm from '@/app/(menu)/pools/[id]/reviews/_components/reivew-post-form'
import { Button } from '@/components/ui/button'
import { PiPencilSimpleLineFill } from 'react-icons/pi'
import { FaChevronLeft } from 'react-icons/fa'
import { useIntersectionObserver } from '@/hooks/use-intersectionObserver'

interface ReviewsPageProps {
  preview?: boolean
  poolId: number
}

export default function ReviewsPage({
  preview = false,
  poolId,
}: ReviewsPageProps) {
  const {
    total,
    reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useReviews({ poolId })
  const [isWriteOpen, setIsWriteOpen] = useState(false)

  const option = {
    threshold: 0.5,
    rootMargin: '0px',
  }

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, option)

  return (
    <section className="flex flex-col space-y-3">
      <ResponsiveDialog
        isOpen={isWriteOpen}
        setIsOpen={setIsWriteOpen}
        title="수영장 리뷰를 남겨주세요"
        description="여러분들의 소중한 리뷰는 다른 사용자들에게 큰 도움이 됩니다."
      >
        <ReviewForm poolId={poolId} setIsOpen={setIsWriteOpen} />
      </ResponsiveDialog>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          {!preview && (
            <Button
              variant="outline"
              size="icon"
              className="mr-2 rounded-full"
              asChild
              role="link"
              aria-label="뒤로가기"
            >
              <Link href={`/pools/${poolId}`}>
                <FaChevronLeft />
              </Link>
            </Button>
          )}
          <h3>
            수영장 리뷰<span className="ml-2 text-gray-500">{total}</span>
          </h3>
        </div>

        <Button
          variant="ghost"
          onClick={() => setIsWriteOpen(true)}
          className="rounded-full"
          role="button"
          aria-label="리뷰 작성하기"
        >
          <PiPencilSimpleLineFill className="text-primary" aria-hidden="true" />
          리뷰 작성하기
        </Button>
      </div>
      {/* <Separator /> */}
      {/* // 리뷰 서머리는 현재 API에서 제공하지 않으므로 이부분을 주석처리합니다. */}
      {/* {Object.entries(data.summary).map(([keyword, count]) => (
        <div
          key={keyword}
          className="rounded-md bg-gray-100 p-4 font-semibold text-gray-700"
        >
          {keyword}: {count}
        </div>
      ))} */}

      <div className="flex flex-col divide-y-0 rounded-md bg-gray-100 p-2">
        {/* // 리뷰가 있을 경우 리뷰 아이템을 렌더링합니다. */}
        {reviews.length > 0 ? (
          <div className="flex flex-col divide-y divide-gray-300 rounded-md bg-gray-100 p-2">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} poolId={poolId} />
            ))}
          </div>
        ) : (
          // 리뷰가 없을 경우 아래와 같은 메시지를 렌더링합니다.
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-muted-foreground">
            <p>
              <span className="text-lg font-medium">아직 리뷰가 없어요</span>
            </p>
            <p>
              <span className="text-sm">첫 번째 리뷰를 작성해보세요!</span>
            </p>
          </div>
        )}
      </div>
      {/* // 프리뷰 상태인 경우와 리뷰가 있는 경우 리뷰 더보기 버튼을 렌더링합니다. */}
      {preview && reviews.length > 0 && (
        <Button
          variant="secondary"
          className="rounded-full"
          role="link"
          asChild
          aria-label="리뷰 더보기"
        >
          <Link href={`/pools/${poolId}/reviews`} className="mx-auto">
            리뷰 더보기
          </Link>
        </Button>
      )}
      {!preview && hasNextPage && (
        <div ref={moreRef} className="py-4 text-center text-gray-500">
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </div>
      )}
    </section>
  )
}
