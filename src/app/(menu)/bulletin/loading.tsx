import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">오수완</h2>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="relative flex flex-col gap-3" key={index}>
          <div>
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-400" />

            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Skeleton className="h-4 w-52" />
            </div>
            <h3 className="text-sm font-medium text-gray-400">
              <Skeleton className="h-2 w-10" />
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}
