import { Skeleton } from '@/components/ui/skeleton'
import SkeletonReviewPreview from '@/app/(menu)/pools/[id]/reviews/_components/review-preview-skeleton'
import SkeletonPoolMap from '@/components/pool/skeleton-pool-map'
import { Separator } from '@/components/ui/separator'

export default function Loading() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="sticky top-0 z-10 flex h-10 items-center gap-2 bg-background">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        {/* 메인 */}
        <div className="flex flex-col space-y-4">
          {/* 이미지 */}
          <Skeleton className="relative h-[200px] w-full" />

          {/* Business Info */}
          <div>
            {/* 타이틀과 북마크 버튼 */}
            <div className="flex items-start justify-between">
              <Skeleton className="h-10 w-20" />
            </div>

            {/* Address & Phone & Description */}
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
            </div>
            {/* Addditional Info */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => {
                return <Skeleton className="h-4 w-4" />
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              {/* TODO : 수영장 정보 등록 요청 기능 추가 */}
              <Skeleton className="flex-1" />
              <Skeleton className="flex-1" />
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <SkeletonReviewPreview />
      <Separator />
      <SkeletonPoolMap />
    </div>
  )
}
