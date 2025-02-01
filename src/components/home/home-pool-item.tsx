import Image from 'next/image'
import Link from 'next/link'
import NoImage from '@/components/common/no-image'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { LuMapPin } from 'react-icons/lu'
import useCenterStore from '@/stores/center-store'
import { useState } from 'react'
import { Pool } from '@/types/pool'

interface PoolItemProps {
  pool: Pool
}

export default function PoolItem({ pool }: PoolItemProps) {
  const { setCenter } = useCenterStore()
  const clickMapPin = () => {
    setCenter({ lat: pool.latitude, lng: pool.longitude })
  }

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div>
      <Card className="flex h-40 p-0 transition hover:opacity-90">
        <Link className="h-full w-40" href={`/pools/${pool.id}`}>
          {pool.images[0] ? (
            <Image
              src={pool?.images[0]}
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
