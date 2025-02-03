import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonPoolMap() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="ml-2 h-5 w-20 bg-gray-300" />
      <Skeleton className="h-[400px] rounded-lg border" />
    </div>
  )
}
