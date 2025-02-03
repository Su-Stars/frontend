import { LuLoaderCircle } from 'react-icons/lu'
import { Skeleton } from '../ui/skeleton'
import clsx from 'clsx'

interface MapLoadingUIProps {
  className?: string
}

export default function MapLoadingUI({ className }: MapLoadingUIProps) {
  return (
    <Skeleton
      className={clsx(
        'flex h-[200px] w-full items-center justify-center bg-slate-300',
        className,
      )}
    >
      <LuLoaderCircle className="animate-spin" />
    </Skeleton>
  )
}
