'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useEffect, useRef, useState } from 'react'
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
  const { setRegion, region } = useRegionStore()
  const [center, setCenter] = useState<Coordinates>(DEFAULT_MAP_CENTER)
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
      const adminDistrict = address.split(' ').slice(0, 2).join(' ')
      setRegion(adminDistrict)
    } else {
      console.error('Geocoding failed:', status)
    }
  }

  // 디바운싱
  const debouncedGeocode = useDebounce(() => {
    const map = mapRef.current
    if (!map || !geocoder) return
    geocoder.coord2RegionCode(center.lng, center.lat, handleGeocode)
  }, 100)

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
      <Map
        ref={mapRef}
        center={{ lat: center.lat, lng: center.lng }}
        style={{ width: '100%', height: '100%' }}
        level={3}
        aria-label="지도"
        role="application"
        onCenterChanged={(map) => {
          const newCenter = {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          }
          setCenter(newCenter)
        }}
      >
        <MapMarker position={{ lat: center.lat, lng: center.lng }}></MapMarker>
      </Map>
    </div>
  )
}
