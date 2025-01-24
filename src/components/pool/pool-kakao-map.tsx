import { Pool } from '@/hooks/useSearch'
import Link from 'next/link'
import { LuLoaderCircle } from 'react-icons/lu'
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk'
import { useEffect, useState } from 'react'

interface PoolKaKaoMapParams {
  pool: Pool
}

export default function PoolKaKaoMap({ pool }: PoolKaKaoMapParams) {
  const [position, setPosition] = useState({
    lat: pool.latitude,
    lng: pool.longitude,
  })
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
  })
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    setPosition({
      lat: pool.latitude,
      lng: pool.longitude,
    })
  }, [loading])

  if (loading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center bg-gray-100">
        <LuLoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    ;<div className="flex h-[300px] w-full items-center justify-center bg-gray-100">
      <div>지도를 불러오는 데 실패했습니다</div>
    </div>
  }

  return (
    <div className="relative h-[300px] w-full rounded-lg">
      <Map
        center={position}
        style={{ width: '100%', height: '100%' }}
        level={3}
        onCreate={() => setIsMapReady(true)}
      >
        {isMapReady && (
          <>
            <MapMarker position={position} />
            <CustomOverlayMap position={position} yAnchor={2.5}>
              <Link
                href={pool.website ? pool.website : ''}
                className="rounded bg-white px-2 py-1 shadow-md hover:text-blue-500 hover:underline"
              >
                {pool.name}
              </Link>
            </CustomOverlayMap>
          </>
        )}
      </Map>
    </div>
  )
}
