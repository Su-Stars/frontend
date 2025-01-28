'use client'

import { Map } from 'react-kakao-maps-sdk'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_MAP_CENTER } from '@/lib/constants'
import { useDebounce } from '@/hooks/use-debounce'
import useRegionStore from '@/stores/region-store'

interface Coordinates {
  lat: number
  lng: number
}

interface GeocoderResult {
  address_name: string
  region_type: string
  x: number
  y: number
}

export default function HomeKakaoMap() {
  const mapRef = useRef<kakao.maps.Map>(null)
  const { setRegion } = useRegionStore()
  const [center, setCenter] = useState<Coordinates | null>()
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
    null,
  )

  // 지오코더 로딩
  useEffect(() => {
    kakao.maps.load(() => {
      setGeocoder(new kakao.maps.services.Geocoder())
    })
  }, [])

  // 유저 위치로 맵 이동
  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setCenter(newCenter)
        },
        (error) => {
          setCenter(DEFAULT_MAP_CENTER)
          console.error('Geolocation error:', error)
        },
      )
    }

    getCurrentLocation()
  }, [setCenter])

  useEffect(() => {
    if (geocoder) {
      debouncedGeocode()
    }
  }, [center, geocoder])

  const handleGeocode = (
    result: GeocoderResult[],
    status: kakao.maps.services.Status,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      const address = result[0].address_name

      // '경기도 수원시 장안구 파장동'에서 '경기도 수원시'까지만 추출
      const adminDistrict = address.split(' ').slice(0, 3).join(' ')
      console.log(adminDistrict)
      setRegion(adminDistrict)
    } else {
      console.error('Geocoding failed:', status)
    }
  }

  // 디바운싱
  const debouncedGeocode = useDebounce(() => {
    const map = mapRef.current
    if (!map || !geocoder || !center) return
    geocoder.coord2RegionCode(center.lng, center.lat, handleGeocode)
  }, 200)

  const handleCenterChanged = useCallback(
    (map: kakao.maps.Map) => {
      setCenter({
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      })
    },
    [setCenter],
  )

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg border">
      <Map
        ref={mapRef}
        center={{
          lat: center?.lat || DEFAULT_MAP_CENTER.lat,
          lng: center?.lng || DEFAULT_MAP_CENTER.lng,
        }}
        style={{ width: '100%', height: '100%' }}
        level={3}
        aria-label="지도"
        role="application"
        onCenterChanged={handleCenterChanged}
      ></Map>
    </div>
  )
}
