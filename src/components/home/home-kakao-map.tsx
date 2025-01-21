'use client'

import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import { Suspense, useEffect, useRef } from 'react'
import useCenterStore from '@/stores/center-store'
import { LuLoaderCircle } from 'react-icons/lu'

const APP_KEY = '0d929ba008c86e3296bdbeb4f341c2cc'

interface Coordinates {
  lat: number
  lng: number
}

export default function HomeKakaoMap() {
  const { setCenter, center } = useCenterStore()
  const mapRef = useRef<kakao.maps.Map>(null)

  const [loading, error] = useKakaoLoader({
    appkey: APP_KEY,
  })

  useEffect(() => {
    // 초기 렌더링 시 유저 위치 정보 확보
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setCenter(newCenter)
        },

        // 유저 위치 정보 획득 실패 시 수원역으로 설정
        (error) => {
          console.log(error)
          const newCenter: Coordinates = {
            lng: 127.0286009,
            lat: 37.2635727,
          }
          setCenter(newCenter)
        },
      )
    }

    getCurrentLocation()
  }, [setCenter])

  if (loading) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center bg-gray-100">
        <LuLoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center bg-gray-100">
        <p className="text-center text-red-500">
          카카오 지도를 불러오는 데 오류가 발생했습니다
        </p>
      </div>
    )
  }

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
      <Map
        ref={mapRef}
        center={{ lat: center.lat, lng: center.lng }}
        style={{ width: '100%', height: '100%' }}
        level={3}
      >
        <MapMarker position={{ lat: center.lat, lng: center.lng }}>
          <div className="p-2 text-sm text-gray-900">Current Location</div>
        </MapMarker>
      </Map>
    </div>
  )
}
