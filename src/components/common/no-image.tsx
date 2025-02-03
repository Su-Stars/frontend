import { cn } from '@/lib/utils'
import { LuImage } from 'react-icons/lu'

interface NoImageProps {
  className?: string
}

export default function NoImage({ className }: NoImageProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border bg-muted text-center text-lg font-normal text-muted-foreground',
        className,
      )}
    >
      <LuImage className="h-8 w-8" />
      이미지가 없습니다
    </div>
  )
}
