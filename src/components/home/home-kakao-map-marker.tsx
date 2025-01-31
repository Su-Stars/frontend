import { Pool } from '@/hooks/use-search'
import Image from 'next/image'
import { useState } from 'react'
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'

interface HomeKakaoMapMarkerProps {
  pool: Pool
  open: boolean
}

export default function HomeKakaoMapMarker({
  pool,
  open,
}: HomeKakaoMapMarkerProps) {
  if (!open) return

  return (
    <CustomOverlayMap
      position={{
        lat: pool.latitude,
        lng: pool.longitude,
      }}
      xAnchor={0.5}
      yAnchor={2.5}
    >
      {open && (
        <div className="rounded-md bg-blue-500 px-2 py-1 text-center text-sm text-white">
          <span>{pool.name}</span>
        </div>
      )}
    </CustomOverlayMap>
  )
}
