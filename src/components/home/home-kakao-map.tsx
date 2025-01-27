'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useCallback, useEffect, useRef, useState } from 'react'
import useCenterStore, { Center } from '@/stores/center-store'
import { DEFAULT_MAP_CENTER } from '@/lib/constants'
import { useDebounce } from '@/hooks/use-debounce'

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
  const { center, setCenter } = useCenterStore()
  const mapRef = useRef<kakao.maps.Map>(null)
  const [currentAddress, setCurrentAddress] = useState<string>('')
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
    null,
  )

  useEffect(() => {
    kakao.maps.load(() => {
      setGeocoder(new kakao.maps.services.Geocoder())
    })
  }, [])

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setCenter(newCenter)
          console.log(center)
        },
        (error) => {
          console.error('Geolocation error:', error)
          setCenter(DEFAULT_MAP_CENTER)
        },
      )
    }

    getCurrentLocation()
  }, [setCenter])

  const handleGeocode = (
    result: GeocoderResult[],
    status: kakao.maps.services.Status,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      const adminDistrict = result.find((item) => item.region_type === 'H')
      if (adminDistrict) {
        setCurrentAddress(adminDistrict.address_name)
        console.log('Current location:', adminDistrict.address_name)
      }
    } else {
      console.error('Geocoding failed:', status)
    }
  }

  const debouncedHandleCenterChanged = useDebounce(() => {
    const map = mapRef.current
    if (!map || !geocoder) return

    const center = map.getCenter()
    geocoder.coord2RegionCode(center.getLng(), center.getLat(), handleGeocode)
  }, 300)

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
      <Map
        ref={mapRef}
        center={{ lat: center.lat, lng: center.lng }}
        style={{ width: '100%', height: '100%' }}
        level={3}
        aria-label="지도"
        role="application"
        onCenterChanged={debouncedHandleCenterChanged}
      >
        <MapMarker position={{ lat: center.lat, lng: center.lng }}>
          <div className="p-2 text-sm text-gray-900">
            {currentAddress || 'Current Location'}
          </div>
        </MapMarker>
      </Map>
    </div>
  )
}
