import { Pool } from '@/hooks/use-search'
import Link from 'next/link'
import { LuLoaderCircle } from 'react-icons/lu'
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk'
import { useState } from 'react'

interface PoolKaKaoMapParams {
  pool: Pool
}

export default function PoolKaKaoMap({ pool }: PoolKaKaoMapParams) {
  const position = { lat: pool.latitude, lng: pool.longtitude }

  const [isMapReady, setIsMapReady] = useState(false)

  return (
    <div className="relative h-[300px] w-full rounded-lg border">
      <Map
        center={position}
        style={{ width: '100%', height: '100%' }}
        level={3}
        onCreate={() => setIsMapReady(true)}
      >
        {isMapReady && (
          <>
            <MapMarker position={position} />
            <CustomOverlayMap position={position} yAnchor={2.9}>
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
