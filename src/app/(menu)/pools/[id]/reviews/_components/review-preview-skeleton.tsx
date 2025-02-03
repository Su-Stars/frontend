import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonReviewPreview() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="ml-2 h-5 w-20 bg-gray-300" />
      <div className="flex flex-col divide-y-0 rounded-md bg-gray-100 p-2">
        <div className="flex flex-col divide-y divide-gray-300 rounded-md bg-gray-100 p-2">
          {[...Array(3)].map((_, i) => (
            <SkeletonReviewItem key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkeletonReviewItem() {
  return (
    <div className="flex flex-col space-y-2 p-1">
      <div className="flex flex-wrap">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            className="mr-2 h-5 w-16 rounded-md bg-gray-200 p-1 text-sm md:p-2 md:text-base"
            key={i}
          />
        ))}
      </div>
      <Skeleton className="h-5 w-24 bg-gray-400" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-5 w-20 bg-gray-300" />
        <Skeleton className="h-5 w-10 bg-gray-300" />
      </div>
    </div>
  )
}
