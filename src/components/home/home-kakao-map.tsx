'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_MAP_CENTER } from '@/lib/constants'
import { useDebounce } from '@/hooks/use-debounce'
import useCenterStore from '@/stores/center-store'
import HomeKakaoMapMarker from './home-kakao-map-marker'
import { Coordinates } from '@/types/coordinate'
import type { Pool } from '@/types/pools'
import { useSearchStore } from '@/stores/search-store'
import { Skeleton } from '../ui/skeleton'
import { LuLoaderCircle } from 'react-icons/lu'
interface GeocoderResult {
  address_name: string
  region_type: string
  x: number
  y: number
}

interface HomeKakaoMapProps {
  searchResults: Pool[]
}

export default function HomeKakaoMap({ searchResults }: HomeKakaoMapProps) {
  const mapRef = useRef<kakao.maps.Map>(null)
  const { setRegion, setFilterName } = useSearchStore()
  const { center, setCenter } = useCenterStore()

  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder | null>(
    null,
  )
  const [openMarkerId, setOpenMarkerId] = useState<number | null>(null)

  useEffect(() => {
    kakao.maps.load(() => {
      setGeocoder(new kakao.maps.services.Geocoder())
    })
  }, [])

  const handleGeocode = useCallback(
    (result: GeocoderResult[], status: kakao.maps.services.Status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address_name

        const adminDistrict = address.split(' ').slice(0, 3).join(' ')
        setRegion(adminDistrict)
        setFilterName(adminDistrict)
      }
    },
    [setRegion],
  )
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
      {center ? (
        <Map
          ref={mapRef}
          center={{
            lat: center.lat,
            lng: center.lng,
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
                <HomeKakaoMapMarker
                  pool={pool}
                  open={openMarkerId === pool.id}
                />
              </Fragment>
            ))}
        </Map>
      ) : (
        <Skeleton className="flex h-[200px] w-full items-center justify-center bg-slate-300">
          <LuLoaderCircle className="animate-spin" />
        </Skeleton>
      )}
    </div>
  )
}
