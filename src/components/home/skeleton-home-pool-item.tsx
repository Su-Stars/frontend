import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonHomePoolItem() {
  return (
    <div>
      <Card className="flex h-40 p-0">
        {/* 이미지 영역 */}
        <div className="h-full w-40">
          <Skeleton className="h-full w-full rounded-l-lg" />
        </div>

        {/* 컨텐츠 영역 */}
        <div className="flex flex-1 items-center justify-between p-4">
          <div className="flex flex-col justify-center space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          {/* 지도 버튼 */}
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </Card>
    </div>
  )
}
