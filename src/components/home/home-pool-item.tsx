import Image from 'next/image'
import Link from 'next/link'
import NoImage from '@/components/common/no-image'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { LuMapPin } from 'react-icons/lu'
import useCenterStore from '@/stores/center-store'
import type { Pool } from '@/types/pools'
import { useSearchStore } from '@/stores/search-store'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface PoolItemProps {
  pool: Pool
}

export default function PoolItem({ pool }: PoolItemProps) {
  const { setCenter } = useCenterStore()
  const { setFilterName } = useSearchStore()

  const clickMapPin = () => {
    setCenter({ lat: pool.latitude, lng: pool.longitude })
  }
  const clearFilterName = () => {
    setFilterName('전국')
  }

  return (
    <div>
      <Card className="flex h-32 p-0 transition hover:opacity-90 lg:h-40">
        <Link href={`/pools/${pool.id}`} onClick={clearFilterName}>
          {pool.thumbnail ? (
            <div className="relative aspect-square h-full overflow-hidden rounded-l-lg">
              <Image
                src={pool?.thumbnail}
                alt={`${pool.name} 수영장 이미지`}
                width={160}
                height={160}
                sizes="(max-width: 768px) 128px, 160px"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                priority={false}
              />
            </div>
          ) : (
            <NoImage className="aspect-square h-full rounded-l-lg text-sm" />
          )}
        </Link>
        <div className="flex flex-1 items-center justify-between p-2 md:p-4">
          <Link
            className="flex flex-col justify-center"
            href={`/pools/${pool.id}`}
            onClick={clearFilterName}
          >
            <CardTitle className="text-lg hover:underline">
              {pool.name}
            </CardTitle>
            <CardDescription className="text-sm">
              {pool.address.split(' ').slice(0, 4).join(' ')}
            </CardDescription>
          </Link>

          {/* 지도에서 보기 버튼 */}
          {/* 해당 버튼을 누르면 지도의 해당 수영장 위치로 설정됩니다. */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center justify-center rounded-full hover:text-primary"
                  onClick={clickMapPin}
                  aria-label="지도에서 보기"
                >
                  <LuMapPin size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>지도에서 보기</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </div>
  )
}
