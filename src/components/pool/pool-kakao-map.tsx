import Link from 'next/link'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import { useState } from 'react'
import type { PoolDetail } from '@/types/pools'

interface PoolKaKaoMapParams {
  pool: PoolDetail
}

export default function PoolKaKaoMap({ pool }: PoolKaKaoMapParams) {
  const position = { lat: pool.latitude, lng: pool.longitude }

  const [isMapReady, setIsMapReady] = useState(false)

  return (
    <section className="relative mb-8 h-[400px] w-full space-y-3">
      <h3>위치정보</h3>
      <Map
        center={position}
        style={{ width: '100%', height: '100%' }}
        level={5}
        onCreate={() => setIsMapReady(true)}
        className="rounded-lg border"
        scrollwheel={false}
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
    </section>
  )
}
