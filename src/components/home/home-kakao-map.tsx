'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_MAP_CENTER } from '@/lib/constants'
import { useDebounce } from '@/hooks/use-debounce'
import useCenterStore from '@/stores/center-store'
import HomeKakaoMapMarker from './home-kakao-map-marker'
import { Coordinates } from '@/types/coordinate'
import { Pool } from '@/types/pool'

interface GeocoderResult {
  address_name: string
  region_type: string
  x: number
  y: number
}

interface HomeKakaoMapProps {
  searchResults: Pool[]
  setRegion: (region: string) => void
}

export default function HomeKakaoMap({
  searchResults,
  setRegion,
}: HomeKakaoMapProps) {
  const mapRef = useRef<kakao.maps.Map>(null)

  const { center, setCenter } = useCenterStore()

  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
    null,
  )
  const [openMarkerId, setOpenMarkerId] = useState<number | null>(null)

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
        setRegion(adminDistrict)
      }
    },
    [setRegion],
  )

  // 첫 로딩시 지도의 위치를 유저의 위치로 설정
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

  const clickMarker = (id: number) => {
    if (id === openMarkerId) {
      setOpenMarkerId(null)
    } else {
      setOpenMarkerId(id)
    }
  }

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
      >
        {searchResults &&
          searchResults.map((pool) => (
            <Fragment key={pool.id}>
              <MapMarker
                onClick={() => clickMarker(pool.id)}
                position={{
                  lat: pool.latitude,
                  lng: pool.longitude,
                }}
              />
              <HomeKakaoMapMarker pool={pool} open={openMarkerId === pool.id} />
            </Fragment>
          ))}
      </Map>
    </div>
  )
}
