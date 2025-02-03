import Image from 'next/image'
import Link from 'next/link'
import NoImage from '@/components/common/no-image'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { LuMapPin } from 'react-icons/lu'
import useCenterStore from '@/stores/center-store'
import { useState } from 'react'
import type { Pool } from '@/types/pools'
import { useSearchStore } from '@/stores/search-store'

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

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div>
      <Card className="flex h-40 p-0 transition hover:opacity-90">
        <Link
          className="h-full w-40"
          href={`/pools/${pool.id}`}
          onClick={clearFilterName}
        >
          {pool.thumbnail ? (
            <Image
              src={pool?.thumbnail}
              alt="이미지"
              width={70}
              height={70}
              className="h-full rounded-l-lg object-cover"
            />
          ) : (
            <NoImage className="h-full w-full rounded-l-lg text-sm" />
          )}
        </Link>
        <div className="flex flex-1 items-center justify-between p-4">
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
          <div
            className="cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={clickMapPin}
          >
            {isHovered ? (
              <LuMapPin className="text-blue-500" size={24} />
            ) : (
              <LuMapPin size={24} />
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
