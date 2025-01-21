import { usePool } from '@/hooks/usePool'
import Link from 'next/link'
import { LuLoaderCircle } from 'react-icons/lu'
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk'

interface PoolKaKaoMapParams {
  poolId: string
}
export default function PoolKaKaoMap({ poolId }: PoolKaKaoMapParams) {
  const { pool, isLoading, isError } = usePool({ poolId })

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
  })

  if (loading || isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center bg-gray-100">
        <LuLoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (isError || error || !pool) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center bg-gray-100">
        <span className="text-gray-500">지도를 불러올 수 없습니다.</span>
      </div>
    )
  }

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
      <Map
        center={{ lat: pool.latitude, lng: pool.longitude }}
        style={{ width: '100%', height: '100%' }}
        level={3}
      >
        <MapMarker position={{ lat: pool.latitude, lng: pool.longitude }}>
          <CustomOverlayMap
            position={{ lat: pool.latitude, lng: pool.longitude }}
          >
            <Link
              href=""
              target="_blank"
              className="text-center text-sm text-gray-900"
            >
              {pool.name}
            </Link>
          </CustomOverlayMap>
        </MapMarker>
      </Map>
    </div>
  )
}
