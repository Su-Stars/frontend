import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col space-y-10">
      <section className="flex flex-col gap-2">
        <header className="flex w-full items-center gap-4 border-b-slate-200 bg-white">
          <Skeleton className="h-9 w-[200px]" />
        </header>
        <div className="relative h-[200px] w-full">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="flex flex-col gap-4 *:flex *:items-center *:gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-[250px]" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
