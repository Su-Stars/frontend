'use client'

import { Map } from 'react-kakao-maps-sdk'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_MAP_CENTER } from '@/lib/constants'
import { useDebounce } from '@/hooks/use-debounce'
import useRegionStore from '@/stores/region-store'
import { Coordinates } from '@/stores/center-store'

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

  // 카카오맵 로드와 지오코더 초기화
  useEffect(() => {
    kakao.maps.load(() => {
      setGeocoder(new kakao.maps.services.Geocoder())
    })
  }, [])

  // 지오코딩 처리 함수
  const handleGeocode = useCallback(
    (result: GeocoderResult[], status: kakao.maps.services.Status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address_name

        const adminDistrict = address.split(' ').slice(0, 3).join(' ')
        console.log(adminDistrict)
        setRegion(adminDistrict)
      }
    },
    [setRegion],
  )

  // 첫 로딩시 유저의 위치로 설정 - 됨, 지도가 자동으로 유저 위치에서 시작은 하
  // 유저의 위치에서 지오코딩 실행
  // 지오코딩으로 얻은 주소로부터 setRegion을 실행시켜 인근 수영장에 대한 검색 실행
  useEffect(() => {
    if (!geocoder) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCenter: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCenter(newCenter)
        geocoder.coord2RegionCode(newCenter.lng, newCenter.lat, handleGeocode)
      },
      // 에러가 발생하면 서울역으로 설정
      (error) => {
        setCenter(DEFAULT_MAP_CENTER)
        console.error('Geolocation error:', error)
      },
    )
  }, [geocoder, setRegion])

  const searchAddressFromCoords = useCallback(() => {
    const map = mapRef.current
    if (!map || !geocoder || !center) {
      return
    }

    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    }
    setCenter(newCenter)
    geocoder.coord2RegionCode(newCenter.lng, newCenter.lat, handleGeocode)
  }, [geocoder, center])

  const handleCenterChanged = useDebounce(searchAddressFromCoords, 500)

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
